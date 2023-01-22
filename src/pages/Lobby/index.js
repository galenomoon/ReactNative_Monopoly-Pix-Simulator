import { Image, TouchableOpacity as TO } from 'react-native'
import React from 'react'

import tw from 'twrnc'

import { LinearGradient } from 'expo-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function Lobby({ navigation }) {
  return (
    <LinearGradient colors={['#ff5555', '#eb1020', '#bc0616']} style={tw`flex items-center justify-center h-full w-full`} >
      <Image source={require('../../../assets/logo.png')} style={tw`w-[364px] h-32 mb-[32px] z-10`} />
      <Image source={require('../../../assets/moneys.png')} style={tw`absolute opacity-15 z-0`} />
      <TO onPress={() => navigation.navigate("Home")} style={tw`flex items-center justify-center rounded-full w-32 h-32 z-10`}>
        <LinearGradient colors={['#F3C969', '#F3C969aa']} style={tw`w-full rounded-full h-full flex items-center justify-center`} >
          <Ionicons name="play" size={90} color="white" style={tw`ml-3`} />
        </LinearGradient>
      </TO>
    </LinearGradient>
  )
}