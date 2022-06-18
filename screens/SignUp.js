import {
	View,
	Text,
	TouchableOpacity,
	SafeAreaView,
	KeyboardAvoidingView,
	Alert,
	Platform,
	Keyboard,
	TouchableWithoutFeedback,
} from "react-native";
import React, { useRef, useState } from "react";
import tw from "twrnc";
import { Feather } from "@expo/vector-icons";
import { Avatar, Input } from "@rneui/themed";
import { Button } from "@rneui/base";
import {
	PhoneAuthProvider,
} from "firebase/auth";
import app, { auth } from "../firebase";
import {
	FirebaseRecaptchaVerifierModal,
	FirebaseRecaptchaBanner,
} from "expo-firebase-recaptcha";
import { useRecoilState } from "recoil";
import { globalPhoneNumber, verificationIDAtom } from "../atoms/verificationAtoms";
import { CommonActions } from '@react-navigation/native';


const SignUp = ({ navigation }) => {
	const [phone, setPhone] = useState("");
	const [phonePrefix, setPhonePrefix] = useState("");
	const [phoneNumber, setPhoneNumber] = useRecoilState(globalPhoneNumber);
	const [verificationId, setVerificationId] =
		useRecoilState(verificationIDAtom);
	const [message, showMessage] = useState("");
	const [loading, setLoading] = useState(false);
	const recaptchaVerifier = useRef(null);

	if (!app || Platform.OS === "web") {
		throw new Error(
			"This example only works on Android or iOS, and requires a valid Firebase config."
		);
	}

	const SendCode = async () => {
		setLoading(true)

		if(phone && phonePrefix){
			// console.log(phoneNumber);
			
			Keyboard.dismiss();
			try {
				setPhoneNumber(phonePrefix.concat(phone))
				const phoneProvider = new PhoneAuthProvider(auth);
				const verificationId = await phoneProvider.verifyPhoneNumber(
					phoneNumber,
					recaptchaVerifier.current
				);
				setVerificationId(verificationId);

				navigation.dispatch(
					CommonActions.reset({
					  index: 1,
					  routes: [
						{ name: 'Verify' },
					  ],
					})
				  );

			} catch (err) {
				alert(err.message)
			}
		}
		
		setLoading(false)
	};


	return (
		<KeyboardAvoidingView
			behavior="padding"
			style={tw`flex-1 bg-[#EBF8EE] px-6 pt-12`}
		>
			<SafeAreaView style={tw`flex-1`}>
				<FirebaseRecaptchaVerifierModal
					ref={recaptchaVerifier}
					firebaseConfig={app.options}
					attemptInvisibleVerification={true}
				/>
				<TouchableOpacity
					activeOpacity={0.5}
					onPress={() => navigation.goBack()}
				>
					<View
						style={tw`border w-[2.5rem] h-[2.5rem] mt-2 rounded-100 border-gray-200 items-center justify-center`}
					>
						<Feather name="chevron-left" size={25} style={tw`text-gray-500`} />
					</View>
				</TouchableOpacity>

					<TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
				<View style={tw`mt-8 items-center flex-1`}>
					<Avatar
						rounded
						size={70}
						source={{
							uri: "https://www.pngkey.com/png/full/115-1150152_default-profile-picture-avatar-png-green.png",
						}}
						containerStyle={tw`shadow-lg mb-6`}
					/>
					<Text style={tw`font-500 text-center text-gray-700 text-[2rem]`}>
						Enter your mobile number
					</Text>
					<Text style={tw`my-6 text-[1rem] text-gray-500`}>
						We will send you a verification code
					</Text>


				<View style={tw`w-[100%] flex-row items-center justify-center`}>
				<Input 
								containerStyle={tw`w-[4.5rem] `}
								keyboardType={"phone-pad"}
								placeholder="+1"
								inputContainerStyle={tw`border-b-0 border-r border-gray-300`}
								inputStyle={tw`font-bold`}
								onChangeText={(prefix) => setPhonePrefix(prefix) }
								value={phonePrefix}
							/>
					<Input
						containerStyle={tw`w-[12rem]`}
						inputContainerStyle={tw`border-b-0 text-center`}
						placeholder={"(000) 000-00-00"}
						autoComplete="tel"
						keyboardType="phone-pad"
						textContentType="telephoneNumber"
						onChangeText={(phoneNumber) => setPhone(phoneNumber)}
						value={phone}
						/>
				</View>

					<Button
						title={"Continue"}
						buttonStyle={tw`rounded-100 py-3 w-[20rem] mt-4 bg-[#6EBD6A]`}
						testID="signUp"
						disabled={!phone}
						onPress={SendCode}
						loading={loading}
					/>

					<Text style={tw`text-center text-[1rem] text-gray-500 mt-4`}>
						By clicking on "Continue", you are agreeing to our{" "}
						<Text style={tw`text-sky-600 font-700 underline`}>
							terms of use
						</Text>
					</Text>

					<View style={tw`mb-[5rem]`}></View>
				</View>
						</TouchableWithoutFeedback>
			</SafeAreaView>
		</KeyboardAvoidingView>
	);
};

export default SignUp;
