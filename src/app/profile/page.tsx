import { createClient } from '@/lib/supabase/server'
import AuthGuard from '@/components/auth/authGuard'
import ProfileContent from './ProfileContent'

export default async function ProfilePage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <AuthGuard user={user} currentPath="/profile">
      <ProfileContent />
    </AuthGuard>
  )
}