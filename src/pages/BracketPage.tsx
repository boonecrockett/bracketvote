import React from 'react'
import Bracket from '../components/Bracket'

const BracketPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Tournament Bracket</h1>
      <Bracket />
    </div>
  )
}

export default BracketPage