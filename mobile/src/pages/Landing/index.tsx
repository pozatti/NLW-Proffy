import React, { useState, useEffect } from 'react';
import { View, Text, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';
import api from '../../services/api';

import styles from './styles';
import landingImg from '../../assets/images/landing.png';
import studyImg from '../../assets/images/icons/study.png';
import giveClassesImg from '../../assets/images/icons/give-classes.png';
import heartImg from '../../assets/images/icons/heart.png';


function Landing() {
    const { navigate } = useNavigation();
    const [totalConnection, setTotalConnection] = useState(0);

    useEffect(() => {
        api.get('connections').then(response => {
            const { total } = response.data;

            setTotalConnection(total);
        })
    }, [])

    function handleNavigateToClasses() {
        navigate('GiveClasses');
    }

    function handleNavigateToStudy() {
        navigate('StudyTabs');
    }

    return (
        <View style={styles.container}>
            <Image style={styles.banner} source={landingImg} />
            <Text style={styles.title}>
                Seja bem-vindo,{'\n'}
                <Text style={styles.titleBold}>O que deseja fazer?</Text>
            </Text>

            <View style={styles.buttonContainer}>
                <RectButton
                    onPress={handleNavigateToStudy}
                    style={[styles.button, styles.buttonPrimary]}
                >
                    <Image source={studyImg} />
                    <Text style={styles.buttonText}>Estudar</Text>
                </RectButton>

                <RectButton
                    onPress={handleNavigateToClasses}
                    style={[styles.button, styles.buttonSecondary]}
                >
                    <Image source={giveClassesImg} />
                    <Text style={styles.buttonText}>Dar aulas</Text>
                </RectButton>
            </View>

            <Text style={styles.textConnection}>
                Total de {totalConnection} conexões realizadas {' '}
                <Image source={heartImg} />
            </Text>
        </View>
    )
}

export default Landing;