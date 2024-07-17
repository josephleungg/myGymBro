import { View, Text, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native'
import {Picker} from '@react-native-picker/picker';
import { Link, router } from 'expo-router'
import { useGlobalContext } from '../../context/GlobalProvider.js';
import FormField from '../../components/formfield.jsx'
import { IP_ADDRESS } from '@env';
import React, { useState } from 'react'

export default function EditProfile() {
  const { user, username, properties, setProperties } = useGlobalContext();
  const [ updatedProperties, setUpdatedProperties] = useState({sex: "male"}) // set default sex to male because its the first option


  // button functions
  const saveSubmit = async () => {
    const cleanedProperties = cleanProperties()
    updateProfile(cleanedProperties);
    setProperties(resetProperties(cleanedProperties))
    router.replace('/profile')
  }

  const cancelSubmit = () => {
    router.replace('/profile')
  }

  // clean properties object before submitting to backend
  function cleanProperties() {
    const cleanedProperties = {}
    for(const key in updatedProperties){
      if(updatedProperties[key] !== "" && updatedProperties[key] !== 0){
        cleanedProperties[key] = updatedProperties[key]
      }
    }
    return cleanedProperties
  }

  // function for setting the properties to the new ones, needed so that we dont need to useeffect again in globalprovider
  function resetProperties(object) {
    const oldPlusNewProperties = object
    for(const key in properties){
      if(oldPlusNewProperties[key] === undefined){
        oldPlusNewProperties[key] = properties[key]
      }
    }
    return oldPlusNewProperties
  }

  // fetch from backend to update and set user properties and then reset updatedProperties
  async function updateProfile(changedProperties) {
    try{
      const edit_profile = await fetch(IP_ADDRESS + 'edit_profile?id=' + user, {
        method: 'PUT',
        headers: {
          "Content-Type": 'application/json'
        },
        body: JSON.stringify(changedProperties)
      })

      const message = await edit_profile.json()

      console.log(message.message)
    }catch(e){
      console.log(e.message)
    }
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
              placeholder={properties.age !== 0 ? properties.age.toString() : "Enter your age"}
              value={updatedProperties.age}
              handleChangeText={(e) => setUpdatedProperties({...updatedProperties, age: !isNaN(parseInt(e, 10)) ? parseInt(e, 10) : 0})}
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
              placeholder={properties.weight !== 0 ? properties.weight.toString() : "Enter your weight"}
              value={updatedProperties.weight}
              handleChangeText={(e) => setUpdatedProperties({...updatedProperties, weight: !isNaN(parseInt(e, 10)) ? parseInt(e, 10) : 0})}
              otherStyles="mt-7"
              keyboardType="numeric"
        />

        <FormField 
              title="Height (ft)"
              placeholder={properties.height !== 0 ? properties.height.toString() : "Enter your height"}
              value={updatedProperties.height}
              handleChangeText={(e) => setUpdatedProperties({...updatedProperties, height: !isNaN(parseInt(e, 10)) ? parseInt(e, 10) : 0})}
              otherStyles="mt-7"
              keyboardType="numeric"
        />

        <FormField 
              title="Body Fat (%)"
              placeholder={properties.bodyFat !== 0 ? properties.bodyFat.toString() : "Enter your body fat"}
              value={updatedProperties.bodyFat}
              handleChangeText={(e) => setUpdatedProperties({...updatedProperties, bodyFat: !isNaN(parseInt(e, 10)) ? parseInt(e, 10) : 0})}
              otherStyles="mt-7"
              keyboardType="numeric"
        />
        
        {/* BUGTESTING FUNCTIONS, CAN COMMENT THEM OUT WHEN NOT NEEDED */}
        {/* <Button title="Press" onPress={() => {console.log(updatedProperties)}}/> */}

        {/* Buttons Section */}
        <View className="justify-center space-x-6 flex-row mt-7 pb-16">

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