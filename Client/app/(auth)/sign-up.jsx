import { View, Text, SafeAreaView, ScrollView, Image } from 'react-native'
import images from '../../helper/images.js'
import FormField from '../../components/formfield.jsx'
import CustomButton from '../../components/custombutton.jsx'
import React, { useState } from 'react'
import { Link } from 'expo-router'

export default function SignUp() {
  const [form, setForm] = useState({username: "", email: "", password: ""})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const submit = () => {
    return
  }

  return (

    <SafeAreaView className="bg-primary h-full">

        <View className="w-full min-h-[85vh] justify-center px-8 my-6">
          
          {/* View containing the login textbox and text */}
          <View className="w-full">
            <Text className="color-white text-xl font-semibold mb-6">Sign Up</Text>

            {/* username box */}
            <FormField 
              title="Username"
              value={form.username}
              handleChangeText={(e) => setForm({...form, username: e})}
              otherStyles="mt-7"
            />

            {/* email box */}
            <FormField 
              title="Email"
              value={form.email}
              handleChangeText={(e) => setForm({...form, email: e})}
              otherStyles="mt-7"
              keyboardType="email-address"
            />

            {/* password box */}
            <FormField 
              title="Password"
              value={form.password}
              handleChangeText={(e) => setForm({...form, password: e})}
              otherStyles="mt-7"
            />

            {/* log in button */}
            <CustomButton 
              title="Sign Up"
              handlePress={submit}
              containerStyles="mt-7"
              isLoading={isSubmitting}
            />

            {/* sign up for an account text */}
            <View className="justify-center pt-5 flex-row gap-2">
              <Link href='/sign-in' className="text-md text-gray-100 font-pregular">Already registered?</Link>
            </View>

          </View>

          {/* View containing logo */}
          <View className="w-full items-center mt-28">
            <Image 
              source={images.transBGLogo} 
              className='w-[64px] h-[64px]'
              resizeMode='contain'
            />
          </View>
          
          
        </View>

    </SafeAreaView>

  )
}