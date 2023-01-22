import { View, Text, TouchableOpacity as TO, Modal as MO, TextInput } from 'react-native'
import React from 'react'

import tw from 'twrnc'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function Modal({ visible, type, close, onConfirm = () => { }, current_wallet_value, credit_limit }) {
  const [value, setValue] = React.useState(0)
  const input_ref = React.useRef(null)

  React.useEffect(() => {
    if (visible) {
      input_ref.current.focus()
    }
  }, [visible])

  return (
    <MO animationType="fade" transparent={true} visible={visible}>
      <View style={tw`bg-white w-full h-full relative items-center rounded-[16px] overflow-hidden p-3`}>
        <TO style={tw`absolute right-2 top-2 z-10 px-3 py-10`} onPress={() => close()}>
          <MaterialCommunityIcons name="close" color={'#777'} size={40} />
        </TO>
        <View style={tw`w-full h-full flex px-2 pt-[100px]`}>
          <Text style={tw`text-2xl font-semibold`}>Quanto será {type === 'payment' ? 'pago' : 'recebido'}?</Text>
          <View style={tw`flex flex-row mt-6`}>
            <Text style={tw`text-5xl font-thin`}>R$ </Text>
            <TextInput
              ref={input_ref}
              onChangeText={text => setValue(text)}
              value={value}
              style={tw`w-full text-5xl font-bold h-[58px]`}
              placeholder="00,00"
              maxLength={7}
              keyboardType='numeric'
            />
          </View>
          <Text style={tw`text-xl font-semibold ${parseFloat(value) ? (credit_limit < parseInt(value || 0) && type === 'payment' ? "text-red-500" : "text-green-500") : "text-gray-500"}`}>
            Valor final: R$ {type === 'payment' ? (current_wallet_value - parseInt(value || 0)) : (current_wallet_value + parseInt(value || 0))},00
          </Text>
          <TO onPress={onConfirm} style={tw`my-4 w-full h-[64px] ${parseFloat(value) ? type === 'payment' ? "bg-[#D42b15]" : "bg-[#34BE82]" : "bg-[#aaa]"} rounded-[8px] flex items-center justify-center `}>
            <Text style={tw`text-xl uppercase text-white font-semibold`}>Confirmar</Text>
          </TO>
        </View>
      </View>
    </MO>
  )
}