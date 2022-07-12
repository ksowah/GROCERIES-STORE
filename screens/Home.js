import {
	View,
	Text,
	SafeAreaView,
	StatusBar,
	TouchableOpacity,
	ImageBackground,
	Image,
	Platform,
} from "react-native";
import React, { useEffect, useState } from "react";
import { auth } from "../firebase";
import tw from "twrnc";
import { LinearGradient } from "expo-linear-gradient";
import { Avatar, Input, ListItem } from "@rneui/themed";
import { FontAwesome5, Entypo, Feather } from "@expo/vector-icons";
import { Button } from "@rneui/base";
import { ScrollView } from "react-native";
import Products from "../components/Products";
import { signOut } from "firebase/auth";
import { foodItems } from "../foodItems";
import AsyncStorage from "@react-native-async-storage/async-storage";


const Home = ({ navigation }) => {

	const [userData, setUserData] = useState({})
 

	const logOut = () => {
		try {
			await AsyncStorage.clear()
			console.log("session cleared");
			navigation.replace("Start");
		  } catch(e) {
			// clear error
			console.log(e);
		  }
	};

	const getUserData = async () => {
		try {
		  const data = await AsyncStorage.getItem('userData')
		  console.log(data)
		  setUserData(JSON.parse(data))
		} catch(e) {
		  console.log(e)
		}
	  }

	  useEffect(() => {
		getUserData()
	  }, [])
	  


	const SlideComponent = ({gradientOne, gradientTwo}) => {
		return (
			<View style={tw`w-[20rem] mx-2 h-[10rem] rounded-2xl overflow-hidden`}>
				<ImageBackground
					style={tw`relative w-[100%] h-[100%]`}
					source={require("../assets/veges.jpg")}
					resizeMode="cover"
				>
					<LinearGradient
					// "#009959", "#6EBD6A"
						colors={[gradientOne, gradientTwo]}
						style={tw`w-[50%] absolute right-0 h-[100%] items-center justify-center`}
						start={{ x: 0, y: 0 }}
						end={{ x: 0, y: 1 }}
					>
						<Text style={tw`text-gray-300 text-sm`}>Ramadan Offers</Text>
						<Text style={tw`text-gray-100 font-500 text-[2rem] mt-2`}>
							Get 25%
						</Text>
						<Button
							title={"Grab Offer"}
							buttonStyle={tw`rounded-100 bg-gray-50 w-[8rem] h-[2.3rem] mt-2`}
							titleStyle={tw`text-[${gradientTwo}] text-[0.9rem] font-600`}
							icon={
								<Entypo name="chevron-small-right" size={24} color="#009959" />
							}
							iconRight
						/>
					</LinearGradient>
				</ImageBackground>
			</View>
		);
	};

	const Category = ({ image, type }) => {
		return (
			<View style={tw`items-center`}>
				<TouchableOpacity
					onPress={() => navigation.navigate("Category", { category: type })}
					activeOpacity={0.5}
					style={tw`items-center mb-2 justify-center rounded-100 h-18 w-18 bg-gray-200`}
				>
					<Image source={image} style={tw`h-10 w-10`} />
				</TouchableOpacity>
				<Text style={tw`font-600 text-[0.8rem]`}>{type}</Text>
			</View>
		);
	};

	return (
		<LinearGradient
			colors={["#EBEBEB", "#fff"]}
			start={{ x: 0, y: 0 }}
			end={{ x: 0, y: 1 }}
			style={tw`flex-1`}
		>
			<StatusBar barStyle={"dark-content"} />
			<SafeAreaView style={tw`flex-1`}>
				<ScrollView>
					<View
						style={tw`flex-row items-center mt-2 ${
							Platform.OS === "ios" ? "px-6" : "px-3 mt-6"
						}`}
					>
						<View style={tw`flex-row items-center w-[60%]`}>
							<Avatar
								onPress={logOut}
								rounded
								source={{
									uri: "https://www.pngkey.com/png/full/115-1150152_default-profile-picture-avatar-png-green.png"
								}}
							/>

							<View
								style={tw`${
									Platform.OS === "android" ? "ml-2" : "ml-4"
								} w-[60%]`}
							>
								<Text style={tw`text-gray-500 font-500`}>Good evening</Text>
								<Text
									style={tw`font-bold text-lg`}
									ellipsizeMode="tail"
									numberOfLines={1}
								>
									{"kelvin"}
								</Text>
							</View>
						</View>
						<TouchableOpacity
							activeOpacity={0.5}
							style={tw`bg-white w-[40%] ${
								Platform.OS === "android" ? "h-10" : "h-12"
							} px-2 rounded-100 flex-row items-center justify-around`}
						>
							<FontAwesome5 name="map-marker-alt" size={24} color="#009959" />
							<Text style={tw`font-600 text-gray-700`}>My Flat</Text>
							<Entypo name="chevron-small-down" size={24} color="gray" />
						</TouchableOpacity>
					</View>

					<Input
						containerStyle={tw`mt-6 ${Platform.OS === "ios" ? "px-6" : "px-3"}`}
						inputContainerStyle={tw`border-b-0 bg-white rounded-100 ${
							Platform.OS === "ios" && "h-[3.5rem]"
						} px-3 items-center`}
						leftIcon={<Feather name="search" size={24} color="gray" />}
						placeholder="Search category"
					/>

					<ScrollView
						style={tw`mb-2`}
						horizontal
						showsHorizontalScrollIndicator={false}
					>
						<SlideComponent gradientOne="#009959" gradientTwo="#6EBD6A"/>
						<SlideComponent gradientOne={"#D7816A"} gradientTwo="#BD4F6C"/>
						<SlideComponent gradientOne={"#EC9F05"} gradientTwo="#FF4E00" />
						<SlideComponent gradientOne={"#233329"} gradientTwo={"#63D471"}/>
					</ScrollView>

					<View style={tw`mt-4 h-40 px-6`}>
						<View style={tw`flex-row items-center justify-between`}>
							<Text style={tw`font-700 text-lg`}>Categories 😊</Text>
							<Text style={tw`text-[#009959] text-[0.9rem]`}>See all</Text>
						</View>

						<View style={tw`flex-row items-center justify-between my-4`}>
							<Category image={require("../assets/apple.png")} type="Fruits" />
							<Category
								image={require("../assets/brocolli.png")}
								type="Vegetables"
							/>
							<Category image={require("../assets/cheese.png")} type="Diary" />
							<Category image={require("../assets/meat.png")} type="Meat" />
						</View>
					</View>

					<View style={tw`px-6`}>
						<View style={tw`flex-row items-center justify-between`}>
							<Text style={tw`font-700 text-lg`}>Best Selling 🔥</Text>
							<Text style={tw`text-[#009959] text-[0.9rem]`}>See all</Text>
						</View>

						<View
							style={tw`mt-4 items-center justify-center flex-row flex-wrap`}
						>
							{foodItems.map((foodItem, idx) => (
								<Products
									key={idx}
									image={foodItem.image}
									price={foodItem.price}
									name={foodItem.name}
									method1={() => {
										navigation.navigate("ProductDetails", {
											image: foodItem.image,
											price: foodItem.price,
											name: foodItem.name,
											quantity: 0
										});
									}}
									method2={() => {
										navigation.navigate("ProductDetails", {
											image: foodItem.image,
											price: foodItem.price,
											name: foodItem.name,
											quantity: 1
										});
									}}

								/>
							))}
						</View>
					</View>
				</ScrollView>
			</SafeAreaView>
		</LinearGradient>
	);
};

export default Home;
