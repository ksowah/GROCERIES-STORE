import { View, Text, SafeAreaView, ScrollView } from "react-native";
import React from "react";
import tw from "twrnc";
import Nav from "../components/Nav";
import { foodItems } from "../foodItems";
import Products from "../components/Products";
import Tabs from "../components/Tabs";

const Category = ({ navigation, route }) => {
	return (
		<View style={tw`flex-1 bg-[#EBEBEB]`}>
			<SafeAreaView style={tw`flex-1`}>
				<Nav method={() => navigation.goBack()} title={route.params.category}/>
				<ScrollView>
					<View style={tw`mt-4 items-center justify-center flex-row flex-wrap`}>
						{foodItems.map(
							(foodItem, idx) =>
								foodItem.category === route.params.category && (
									<Products
										key={idx}
										image={foodItem.image}
										price={foodItem.price}
										name={foodItem.name}
										method1={() => navigation.navigate("ProductDetails", {
											image: foodItem.image,
											price: foodItem.price,
											name: foodItem.name,
										})}
									/>
								)
						)}
					</View>
				</ScrollView>
			</SafeAreaView>
		</View>
	);
};

export default Category;
