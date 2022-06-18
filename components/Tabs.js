import { View, Text } from 'react-native'
import React from 'react'
import { Tab } from "@rneui/themed";
import { MaterialCommunityIcons, AntDesign, FontAwesome5, FontAwesome } from '@expo/vector-icons'; 
import tw from "twrnc"

const Tabs = () => {
  return (
    <View>
        <Tab 
            // value={}
            variant='default'
            indicatorStyle={tw`bg-black h-3`}
        >
            <Tab.Item
                icon={<MaterialCommunityIcons name="home-variant" size={25} color="black" />}
            />
            <Tab.Item
                icon={<AntDesign name="appstore1" size={24} style={tw`text-gray-400`} />}
            />
            <Tab.Item
                touchSoundDisabled={false}
                icon={<FontAwesome5 name="shopping-basket" size={24} style={tw`text-gray-100`} />}
                style={tw`bg-[#009959] relative border-2 border-gray-100 rounded-100 w-13 h-13 items-center justify-center`}
                containerStyle={tw`-mt-9 items-center`}
            >
                <View style={tw`absolute justify-center -bottom-6 shadow-2xl h-7 w-7 bg-red-500 border-2 border-white rounded-100`}>
                    <Text style={tw`text-gray-100 font-bold text-[0.9rem] text-center`}>14</Text>
                </View>
            </Tab.Item>
            <Tab.Item
                icon={<MaterialCommunityIcons name="calendar-text-outline" size={24} style={tw`text-gray-400`} />}
            />
            <Tab.Item
                icon={<FontAwesome name="user" size={24} style={tw`text-gray-400`} />}
            />

        </Tab>
    </View>
  )
}

export default Tabs