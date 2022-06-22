import { View, Text, Image, Platform, TouchableOpacity } from 'react-native'
import React from 'react'
import tw from "twrnc"
import AddButton from './AddButton'
import { useRecoilState } from 'recoil'
import { cart } from '../atoms/verificationAtoms'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { auth, db } from '../firebase'

const Products = ({image, name, price, method}) => {

  const addToCart = async () => {

    await addDoc(collection(db, "carts", auth.currentUser.phoneNumber, "items"), {
			timeStamp: serverTimestamp(),
      image,
      name,
      price,
		});
 
  }

  return (
    <TouchableOpacity 
      activeOpacity={0.5}
    style={tw`h-50 m-1 ${Platform.OS === "android" ? "w-35" : "w-38"}  bg-gray-100 rounded-xl items-center justify-center`}
      onPress={method}
    >
      <Image 
        source={image}
        style={tw`mt-4 h-25 w-25 `}
        resizeMode='contain'
      />

      <View style={tw`relative mt-2 pl-4 mt-4 w-[100%]`}>
        <Text style={tw`font-600 mb-2`} numberOfLines={1} ellipsizeMode="tail" >{name}</Text>
        <Text style={tw`font-600 text-[#FF324B] text-[1rem]`}>1kg, {price}$</Text>

       <AddButton sign={"+"} product add addToCart={addToCart}  />
      </View>
    </TouchableOpacity>
  )     
}

export default Products