import { Image, View, Text, TouchableOpacity } from 'react-native'
import { Tabs, Redirect, router } from 'expo-router'
import icons from '../../helper/icons.js'
import { StatusBar } from 'expo-status-bar'
import { useGlobalContext } from '../../context/GlobalProvider.js'

export default function TabsLayout() {
  const {workoutStarted, elapsedTime} = useGlobalContext();
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
        headerShown: workoutStarted,
          headerStyle: {
            backgroundColor: '#212133',
          },
          headerTitle: () => (
              <TouchableOpacity onPress={() => router.push('/workouts/workout-tracker')}>
                <Text className="font-psemibold text-base text-secondary">Workout in progress: <Text className="font-pregular text-base text-white">{Math.floor(elapsedTime / 1000)}</Text></Text>
              </TouchableOpacity>
          ),
          tabBarShowLabel: false,
          tabBarActiveTintColor: '#FFA001',
          tabBarInactiveTintColor: '#CDCDE0',
          tabBarStyle: {
            backgroundColor: '#161622',
            borderTopWidth: 1,
            borderTopColor: '#232533',
            height: 90,
          },
        }}
      >

        {/* home icon in bar */}
        <Tabs.Screen 
          name="home"
          options={{
            title: 'Home',
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