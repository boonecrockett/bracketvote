import React, { useEffect, useState } from 'react'
import { supabase } from '../utils/supabaseClient'

interface Entry {
  id: string
  name: string
}

interface Matchup {
  id: string
  round_id: string
  entry1_id: string
  entry2_id: string
  position_info: string
  winner_id: string | null
  entry1?: Entry
  entry2?: Entry
}

const Bracket: React.FC = () => {
  const [matchups, setMatchups] = useState<Matchup[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchMatchups()
  }, [])

  const fetchMatchups = async () => {
    try {
      const { data: roundData, error: roundError } = await supabase
        .from('rounds')
        .select('id')
        .eq('status', 'active')
        .single()

      if (roundError) throw roundError

      if (roundData) {
        const { data, error } = await supabase
          .from('matchups')
          .select(`
            *,
            entry1:entries!matchups_entry1_id_fkey(id, name),
            entry2:entries!matchups_entry2_id_fkey(id, name)
          `)
          .eq('round_id', roundData.id)
          .order('position_info')

        if (error) throw error
        setMatchups(data || [])
      }
    } catch (error) {
      console.error('Error fetching matchups:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleVote = async (matchupId: string, entryId: string) => {
    try {
      const { data: userData } = await supabase.auth.getUser()
      if (!userData.user?.email) {
        alert('Please log in to vote')
        return
      }

      const { error } = await supabase
        .from('votes')
        .insert([{
          matchup_id: matchupId,
          entry_id: entryId,
          user_email: userData.user.email
        }])

      if (error) throw error
      await fetchMatchups()
    } catch (error) {
      console.error('Error submitting vote:', error)
    }
  }

  if (loading) {
    return <div>Loading bracket...</div>
  }

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Current Matchups</h2>
      <div className="space-y-4">
        {matchups.map((matchup) => (
          <div key={matchup.id} className="border rounded p-4">
            <div className="flex justify-between items-center">
              <button
                onClick={() => handleVote(matchup.id, matchup.entry1_id)}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                disabled={!!matchup.winner_id}
              >
                {matchup.entry1?.name || 'Loading...'}
              </button>
              <span className="text-gray-500">vs</span>
              <button
                onClick={() => handleVote(matchup.id, matchup.entry2_id)}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                disabled={!!matchup.winner_id}
              >
                {matchup.entry2?.name || 'Loading...'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Bracket