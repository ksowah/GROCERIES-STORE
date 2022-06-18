import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import tw from "twrnc"

const Products = () => {
  return (
    <View style={tw`h-50 m-1 w-38 bg-gray-100 rounded-xl items-center`}>
      <Image 
        source={require("../assets/tomatoes.png")}
        style={tw`mt-4`}
      />

      <View style={tw`relative mt-2 pl-4 mt-4 w-[100%]`}>
        <Text style={tw`font-600`}>Bell Pepper Red</Text>
        <Text style={tw`font-600 text-[#FF324B] text-[1rem]`}>1kg, 4$</Text>

        <TouchableOpacity activeOpacity={0.5} style={tw`absolute right-3 -bottom-5 bg-[#009959] w-9 h-9 items-center justify-center rounded-100`}>
            <Text style={tw`text-[1.5rem] text-gray-200`}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  )     
}

export default Products