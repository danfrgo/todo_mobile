import React from 'react';
import {Text, View, Image, TouchableOpacity, Touchable} from 'react-native';

import styles from './styles';

import iconDefault from '../../assets/default.png';

export default function TaskCard({done}){
    return(
        <TouchableOpacity style={[styles.card, done && styles.done]}>
            <View style={styles.cardLeft}>
                <Image source={iconDefault} style={styles.typeActive} />
                <Text style={styles.cardTitle}>Fazer relatório</Text>
            </View>


            <View style={styles.cardRight}>
                <Text style={styles.cardDate}>17/12/2021</Text>
                <Text style={styles.cardTime}>10:00</Text>

            </View>

        </TouchableOpacity>
    )

}