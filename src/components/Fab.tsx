import React from 'react';
import { View, StyleProp, ViewStyle } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import  Icon  from 'react-native-vector-icons/Ionicons';
import { styles } from '../styles/styles';

interface Props {
    iconName: string,
    onPress: () => void,
    style?: StyleProp<ViewStyle>
}

export const Fab = ({iconName, onPress, style = {}}:Props) => {
  return (
    <View style={{...style as any}}>
        <TouchableOpacity
            onPress={onPress}
            style={styles.blackbutton}
        >
            <Icon name={iconName} color={'black'} size={35}/>
        </TouchableOpacity>
    </View>
  );
};
