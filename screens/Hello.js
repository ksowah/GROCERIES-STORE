import { Image, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import tw from "twrnc"
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from '@expo/vector-icons'; 
import { StatusBar } from 'expo-status-bar';

const Hello = ({navigation}) => {
  return (
    <LinearGradient
		  colors={['#009959', '#6EBD6A']}
		  style={tw`relative h-[100%] items-center justify-center`}
		  start={{x: 0, y: 0}}
		  end={{x: 0, y: 1}}
		>
      <StatusBar style='light'/>

    <View style={tw`bg-gray-200 items-center justify-center rounded-100 w-[7rem] h-[7rem]`}>
        <Image 
          source={require("../assets/leaf.png")}
          style={tw`h-[8rem] w-[8rem]`}
        />

    </View>

    <View style={tw`absolute bottom-20 flex flex-row items-center`}>
       <Text style={tw`text-gray-50 font-bold text-[1.1rem]`}>Welcome to the Groceries store</Text>
       <TouchableOpacity activeOpacity={0.5} onPress={() => navigation.navigate("Start")}>
          <MaterialIcons name="double-arrow" style={tw`text-gray-100 text-[2rem] mt-1`} />
       </TouchableOpacity>
    </View>

    </LinearGradient>
  )
}

export default Hello