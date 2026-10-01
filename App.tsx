import { useAuth } from './context/AuthContext'
import { LoginScreen } from './screens/LoginScreen'
import { HomeScreen } from './screens/HomeScreen'
import { LoadingScreen } from './components/LoadingScreen'

export default function App() {
  const { user, loading } = useAuth()

  if (loading) return <LoadingScreen />
  if (!user) return <LoginScreen />
  return <HomeScreen />
}
