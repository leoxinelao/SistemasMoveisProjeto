import React, {useState,useEffect} from 'react';
import { View, Text, StyleSheet, Pressable,Image,Modal, ImageBackground } from 'react-native';
import { useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CompraCancelada = ({ navigation }) => {
 const route = useRoute();
 const { params } = route;

 if (!params || !params.dados || !params.carro || !params.thumbnailLink || !params.dadoPagamento) {
  return null;
 }

 const { dados, carro, thumbnailLink, dadoPagamento} = params;
      
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

 const [dados2, setDados2] = useState(null);
      useEffect(() => {
        const getDados2 = async () => {
            try {
                const dadoPagamento = await AsyncStorage.getItem(route.params.dadoPagamento.id);
                if (dadoPagamento) {
                    setDadoPagamento(JSON.parse(dadoPagamento));
                }
            } catch (error) {
                console.error('Erro ao recuperar os dados salvos do AsyncStorage:', error);
            }
        };

        getDados2();
    }, []);

 const [modalVisible, setModalVisible] = useState(false);
 
 const abrirModal = () => {
    setModalVisible(true);
  };

 const fecharModal = () => {
    setModalVisible(false);
  };

  return (
    <View style={Estilos.container}>
      <ImageBackground
        source={require("./Imagens/FundoEletroDrive.jpg")}
        resizeMode="cover"
        style={Estilos.appImage}
        imageStyle={{ opacity: 0.2 }}
      >

        <View style={Estilos.flexItem}>
  <Pressable onPress={() => navigation.navigate("MenuCarros")}>
    <Image style={Estilos.icone2} resizeMode="contain" source={require("./Imagens/circulo-de-flecha.png")} />
  </Pressable>
        <Text style={Estilos.loginLabelTitulo}>Minhas Compras</Text>
      </View>
        <Pressable onPress={abrirModal}>
          {dadosSalvos && (
             <>
          <View style={Estilos.fundo}>    
            <Text style={Estilos.textoCompra}>Compra Cancelada</Text>    
            <Text style={Estilos.dataCompra}>{dadosSalvos.dataRetirada}</Text>
            <View style={Estilos.flexItem}>
            <Image style={Estilos.icone} resizeMode="contain" source={{ uri: thumbnailLink }} />
            <Text style={Estilos.loginLabel}>{carro.name}{'\n'}<Text style={Estilos.textoStatus}>Cancelado</Text></Text>
            </View>
            <Text style={Estilos.detalhes}>Detalhes do Pedido</Text>
          </View>
          </>
            )}
        </Pressable>

      <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={fecharModal}>
          <View style={Estilos.modalContainer}>
            <View style={Estilos.modalConteudo}>
              <Text style={Estilos.loginLabel}>Esse Pedido Foi Cancelado!</Text>
              <View style={Estilos.flexItem2}>
                <Pressable
                  style={({ pressed }) => [
                    { backgroundColor: pressed ? '#1CE4FF' : '#1CE4FF', borderRadius: 10, opacity: pressed ? 0.5 : 1 },Estilos.pressableButton,]}
                  onPress={fecharModal}>
                  <Text style={Estilos.buttonText}> OK </Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>

      </ImageBackground>
    </View>
  );
};

const Estilos = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#202020',
  },
  fundo: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    width: 304,
    height: 200,
    alignSelf: 'center',
    marginTop: 85,
    borderRadius: 20,
  },
  loginLabelTitulo: {
    color: 'white',
    marginTop: 40,
    marginLeft: 10,
    fontSize: 30,
    fontWeight: 'regular',
    textAlign: 'center',
  },
  loginLabel: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'regular',
    marginTop: 10,
    marginLeft: 5
  },
  textoStatus: {
    color: 'red',
    fontSize: 18,
    fontWeight: 'regular',
    marginTop: 10,
  },
  textoCompra: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'regular',
    alignSelf: 'center',
    marginTop: 10,
  },
  dataCompra: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'regular',
    marginTop: 10,
    marginLeft: 20,
  },
  detalhes: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'regular',
    alignSelf: 'center',
    marginTop: 2,
    marginLeft: 15,
    marginBottom: 5
  },
  flexItem: {
    flexDirection: 'row',
  },
  appImage: {
    width: '100%',
    height: '100%',
    flex: 1,
    backgroundColor: 'black',
  },
  icone: {
    width: 130,
    height: 77,
    marginTop: 15,
    marginLeft: 15,
    borderRadius: 10
  },
  icone2: {
    marginTop: 40,
    marginLeft: 20,
    width: 32,
    height: 32,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalConteudo: {
    width: 290,
    height: 160,
    backgroundColor: '#787878',
    borderRadius: 10,
    alignItems: 'center',
  },
  flexItem2: {
    flexDirection: 'row',
    marginTop: 8
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
  pressableButton:{
    marginTop: 50,
    marginHorizontal: 45,
    height: 46,
    borderRadius: 10
  },
});

export default CompraCancelada;