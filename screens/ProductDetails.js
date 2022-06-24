import { View, Text, ImageBackground, SafeAreaView, Image, TouchableOpacity, ScrollView, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import tw from "twrnc";
import Nav from "../components/Nav";
import { Platform } from "react-native";
import { Button } from "@rneui/base";
import AddButton from "../components/AddButton";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../firebase";

const ProductDetails = ({ navigation, route }) => {

    const [productQuantity, setProductQuantity] = useState(route.params.quantity)
    const [loading, setLoading] = useState(false)

    const addToCart = async () => {

        if(productQuantity > 0) {
            setLoading(true)
            await addDoc(collection(db, "carts", auth.currentUser.phoneNumber, "items"), {
                    timeStamp: serverTimestamp(),
              image: route.params.image,
              name: route.params.name,
              price: route.params.price,
              productQuantity,
                });

                setProductQuantity(0)
                setLoading(false)
                navigation.navigate("Cart")
        }else{
            Alert.alert("Please specify quantity")
        }
     
      }


    const Card = ({image, title, text}) => {
        return (
            <View style={tw`flex-row items-center border border-gray-300 rounded-xl items-center mx-2 justify-center flex-1 py-1`}>
                <View style={tw`mr-3`}>
                    <Image 
                        source={image}
                    />
                </View>
                <View>
                    <Text style={tw`text-[#23AA49] font-700 text-[1.1rem]`}>{title}</Text>
                    <Text style={tw`text-gray-500 text-[1rem]`}>{text}</Text>
                </View>
            </View>
        )
    }


	return (
		<View style={tw`flex-1 bg-[#EBEBEB]`}>
            <ScrollView>
			<SafeAreaView style={tw`flex-1`}>
				<ImageBackground
					source={require("../assets/details-bg.png")}
					style={tw`${
						Platform.OS === "ios" ? "min-h-[25rem]" : "h-[22rem]"
					} w-[100%]`}
					resizeMode="cover"
				>
					<Nav method={() => navigation.goBack()} />
					<View style={tw`items-center mt-8`}>
						<Image
							source={route.params.image}
							style={tw` h-40 w-40 `}
                            resizeMode="contain"
						/>
					</View>
				</ImageBackground>

				<View style={tw`flex-row items-center justify-between mt-6 px-4`}>
                    <View>
					    <Text style={tw`font-600 text-[1.5rem]`}>{route.params.name}</Text>
                        <Text style={tw`font-600 text-[#FF324B] text-[1.1rem] mt-2`}>1kg, {route.params.price}$</Text>
                    </View>

					<View style={tw`flex-row items-center`}>
						<AddButton sign={"-"} remove removeFromCart={() => setProductQuantity(productQuantity - 1)}/>

                        <Text style={tw`mx-3 font-bold text-[1rem]`}>{productQuantity}</Text>

                       <AddButton sign={"+"} add addToCart={() => setProductQuantity(productQuantity + 1)}/>
					</View>
				</View>

                <Text style={tw`text-gray-500 px-4 mt-4 text-[0.9rem]`} numberOfLines={3} ellipsizeMode="tail">
                Ginger is a flowering plant whose rhizome, ginger 
                root or ginger, is widely used as a spice 
                and a folk medicine.
                </Text>

                <View style={tw`mt-4 items-center justify-center flex-row my-2`}>
                    <Card image={require("../assets/lotus.png")} title="100%" text="Organic"/>
                    <Card image={require("../assets/calendar.png")} title="1 Year" text="Expiration"/>
                </View>
                <View style={tw`mt-4 items-center justify-center flex-row my-2`}>
                    <Card image={require("../assets/star.png")} title="4.8" text="Reviews"/>
                    <Card image={require("../assets/fire.png")} title="80 kcal" text="100 Gram"/>
                </View>

                <Button 
                    title={"Add to cart"}
                    buttonStyle={tw`bg-[#23AA49] rounded-100 py-3 mx-6`}
                    containerStyle={tw`${Platform.OS === "android" && "my-6"}`}
                    titleStyle={tw`text-[0.9rem] text-gray-100`}
                    onPress={addToCart}
                    loading={loading}
                />
			</SafeAreaView>
            </ScrollView>
		</View>
	);
};

export default ProductDetails;
