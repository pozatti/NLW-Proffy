import React, { useState } from 'react';
import { View, Text, Image, Linking } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';

import styles from './styles';
import heartOutlineImg from '../../assets/images/icons/heart-outline.png';
import unFavoriteImg from '../../assets/images/icons/unfavorite.png';
import whatsappImg from '../../assets/images/icons/whatsapp.png';
import api from '../../services/api';

export interface Teacher {
    id: number;
    name: string;
    avatar: string;
    bio: string;
    cost: number;
    subject: string;
    whatsapp: string;
}

interface TeacherItemProp {
    teacher: Teacher;
    favorited: boolean;
}

const TeacherItem: React.FC<TeacherItemProp> = ({ teacher, favorited }) => {
    const [isFavorite, setIsFavorite] = useState(favorited);

    function handleWhatsapp() {
        api.post('connections', {
            user_id: teacher.id
        });

        Linking.openURL(`whatsapp://send?phone=${teacher.whatsapp}`);
    }

    async function handleToggleFavorite() {
        const favorites = await AsyncStorage.getItem('favorites');

        let favoriteArray = [];

        if (favorites) {
            favoriteArray = JSON.parse(favorites);
        }

        if (isFavorite) {
            //remover aos favoritos
            const favoritesIndex = favoriteArray.findIndex((teacherItem: Teacher) => {
                return teacherItem.id === teacher.id;
            })

            favoriteArray.splice(favoritesIndex, 1);

            setIsFavorite(false);
        } else {
            //adicionar aos favoritos 
            favoriteArray.push(teacher);

            setIsFavorite(true);
        }

        await AsyncStorage.setItem('favorites', JSON.stringify(favoriteArray));
    }

    return (
        <View style={styles.container}>
            <View style={styles.profile}>
                <Image
                    style={styles.avatar}
                    source={{ uri: teacher.avatar }}
                />
                <View style={styles.profileInfo}>
                    <Text style={styles.name}>{teacher.name}</Text>
                    <Text style={styles.subject}>{teacher.subject}</Text>
                </View>
            </View>

            <Text style={styles.bio}>
                {teacher.bio}
            </Text>

            <View style={styles.footer}>
                <Text style={styles.price}>
                    Preço/Hora {'   '}
                    <Text style={styles.priceValue}>R$ {teacher.cost}</Text>
                </Text>

                <View style={styles.buttonContainer}>
                    <RectButton
                        onPress={handleToggleFavorite}
                        style={[styles.favoriteButton, isFavorite ? styles.favorited : {}]}
                    >
                        {isFavorite ? <Image source={unFavoriteImg} /> : <Image source={heartOutlineImg} />}
                    </RectButton>

                    <RectButton
                        style={styles.contactButton}
                        onPress={handleWhatsapp}
                    >
                        <Image source={whatsappImg} />
                        <Text style={styles.contactButtonText}>Entrar em contato</Text>
                    </RectButton>
                </View>
            </View>
        </View>
    )
}

export default TeacherItem;
