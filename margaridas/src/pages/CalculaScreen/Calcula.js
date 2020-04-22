import React, {useState, useEffect} from 'react';

import {Button, Text, View} from 'react-native';
import {
    Container, ContainerCustos, Form2,
    List, Loading, Title,


} from '../Main/styles';
import RepositoryCustos from "../../components/repository/repositoryCustos";
import getRealm from "../../services/realm";


export default function Calcula() {
    const [repositories, setRepositories] = useState('');

    useEffect(() => {
        async function loadRepository() {
            const realm = await getRealm();
            const data = realm.objects('Repository').sorted('name', true);
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

                    />
                )}
            />
            <Form2>
            <Button title='calcular custos'
                    //onPress={() => navigation.navigate('CalculaScreen')}
            >
            </Button>
            </Form2>
            <Title>Materiais </Title>
            <Title>Materiais</Title>


        </ContainerCustos>
    );
}



Calcula.navigationOptions = {
    title: 'CalculaScreen',
};
