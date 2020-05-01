import React, {useState, useEffect} from 'react';

import {Button, Text, View} from 'react-native';
import {
    Container, ContainerCustos, Form2, Input, InputCustos,
    List, Title,
} from '../Main/styles';
import RepositoryCustos from "../../components/repository/repositoryCustos";



import getRealm from "../../services/realm";
import {Name} from "../../components/repository/styles";


export default function Calcula() {
    const [repositories, setRepositories] = useState('');
    const [total, setTotal] = useState('');
    const [input, setInput] = useState('');


    useEffect(() => {
        async function loadRepository() {
            const realm = await getRealm();
            const data = realm.objects('Repository').sorted('name', true);
            const tint = realm.objects('Tinta');
            setRepositories(data);
        }
        loadRepository();
    }, []);

    return (
        <ContainerCustos >
            <Title>Todos seus Materiais</Title>
            <List
                keyboardShouldPersistTaps="handle"
                data={repositories}
                keyExtractor={item => String(item.id)}
                renderItem={({item}) => (
                    <RepositoryCustos
                        data={item}
                        value={input}
                        onChangeText={setInput}
                    />
                )}
            />
            <Title> Custo Total:  </Title>
        </ContainerCustos>
    );
}

Calcula.navigationOptions = {
    title: 'CalculaScreen',
};
