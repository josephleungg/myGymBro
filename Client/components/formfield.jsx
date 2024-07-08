import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import images from '../helper/images.js'
import React, { useState } from 'react'

export default function FormField({ title, value, placeholder, handleChangeText, otherStyles, ...props }) {
    const [showPassword, setShowPassword] = useState(false)
  
    return (

    <View className={`space-y-2 ${otherStyles}`}>
        <Text className="text-base text-gray-100 font-pmedium text-sm">{title}</Text>

        <View className="border-2 border-black-200 w-full h-16 px-4 bg-black-100 rounded-2xl focus:border-secondary items-center flex-row">
            
            {/* textbox */}
            <TextInput 
                className="flex-1 text-white font-psemibold text-base"
                value={value}
                placeholder={placeholder}
                placeholderTextColor="#7b7b8b"
                onChangeText={handleChangeText}
                keyboardType={props.keyboardType}
                secureTextEntry={title === 'Password' && !showPassword}
                multiline={props.multiline ? true : false}
            />

            {/* controlling the show password or hide password based on state */}
            {title === 'Password' && (
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                    <Image 
                        source={showPassword ? images.eyeHide : images.eye}
                        className="w-6 h-6"
                        resizeMode="contain"
                    />
                </TouchableOpacity>
            )}

        </View>

    </View>
  )
}

