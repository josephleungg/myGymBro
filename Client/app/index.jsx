import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Image, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Redirect, router } from 'expo-router';
import images from '../helper/images.js'
import CustomButton from '../components/custombutton.jsx'

export default function App() {

  return (
    
    <SafeAreaView className="bg-primary h-full">
        
        {/* big div box holding all elements in one full screen */}
        <View className="w-full items-center h-full px-4">

          {/* App Logo and slogan */}
          <View className="items-center">
            <Text className='font-psemibold text-lg color-white mt-10'>my<Text className='color-secondary'>GymBro</Text></Text>
            <Image 
              source={images.transBGLogo} 
              className='w-[128px] h-[128px]'
              resizeMode='contain'
            />
            <Text className='font-pregular text-lg color-white text-center'>your pocket <Text className='color-secondary'>Gym Buddy</Text> </Text>
          </View>

          {/* sign in or sign up button */}
          <View className="w-full h-full justify-center">
            <CustomButton 
              title="Continue with Email"
              handlePress={() => router.push('/sign-in')}
              containerStyles="w-full mt-7"
            />
          </View>

        </View>

        {/* statusbar customization */}
        <StatusBar backgroundColor='#161622' style='light'/>

    </SafeAreaView>

  );
}