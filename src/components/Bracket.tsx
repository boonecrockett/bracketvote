import React, { useEffect, useState } from 'react'
import { supabase } from '../utils/supabaseClient'

interface Matchup {
  id: string
  round: number
  position: number
  contestant1_id: string
  contestant2_id: string
  winner_id: string | null
}

const Bracket: React.FC = () => {
  const [matchups, setMatchups] = useState<Matchup[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchMatchups()
  }, [])

  const fetchMatchups = async () => {
    try {
      const { data, error } = await supabase
        .from('matchups')
        .select('*')
        .order('round')
        .order('position')

      if (error) throw error
      setMatchups(data || [])
    } catch (error) {
      console.error('Error fetching matchups:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleVote = async (matchupId: string, contestantId: string) => {
    try {
      const { error } = await supabase
        .from('votes')
        .insert([{ matchup_id: matchupId, contestant_id: contestantId }])

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
                onClick={() => handleVote(matchup.id, matchup.contestant1_id)}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                disabled={!!matchup.winner_id}
              >
                Vote
              </button>
              <span className="text-gray-500">vs</span>
              <button
                onClick={() => handleVote(matchup.id, matchup.contestant2_id)}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                disabled={!!matchup.winner_id}
              >
                Vote
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Bracket