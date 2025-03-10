-- Create profiles table
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id),
    username TEXT UNIQUE,
    score INTEGER DEFAULT 0,
    is_admin BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create contestants table
CREATE TABLE IF NOT EXISTS public.contestants (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    image_url TEXT,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create matchups table
CREATE TABLE IF NOT EXISTS public.matchups (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    round INTEGER NOT NULL,
    position INTEGER NOT NULL,
    contestant1_id UUID REFERENCES public.contestants(id),
    contestant2_id UUID REFERENCES public.contestants(id),
    winner_id UUID REFERENCES public.contestants(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(round, position)
);

-- Create votes table
CREATE TABLE IF NOT EXISTS public.votes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    matchup_id UUID REFERENCES public.matchups(id) NOT NULL,
    contestant_id UUID REFERENCES public.contestants(id) NOT NULL,
    user_id UUID REFERENCES public.profiles(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(matchup_id, user_id)
);

-- Create function to handle new user signups
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, username)
    VALUES (new.id, new.email);
    RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user signups
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Set up row level security (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contestants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.matchups ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.votes ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Public profiles are viewable by everyone"
    ON public.profiles FOR SELECT
    USING (true);

CREATE POLICY "Users can update own profile"
    ON public.profiles FOR UPDATE
    USING (auth.uid() = id);

-- Contestants policies
CREATE POLICY "Contestants are viewable by everyone"
    ON public.contestants FOR SELECT
    USING (true);

CREATE POLICY "Only admins can insert contestants"
    ON public.contestants FOR INSERT
    USING (EXISTS (
        SELECT 1 FROM public.profiles
        WHERE id = auth.uid() AND is_admin = true
    ));

-- Matchups policies
CREATE POLICY "Matchups are viewable by everyone"
    ON public.matchups FOR SELECT
    USING (true);

CREATE POLICY "Only admins can insert matchups"
    ON public.matchups FOR INSERT
    USING (EXISTS (
        SELECT 1 FROM public.profiles
        WHERE id = auth.uid() AND is_admin = true
    ));

-- Votes policies
CREATE POLICY "Votes are viewable by everyone"
    ON public.votes FOR SELECT
    USING (true);

CREATE POLICY "Authenticated users can vote"
    ON public.votes FOR INSERT
    USING (auth.uid() IS NOT NULL);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS matchups_round_position_idx ON public.matchups(round, position);
CREATE INDEX IF NOT EXISTS votes_matchup_id_idx ON public.votes(matchup_id);
CREATE INDEX IF NOT EXISTS votes_user_id_idx ON public.votes(user_id);