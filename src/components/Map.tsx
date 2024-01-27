/* eslint-disable no-return-assign */
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useRef, useState} from 'react';
import { View } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker, Polyline } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import { useLocation } from '../hooks/useLocation';
import { LoadingScreen } from '../screens/LoadingScreen';
import { styles } from '../styles/styles';
import { Fab } from './Fab';
import auth from '@react-native-firebase/auth';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { DrawerActions } from '@react-navigation/native';


interface MarkerProps {
    markers?: typeof Marker[];
}

//interface Props extends DrawerScreenProps<any, any>{}
interface Props extends DrawerScreenProps<any, any> {
    navigation: any; // Replace 'any' with the correct type for navigation prop
  }

//export const Map = ({markers}: MarkerProps, {navigation}: Props) => {
export const Map = ({ navigation }: Props) => {
    const [showPolyline, setshowPolyline] = useState(true);
    const {hasLocation,
            initialPosition,
            getCurrentLocation,
            followUserLocation,
            userLocation,
            stopFollowUserLocation,
            routeLines} = useLocation();
    const mapViewRef = useRef<MapView>();
    const following = useRef<boolean>(true);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        navigation.setOptions({
            headerLeft: () => {
                return (
                    <Fab
                    iconName="menu-outline"
                    onPress={() => navigation.toggleDrawer()}
                    //onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
                    style={{
                        position: 'absolute',
                        top:20,
                        left:20,
                    }}
                />
                );
            },
        });
    },);

    const logOut = () => {
        console.log('Pressed Log Out');
        setLoading(true);
        auth()
            .signOut()
            .then(() => {
                console.log('User signed out!');
                setLoading(false);
            });
    };

    useEffect(() => {
        followUserLocation();
        return () => {
            stopFollowUserLocation();
        };
    },);

    useEffect(() => {
        if (!following.current) {return};
        const {latitude, longitude} = userLocation;
        mapViewRef.current?.animateCamera({
            center: {latitude, longitude},
        });
    },[userLocation]);
    /*const centerPosition = async () => {
        const {latitude, longitude} = await getCurrentLocation();
        mapViewRef.current?.animateCamera({
            center: {latitude, longitude},
        });
    }*/
    if (loading) {
        return <LoadingScreen />;
    }
    if (!hasLocation){
        return <LoadingScreen />;
    } else {
    return (
        <View style={styles.container2}>
        {/*<Icon name="star-outline" size={30} color={'blue'}/>*/}
            <MapView
                //provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                ref = {(el) => mapViewRef.current = el!}
                style={styles.map}
                showsUserLocation
                region={{
                latitude: initialPosition.latitude,
                longitude: initialPosition.longitude,
                latitudeDelta: 0.015,
                longitudeDelta: 0.0121,
                }}
                onTouchStart={() => following.current = false}
            >
                {
                    showPolyline && (
                        <Polyline
                            coordinates={routeLines}
                            strokeColor="black"
                            strokeWidth={3}
                        />
                    )
                }
                {/*<Marker
                    //key={index}
                    coordinate={{
                        latitude: 37.78825,
                        longitude: -122.4324,
                    }}
                    image={require('../Assets/custom-marker.png')}
                    title={'Titulos'}
                    description={'Descripcion marcador'}
                />*/}
            </MapView>
            {/*<Fab
                iconName="log-out-outline"
                onPress={() => logOut()}
                style={{
                    position: 'absolute',
                    top:20,
                    left:20,
                }}
            />*/}
            <Fab
                iconName="brush-outline"
                onPress={() => setshowPolyline(value => !value)}
                style={{
                    position: 'absolute',
                    bottom:80,
                    right:20,
                }}
            />
        </View>
        );
    }
};
