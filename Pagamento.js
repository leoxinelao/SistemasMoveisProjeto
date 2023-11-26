import React, {useState,useEffect} from 'react';
import { Text, View, StyleSheet, Pressable, Image, ImageBackground } from 'react-native';
import { useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Pagamento = ({ navigation }) => {

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


    const [pagamento, setPagamento] = useState('');
    const [erros, setErros] = useState({
        pagamento: '',

    });

    const validarCampos = () => {
        let errosTemp = {};

        if (!pagamento) {
            errosTemp.pagamento = 'Digite o local de retirada';
        }

        setErros(errosTemp);

        return Object.keys(errosTemp).length === 0;
    };

    

    const handleSalvar = async () => {
        const dadoPagamento = {
            id: '0',
            pagamento
        };

        if (validarCampos()) {
            try {
                dadoPagamento.id = Math.floor(Math.random() * 10000) + '';
                await AsyncStorage.setItem(dadoPagamento.id, JSON.stringify(dadoPagamento), () => {
                    console.warn('Dados salvos no AsyncStorage com sucesso!');
                    navigation.navigate('Compras', { dados, carro, thumbnailLink, dadoPagamento });
                });
            } catch (error) {
                console.warn('Erro ao salvar os dados no AsyncStorage:', error);
            }
        }
    };

  const [metodoPagamento, setMetodoPagamento] = useState(null);

  const handleMetodoPagamentoSelecionado = (metodo) => {
    setMetodoPagamento(metodo === metodoPagamento ? null : metodo);
    setPagamento(metodo)
  };

  return (
    <View style={Estilos.container}>
    <ImageBackground source={require("./Imagens/FundoEletroDrive.jpg")}
                     resizeMode="cover" style={Estilos.appImage} imageStyle={{opacity: 0.2}}>
              
              <View style={Estilos.flexItem2}>
  <Pressable onPress={() => navigation.navigate("Resumo", { dados, carro, thumbnailLink })}>
    <Image style={Estilos.icone2} resizeMode="contain" source={require("./Imagens/circulo-de-flecha.png")} />
  </Pressable>
  <Text style={Estilos.loginLabelTitulo}>Método de Pagamento</Text>
</View>

        <Pressable style={({ pressed }) => [{backgroundColor: pressed ? '#135E36' : metodoPagamento === 'Dinheiro' ? '#37D76D' : 'rgba(0, 0, 0, 0.5)',
opacity: pressed ? 0.5 : 1,},Estilos.flexItem1,]}
          onPress={() => handleMetodoPagamentoSelecionado('Dinheiro')}>
          <Image style={Estilos.icone} source={require("./Imagens/dinheiro.png")} />
          <Text style={Estilos.loginLabel}>Dinheiro</Text>{metodoPagamento === 'Dinheiro' && <View style={Estilos.checkbox(metodoPagamento === 'Dinheiro')} />}
        </Pressable>

        <Pressable style={({ pressed }) => [{backgroundColor: pressed ? '#135E36' : metodoPagamento === 'Cartão de Crédito' ? '#37D76D' : 'rgba(0, 0, 0, 0.5)',
              opacity: pressed ? 0.5 : 1,},Estilos.flexItem,]}
          onPress={() => handleMetodoPagamentoSelecionado('Cartão de Crédito')}>
          <Image style={Estilos.icone} source={require("./Imagens/cartao.png")} />
          <Text style={Estilos.loginLabel}>Cartão de Crédito</Text>{metodoPagamento === 'Cartão de Crédito' && <View style={Estilos.checkbox(metodoPagamento === 'Cartão de Crédito')} />}
        </Pressable>

        <Pressable style={({ pressed }) => [{backgroundColor: pressed ? '#135E36' : metodoPagamento === 'Boleto' ? '#37D76D' : 'rgba(0, 0, 0, 0.5)',
              opacity: pressed ? 0.5 : 1,},Estilos.flexItem,]}
          onPress={() => handleMetodoPagamentoSelecionado('Boleto')}>
          <Image style={Estilos.icone} source={require("./Imagens/boleto.png")} />
          <Text style={Estilos.loginLabel}>Boleto</Text>{metodoPagamento === 'Boleto' && <View style={Estilos.checkbox(metodoPagamento === 'Boleto')} />}
        </Pressable>

        <Pressable style={({ pressed }) => [{backgroundColor: pressed ? '#135E36' : metodoPagamento === 'Pix' ? '#37D76D' : 'rgba(0, 0, 0, 0.5)',
              opacity: pressed ? 0.5 : 1,},Estilos.flexItem,]}
          onPress={() => handleMetodoPagamentoSelecionado('Pix')}>
          <Image style={Estilos.icone} source={require("./Imagens/pix.png")} />
          <Text style={Estilos.loginLabel}>Pix</Text>{metodoPagamento === 'Pix' && <View style={Estilos.checkbox(metodoPagamento === 'Pix')} />}
        </Pressable>
     

        <Pressable style={({ pressed }) => [{ backgroundColor: pressed ? '#135E36' : '#37D76D', opacity: pressed ? 0.5 : 1 }, Estilos.pressableButton]}
          onPress={handleSalvar}>
          <Text style={Estilos.buttonText}>Finalizar pagamento</Text>
        </Pressable>

        
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
  loginLabelTitulo: {
    color: 'white',
    marginTop: 40,
    fontSize: 25,
    marginLeft: 10,
    fontWeight: 'regular',
  },
  loginLabel: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'regular',
    textAlign: 'center',
    marginTop: 24,
    marginLeft: 10,
  },
  pressableButton: {
    marginTop: 300,
    marginHorizontal: 45,
    height: 46,
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 24,
    marginTop: 5,
    fontWeight: 'regular',
    alignSelf: 'center',
    fontFamily: "julius-sans-one.ttf",
  },
  appImage: {
    width: '100%',
    height: '100%',
    flex: 1,
    backgroundColor: 'black',
  },
  icone: {
    width: 32,
    height: 32,
    marginTop: 20,
    marginLeft: 10,
  },
  flexItem: {
    flexDirection: 'row',
    marginLeft: 28,
    marginRight: 28,
    marginTop: 10,
    height: 70,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  flexItem1: {
    flexDirection: 'row',
    marginLeft: 28,
    marginRight: 28,
    marginTop: 50,
    height: 70,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  checkbox: (isSelected) => ({
    width: 24,
    height: 24,
    backgroundColor: isSelected ? '#37D76D' : 'transparent',
    borderRadius: 5,
    position: 'absolute',
    top: 8,
    right: 8,
    borderWidth: isSelected ? 0 : 1,
    borderColor: 'white',
  }),
  flexItem2: {
    flexDirection: 'row',
    width: '100%'
  },
  icone2: {
    marginTop: 40,
    marginLeft: 20,
    width: 32,
    height: 32,
  },
});

export default Pagamento;