import { View, Text, Image, Platform, TouchableOpacity } from 'react-native'
import React from 'react'
import tw from "twrnc"

const Products = ({image, name, price}) => {
  return (
    <View style={tw`h-50 m-1 ${Platform.OS === "android" ? "w-35" : "w-38"}  bg-gray-100 rounded-xl items-center justify-center`}>
      <Image 
        source={image}
        style={tw`mt-4 h-25 w-25 `}
        resizeMode='contain'
      />

      <View style={tw`relative mt-2 pl-4 mt-4 w-[100%]`}>
        <Text style={tw`font-600 mb-2`} numberOfLines={1} ellipsizeMode="tail" >{name}</Text>
        <Text style={tw`font-600 text-[#FF324B] text-[1rem]`}>1kg, {price}$</Text>

        <TouchableOpacity activeOpacity={0.5} style={tw`absolute bg-[#009959] w-8 h-8 right-2 -bottom-1 items-center justify-center rounded-100`}>
            <Text style={tw`text-[1.2rem] text-gray-200`}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  )     
}

export default Products