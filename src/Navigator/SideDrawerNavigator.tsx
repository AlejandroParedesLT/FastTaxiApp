import { DrawerContentComponentProps, DrawerContentScrollView, createDrawerNavigator } from '@react-navigation/drawer';
import { ProfileScreen } from '../screens/ProfileScreen';
import { RidesScreen } from '../screens/RidesScreen';
import { AboutScreen } from '../screens/AboutScreen';
import { Navigator } from './Navigator';
import { View, Image, TouchableOpacity, Text } from 'react-native';
import { styles } from '../styles/styles';

const Drawer = createDrawerNavigator();

export const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <MenuInterno {...props}/>}
    >
      <Drawer.Screen name="Navigator" options={{title:'Inicio'}} component={Navigator} />
      <Drawer.Screen name="ProfileScreen" component={ProfileScreen} />
      <Drawer.Screen name="RidesScreen" component={RidesScreen} />
      <Drawer.Screen name="AboutScreen" component={AboutScreen} />
    </Drawer.Navigator>
  );
};


const MenuInterno = ({navigation}: DrawerContentComponentProps<DrawerContentOptions>) => {
  return (
      <DrawerContentScrollView>
          <View style={styles.avatarContainer}>
              <Image
                  source={{
                      uri: 'https://www.mtsolar.us/wp-content/uploads/2020/04/avatar-placeholder.png'
                  }}
                  style={styles.avatar}
              />
          </View>
          <View style={styles.menuContainer}>
              <TouchableOpacity
                  style={styles.menuBoton}
                  onPress={()=> navigation.navigate('ProfileScreen')}
              >
                  <Text style={styles.menuTexto}>Perfil</Text>
              </TouchableOpacity>

              <TouchableOpacity
                  style={styles.menuBoton}
                  onPress={()=> navigation.navigate('RidesScreen')}
              >
                  <Text style={styles.menuTexto}>Rides</Text>
              </TouchableOpacity>

              <TouchableOpacity
                  style={styles.menuBoton}
                  onPress={()=> navigation.navigate('AboutScreen')}
              >
                  <Text style={styles.menuTexto}>Acerca</Text>
              </TouchableOpacity>
          </View>
      </DrawerContentScrollView>
  )
};

