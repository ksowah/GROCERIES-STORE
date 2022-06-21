import { View, Text, Platform, TouchableOpacity } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { Tab, TabView } from "@rneui/themed";
import { MaterialCommunityIcons, AntDesign, FontAwesome5, FontAwesome } from '@expo/vector-icons'; 
import tw from "twrnc"
import { useRecoilValue } from 'recoil';
import { cart } from '../atoms/verificationAtoms';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import Cart from '../screens/Cart';
import Profile from '../screens/Profile';
import Callendar from '../screens/Callendar';
import Applications from '../screens/Applications';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { auth, db } from '../firebase';

const Tabs = ({method}) => {

    const Tab = createBottomTabNavigator();

    const [item, setItem] = useState([])

  
	useLayoutEffect(() => {
		const unsubscribe = onSnapshot(
			query(collection(db, "carts", auth.currentUser.phoneNumber, "items"), orderBy("timeStamp", "asc")),
			(snapshot) => {
				setItem(snapshot.docs)
			}
			)

		return unsubscribe;
	}, []);

  return (

    <Tab.Navigator 
    screenOptions={{
        tabBarShowLabel: false, 
        headerShown: false,
        
      }}
    >
      <Tab.Screen name="Home" component={Home}
        options={{
            tabBarActiveTintColor: "black",
            tabBarIcon: ({color, size}) => (
                <MaterialCommunityIcons name="home-variant" size={size} color= {color}/>
            )
        }}
      />
      <Tab.Screen name="Apps" component={Applications} 
      options={{
        tabBarActiveTintColor: "black",
        tabBarIcon: ({color, size}) => (
            <AntDesign name="appstore1" size={size} color= {color}/>
        )
    }}
      />
      <Tab.Screen name="Cart" component={Cart} 
      options={{
        tabBarBadge: item.length,
        tabBarBadgeStyle: tw``,
        tabBarIcon: ({color, size}) => (
            <View style={tw`bg-[#009959 border-2 border-gray-100 rounded-100 w-13 h-13 items-center justify-center`}>
                <FontAwesome5 name="shopping-basket" size={size} style={tw`text-gray-100`}/>
            </View>
        )
    }}
      />
      <Tab.Screen name="Callendar" component={Callendar} 
        options={{
            tabBarActiveTintColor: "black",
            tabBarIcon: ({color, size}) => (
                <MaterialCommunityIcons name="calendar-text-outline" size={size} color= {color}/>
            )
        }}
      />
      <Tab.Screen name="Profile" component={Profile} 
        options={{
            tabBarActiveTintColor: "black",
            tabBarIcon: ({color, size}) => (
                <FontAwesome name="user" size={size} color= {color}/>
            )
        }}
      />
    </Tab.Navigator>
    // <View style={tw` h-10 items-center flex-row justify-between ${Platform.OS === "android"? "px-4" : "px-6"}`}>
    //     <TouchableOpacity activeOpacity={0.5} style={tw`items-center justify-center`}>
    //         <MaterialCommunityIcons name="home-variant" size={25} color={`${tab1 ? "black" : "gray"}`} onPress={() =>{ 
    //             setTab1(true)
    //             toggleTabs(tab1)
    //         }}/>
    //     </TouchableOpacity>
    //     <TouchableOpacity activeOpacity={0.5} style={tw`items-center justify-center`}>
    //     <AntDesign name="appstore1" size={24} color={`${tab2 ? "black" : "gray"}`} onPress={() =>{ 
    //             setTab2(true)
    //             toggleTabs(tab2)
    //         }}/>
    //     </TouchableOpacity>
    //     <TouchableOpacity onPress={method} activeOpacity={0.5} style={tw`relative items-center justify-center mb-6`}>
    //         <View style={tw`bg-[#009959] border-2 border-gray-100 rounded-100 w-13 h-13 items-center justify-center`}>
    //             <FontAwesome5 name="shopping-basket" size={24} style={tw`text-gray-100`} />
    //         </View>

    //         <View style={tw`absolute justify-center -bottom-3 shadow-2xl h-6 min-w-6 bg-red-500 border-2 border-white rounded-100`}>
    //                 <Text style={tw`text-gray-100 font-bold text-[0.8rem] text-center`}>3</Text>
    //         </View>

    //     </TouchableOpacity>
    //     <TouchableOpacity activeOpacity={0.5} style={tw`items-center justify-center`}>
    //     <MaterialCommunityIcons name="calendar-text-outline" size={24} color={`${tab4 ? "black" : "gray"}`} />
    //     </TouchableOpacity>
    //     <TouchableOpacity activeOpacity={0.5} style={tw`items-center justify-center`}>
    //     <FontAwesome name="user" size={24} color={`${tab5 ? "black" : "gray"}`} />
    //     </TouchableOpacity>

    // </View>
  )
}

export default Tabs