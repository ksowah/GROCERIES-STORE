import { View, Text, KeyboardAvoidingView, SafeAreaView } from "react-native";
import React, { useState } from "react";
import tw from "twrnc";
import { Input } from "@rneui/themed";
import { Button } from "@rneui/base";
import { FirebaseRecaptchaBanner } from "expo-firebase-recaptcha";
import { PhoneAuthProvider, signInWithCredential } from "firebase/auth";
import { auth } from "../firebase";
import { useRecoilValue } from "recoil";
import { globalPhoneNumber, verificationIDAtom } from "../atoms/verificationAtoms";

const VerifyCode = ({navigation}) => {

    const attemptInvisibleVerification = false;
    const verificationId = useRecoilValue(verificationIDAtom)
    const phoneNumber = useRecoilValue(globalPhoneNumber)
    const [verificationCode, setVerificationCode] = useState(null);

    const verifyUser = async () => {
        try {
            const credential = PhoneAuthProvider.credential(
              verificationId,
              verificationCode
            );
            await signInWithCredential(auth, credential);
            console.log(credential)
            navigation.replace("ProfileUpdate")
          } catch (err) {
            console.log(err.message)
          }
    }

	return (
		<KeyboardAvoidingView behavior="padding" style={tw`flex-1 p-8`}>
			<SafeAreaView style={tw`items-center`}>
				<Text style={tw`font-700 text-xl my-6 text-[#009959]`}>
					Verify {phoneNumber}
				</Text>
				<Text style={tw`text-center text-[1rem] text-gray-500`}>
					Waiting to automatically detect an SMS sent to {phoneNumber}
				</Text>

				<View style={tw`mt-12`}>
					<Text style={tw`text-lg text-gray-600 text-center`}>
						Enter 6-digit code
					</Text>
					<Input
						keyboardType="numeric"
                        inputStyle={tw`text-center`}
						containerStyle={tw`w-[10rem]`}
						textContentType="oneTimeCode"
                        editable={!!verificationId}
                        onChangeText={setVerificationCode}
					/>
				</View>

				<Button
					title="Verify"
					buttonStyle={tw`rounded-100 py-3 w-[12rem] mt-2 bg-[#6EBD6A]`}
					titleStyle={tw`text-[1rem]`}
                    disabled={!verificationId}
                    onPress={verifyUser}
				/>

                {attemptInvisibleVerification && <FirebaseRecaptchaBanner />}
			</SafeAreaView>
		</KeyboardAvoidingView>
	);
};

export default VerifyCode;
