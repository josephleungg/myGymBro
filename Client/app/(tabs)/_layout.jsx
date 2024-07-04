import { Image, View, Text } from 'react-native'
import { Tabs, Redirect } from 'expo-router'
import icons from '../../helper/icons.js'
import { StatusBar } from 'expo-status-bar'

export default function TabsLayout() {

  const TabIcon = ({ icon, color, name, focused}) => {
    return (
      <View className='items-center justify-center gap-2'>
        <Image
          source={icon}
          resizeMode="contain"
          // tintColor={color}
          className="w-6 h-6"
        />
        <Text className={`${focused ? 'font-psemibold' : 'font-pregular'} text-xs`} style={{ color: color }}>
          {name}
        </Text>
      </View>
    );
  }

  return (
    <>
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarActiveTintColor: '#FFA001',
          tabBarInactiveTintColor: '#CDCDE0',
          tabBarStyle: {
            backgroundColor: '#161622',
            borderTopWidth: 1,
            borderTopColor: '#232533',
            height: 90,
          }
        }}
      >

        {/* home icon in bar */}
        <Tabs.Screen 
          name="home"
          options={{
            title: 'Home',
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.home}
                color={color}
                name="Home"
                focused={focused}
              />
            )
          }}
        />

        {/* trackers icon in bar */}
        <Tabs.Screen 
          name="trackers"
          options={{
            title: 'Trackers',
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.trackers}
                color={color}
                name="Trackers"
                focused={focused}
              />
            )
          }}
        />

        {/* ai icon in bar */}
        <Tabs.Screen 
          name="ai"
          options={{
            title: 'AI',
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.ai}
                color={color}
                name="AI"
                focused={focused}
              />
            )
          }}
        />

        {/* profile icon in bar */}
        <Tabs.Screen 
          name="profile"
          options={{
            title: 'Profile',
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.profile}
                color={color}
                name="Profile"
                focused={focused}
              />
            )
          }}
        />

      </Tabs>
      <StatusBar backgroundColor='#161622' style='light'/>
    </>
  )
}