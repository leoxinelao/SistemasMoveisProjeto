import { Text, StyleSheet, View } from 'react-native';
import { SafeAreaView, FlatList, Pressable, Image,ImageBackground,TextInput } from 'react-native';
import React from 'react';


const MenuCarros = ({navigation}) => {
  


  const DATA = [
    {
      "id": 1009220,
      "name": "Mini Cooper",
      "valor": 80,
      "description": "Esse veículo elétrico garante uma alta praticidade para realizar o transporte de grandes volumes de mercadorias, sem prejudicar o meio ambiente.",
      "modified": "2020-04-04T19:01:59-0400",
      "thumbnail": {
        "path": "https://s2-autoesporte.glbimg.com/fRNpcwYeAJuvnCyuzTgiGKmgRFA=/0x0:1024x687/924x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_cf9d035bf26b4646b105bd958f32089d/internal_photos/bs/2023/X/f/AXorqvSUel1T6hNoWmmw/https-www.carscoops.com-wp-content-uploads-2023-04-mini-hatch-00002-1024x687.jpg",
        "extension": "jpg",
        "preco": 0
      }
    },
    {
      "id": 1010924,
      "name": "Nissan Leaf",
      "valor": 90,
      "idade" : 24,
      "description": "Veículo 100% elétrico, conta com uma ampla capacidade interna, ideal para quem busca uma mobilidade sustentável para o transporte de cargas leves.",
      "thumbnail": {
        "path": "https://www.completecar.ie/img/testdrives/8128_large.jpg",
        "extension": "jpg"
        ,
        "preco": 0
      }
    },
    {
      "id": 1010914,
      "name": "Aehra Sedan",
      "idade" : 44,
      "valor": 120,
      "description": "Na dianteira, o Aehra Sedã tem volumes e vincos arredondados, traz o capô integrado ao para-choque, que tem duas amplas entradas de ar nas extremidades. O visual, novamente, lembra um pouco os superesportivos da marca do touro. Tudo contribui para a aerodinâmica: os faróis Full LEDs fininhos, as câmeras no lugar dos retrovisores.",
      "modified": "2014-03-05T13:17:50-0500",
      "thumbnail": {
        "path": "https://fotos-jornaldocarro-estadao.nyc3.cdn.digitaloceanspaces.com/wp-content/uploads/2023/06/27195313/aehra-sedan-jc-1.jpg",
        "extension": "jpg",
        "preco": 0
      }
    },
    {
      "id": 1017295,
      "name": "BYD Dolphin",
      "valor": 95,
      "description": "Bom espaço interno, acabamento de boa qualidade e bom desempenho, BYD Dolphin é um elétrico que ainda garante boa autonomia.",
      "modified": "2013-09-18T11:15:29-0400",
      "thumbnail": {
        "path": "https://quatrorodas.abril.com.br/wp-content/uploads/2023/07/01_BYD_DOLPHIN_1FLP6504-e1694046352618.jpg?quality=70&strip=info&w=1280&h=720&crop=1",
        "extension": "jpg",
        "preco": 0
      }
    },
    {
      "id": 1017575,
      "name": "Toyota BZ4X Electric",
      "valor": 110,
      "description": "A construção poderosa sob a plataforma EV e-TNGA e o design dinâmico de um autêntico SUV juntam-se à performance de topo e à autonomia elétrica de 511 Km sem condicionantes. Inovador e incorporado com tecnologia de última geração, o bZ4X oferece uma longevidade de bateria excecional, para maior tranquilidade e segurança.",
      "modified": "2014-11-17T17:46:57-0500",
      "thumbnail": {
        "path": "https://www.automaistv.com.br/wp-content/uploads/2023/05/toyota_bz4x_151_edited-990x594.jpg",
        "extension": "jpg",
        "preco": 0
      }
    }
  ]



  const Carro = ({ item,link }) => (
      <Pressable onPress={() => navigation.navigate("DetalheCarros", { carro: item, thumbnailLink: item.thumbnail.path })}>
      <View style={Estilos.personagemContainer}>
      <Image style={Estilos.tinyLogo} source={{ uri: link }} />

      <Text style={Estilos.paragraph}>{item.name}</Text>
      <Text style={Estilos.desc}>{item.description}</Text>
    </View>
        </Pressable>
  );

  const ExibirCarro = ({ item }) => (

      <Carro
        item={item}
        
        link={item.thumbnail.path}
      />

  );

  return (
      <SafeAreaView style={Estilos.container}>
      <ImageBackground source={require("./Imagens/FundoEletroDrive.jpg")} resizeMode="cover" style={Estilos.appImage} imageStyle={{opacity: 0.4}}>
        <View style={Estilos.rowContainer}>
             <TextInput
                autoCorrect={false}
                placeholder={"Pesquisar..."}
                placeholderTextColor="lightgrey"
                style={Estilos.textInput}
                clearButtonMode="always"
            />
        
        </View>
      
        <FlatList       
            data={DATA}
            renderItem={ExibirCarro}
            keyExtractor={item => item.id}        
        />
         </ImageBackground>
      </SafeAreaView>
  )
}

const Estilos = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#2c3e50',
    color: 'black',
    padding: 8, 
  },
  rowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        backgroundColor: 'rgba(0, 0, 0, 0.3)'
    },
  paragraph: {
    padding: 10,
    marginHorizontal: 21,
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: '#2BB45A',

  },
  desc: {
    marginHorizontal: 21,
    marginBottom: 30,
    padding: 10,
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'left',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10
  },
  appImage:{
      flex: 1,
      width: '100%',
      height: '100%',
      backgroundColor: 'black'
    },
    textInput: {
      backgroundColor: 'rgba(0, 0, 0, 0.3)',
      color: 'white',
      fontSize: 24,
      height: 48,
      width: 240,
      marginTop: 40,
      marginBottom: 30,
      paddingHorizontal: 10,
      borderRadius: 20       
    },
    carrinho: {
      backgroundColor: 'rgba(0, 0, 0, 0.3)',
      borderRadius: 45,
      width: 48,
      height: 48,
      marginLeft: 20,
      marginTop: 40,
      marginBottom: 30,
      paddingHorizontal: 10
    },
  tinyLogo: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    width: 334,
    height: 200,
    marginHorizontal: 21,
    alignSelf: 'center',
  },
});

export default MenuCarros;