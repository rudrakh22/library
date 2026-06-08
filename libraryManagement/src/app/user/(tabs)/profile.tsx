import { View, Text } from 'react-native'
import LogoutButton from "@/components/auth/LogoutButton"
import { SafeAreaView } from 'react-native-safe-area-context'

const ProfileScreen = () => {
  return (
    <SafeAreaView>
      <Text>ProfileScreen</Text>
      <LogoutButton/>

    </SafeAreaView>
  )
}

export default ProfileScreen