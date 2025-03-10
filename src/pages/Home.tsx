import React from 'react'
import Bracket from '../components/Bracket'
import Leaderboard from '../components/Leaderboard'

const Home: React.FC = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <Bracket />
      </div>
      <div>
        <Leaderboard />
      </div>
    </div>
  )
}

export default Home