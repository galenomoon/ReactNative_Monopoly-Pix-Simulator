import { Image, Text, View, TouchableOpacity as TO, Alert } from 'react-native'
import React from 'react'

//styles
import tw from 'twrnc'
import { CountUp } from 'use-count-up'
import { LinearGradient } from 'expo-linear-gradient';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ConfettiCannon from 'react-native-confetti-cannon';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

//components
import Modal from '../../components/Modal'

//utils
import avatars from '../../utils/characters';

export default function Home() {
  const [modalVisible, setModalVisible] = React.useState({ visible: false, type: '' })
  const [showCurrentDebit, setShowCurrentDebit] = React.useState(true)
  const [credit_limit, setCreditLimit] = React.useState(1500)
  const [showAvatars, setShowAvatars] = React.useState(false)
  const [avatar_index, setAvatarIndex] = React.useState(0)
  const [debit, setDebit] = React.useState(1500)
  const confetti = React.useRef(null)

  function resetGame() {
    return Alert.alert('Iniciar nova partida?', 'Todos os dados serão perdidos e retornaram ao seu valor inicial', [
      {
        text: 'Cancel',
        onPress: () => { },
        style: 'cancel',
      },
      {
        text: 'OK', onPress: () => {
          setModalVisible({ type: '', visible: false })
          setDebit(1500)
        }
      },
    ]);
  }

  function showConfetti(has_been_received) {
    if (has_been_received) {
      confetti.current.start()
    }
  }

  function receive200() {
    setDebit(debit + 200)
    showConfetti(true)
  }

  function currencyValue(value) {
    return showCurrentDebit ? <><CountUp isCounting={true} end={value} duration={3} />,00</> : '------'
  }

  return (
    <LinearGradient colors={['#ff5555', '#eb1020', '#bc0616']} style={tw`flex items-center h-full w-full relative`} >
      <ConfettiCannon ref={confetti} autoStart={false} fadeOut={true} count={150} origin={{ x: 50, y: -10 }} />
      <Image source={require('../../../assets/moneys.png')} style={tw`absolute top-[85px] opacity-15 z-0`} />
      <View style={tw`h-[30%] w-full flex flex-row items-center justify-center`}>
        <TO onPress={() => setShowAvatars(!showAvatars)} style={tw`absolute top-12 right-5 rounded-full h-[48px] w-[48px] flex items-center justify-center bg-[#fff]`} >
          <FontAwesome5 name={showAvatars ? "user-alt" : "user-alt-slash"} size={26} color="#bc0616" />
        </TO>
        <TO onPress={() => resetGame()} style={tw`absolute top-12 left-4 h-[48px] w-[48px] flex items-center justify-center `}>
          <Ionicons name="ios-reload" size={32} color="#fff" />
        </TO>
        {showAvatars
          ?
          <View style={tw`flex flex-row items-center justify-center h-full`}>
            <TO onPress={() => setAvatarIndex(avatar_index - 1)}>
              <Ionicons name='chevron-back' size={64} color='#fff' />
            </TO>
            <Image source={avatars[avatar_index]} style={tw`w-[150px] h-[150px] z-10 mx-6 rounded-full`} />
            <TO onPress={() => setAvatarIndex(avatar_index + 1)}>
              <Ionicons name='chevron-forward' size={64} color='#fff' />
            </TO>
          </View>
          :
          <Image source={require('../../../assets/logo.png')} style={tw`w-[320px] h-28 z-10`} />
        }
      </View>
      <View style={tw`w-[95%] bg-[#fff] rounded-[24px] p-8 relative`}>
        <TO onPress={() => resetGame()} style={tw`absolute top-4 right-4`}>
          <MaterialIcons name="history" size={32} color="#00000066" />
        </TO>
        <View style={tw`flex mb-[22px]`}>
          <Text style={tw`text-2xl font-semibold`}>Conta</Text>
          <View style={tw`flex flex-row items-center justify-between`}>
            <Text style={tw`text-2xl font-semibold mt-[12px]`}>R$ {currencyValue(debit > 0 ? debit : 0)} </Text>
            <TO onPress={() => setShowCurrentDebit(!showCurrentDebit)}>
              <Feather name={showCurrentDebit ? "eye" : "eye-off"} size={26} color="#000" />
            </TO>
          </View>
        </View>
        <View style={tw`flex w-full items-center justify-center  border-b-[2px] border-[#ddd]  pb-[16px]`}>
          <View style={tw`flex w-full flex-row justify-between items-center pb-[16px]`}>
            <TO onPress={() => setModalVisible({ visible: true, type: 'payment' })} style={tw`rounded-xl flex flex-row-reverse w-[48%] border-[#D42B15] border-[3px] h-[72px] items-center justify-center bg-[#F9C7C1]`}>
              <MaterialIcons name="trending-down" color="#D42B15" size={32} />
              <Text style={tw`mx-1 text-[22px] font-extrabold text-[#D42B15]`}>
                PAGAR
              </Text>
            </TO>
            <TO onPress={() => setModalVisible({ visible: true, type: 'receive' })} style={tw`rounded-xl w-[48%] flex flex-row-reverse border-[#34BE82] border-[3px] h-[72px] items-center justify-center bg-[#E1F7ED]`}>
              <MaterialIcons name="trending-up" color="#34BE82" size={32} />
              <Text style={tw`mx-1 text-[22px] font-extrabold text-[#34BE82]`}>
                RECEBER
              </Text>
            </TO>
          </View>
          <TO onPress={() => receive200()} style={tw`rounded-xl w-full flex flex-row border-[#34BE82] border-[3px] h-[72px] items-center justify-center bg-[#E1F7ED]`}>
            <MaterialIcons name="attach-money" color="#34BE82" size={32} />
            <Text style={tw`text-2xl font-extrabold text-[#34BE82]`}>
              RECEBA: R$200,00!
            </Text>
          </TO>
        </View>
        <View style={tw`flex my-[22px]`}>
          <View style={tw`flex flex-row items-center justify-between`}>
            <Text style={tw`text-2xl font-semibold`}>Dívida com o Banco</Text>
            <TO onPress={() => setModalVisible({ visible: true, type: 'limit_setting' })}>
              <MaterialCommunityIcons name="credit-card-edit" size={32} color="#000" />
            </TO>
          </View>
          <View style={tw`mt-[12px]`}>
            <Text style={tw`text-lg font-semibold text-black/40`}>Atualmente devendo:</Text>
            <Text style={tw`text-2xl font-semibold mt-1`}>R$ {showCurrentDebit ? (debit < 0 ? debit.toFixed(2) : '00,00') : '----'}</Text>
            <View style={tw`flex flex-row items-center`}>
              <Text style={tw`text-lg font-semibold text-black/40 mt-1`}>Limite disponível de</Text>
              <TO onPress={() => setModalVisible({ visible: true, type: 'limit_setting' })}>
                <Text style={tw`text-lg text-[#D42b15] font-extrabold`}> R$ {credit_limit}</Text>
              </TO>
            </View>
          </View>
        </View>
      </View>
      <Modal
        current_wallet_value={debit}
        type={modalVisible.type}
        close={() => setModalVisible({ ...modalVisible, visible: false })}
        visible={modalVisible.visible}
        credit_limit={credit_limit}
        showConfetti={showConfetti}
        setCreditLimit={(value) => setCreditLimit(value)}
        onConfirm={(value) => setDebit(value)}
      />
    </LinearGradient>
  )
}