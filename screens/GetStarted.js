import { View, Image, Text, SafeAreaView, ImageBackground, StatusBar, Platform } from "react-native";
import React from "react";
import tw from "twrnc";
import { Button } from "@rneui/base";

const GetStarted = ({ navigation }) => {
	return (
		<View style={tw`relative flex-1 bg-gray-50`}>
            <StatusBar barStyle={"dark-content"}/>
			<ImageBackground
				source={require("../assets/animate.png")}
				style={tw`min-h-[32rem] w-[100%]`}
				resizeMode="cover"
			> 
				<Image
					source={require("../assets/leaf-1.png")}
					style={tw`absolute top-10 right-5`}
				/>
				<Image
					source={require("../assets/leaf-2.png")}
					style={tw`absolute bottom-10 left-10`}
				/>
				<Image
					source={require("../assets/leaf-3.png")}
					style={tw`absolute right-0 bottom-20`}
				/>

				<View style={tw`m-10 ${Platform.OS === "android" ? "m-7 mt-10" : "my-19"} flex-1 items-center`}>
					<View
						style={tw`bg-white shadow-lg items-center justify-center rounded-100 w-[5rem] h-[5rem]`}
					>
						<Image
							source={require("../assets/leaf.png")}
							style={tw`h-[5rem] w-[5rem]`}
						/>
					</View>

                    <Text style={tw`text-[1.5rem] text-center font-bold shadow-lg ${Platform.OS === "android" ? "my-3" : "my-6"}`}>
                        Get your groceries delivered to your home
                    </Text>
                    <Text style={tw`text-center text-[1rem] text-gray-500 shadow-lg ${Platform.OS === "android" ? "my-3" : "my-6"}`}>
                        The best delivery app in town for delivering your daily fresh groceries
                    </Text>

					<Button title="Shop now" 
					 buttonStyle={tw`rounded-100 py-3 w-[12rem] mt-2 bg-[#6EBD6A]`}
					 titleStyle={tw`text-[1rem]`}
					 onPress={() => navigation.navigate("SignUp")}
					/>
				</View>


			</ImageBackground>

			<SafeAreaView style={tw`flex-1`}>
				<Image
					source={require("../assets/fruits.png")} 
					style={tw`absolute bottom-0 w-[100%] ${Platform.OS === "android" && "h-[16rem]"}`}
				/>
			</SafeAreaView>
		</View>
	);
};

export default GetStarted;
