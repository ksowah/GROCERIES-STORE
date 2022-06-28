import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { Text, View } from "react-native";
import { Image } from "react-native";
import { auth, db } from "../firebase";
import AddButton from "./AddButton";
import tw from "twrnc"
import { useEffect, useState } from "react";



const CartItem = ({data, id, method}) => {

    const [items, setItems] = useState([])

    useEffect(() => {

        // setItems(item => [...item, (data?.productQuantity * data?.price)])
        // console.log(items);



    }, [data])

    const getTotal = () => {
        
    }
	

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

export default CartItem
