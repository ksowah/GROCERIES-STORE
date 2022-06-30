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
import CartItem from '../components/CartItem'
import Payment from '../components/Payment'
import { StripeProvider } from '@stripe/stripe-react-native'

const Cart = ({navigation}) => {

	const KEY = "pk_test_51JxA3xFlvRVXan9yPfqKhxNTzAx1Y2JScagYBvNPJaqQKaS4auyh977jeZRbeIyU5uWZLeIS1B0YBiHzoswugXBQ006lfOIVpX"
    
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



	
	// ----------------


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

			<StripeProvider publishableKey={KEY}>
				<Payment />
			</StripeProvider>
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