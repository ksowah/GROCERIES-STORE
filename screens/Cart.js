import { View, Text, SafeAreaView, ScrollView, Image } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import { cart } from '../atoms/verificationAtoms'
import { collection, onSnapshot, orderBy, query, deleteDoc, doc, updateDoc } from 'firebase/firestore'
import { auth, db } from '../firebase'
import Tabs from '../components/Tabs'
import tw from "twrnc"
import Nav from '../components/Nav'
import AddButton from '../components/AddButton'
import { foodItems } from '../foodItems'
import { Button } from '@rneui/base'

const Cart = ({navigation}) => {
    
  const [items, setItems] = useState([])
  const [totalItems, setTotalItems] = useState([])

  
	useLayoutEffect(() => {
		const unsubscribe = onSnapshot(
			query(collection(db, "carts", auth.currentUser.phoneNumber, "items"), orderBy("timeStamp", "desc")),
			(snapshot) => {
				setItems(snapshot.docs)
			}
		)

		return unsubscribe;
	}, []);



	const CartItem = ({data, id}) => {
	

		const reduceQuantity = async () => {

			const productRef = doc(db, "carts", auth.currentUser.phoneNumber, "items", id)

			if(data.productQuantity > 1){
				await updateDoc(productRef, {
					productQuantity: data.productQuantity - 1,
				  });
			}else{
				await deleteDoc(doc(db, "carts", auth.currentUser.phoneNumber, "items", id));
			}

		  }

		const increaseQuantity = async () => {
			const productRef = doc(db, "carts", auth.currentUser.phoneNumber, "items", id)

				await updateDoc(productRef, {
					productQuantity: data.productQuantity + 1,
				  });
			
		}
		  

		return(
			<View style={tw`flex-row items-center justify-between px-6 border-b border-gray-200 py-4`}>
				<Image 
					source={data.image}
					style={tw`h-12 w-12 mr-2`}
				/>

				<View style={tw`w-[10rem]`}>
					<Text style={tw`font-700 text-[1.1rem] mb-2`} numberOfLines={1}  ellipsizeMode="tail">{data.name}</Text>
					<Text style={tw`font-600 text-[#FF324B] text-[1rem]`}>1kg, {data.price}$</Text>
				</View>

				<View style={tw`flex-row items-center`}>
					<AddButton remove
						sign={"-"}
						removeFromCart={reduceQuantity}
					/>

					<Text style={tw`mx-3`}>{data.productQuantity}</Text>

					<AddButton add sign={"+"} addToCart={increaseQuantity}/>
				</View>
			</View>
		)
	}


  return (
    <View style={tw`flex-1 ${items.length <= 0 ? "bg-white" : "bg-[#EBEBEB]"}`}>
		<SafeAreaView style={tw`flex-1`}>
			<Nav method={() => navigation.goBack()} title={"Cart"} />
			{
				items.length > 0 && (
					<>
			<ScrollView style={tw`flex-1 mt-2`}>

				{items.map((item, idx) => (

						<CartItem 
						id={item.id}
						key={idx}
						data={item.data()}
						/>
				))}
			</ScrollView>

			<View style={tw`border-t border-gray-300`}>

				<View style={tw`flex-row items-center justify-between m-4`}>
					<Text style={tw`font-500 text-[1rem]`}>Your Order</Text>
					<Text style={tw`font-800 text-[1.2rem]`}>${totalItems}.00</Text>
				</View>

				<Button 
				title={"Checkout"}
				buttonStyle={tw`bg-[#23AA49] rounded-100 py-[1rem] mx-6`}
				containerStyle={tw`my-6`}
				titleStyle={tw`text-[1rem] text-gray-100`}
				/>
			</View>

				</>
				)
			}

			{
				items.length <= 0 && (
					<View style={tw`flex-1 items-center justify-center`}>
						<Image 
							source={require("../assets/empty_cart.gif")}
						/>
					</View>
				)
			}

		</SafeAreaView>
    </View>
  )
}

export default Cart