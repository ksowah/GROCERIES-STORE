import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Hello from "./screens/Hello"
import { NavigationContainer } from "@react-navigation/native";
import GetStarted from './screens/GetStarted';
import SignUp from './screens/SignUp';
import Home from "./screens/Home"
import VerifyCode from './screens/VerifyCode';
import { RecoilRoot } from 'recoil';
import UpdateProfile from './screens/UpdateProfile';


const Stack = createNativeStackNavigator();


export default function App() {
  return (
    <RecoilRoot>
    <NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen options={{headerShown: false}} name="ProfileUpdate" component={UpdateProfile} />
				<Stack.Screen options={{headerShown: false}} name="Hello" component={Hello} />
				<Stack.Screen options={{headerShown: false}} name="Start" component={GetStarted} />
				<Stack.Screen options={{headerShown: false}} name="SignUp" component={SignUp} />
				<Stack.Screen options={{headerShown: false}} name="Verify" component={VerifyCode} />
				<Stack.Screen options={{headerShown: false}} name="Home" component={Home} />
			</Stack.Navigator>
		</NavigationContainer>
    </RecoilRoot>
  );
}
