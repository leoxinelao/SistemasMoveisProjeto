import { Text, StyleSheet, View } from 'react-native';
import {ScrollView,Pressable, Image,ImageBackground} from 'react-native';
import { useRoute } from '@react-navigation/native';

const DetalheCarros = ({navigation}) => {

  const route = useRoute();
  const { params } = route;

  

  if (!params || !params.carro || !params.thumbnailLink) {
    return null;
  }

  const { carro, thumbnailLink } = params;
  


  return (
    <ScrollView style={Estilos.container}>
     <ImageBackground source={require("./Imagens/FundoEletroDrive.jpg")}  resizeMode="cover"  style={Estilos.appImage} imageStyle={{opacity: 0.2}}>
      <View style={Estilos.personagemContainer}>
      <Image style={Estilos.tinyLogo} source={{ uri: thumbnailLink }} />
     <Pressable onPress={() => navigation.navigate("MenuCarros")}>
              <Image style={Estilos.iconeVoltar} resizeMode="contain" source={require("./Imagens/circulo-de-flecha.png")}/>
              </Pressable>
          
          <Text style={Estilos.paragraph}>{carro.name}</Text>

        </View>
               
    <Text style ={Estilos.textoPadrao}>A partir de<Text style ={Estilos.textoPadrao2}>R${carro.valor}</Text></Text> 
    <Text style ={Estilos.textoPadrao}>por diária </Text>

    <View style={Estilos.flexContainer}>
    <View style={Estilos.flexItem}>
    <Image style={Estilos.icone} source={require("./Imagens/checkmark.png")} />
    <Text style={Estilos.textoEspec}>Cancelamento grátis</Text>
    </View>
    

    <View style={Estilos.flexItem}>
    <Image style={Estilos.icone} source={require("./Imagens/checkmark.png")} />
    <Text style={Estilos.textoEspec}>Quilometragem livre</Text>
    </View>


    <View style={Estilos.flexItem}>
    <Image style={Estilos.icone} source={require("./Imagens/checkmark.png")} />
    <Text style={Estilos.textoEspec}>Politicagem</Text>
    </View>

    <View style={Estilos.flexItem2}>
    <Image style={Estilos.icone2} source={require("./Imagens/cambio.png")} />
    <Text style ={Estilos.textoEspec2}>Automático</Text>
    <Image style={Estilos.icone2} source={require("./Imagens/mala.jpg")} />
    <Text style ={Estilos.textoEspec2}>1 mala</Text>
    </View>
    <View style={Estilos.flexItem2}>
    <Image style={Estilos.icone2} source={require("./Imagens/people.png")} />
    <Text style ={Estilos.textoEspec2}>4 pessoas</Text>
    <Image style={Estilos.icone2} source={require("./Imagens/snowflake.png")} />
    <Text style ={Estilos.textoEspec2}>Ar condicionado</Text>
    </View>
    </View>

    <Text style={Estilos.tabelaTop}>Cobertura Total</Text>
    <View style={Estilos.flexItem3}>
    <Image style={Estilos.icone} source={require("./Imagens/checkmark.png")} />
    <Text style={Estilos.textoTabela}>Danos ao Carro Alugado</Text>
    </View>
    <View style={Estilos.flexItem3}>
    <Image style={Estilos.icone} source={require("./Imagens/checkmark.png")} />
    <Text style={Estilos.textoTabela}>Roubo de Carro</Text>
    </View>
    <View style={Estilos.flexItem3}>
    <Image style={Estilos.icone} source={require("./Imagens/checkmark.png")} />
    <Text style={Estilos.textoTabela}>Reembolso de Excesso</Text>
    </View>
    <View style={Estilos.flexItem3}>
    <Image style={Estilos.icone} source={require("./Imagens/checkmark.png")} />
    <Text style={Estilos.textoTabela}>Chave do carro perdida ou roubada</Text>
    </View>
    <View style={Estilos.flexItem3Final}>
    <Image style={Estilos.icone} source={require("./Imagens/checkmark.png")} />
    <Text style={Estilos.textoTabela}>Janelas, espelhos, rodas, etc...</Text>
    </View>

    <Pressable style={({ pressed }) => [{ backgroundColor: pressed ? '#135E36' : '#37D76D', opacity: pressed ? 0.5 : 1, }, Estilos.pressableButton,]}
      onPress={() => navigation.navigate('Agendamento', { carro, thumbnailLink })}>
      <Text style={Estilos.buttonText}>Realizar Agendamento</Text>
    </Pressable>

      </ImageBackground>
    </ScrollView>
  );
};

const Estilos = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#2c3e50',
    color: 'black',
    padding: 8,
  },
   pressableButton:{
    marginTop: 16,
    marginHorizontal: 28,
    height: 44,
    borderRadius: 10
  },
  buttonText:{
    color: 'white',
    fontSize: 22,
    marginTop: 8,
    marginLeft: 10,
    fontWeight: 'medium',
    fontFamily: "julius-sans-one.ttf"
  },
   textoPadrao: {
        color: 'white',
        marginTop: 10,
        marginLeft: 34,
        fontSize: 24,
        fontWeight: 'regular',
        fontFamily: "julius-sans-one.ttf"
    },
    textoEspec2: {
        color: 'white',
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10,
        fontSize: 14,
        fontWeight: 'regular',
        fontFamily: "julius-sans-one.ttf"
    },
    textoEspec: {
        color: 'white',
        marginTop: 10,
        marginRight: 90,
        fontSize: 16,
        fontWeight: 'regular',
        fontFamily: "julius-sans-one.ttf"
    },
    textoTabela: {
        color: 'white',
        marginTop: 10,
        marginRight: 90,
        fontSize: 14,
        fontWeight: 'regular',
        fontFamily: "julius-sans-one.ttf"
    },
    textoPadrao2: {
        color: 'white',
        marginTop: 10,
        marginLeft: 10,
        fontSize: 28,
        fontWeight: 'bold',
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
  tabelaTop: {
    padding: 10,
    fontSize: 24,
    marginTop: 20,
    marginHorizontal: 28,
    color: 'white',
    fontWeight: 'medium',
    textAlign: 'center',
    backgroundColor: '#37D76D',
    opacity: 0.8,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
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
  icone2: {
    marginLeft: 32,
    width: 25,
    height: 25,
    opacity: 0.7
    },
  flexItem: {
    flexDirection: 'row',
    marginVertical: -4
  },
  flexItem2: {
    flexDirection: 'row',
    marginTop: 8
  },
  flexItem3: {
    flexDirection: 'row',    
    marginLeft: 28,
    marginRight: 28,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  flexItem3Final: {
    flexDirection: 'row',    
    marginLeft: 28,
    marginRight: 28,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15
  },
  icone: {
    marginLeft: 26,
    width: 40,
    height: 40,    
    },
  iconeVoltar: {
    marginBottom: -30,
    width: 32,
    height: 32,
  },
});

export default DetalheCarros;