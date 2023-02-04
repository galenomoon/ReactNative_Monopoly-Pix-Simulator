import { View, Text, TouchableOpacity as TO, Modal as MO, TextInput } from 'react-native'
import React from 'react'

//styles
import tw from 'twrnc'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function Modal({ visible, type, close, onConfirm = () => { }, current_wallet_value, credit_limit, setCreditLimit, showConfetti }) {
  const [value, setValue] = React.useState(0)
  const input_ref = React.useRef(null)
  const [final_value, setFinalValue] = React.useState(0)

  React.useEffect(() => {
    if (visible) {
      setValue(0)
      input_ref.current.focus()
    }
  }, [visible])

  React.useEffect(() => {
    if (type === 'payment') {
      setFinalValue(current_wallet_value - parseInt(value || 0))
    }
    if (type === 'receive') {
      setFinalValue(current_wallet_value + parseInt(value || 0))
    }
    if (type === 'limit_setting') {
      setFinalValue(parseInt(value || 0))
    }
  }, [value])

  return (
    <MO animationType="fade" transparent={true} visible={visible}>
      <View style={tw`bg-white w-full h-full relative items-center rounded-[16px] overflow-hidden p-3`}>
        <TO style={tw`absolute right-2 top-2 z-10 px-3 py-10`} onPress={() => close()}>
          <MaterialCommunityIcons name="close" color={'#777'} size={40} />
        </TO>
        <View style={tw`w-full h-full flex px-2 pt-[100px]`}>
          <Text style={tw`text-2xl font-semibold`}>
            {type === "limit_setting" ?
              'Qual será o novo limite de crédito (dívida)?' :
              <>
                Quanto será {type === 'payment' ? 'pago' : 'recebido'}?
              </>
            }
          </Text>
          <View style={tw`flex flex-row mt-6`}>
            <Text style={tw`text-5xl font-thin`}>R$ </Text>
            <TextInput
              ref={input_ref}
              onChangeText={text => type === "limit_setting" ? setCreditLimit(parseInt(text)) : setValue(text)}
              value={type === "limit_setting" ? `${credit_limit}` : value}
              style={tw`w-full text-5xl font-bold h-[58px]`}
              placeholder="00,00"
              maxLength={7}
              keyboardType='numeric'
            />
          </View>
          {type !== "limit_setting" ?
            <>
              <Text style={tw`text-xl font-bold ${parseFloat(value) ? final_value < 0 ? "text-red-500" : "text-green-500" : "text-gray-500"}`}>
                <Text style={tw`font-normal`}>Valor final:</Text> R$ {final_value},00
              </Text>
              <TO onPress={() => value ? [onConfirm(final_value), close(), showConfetti(type === 'receive')] : {}} style={tw`my-4 w-full h-[64px] ${parseFloat(value) ? type === 'payment' ? "bg-[#D42b15]" : "bg-[#34BE82]" : "bg-[#aaa]"} rounded-[8px] flex items-center justify-center `}>
                <Text style={tw`text-xl uppercase text-white font-semibold`}>Confirmar</Text>
              </TO>
              {
                final_value <= (credit_limit * (-1)) && type === 'payment' ?
                  <Text style={tw`text-3xl text-center text-red-500`}>
                    LIMITE ATINGIDO!
                  </Text>
                  : null
              }
            </>
            : null
          }
        </View>
      </View>
    </MO >
  )
}