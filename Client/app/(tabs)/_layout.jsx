import { View, Text } from 'react-native'
import {  Tabs, Redirect } from 'expo-router'

export default function TabsLayout() {

  const TabIcon = () => {
    
  }

  return (
    <Tabs>
      <Tabs.Screen 
        name="home"
        options={{
          title: 'Home',
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            
          )
        }}
      />
    </Tabs>
  )
}