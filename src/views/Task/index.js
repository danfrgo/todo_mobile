import React, {useState} from 'react';
import {  View,
    ScrollView,
    Image,
    Text,
    TextInput,
    KeyboardAvoidingView,
    TouchableOpacity,
    Switch,
    Alert,
    ActivityIndicator } from 'react-native';

import styles from './styles';

import api from '../../services/api';

// Componentes
import Header from '../../compoments/Header';
import Footer from '../../compoments/Footer';
import typeIcons from '../../utils/typeIcons';
import DateTimeInput from '../../compoments/DateTimeInput/index.android';


export default function Task({navigation}){

    const [done, setDone] = useState(false);
    const [type, setType] = useState();
    const [title, setTitle] = useState();
    const [description, setDescription] = useState();
    const [date, setDate] = useState();
    const [hour, setHour] = useState();
    const [macaddress, setMacaddress] = useState('11-11-11-11-11-11');

    async function New(){
        //Alert.alert(`${date}T${hour}`)

        if(!title)
            return Alert.alert('Escolha o nome da tarefa!');

        if(!description)
            return Alert.alert('Digite a descrição da tarefa!');

        if(!type)
            return Alert.alert('Escolha o tipo da tarefa!');

       // if(!date)
         //   return Alert.alert('Escolha uma data!');

         //if(!hour)
            //return Alert.alert('Escolha uma hora!');

            // passar a tarefa em json
            await api.post('/task', {
                macaddress,
                type,
                title,
                description,
                when: `${date}T${hour}.000`})
                .then(() => {
                        navigation.navigate('Home');
            });
}


    return (
        <KeyboardAvoidingView behavior='padding' style={styles.container}>
            <Header showBack={true} navigation={navigation} />
            <ScrollView style={{width: '100%'}}>

                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{marginVertical: 10}} >
                    {
                        // icon é a imagem e o index é a posiçao da imagem dentro do vetor
                        typeIcons.map((icon, index) => (
                            icon != null &&
                            // setType para atualizar o tipo de tarefa que está habilitada
                        <TouchableOpacity onPress={() => setType(index)}>
                            <Image source={icon} style={[styles.imageIcon, type && type != index && styles.typeIconInative ]} />
                        </TouchableOpacity>
                        ))
                    }
                </ScrollView>


                <Text style={styles.label}>Título</Text>
                <TextInput style={styles.input} maxLength={30} placeholder="Lembre-me de fazer..." 
                //a propriedade onChangeText é disparada sempre que atualiza o conteudodo textinput
                onChangeText={(text) => setTitle(text)}
                value={title}
                />

                <Text style={styles.label}>Detalhes</Text>
                <TextInput style={styles.inputarea} maxLength={200} multiline={true} placeholder="Detalhes da atividade..." 
                onChangeText={(text) => setDescription(text)}
                value={description}
                />


                <DateTimeInput type={'date'} save={setDate} />
                <DateTimeInput type={'hour'} save={setHour} />

                <View style={styles.inLine}>
                    <View style={styles.inputInline}>
                        <Switch onValueChange={() => setDone(!done)} value={done} thumbColor={done ? '#00761B' : '#EE6B26'}/>
                        <Text style={styles.switchLabel}>Concluído</Text>
                    </View>
                    <TouchableOpacity>
                        <Text style={styles.removeLabel}>EXCLUÍR</Text>
                    </TouchableOpacity>
                </View>



            </ScrollView>

            <Footer icon={'save'} onPress={New} />
        </KeyboardAvoidingView>
    )
}
