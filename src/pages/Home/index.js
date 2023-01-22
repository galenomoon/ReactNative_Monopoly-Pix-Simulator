import { Image, Text, View, TouchableOpacity as TO } from 'react-native'
import React from 'react'

import tw from 'twrnc'
import { LinearGradient } from 'expo-linear-gradient';
import Modal from '../../components/Modal'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import boat from '../../../assets/characters/boat.png'
import car from '../../../assets/characters/car.jpeg'
import cat from '../../../assets/characters/cat.jpg'
import dog from '../../../assets/characters/dog.jpg'
import dino from '../../../assets/characters/dino.jpg'
import hat from '../../../assets/characters/hat.jpg'
import penguin from '../../../assets/characters/penguin.jpg'
import duck from '../../../assets/characters/duck.jpg'

export default function Home({ navigation }) {
  const [credit, setCredit] = React.useState(0)
  const [credit_limit, setCreditLimit] = React.useState(1500)
  const [debit, setDebit] = React.useState(1500)
  const [modalVisible, setModalVisible] = React.useState({ visible: false, type: '' })

  return (
    <LinearGradient colors={['#ff5555', '#eb1020', '#bc0616']} style={tw`flex items-center h-full w-full relative`} >
      <Image source={require('../../../assets/moneys.png')} style={tw`absolute top-[85px] opacity-15 z-0`} />
      <View style={tw`h-[30%] w-full flex items-center justify-center`}>
        <Image source={require('../../../assets/logo.png')} style={tw`w-[320px] h-28 z-10`} />
      </View>
      <View style={tw`w-[95%] bg-[#fff] rounded-[24px] p-8`}>
        <View style={tw`flex mb-[22px]`}>
          <Text style={tw`text-2xl font-semibold`}>Conta</Text>
          <Text style={tw`text-2xl font-semibold mt-[12px]`}>R$ {debit.toFixed(2)}</Text>
        </View>
        <View style={tw`flex w-full justify-between items-center pb-[32px] border-b-[2px] border-[#ddd]`}>
          <TO onPress={() => setModalVisible({ visible: true, type: 'payment' })} style={tw`rounded-xl mb-2 flex flex-row w-full border-[#D42B15] border-[3px] h-[72px] items-center justify-center bg-[#F9C7C1]`}>
            <MaterialIcons name="money-off" color="#D42B15" size={32} />
            <Text style={tw`text-2xl font-extrabold text-[#D42B15]`}>
              PAGAR
            </Text>
          </TO>
          <TO onPress={() => setModalVisible({ visible: true, type: 'receive' })} style={tw`rounded-xl w-full flex flex-row border-[#34BE82] border-[3px] h-[72px] items-center justify-center bg-[#E1F7ED]`}>
            <MaterialIcons name="attach-money" color="#34BE82" size={32} />
            <Text style={tw`text-2xl font-extrabold text-[#34BE82]`}>
              RECEBER
            </Text>
          </TO>
        </View>
        <View style={tw`flex my-[22px]`}>
          <Text style={tw`text-2xl font-semibold`}>Dívida com o Banco</Text>
          <View style={tw`mt-[12px]`}>
            <Text style={tw`text-lg font-semibold text-black/40`}>Atualmente devendo:</Text>
            <Text style={tw`text-2xl font-semibold mt-1`}>R$ {credit.toFixed(2)}</Text>
            <Text style={tw`text-lg font-semibold text-black/40 mt-1`}>Limite disponível de
              <Text style={tw`text-[#D42b15] font-extrabold`}> R${credit_limit.toFixed(2)}</Text>
            </Text>
          </View>
        </View>
      </View>
      <Modal
        current_wallet_value={debit - credit}
        type={modalVisible.type}
        close={() => setModalVisible({ ...modalVisible, visible: false })}
        visible={modalVisible.visible}
        credit_limit={credit_limit}
      />
    </LinearGradient>
  )
}