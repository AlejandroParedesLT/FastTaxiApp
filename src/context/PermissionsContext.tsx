import React, { createContext, useState, useEffect } from 'react';
import { Platform, AppState } from 'react-native';
import { PermissionStatus, request, check, openSettings, PERMISSIONS } from 'react-native-permissions';

export interface PermissionsState {
    locationStatus: PermissionStatus
}

export const permissionInitState: PermissionsState = {
    locationStatus: 'unavailable',
};

type PermissionsContextProps = {
    permissions : PermissionsState,
    askLocationPermission: () => void,
    checkLocationPermission: () => void,
}

export const PermissionsContext = createContext({} as PermissionsContextProps);

export const PermissionProvider = ({children}: any) => {
    const [permissions, setPermissions] = useState(permissionInitState);
    useEffect(() => {
        checkLocationPermission();
        AppState.addEventListener('change', state => {
            if (state !== 'active') {return;}
            checkLocationPermission();
        } );
    },);

    const askLocationPermission = async() => {
        let permissionStatus: PermissionStatus;
        if (Platform.OS === 'ios') {
        //permissionStatus = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
        permissionStatus = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
        } else {
        //permissionStatus = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
        permissionStatus = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
        }
        if (permissionStatus === 'blocked'){
            openSettings();
        }
        setPermissions({...permissions, locationStatus:permissionStatus});
    };
    const checkLocationPermission = async () => {
        let permissionStatus: PermissionStatus;
        if (Platform.OS === 'ios') {
        //permissionStatus = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
        permissionStatus = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
        } else {
        //permissionStatus = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
        permissionStatus = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
        }
        setPermissions({...permissions, locationStatus:permissionStatus});
    };
    return (
        <PermissionsContext.Provider value={{
            permissions,
            askLocationPermission,
            checkLocationPermission,
        }}>
            {children}
        </PermissionsContext.Provider>
    )
}