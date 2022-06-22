import { View, Text, SafeAreaView, ScrollView, Image } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import { cart } from '../atoms/verificationAtoms'
import { collection, onSnapshot, orderBy, query, deleteDoc, doc } from 'firebase/firestore'
import { auth, db } from '../firebase'
import Tabs from '../components/Tabs'
import tw from "twrnc"
import Nav from '../components/Nav'
import AddButton from '../components/AddButton'
import { foodItems } from '../foodItems'

const Cart = ({navigation}) => {
    
  const [items, setItems] = useState([])
  const [count, setCount] = useState(0)

  
	useLayoutEffect(() => {
		const unsubscribe = onSnapshot(
			query(collection(db, "carts", auth.currentUser.phoneNumber, "items"), orderBy("timeStamp", "desc")),
			(snapshot) => {
				setItems(snapshot.docs)
			}
		)

		return unsubscribe;
	}, []);



	const CartItem = ({data, count, id}) => {


		const removeFromCart = async () => {
			await deleteDoc(doc(db, "carts", auth.currentUser.phoneNumber, "items", id));
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
						removeFromCart={removeFromCart}
					/>

					<Text style={tw`mx-3`}>{count}</Text>

					<AddButton add sign={"+"}/>
				</View>
			</View>
		)
	}

	
  return (
    <View style={tw`flex-1 bg-[#EBEBEB]`}>
		<SafeAreaView style={tw`flex-1`}>
			<Nav method={() => navigation.goBack()} title={"Cart"} />
			<ScrollView style={tw`flex-1 mt-2`}>

				{items.map((item, idx) => (

						<CartItem 
						id={item.id}
						key={idx}
						data={item.data()}
						/>
				))}
			</ScrollView>

		</SafeAreaView>
    </View>
  )
}

export default Cart