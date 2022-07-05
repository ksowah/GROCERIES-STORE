import { View, SafeAreaView, ImageBackground, StyleSheet } from 'react-native'
import React from 'react'
import tw from "twrnc"
import { auth } from '../firebase'
import { Image } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'

const Profile = () => {
  return (
    <View style={tw`flex-1`}>
        <ImageBackground 
          style={bg.backgroundImage}
          // source={{uri: auth.currentUser.photoURL}}
          // resizeMode="cover"
          >
            <LinearGradient
					// "#009959", "#6EBD6A"
						colors={["#009959", "#6EBD6A"]}
						style={tw`h-[10rem] w-[10rem] bg-white absolute rounded-100 items-center justify-center left-8 -bottom-18`}
						start={{ x: 0, y: 0 }}
						end={{ x: 0, y: 1 }}
					>
              <Image 
                  source={{uri: auth.currentUser.photoURL}}
                  style={tw`h-[9rem] w-[9rem] rounded-100`}
                />

          </LinearGradient>
           
      </ImageBackground >
      <SafeAreaView style={tw`flex-1 `}>
      </SafeAreaView>
    </View>
  )
}


const bg = StyleSheet.create({
  backgroundImage: {
    height: "45%",
    backgroundColor: 'green',
    // opacity: 0.3,
    position: "relative"
  },
});

export default Profile


