import { View, Text, SafeAreaView, ScrollView } from "react-native";
import React from "react";
import Nav from "../components/Nav";
import { foodItems } from "../foodItems";
import Products from "../components/Products";
import Tabs from "../components/Tabs";
import tw from "twrnc";

const Applications = ({ navigation }) => {
	return (
		<View style={tw`flex-1 bg-[#EBEBEB]`}>
			<SafeAreaView style={tw`flex-1`}>
				<Nav method={() => navigation.goBack()} title="All Categories" />
				<ScrollView>
					<View style={tw`mt-4 items-center justify-center flex-row flex-wrap`}>
						{foodItems.map((foodItem, idx) => (
							<Products
								key={idx}
								image={foodItem.image}
								price={foodItem.price}
								name={foodItem.name}
								method1={() =>
									navigation.navigate("ProductDetails", {
										image: foodItem.image,
										price: foodItem.price,
										name: foodItem.name,
                    quantity: 0,
									})
								}
								method2={() => {
									navigation.navigate("ProductDetails", {
										image: foodItem.image,
										price: foodItem.price,
										name: foodItem.name,
										quantity: 1,
									});
								}}
							/>
						))}
					</View>
				</ScrollView>
				<Tabs />
			</SafeAreaView>
		</View>
	);
};

export default Applications;
