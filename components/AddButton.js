import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import tw from "twrnc"

const AddButton = ({remove, add, sign, product, addToCart, removeFromCart }) => {
  return (
<TouchableOpacity onPress={add ? addToCart : removeFromCart} activeOpacity={0.5} style={tw`${product && "absolute right-2 -bottom-1"} ${remove ? "bg-[#F1F1F5]" : "bg-[#009959]"} w-8 h-8 items-center justify-center rounded-100`}>
    <Text style={tw`text-[1.2rem] ${remove ? "text-gray-500" : "text-gray-200"}`}>{sign}</Text>
</TouchableOpacity>
  )
}

export default AddButton