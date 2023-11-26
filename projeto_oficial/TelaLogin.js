import React, {useState} from 'react';
import {Text, View, StyleSheet, TextInput, ActivityIndicator, Button, ImageBackground} from 'react-native';
import { useNavigation } from '@react-navigation/native';


const MENSAGEM_EMAIL = "Digite o seu e-mail.";
const MENSAGEM_SENHA = "Digite a sua senha.";


const validateUser = async (email, senha) => {

  const users = [
    { email: 'email', senha: 'senha' },

  ];

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  await sleep(1000); 

  const user = users.find((user) => user.email === email && user.senha === senha);

  return new Promise((resolve, reject) => {
    if (user) {
      resolve('Login bem-sucedido. Bem-vindo!');
    } else {
      reject('Email ou senha incorretos. Tente novamente.');
    }
  });
};

const TelaLogin = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [status, setStatus] = useState('');
  const [activity, setActivity] = useState(false);
  const navigation = useNavigation();

  const Login = async () => {
    try {
      setActivity(true);
      setStatus('');
      await validateUser(email, senha);
      setStatus('Login bem-sucedido. Bem-vindo!');
      navigation.navigate('MenuCarros');
    } catch (error) {
      setStatus(error);
    } finally {
      setActivity(false);
    }
  };
    return (
        <View style={Estilos.container}>
            <ImageBackground source={require("./Imagens/FundoEletroDrive.jpg")}
                     resizeMode="cover" style={Estilos.appImage} imageStyle={{opacity: 0.7}}>
              <Text style={Estilos.textLogo}>EletroDrive</Text>
              <Text style={Estilos.loginLabel}>E-mail:</Text>
             <TextInput
                autoCorrect={false}
                placeholder={MENSAGEM_EMAIL}
                placeholderTextColor="white"
                style={Estilos.textInput}
                clearButtonMode="always"
                defaultValue={email}
                onChangeText={(value) => setEmail(value)}
            />
            <Text style={Estilos.loginLabel}>Senha:</Text>
            <TextInput
                autoCorrect={false}
                placeholder={MENSAGEM_SENHA}
                placeholderTextColor="white"
                secureTextEntry={true}
                style={Estilos.textInput}
                clearButtonMode="always"
                defaultValue={senha}
                onChangeText={(value) => setSenha(value)}
            />
              <View style={Estilos.button}>
            <Button color="rgba(0, 0, 0, 0)" title="Registre-se" onPress={() => {}} />
</View>
              <View style={Estilos.button}>          
                <Button color="#37D76D" onPress={Login}  title="ENTRAR" />
              </View>
              <View style={{marginTop: 10}}>
                  <ActivityIndicator size="large" animating={activity}/>
              </View>
              <Text style={Estilos.loginLabel}>{status}</Text>
            </ImageBackground>
        </View>
    )
};

export default TelaLogin;

const Estilos = StyleSheet.create({

      container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#202020'
    },
    textLogo: {
        margin: 24,
        marginBottom: 150,
        fontSize: 50,
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    loginLabel: {
        color: 'white',
        marginTop: 10,
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'center',
        fontFamily: "julius-sans-one.ttf"
    },
    button: {
        color: 'black',
        width: 150,
        height: 36,
        marginTop: 15,
        marginHorizontal: 20,
        paddingHorizontal: 10,
        textAlign: 'center',
        alignSelf: 'center'
    },
    textInput: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        color: 'white',
        fontSize: 15,
        height: 48,
        width: 240,
        marginTop: 20,
        marginHorizontal: 20,
        paddingHorizontal: 10,
        alignSelf: 'center',
        borderRadius: 10
        
    },

    appImage: {
      flex: 1,
      width: '100%',
      height: '100%',
      backgroundColor: 'black'
    }
});
