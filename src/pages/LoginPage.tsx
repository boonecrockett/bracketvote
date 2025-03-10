import React from 'react'
import Auth from '../components/Auth'

const LoginPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sign in to BracketVote
        </h2>
      </div>
      <Auth />
    </div>
  )
}

export default LoginPage