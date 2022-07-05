import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Feather, FontAwesome } from "@expo/vector-icons";
import tw from "twrnc"

const Nav = ({ method, title }) => {
	return (
		<View 
            style={tw`px-6 flex-row items-center justify-between`}
        >
			<TouchableOpacity
            activeOpacity={0.5}
            onPress={method}
				style={tw`border w-[2.5rem] h-[2.5rem] mt-2 rounded-100 border-gray-200 items-center justify-center`}
			>
				<Feather name="chevron-left" size={25} style={tw`text-gray-500`} />
			</TouchableOpacity>

            <Text style={tw`text-[1.2rem] font-700`}>{title} 
			{title === "Fruits" && "🍎"} 
			{title === "Vegetables" && "🥕"}
			{title === "Diary" && "🧀"}
			{title === "Meat" && "🥩"}
			</Text>

            <TouchableOpacity
            activeOpacity={0.5}
				style={tw`border w-[2.5rem] h-[2.5rem] mt-2 rounded-100 border-gray-200 items-center justify-center`}
			>
				<Feather name="search" size={23} style={tw`text-gray-500`} />
			</TouchableOpacity>
		</View>
	);
};

export default Nav;
