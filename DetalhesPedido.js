import { Text, StyleSheet, View, Modal } from 'react-native';
import {ScrollView,Pressable, Image,ImageBackground,Button} from 'react-native';
import { useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState,useEffect} from 'react';

const DetalhesPedido = ({navigation}) => {

const route = useRoute();
const { params } = route;

if (!params || !params.dados || !params.carro || !params.thumbnailLink || !params.dadoPagamento) {
  return null;
}

const { dados, carro, thumbnailLink, dadoPagamento } = params;
      
      const [dados2, setDados2] = useState(null);
      useEffect(() => {
        const getDados2 = async () => {
            try {
                const dadoPagamento = await AsyncStorage.getItem(route.params.dadoPagamento.id);
                if (dadoPagamento) {
                    setDados2(JSON.parse(dadoPagamento));
                }
            } catch (error) {
                console.error('Erro ao recuperar os dados salvos do AsyncStorage:', error);
            }
        };

        getDados2();
    }, []);


      const [dadosSalvos, setDadosSalvos] = useState(null);
      useEffect(() => {
        const getDadosSalvos = async () => {
            try {
                const dados = await AsyncStorage.getItem(route.params.dados.id);
                if (dados) {
                    setDadosSalvos(JSON.parse(dados));
                }
            } catch (error) {
                console.error('Erro ao recuperar os dados salvos do AsyncStorage:', error);
            }
        };

        getDadosSalvos();
    }, []);

const [modalVisible, setModalVisible] = useState(false);
 
const abrirModal = () => {
    setModalVisible(true);
  };

  const fecharModal = () => {
    setModalVisible(false);
  };

  const confirmarCancelamento = () => {
    navigation.navigate('CompraCancelada', { dados, carro, thumbnailLink, dadoPagamento });
    setModalVisible(false);
  };


  return (
    <View style={Estilos.container}>
     <ImageBackground source={require("./Imagens/FundoEletroDrive.jpg")}  resizeMode="cover"  style={Estilos.appImage} imageStyle={{opacity: 0.2}}>
      <View style={Estilos.personagemContainer}>
          <Image style={Estilos.tinyLogo} source={{ uri: thumbnailLink }} />
          <Pressable onPress={() => navigation.navigate("MenuCarros")}>
              <Image style={Estilos.iconeVoltar} resizeMode="contain" source={require("./Imagens/circulo-de-flecha.png")}/>
              </Pressable>
          <Text style={Estilos.paragraph}>{carro.name}</Text>
          
        </View>
              
              {dadosSalvos &&(
                <>
                
                <View style={Estilos.fundo}>
                    <Text style={Estilos.loginLabel2}>Custo do Aluguel: R${dadosSalvos.custo}.00</Text>
                    <Text style={Estilos.loginLabel}>Cobertura Total: R$30.00</Text>
                    <Text style={Estilos.loginLabel2}>Total a pagar: R${(dadosSalvos.custo)+30}.00</Text>
              {dados2 &&(
                <>
                    <Text style={Estilos.loginLabel2}>Metodo de Pagamento: {dados2.pagamento}</Text>
                </>          
            )}
                    <Text style={Estilos.loginLabel2}>Data de Retirada: {dadosSalvos.dataRetirada}</Text>
                    <Text style={Estilos.loginLabel}>Duração do Aluguel: {dadosSalvos.dias} dias</Text>
                     <Text style={Estilos.loginLabel2}>Local de Retirada/Devolução: {dadosSalvos.local}</Text>
                    <Text style={Estilos.loginLabel2}>Horário de Retirada: {dadosSalvos.horaRetirada}:00</Text>
                    <Text style={Estilos.loginLabel}>Horário de Entrega: {dadosSalvos.horaEntrega}:00</Text>
                    
                    </View>
                </>
            )}
              
         <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={fecharModal}>
          <View style={Estilos.modalContainer}>
            <View style={Estilos.modalConteudo}>
              <Text style={Estilos.loginLabel}>Deseja cancelar o pedido?</Text>
              <View style={Estilos.flexItem2}>
                <Pressable
                  style={({ pressed }) => [
                    { backgroundColor: pressed ? '#37D76D' : '#37D76D', borderRadius: 10, opacity: pressed ? 0.5 : 1 },Estilos.pressableButton,]}
                  onPress={confirmarCancelamento}>
                  <Text style={Estilos.buttonText}> Sim </Text>
                </Pressable>
                <Pressable
                  style={({ pressed }) => [
                    { backgroundColor: pressed ? '#FF1C1C' : '#FF1C1C', borderRadius: 10, opacity: pressed ? 0.5 : 1 },Estilos.pressableButton,]}
                  onPress={fecharModal}>
                  <Text style={Estilos.buttonText}> Não </Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>

    <Pressable
          style={({ pressed }) => [{ backgroundColor: pressed ? '#37D76D' : '#FF1C1C', opacity: pressed ? 0.5 : 1 }, Estilos.pressableButton]}
          onPress={abrirModal}>
          <Text style={Estilos.buttonText}>Cancelar Pedido</Text>
        </Pressable>

      </ImageBackground>
    </View>
  );
};

const Estilos = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#2c3e50',
  },
   pressableButton:{
    marginTop: 50,
    marginHorizontal: 45,
    height: 46,
    borderRadius: 10
  },
  buttonText:{
    color: 'white',
    fontSize: 25,
    marginTop: 8,
    marginLeft: 5,
    alignSelf: 'center',
    fontWeight: 'medium',
    fontFamily: "julius-sans-one.ttf"
  },
  paragraph: {
    padding: 10,
    fontSize: 20,
    height: 40,
    marginTop: -10,
    color: 'white',
    fontWeight: 'medium',
    textAlign: 'center',
    backgroundColor: '#2BB45A',
  },
  appImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: 'black',
  },
  
  tinyLogo: {
    width: '100%',
    height: 200,
    alignSelf: 'center',
  },
  flexItem2: {
    flexDirection: 'row',
    marginTop: 8
  },
  loginLabel2: {
        color: 'white',
        marginTop: 40,
        marginLeft: 7,
        fontSize: 20,
        fontWeight: 'regular'
    },
    fundo: {
      alignSelf: 'center',
    },
    modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  loginLabel: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'regular',
        marginLeft: 7,
    },
  modalConteudo: {
    width: 290,
    height: 160,
    backgroundColor: '#787878',
    borderRadius: 10,
    alignItems: 'center',
  },
  iconeVoltar: {
    marginBottom: -30,
    width: 32,
    height: 32,
  },
});

export default DetalhesPedido;