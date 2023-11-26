import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import MenuCarros from './MenuCarros'
import DetalheCarros from './DetalheCarros'
import TelaLogin from './TelaLogin'
import Agendamento from './Agendamento'
import Resumo from './Resumo'
import Pagamento from './Pagamento'
import Compras from './Compras'
import DetalhesPedido from './DetalhesPedido'
import CompraCancelada from './CompraCancelada'

const Stack = createNativeStackNavigator();

const App = ({navigation}) => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="MenuCarros">
        <Stack.Screen name="TelaLogin" component={TelaLogin}options={{ headerShown: false }}  />
        <Stack.Screen name="MenuCarros" component={MenuCarros}options={{ headerShown: false }}  />
        <Stack.Screen name="DetalheCarros" component={DetalheCarros}options={{ headerShown: false }}  />
        <Stack.Screen name="Agendamento" component={Agendamento}options={{ headerShown: false }}  />
        <Stack.Screen name="Pagamento" component={Pagamento}options={{ headerShown: false }}  />
        <Stack.Screen name="Resumo" component={Resumo}options={{ headerShown: false }}  />
        <Stack.Screen name="Compras" component={Compras}options={{ headerShown: false }}  />
        <Stack.Screen name="DetalhesPedido" component={DetalhesPedido}options={{ headerShown: false }}  />
        <Stack.Screen name="CompraCancelada" component={CompraCancelada}options={{ headerShown: false }}  />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


export default App;
