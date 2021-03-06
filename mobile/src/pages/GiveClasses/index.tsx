import React from 'react';
import { View, Text, ImageBackground } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

import giveClassesBgImg from '../../assets/images/give-classes-background.png';
import styles from './styles';


function GiveClasses() {
    const { goBack } = useNavigation();

    function handlerGoBack() {
        goBack();
    }

    return (
        <View style={styles.container}>
            <ImageBackground
                style={styles.content}
                resizeMode="contain"
                source={giveClassesBgImg}
            >
                <Text style={styles.title} >Quer ser um Proffy?</Text>
                <Text style={styles.description}>
                    Para começar, você precisa se cadastrar na nossa plataforma web.
                </Text>
            </ImageBackground>

            <RectButton onPress={handlerGoBack} style={styles.okButton}>
                <Text style={styles.okButtonText}>Tudo bem</Text>
            </RectButton>
        </View>
    )
}

export default GiveClasses;