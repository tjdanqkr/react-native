import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, TabActions } from '@react-navigation/native';
import { Text } from 'react-native';
import Finder from './Finder';
import Home from './Home';
import MyProfile from './MyProfile';
import Ionicons from '@expo/vector-icons/Ionicons';
const Tab = createBottomTabNavigator();
export default function NavigationContainerBottom() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused
                ? 'ios-information-circle'
                : 'ios-information-circle-outline';
            } else if (route.name === 'Settings') {
              iconName = focused ? 'ios-list-box' : 'ios-list';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="Home" component={Home}></Tab.Screen>
        <Tab.Screen name="MyProfile" component={MyProfile}></Tab.Screen>
        <Tab.Screen name="Finder" component={Finder}></Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
}
