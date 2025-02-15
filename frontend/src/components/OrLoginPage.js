import { View, Text, StyleSheet, TouchableOpacity, Image, Pressable } from 'react-native';

const checkcircle = require("../../assets/checkcircle.png")

export default function OrLoginPage({onPress}) {
    return (
        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center',}}>
            <View style={{width: 140, height: 1, backgroundColor: 'black'}}></View>
                <View style={{paddingLeft: 10, paddingRight: 10,}}>
                    <Text> OR </Text>
                </View>
            <View style={{width: 140, height: 1, backgroundColor: 'black'}}></View>

        </View>
 
    );

}

const styles = StyleSheet.create({
    line: {

    },
});