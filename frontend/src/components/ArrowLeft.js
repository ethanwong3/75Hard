import { View, Text, StyleSheet, Pressable, Image } from 'react-native';

const arrowleft = require("../../assets/arrowleft.png")

export default function ArrowLeft( { onPress } ) {
    return (
    <Pressable onPress={onPress} style={styles.buttonContainer}>
        <Image style={styles.arrowImage} source={arrowleft} />
    </Pressable>
    );

}

const styles = StyleSheet.create({
    buttonContainer: {
        width: 50,
        height: 50,
        justifyContent: "center",
        alignItems: "center",
    },

    arrowImage: {
        width: 50,
        height: 50,
        resieMode: "contain",
    }
});