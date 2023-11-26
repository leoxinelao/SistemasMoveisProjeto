import {useState} from 'react';
import { useRoute } from '@react-navigation/native';
import {Text, View, StyleSheet, TextInput, Pressable, Image, ImageBackground} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LOCALRETIRADA = "Digite o local da retirada";
const DATA = "Digite a data da retirada";
const HORA = "Digite a hora da retirada";
const ENTREGA = "Digite o número de dias";
const HORAENTREGA = "Digite a hora da entrega";


const Agendamento = ({navigation}) => {
    
const route = useRoute();
const { params } = route;

if (!params || !params.carro || !params.thumbnailLink) {
  return null;
}

const { carro, thumbnailLink } = params;
      
   const [local, setLocal] = useState('');
    const [dataRetirada, setDataRetirada] = useState('');
    const [horaRetirada, setHoraRetirada] = useState('');
    const [dias, setDias] = useState();
    const [horaEntrega, setHoraEntrega] = useState('');
    const [custo, setCusto] = useState('');
    const [pagamento, setPagamento] = useState('');
    const [erros, setErros] = useState({
        local: '',
        dataRetirada: '',
        horaRetirada: '',
        horaEntrega: '',
        pagamento: '',

    });

    const validarCampos = () => {
        let errosTemp = {};

        if (!local) {
            errosTemp.local = 'Digite o local de retirada';
        }

        if (!dataRetirada) {
            errosTemp.dataRetirada = 'Digite a data de retirada';
        }

        if (!dias) {
            errosTemp.dias = 'Digite o número de dias';
        }

        if (!horaRetirada) {
            errosTemp.horaRetirada = 'Digite a hora de retirada';
        }

        if (!horaEntrega) {
            errosTemp.numero = 'Digite a hora de entrega';
        }
        if (!custo) {
            errosTemp.custo = 'Digite seu endereço';
        }

        setErros(errosTemp);

        return Object.keys(errosTemp).length === 0;
    };

    const handleInputChange = (text) => {

    const numericValue = text.replace(/[^0-9]/g, '');
    const numero1 = text;
    const res = numero1 * carro.valor;

    setCusto(res);
    setDias(numericValue);
  };
    

    const handleSalvar = async () => {
        const dados = {
            id: '0',
            local,
            dataRetirada,
            dias,
            horaRetirada,
            horaEntrega,
            custo,
            pagamento
        };

        if (validarCampos()) {
            try {
                dados.id = Math.floor(Math.random() * 10000) + '';
                await AsyncStorage.setItem(dados.id, JSON.stringify(dados), () => {
                    console.warn('Dados salvos no AsyncStorage com sucesso!');
                    navigation.navigate('Resumo', { dados, carro, thumbnailLink });
                });
            } catch (error) {
                console.warn('Erro ao salvar os dados no AsyncStorage:', error);
            }
        }
    };


    return (
        <View style={Estilos.container}>
            <ImageBackground source={require("./Imagens/FundoEletroDrive.jpg")}
                     resizeMode="cover" style={Estilos.appImage} imageStyle={{opacity: 0.3}}>
                     <View style={Estilos.fundo}>
                     
              <View style={Estilos.flexItem}>
              <Pressable onPress={() => navigation.navigate("DetalheCarros", { carro, thumbnailLink})}>
              <Image style={Estilos.icone2} resizeMode="contain" source={require("./Imagens/circulo-de-flecha.png")}/>
              </Pressable>
              <Text style={Estilos. loginLabelTitulo}>Agendar</Text>
              </View>

              {erros.local !== '' ? <Text style={Estilos.erro}>{erros.local}</Text> : <Text></Text>}
              <Text style={Estilos.loginLabel}>Local de retirada:</Text>
              <TextInput
                  autoCorrect={false}
                  placeholderTextColor="grey"
                  style={Estilos.textInput}
                  clearButtonMode="always"
                  placeholder={LOCALRETIRADA}
                  value={local}
                  onChangeText={setLocal}
                  maxLength={100}
              />

               {erros.dataRetirada !== '' ? <Text style={Estilos.erro}>{erros.dataRetirada}</Text> : <Text></Text>}
              <Text style={Estilos.loginLabel}>Data de Retirada:</Text>
               <TextInput
                  autoCorrect={false}
                  placeholderTextColor="grey"
                  style={Estilos.textInput}
                  clearButtonMode="always"
                  placeholder={DATA}
                  value={dataRetirada}
                  onChangeText={setDataRetirada}
                  keyboardType="numeric"
                  maxLength={8}
              />
            
               {erros.dias !== '' ? <Text style={Estilos.erro}>{erros.dias}</Text> : <Text></Text>}
               <Text style={Estilos.loginLabel}>Duração em dias:</Text>
               <TextInput
                  autoCorrect={false}
                  placeholderTextColor="grey"
                  style={Estilos.textInput}
                  clearButtonMode="always"
                  placeholder={ENTREGA}
                  value={dias}
                  onChangeText={handleInputChange}
                  keyboardType="numeric"
                  maxLength={2}
              />  

               {erros.horaRetirada !== '' ? <Text style={Estilos.erro}>{erros.horaRetirada}</Text> : <Text></Text>}
               <Text style={Estilos.loginLabel}>Hora da retirada:</Text>
               <TextInput
                  autoCorrect={false}
                  placeholderTextColor="grey"
                  style={Estilos.textInput}
                  clearButtonMode="always"
                  placeholder={HORA}
                  value={horaRetirada}
                  onChangeText={setHoraRetirada}
                  keyboardType="numeric"
                  maxLength={2}
              />     

               {erros.horaEntrega !== '' ? <Text style={Estilos.erro}>{erros.horaEntrega}</Text> : <Text></Text>}
               <Text style={Estilos.loginLabel}>Hora da Entrega:</Text>
               <TextInput
                  autoCorrect={false}
                  placeholderTextColor="grey"
                  style={Estilos.textInput}
                  clearButtonMode="always"
                  placeholder={HORAENTREGA}
                  value={horaEntrega}
                  onChangeText={setHoraEntrega}
                  keyboardType="numeric"
                  maxLength={2}
              />
          <Pressable style={({ pressed }) => [ { backgroundColor: pressed ? '#135E36' : '#37D76D', opacity: pressed ? 0.5 : 1, }, Estilos.pressableButton,]}
            onPress={handleSalvar}>
              <Text style={Estilos.buttonText}>Confirmar</Text>
          </Pressable>
               </View>
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
    fontSize: 30,
    marginLeft: 45,
    fontWeight: 'regular',
  },
    loginLabel: {
      color: 'white',
      marginTop: 5,
      fontSize: 20,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    
    pressableButton:{
      marginTop: 30,
      marginHorizontal: 50,
      height: 48,
      borderRadius: 20
  },
  erro: {
        color: 'red',
        marginBottom: 5,
    },
    buttonText:{
      color: 'white',
      fontSize: 32,
      fontWeight: 'regular',
      alignSelf: 'center',
      fontFamily: "julius-sans-one.ttf"
  },
    fundo: {
     backgroundColor: 'rgba(0, 0, 0, 0.3)',
      width: 296,
      height: 704,
      alignSelf: 'center',
      marginTop: 50,
      borderRadius: 20
    },
    textInput: {
      backgroundColor: '#D9D9D9',
      color: '',
      fontSize: 15,
      height: 40,
      width: 185,
      marginTop: 10,
      marginHorizontal: 20,
      paddingHorizontal: 10,
      alignSelf: 'center',
      borderRadius: 10
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

export default Agendamento;