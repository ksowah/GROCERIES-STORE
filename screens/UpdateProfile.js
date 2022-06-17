import { View, Text, KeyboardAvoidingView, SafeAreaView, TouchableWithoutFeedback, Keyboard, TouchableOpacity } from "react-native";
import React from "react";
import tw from "twrnc";
import { Button } from "@rneui/base";
import { Avatar, Input } from "@rneui/themed";
import { FontAwesome } from '@expo/vector-icons';

const UpdateProfile = () => {


	

	return (
		<KeyboardAvoidingView behavior="padding" style={tw`flex-1 p-8`}>
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
			<SafeAreaView style={tw`items-center`}>
				<Text style={tw`font-700 text-2xl my-6 text-[#009959]`}>
					Profile Info
				</Text>
				<Text style={tw`text-center text-[1rem] text-gray-500`}>
					Please provide your name and an optional profile Photo
				</Text>

                <View style={tw`relative`}>
                    <TouchableOpacity activeOpacity={0.5} style={tw`absolute z-50 bg-gray-200 p-3 rounded-full bottom-3 right-0`}>
					<FontAwesome name="camera" size={25} color="gray" />
					</TouchableOpacity>
                    <Avatar
                        rounded
                        size={100}
                        source={require("../assets/avatar.png")}
                        containerStyle={tw`shadow-lg my-8`}
                    />
                </View>

                <Input 
                        leftIcon={<FontAwesome name="user" size={26} color="gray" style={tw`mr-2`} />}
                        placeholder="Enter your name"
                />

				<Button
					title="Finish"
					buttonStyle={tw`rounded-100 py-3 w-[12rem] mt-2 bg-[#6EBD6A]`}
					titleStyle={tw`text-[1rem]`}
					// disabled={!verificationId}
					// onPress={verifyUser}
				/>
			</SafeAreaView>
                </TouchableWithoutFeedback>
		</KeyboardAvoidingView>
	);
};

export default UpdateProfile;
