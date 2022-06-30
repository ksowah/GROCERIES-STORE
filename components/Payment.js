import { View, Text, Alert } from "react-native";
import React, { useState } from "react";
import { Button } from "@rneui/base";
import { useStripe } from "@stripe/stripe-react-native";
import tw from "twrnc"

const Payment = () => {
	const [name, setName] = useState("");
	const stripe = useStripe();

    const subscribe = async () => {
        try{
            // send request
            const res = await fetch("http://localhost:8080/pay", {
                method: "POST",
                body: JSON.stringify({name: "kelvin"}),
                headers: {
                    'Accept': 'application/json',
                    "Content-Type": "application/json"
                }
            })
            const data = await res.text()
            if(!res.ok) return Alert.alert(data.message)
            const clientSecret = data.clientSecret
            const initSheet = await stripe.initPaymentSheet({
                paymentIntentClientSecret: clientSecret
            })
            if(initSheet.error) return Alert.alert(initSheet.error.message)
            const presentSheet = await stripe.presentPaymentSheet({
                clientSecret
            })
            if(presentSheet.error) return Alert.alert(presentSheet.error.message)
            Alert.alert("Payment Complete")
        }catch(err){
            console.error(err)
            Alert.alert("Something went wrong, try again later")
        }
    }

	return (
		<View>
			<Button
				title={"Checkout"}
				buttonStyle={tw`bg-[#23AA49] rounded-100 py-[1rem] mx-6`}
				containerStyle={tw`my-6`}
				titleStyle={tw`text-[1rem] text-gray-100`}
                onPress={subscribe}
			/>
		</View>
	);
};

export default Payment;
