import React, {useState,useEffect} from 'react';
import {Text, View, StyleSheet,Button, Pressable, Image, ImageBackground} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRoute } from '@react-navigation/native';


const Resumo = ({ navigation}) => {
      
const route = useRoute();
const { params } = route;

if (!params || !params.dados || !params.carro || !params.thumbnailLink) {
  return null;
}

const { dados, carro, thumbnailLink } = params;
      
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


    return (
        <View style={Estilos.container}>
            <ImageBackground source={require("./Imagens/FundoEletroDrive.jpg")}
                     resizeMode="cover" style={Estilos.appImage} imageStyle={{opacity: 0.2}}>
                    
                    <View style={Estilos.flexItem}>
              <Pressable onPress={() => navigation.navigate("Agendamento", { dados, carro, thumbnailLink})}>
              <Image style={Estilos.icone2} resizeMode="contain" source={require("./Imagens/circulo-de-flecha.png")}/>
              </Pressable>
                    <Text style={Estilos. loginLabelTitulo}>Resumo do Pedido</Text>
              </View>
            <View style={Estilos.fundo}>


              {dadosSalvos && (
                <>
                
                    <Text style={Estilos.loginLabel}>ID do Pedido: {dadosSalvos.id}</Text>
                    <Text style={Estilos.loginLabel}>Nome do Veiculo: {carro.name}</Text>
                    <Text style={Estilos.loginLabel2}>Local de Retirada/Devolução: {dadosSalvos.local}</Text>
                    <Text style={Estilos.loginLabel2}>Data de Retirada: {dadosSalvos.dataRetirada}</Text>
                    <Text style={Estilos.loginLabel}>Duração do Aluguel: {dadosSalvos.dias} dias</Text>
                    <Text style={Estilos.loginLabel2}>Horário de Retirada: {dadosSalvos.horaRetirada}:00</Text>
                    <Text style={Estilos.loginLabel2}>Horário de Entrega: {dadosSalvos.horaEntrega}:00</Text>
                    
                </>
            )}

            </View>

          {dadosSalvos && (
                <>
            <View style={Estilos.fundoTab}>
            <Text style={Estilos.loginLabelTab1}>Custo do Aluguel: R${dadosSalvos.custo}.00</Text>
            <Text style={Estilos.loginLabelTab}>Cobertura Total: R$30.00</Text>
            <Text style={Estilos.loginLabelF}>Total a pagar: R${(dadosSalvos.custo)+30}.00</Text>
            </View>
          </>
            )}
            <Pressable
  style={({ pressed }) => [{ backgroundColor: pressed ? '#135E36' : '#37D76D', opacity: pressed ? 0.5 : 1, }, Estilos.pressableButton]}
  onPress={() => navigation.navigate('Pagamento', { dados, carro, thumbnailLink})}
>
  <Text style={Estilos.buttonText}>Ir para o pagamento</Text>
</Pressable>

            </ImageBackground>
        </View>
    )
};

const Estilos = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#202020',       
    },
     loginLabelTitulo: {
    color: 'white',
    marginTop: 40,
    fontSize: 25,
    marginLeft: 10,
    fontWeight: 'regular',
  },
    loginLabel: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'regular',
        marginLeft: 7,
    },
    loginLabelTab1: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'regular',
        marginLeft: 12,
        marginTop: 18
    },
    loginLabelTab: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'regular',
        marginLeft: 12,
    },
    loginLabelF: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'regular',
        marginLeft: 12,
        marginTop: 40
    },
    loginLabel2: {
        color: 'white',
        marginTop: 40,
        marginLeft: 7,
        fontSize: 20,
        fontWeight: 'regular'
    },
    pressableButton:{
    marginTop: 48,
    marginHorizontal: 45,
    height: 46,
    borderRadius: 10
    },
    buttonText:{
    color: 'white',
    fontSize: 24,
    marginTop: 5,
    fontWeight: 'regular',
    alignSelf: 'center',
    fontFamily: "julius-sans-one.ttf"
    },
    fundoTab: {
      backgroundColor: 'rgba(107, 107, 107, 0.5)',
      width: 277,
      height: 153,
      alignSelf: 'center',
      marginTop: 85,
      
    },
    fundo: {
      width: 289,
      height: 297,
      alignSelf: 'center',
      marginTop: 55,
    },
    appImage: {
      width: '100%',
      height: '100%',
      flex: 1,
      backgroundColor: 'black'
    },
    flexItem: {
    flexDirection: 'row',
  },
  icone2: {
    marginTop: 40,
    marginLeft: 20,
    width: 32,
    height: 32,
  },
});

export default Resumo;