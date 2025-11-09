import { createClient } from '@/lib/supabase/server'
import AuthGuard from '@/components/auth/authGuard'
import PlayContent from './PlayContent'

export default async function PlayPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <AuthGuard user={user} currentPath="/play">
      <PlayContent />
    </AuthGuard>
  )
}
