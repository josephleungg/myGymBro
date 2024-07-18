import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Button, Alert } from 'react-native'
import {Picker} from '@react-native-picker/picker';
import { SelectList, MultipleSelectList } from 'react-native-dropdown-select-list'
import FormField from '../../../components/formfield.jsx'
import { IP_ADDRESS } from '@env';
import { router } from 'expo-router'
import { useGlobalContext } from '../../../context/GlobalProvider.js';
import icons from '../../../helper/icons.js'
import { useState } from 'react'

export default function CreateMeal() {
  return (
    <View>
      <Text></Text>
    </View>
  )
}