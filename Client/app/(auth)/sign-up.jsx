import { View, Text, SafeAreaView, ScrollView, Image, Alert } from 'react-native'
import images from '../../helper/images.js'
import FormField from '../../components/formfield.jsx'
import CustomButton from '../../components/custombutton.jsx'
import React, { useState } from 'react'
import { Link, router } from 'expo-router'

export default function SignUp() {
  const [form, setForm] = useState({username: "", email: "", password: ""})
  const [isSubmitting, setIsSubmitting] = useState(false)

  // function to submit the form
  const submit = async () => {
    // try and catching fetch request for signup
    try{
      const res = await fetch('http://192.168.2.32:5000/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(form)
      });

      // checking if there are any errors to be thrown
      if(res.status !== 200){
        const errorResponse = await res.json();
        throw new Error(errorResponse.message)
      }

      console.log('User created successfully')
      setIsSubmitting(true);
      router.replace('/home')
    }catch(e){
      console.log('Error:', e)
      Alert.alert('Error:', e.message)
      setIsSubmitting(false);
    }
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