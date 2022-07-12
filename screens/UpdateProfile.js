import { View, Text, KeyboardAvoidingView, SafeAreaView, Platform, TouchableWithoutFeedback, Keyboard, TouchableOpacity, Alert } from "react-native";
import React, { useState } from "react";
import tw from "twrnc";
import { Button } from "@rneui/base";
import { Avatar, Input } from "@rneui/themed";
import { FontAwesome } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { auth, storage } from "../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { updateProfile } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

const UpdateProfile = ({navigation}) => {

	const [selectedFile, setSelectedFile] = useState(null)
	const [name, setName] = useState("")
	const [loading, setLoading] = useState(false);

	const pickImage = async () => {
		// No permissions request is necessary for launching the image library
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: true,
			aspect: [4, 3],
			quality: 1,
		});


		if (!result.cancelled) {
			setSelectedFile(result.uri)
		}
	}

	const storeUserData = async (value) => {
		try {
		  await AsyncStorage.setItem('userData', value)
		  console.log("Data stored")
		} catch (e) {
		  console.log(e)
		}
	  }


	const storeImage = async () => {

		setLoading(true)
		Platform.OS === "android" && Keyboard.dismiss()
		
		const imageRef = ref(storage, `profile/${auth.currentUser.phoneNumber}/image`)

       if(selectedFile){

		let img = await fetch(selectedFile)
		let blob = await img.blob()

		await uploadBytes(imageRef, blob)
           .then(async () => {
               const downloadURL = await getDownloadURL(imageRef)
			   await updateProfile(auth.currentUser, {
				displayName: name,
				photoURL:
			   downloadURL ||
				   "https://ksets.netlify.app/NATIVE/avatar.png",
				})

				storeUserData(JSON.stringify({img: downloadURL || "https://ksets.netlify.app/NATIVE/avatar.png", name}))

			navigation.replace("Home")
           })
		   .catch((e) => {
			alert(e);
		   })
       }
	   
	 if(!selectedFile){
		try{
			await updateProfile(auth.currentUser, {
				displayName: name,
				photoURL: "https://ksets.netlify.app/NATIVE/avatar.png",
				})
				navigation.replace("Home")

		}catch(e) {
		alert(e.code)
	   }

	   
	}
}



	return (
		<KeyboardAvoidingView behavior="padding" style={tw`flex-1 ${Platform.OS === "android" ? "p-4 px-8" : "p-8"} `}>
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
			<SafeAreaView style={tw`items-center`}>
				<Text style={tw`font-700 text-2xl ${Platform.OS === "android" ? "my-2" : "my-6"} text-[#009959]`}>
					Profile Info
				</Text>
				<Text style={tw`text-center text-[1rem] text-gray-500`}>
					Please provide your name and an optional profile Photo
				</Text>

                <View style={tw`relative`}>
                    <TouchableOpacity onPress={pickImage} activeOpacity={0.5} style={tw`absolute z-50 bg-gray-200 p-3 rounded-full bottom-3 right-0`}>
					<FontAwesome name="camera" size={25} color="gray" />
					</TouchableOpacity>
                    <Avatar
                        rounded
                        size={100}
                        source={ selectedFile ? {uri: selectedFile} :  require("../assets/avatar.png") }
                        containerStyle={tw`shadow-lg ${Platform.OS === "android" ? "my-4" : "my-7"}`}
						
                    />
                </View>

                <Input 
                        leftIcon={<FontAwesome name="user" size={26} color="gray" style={tw`mr-2`} />}
                        placeholder="Enter your name"
						onChangeText={(name) => setName(name)}
						onSubmitEditing={storeImage}
                />

				<Button
					title="Finish"
					buttonStyle={tw`rounded-100 py-3 w-[12rem] mt-2 bg-[#6EBD6A]`}
					titleStyle={tw`text-[1rem]`}
					 disabled={!name}
					onPress={storeImage}
					loading={loading}
				/>
			</SafeAreaView>
                </TouchableWithoutFeedback>
		</KeyboardAvoidingView>
	);
};

export default UpdateProfile;
