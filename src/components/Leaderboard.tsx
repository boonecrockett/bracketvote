import React, { useEffect, useState } from 'react'
import supabase from '../utils/supabaseClient'

interface LeaderboardEntry {
  id: string
  username: string
  score: number
}

const Leaderboard: React.FC = () => {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchLeaderboard()
  }, [])

  const fetchLeaderboard = async () => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('id, username, score')
        .order('score', { ascending: false })
        .limit(10)

      if (error) throw error
      setEntries(data || [])
    } catch (error) {
      console.error('Error fetching leaderboard:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div>Loading leaderboard...</div>
  }

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Leaderboard</h2>
      <div className="space-y-4">
        {entries.map((entry, index) => (
          <div key={entry.id} className="flex items-center justify-between">
            <div className="flex items-center">
              <span className="text-gray-500 w-8">{index + 1}.</span>
              <span>{entry.username || 'Anonymous'}</span>
            </div>
            <span className="font-semibold">{entry.score || 0}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Leaderboard