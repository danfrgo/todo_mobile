import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, ScrollView, ActivityIndicator} from 'react-native';

import styles from './styles';

// COMPONENTES
import Header from '../../compoments/Header';
import Footer from '../../compoments/Footer';
import TaskCard from '../../compoments/TaskCard';

// conexao com API
import api from '../../services/api';


export default function Home(){

    const [filter, setFilter] = useState('today');
    const [tasks, setTasks] = useState([]); // para armazenar uma coleçao de tarefas da BD
    const [load, setLoad] = useState(false);

    // carregar as tarefas da BD
    async function loadTasks(){
        setLoad(true);
        await api.get(`/task/filter/${filter}/11-11-11-11-11-11`)
        .then(response => {
            setTasks(response.data)
            setLoad(false);
        });
    }

    useEffect(() => {
        loadTasks();
    }, [filter])
    

    return(

        <View style={styles.container}>
            <Header showNotification={true} showBack={false} />

            <View style={styles.filter}>
                <TouchableOpacity onPress={ () => setFilter('all')}>
                    <Text style={filter == 'all' ? styles.filterTextActived : styles.filterTextInative}>Todos</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={ () => setFilter('today')}>
                    <Text style={filter == 'today' ? styles.filterTextActived : styles.filterTextInative}>Hoje</Text>
                </TouchableOpacity>


                <TouchableOpacity onPress={ () => setFilter('month')}>
                  <Text style={filter == 'month' ? styles.filterTextActived : styles.filterTextInative}>Mês</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={ () => setFilter('week')}>
                    <Text style={filter == 'week' ? styles.filterTextActived : styles.filterTextInative}>Semana</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={ () => setFilter('year')}>
                    <Text style={filter == 'year' ? styles.filterTextActived : styles.filterTextInative}>Ano</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.title}>
                <Text style={styles.titleText}>Tarefas</Text>
            </View>

            

            <ScrollView style={styles.content} contentContainerStyle={{alignItems: 'center'}}>         
                {
                    load ? 

                    <ActivityIndicator color='#EE6B26' size={50} />

                    :

                    tasks.map( t => 
                        (// map vai percorrer cada item que estiver dentro da coleçao de forma automatica                   
                             <TaskCard  done={false} title={t.title} when={t.when} type={t.type} />
                    ))
                }
            </ScrollView>

        


            <Footer icon={'add'} />
        </View>
        
    )
}

 