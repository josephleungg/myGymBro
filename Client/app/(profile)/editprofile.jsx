import { View, Text, TouchableOpacity, SafeAreaView, ScrollView, Button } from 'react-native'
import {Picker} from '@react-native-picker/picker';
import { Link, router } from 'expo-router'
import { useGlobalContext } from '../../context/GlobalProvider.js';
import FormField from '../../components/formfield.jsx'
import React, { useState } from 'react'

export default function EditProfile() {
  const { user, username, properties} = useGlobalContext();
  const [ updatedProperties, setUpdatedProperties] = useState({sex: "male"}) // set default sex to male because its the first option

  // button functions
  const saveSubmit = () => {
    router.replace('/profile')
  }

  const cancelSubmit = () => {
    setUpdatedProperties({})
    router.replace('/profile')
  }

  return (
    <SafeAreaView className="bg-primary">
      <ScrollView className="h-full p-6">

        {/* Header */}
        <View className='items-center'>
          <Text className="text-white font-pmedium text-base">Edit Profile</Text>
        </View>

        {/* Change Profile Fields */}

        <FormField 
              title="Name"
              placeholder={properties.name !== "" ? properties.name : "Enter your name"}
              value={updatedProperties.name}
              handleChangeText={(e) => setUpdatedProperties({...updatedProperties, name: e})}
              otherStyles="mt-7"
        />

        <FormField 
              title="Age"
              placeholder={properties.age !== 0 ? properties.age : "Enter your age"}
              value={updatedProperties.age}
              handleChangeText={(e) => setUpdatedProperties({...updatedProperties, age: e})}
              otherStyles="mt-7"
              keyboardType="numeric"
        />

        <FormField 
              title="Bio"
              placeholder={properties.bio !== "" ? properties.bio : "Enter your bio"}
              value={updatedProperties.bio}
              handleChangeText={(e) => setUpdatedProperties({...updatedProperties, bio: e})}
              otherStyles="mt-7"
              multiline={true}
        />

        <Picker
          selectedValue={updatedProperties.sex}
          onValueChange={(itemValue, itemIndex) =>
            setUpdatedProperties({...updatedProperties, sex: itemValue})
          }
          itemStyle={{ color: 'gray', fontSize: 20 }}
          >
          <Picker.Item label="Male" value="male" />
          <Picker.Item label="Female" value="female" />
        </Picker>

        <FormField 
              title="Weight (lbs)"
              placeholder={properties.weight !== 0 ? properties.weight : "Enter your weight"}
              value={updatedProperties.weight}
              handleChangeText={(e) => setUpdatedProperties({...updatedProperties, weight: e})}
              otherStyles="mt-7"
              keyboardType="numeric"
        />

        <FormField 
              title="Height (ft)"
              placeholder={properties.height !== 0 ? properties.height : "Enter your height"}
              value={updatedProperties.height}
              handleChangeText={(e) => setUpdatedProperties({...updatedProperties, height: e})}
              otherStyles="mt-7"
              keyboardType="numeric"
        />

        <FormField 
              title="Body Fat (%)"
              placeholder={properties.bodyFat !== 0 ? properties.bodyFat : "Enter your body fat"}
              value={updatedProperties.bodyFat}
              handleChangeText={(e) => setUpdatedProperties({...updatedProperties, bodyFat: e})}
              otherStyles="mt-7"
              keyboardType="numeric"
        />

        <Button title="Press" onPress={() => {console.log(updatedProperties)}}/>

        {/* Buttons Section */}
        <View className="justify-center space-x-6 flex-row mt-7">

          {/* save button */}
          <TouchableOpacity className="bg-green-400 px-4 py-2 rounded-xl" onPress={saveSubmit}>
            <Text className="text-black font-pmedium">Save</Text>
          </TouchableOpacity>

          {/* cancel button */}
          <TouchableOpacity className="bg-red-400 px-2 py-2 rounded-xl" onPress={cancelSubmit}>
            <Text className="text-black font-pmedium">Cancel</Text>
          </TouchableOpacity>

        </View>

      </ScrollView>
    </SafeAreaView>
  )
}