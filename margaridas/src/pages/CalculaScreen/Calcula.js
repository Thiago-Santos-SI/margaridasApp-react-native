import React, {useState, useEffect} from 'react';

import {Button, Text, View} from 'react-native';
import {
    Container, ContainerCustos, Form2, Input, InputCustos,
    List, Title,
} from '../Main/styles';
import RepositoryCustos from "../../components/repository/repositoryCustos";



import getRealm from "../../services/realm";
import {Name} from "../../components/repository/styles";
import RepositoryTest from "../../components/repository/repositoryTest";


export default function Calcula({route}) {
    const [repositories, setRepositories] = useState('');
    const [tint, setTint] = useState('');
    const [input, setInput] = useState('');
    const [total,setTotal] = useState(0);

    useEffect(() => {
        async function loadRepository() {
            const realm = await getRealm();
            const data = realm.objects('Repository').sorted('name', true);
            const data2 = realm.objects('Tinta');
            setRepositories(data);
            setTint(data2)
        }
        loadRepository();
    }, []);

    return (
        <ContainerCustos >
            <Title>Todos seus Materiais</Title>
            <List
                keyboardShouldPersistTaps="handle"
                dataTint={tint}
                data={repositories}
                keyExtractor={item => String(item.id)}
                renderItem={({item}) => (
                    <RepositoryCustos
                        data={item}
                        dataTint={route.params['valorTinta']}
                        value={input}
                        onChangeText={setInput}
                        addPrecoTotal={(valor) => setTotal(state => state + valor)}
                    />
                )}

            />
            <Title> Custo Total: {total}</Title>
        </ContainerCustos>
    );
}

Calcula.navigationOptions = {
    title: 'CalculaScreen',
};
