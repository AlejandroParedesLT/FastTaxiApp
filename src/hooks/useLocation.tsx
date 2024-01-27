import {useEffect, useState, useRef} from 'react';
import Geolocation from '@react-native-community/geolocation';
import { Location } from '../Interfaces/appInterfaces';

export const useLocation = () => {
    const [hasLocation, sethasLocation] = useState(false);
    const [routeLines, setrouteLines] = useState<Location[]>([])
    const [initialPosition, setinitialPosition] = useState<Location>({latitude:0, longitude:0});
    const [userLocation, setuserLocation] = useState<Location>({
        longitude:0,
        latitude:0,
    });
    const watchId = useRef<number>();
    const isMounted = useRef(true);
    useEffect(() => {
        isMounted.current = true;
        return () => {
            isMounted.current = false;
        };
    },);

    useEffect(() => {
        getCurrentLocation()
            .then(location => {
                if (!isMounted.current) return;
                setinitialPosition(location);
                setuserLocation(location);
                setrouteLines( routes => [...routes, location]);
                sethasLocation(true);
            });
        /*Geolocation.getCurrentPosition(
            ({coords}) => {
                setinitialPosition({
                    latitud:coords.latitude,
                    longitud:coords.longitude,
                });
                sethasLocation(true);
            }, // OK
            console.log, // Error
            { enableHighAccuracy:true, timeout:20000, maximumAge: 1000 } //Opciones);
        );*/
    },);

    const getCurrentLocation = ():Promise<Location> => {
        return new Promise((resolve, reject) => {
            Geolocation.getCurrentPosition(
                ({coords}) => {
                    resolve({
                        latitude:coords.latitude,
                        longitude:coords.longitude,
                    });
                }, // OK
                (err) => reject({err}), // Error
                { enableHighAccuracy:true, timeout:20000, maximumAge: 1000 } //Opciones);
            );
        });
    };

    const followUserLocation = () => {
        watchId.current = Geolocation.watchPosition(
            ({coords}) => {
                if (!isMounted.current) return;
                const location: Location = {
                    latitude: coords.latitude,
                    longitude:coords.longitude,
                };
                setuserLocation(location);
                setrouteLines( routes => [...routes, location]);
            }, // OK
            (err) => console.log({err}), // Error
            { enableHighAccuracy:true, timeout:20000, maximumAge: 1000, distanceFilter:10 } //Opciones);
        );
    };
    const stopFollowUserLocation = () => {
        if (watchId.current){
            Geolocation.clearWatch(watchId.current);
        }
        else {
            console.log('Error' + watchId.current);
        }
    };
    return {
        hasLocation,
        initialPosition,
        getCurrentLocation,
        followUserLocation,
        userLocation,
        stopFollowUserLocation,
        routeLines,
    };
};
