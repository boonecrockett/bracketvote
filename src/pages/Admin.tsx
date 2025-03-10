import React from 'react'
import supabase from '../utils/supabaseClient'

const Admin: React.FC = () => {
  const [isAdmin, setIsAdmin] = React.useState(false)

  React.useEffect(() => {
    checkAdminStatus()
  }, [])

  const checkAdminStatus = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (user) {
      const { data: profile } = await supabase
        .from('users')
        .select('is_admin')
        .eq('id', user.id)
        .single()
      setIsAdmin(profile?.is_admin || false)
    }
  }

  if (!isAdmin) {
    return <div>Access denied</div>
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Admin Dashboard</h2>
      {/* Add admin controls here */}
    </div>
  )
}

export default Admin