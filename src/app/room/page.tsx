import { createClient } from '@/lib/supabase/server'
import AuthGuard from '@/components/auth/authGuard'
import RoomContent from './RoomContent'

export default async function RoomPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <AuthGuard user={user} currentPath="/room">
      <RoomContent />
    </AuthGuard>
  )
}