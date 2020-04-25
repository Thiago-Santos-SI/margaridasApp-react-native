import React, {useState, useEffect} from 'react';

import {Button, Text, View} from 'react-native';
import {
    Container, ContainerCustos, Form2, Input, InputCustos,
    List, Title,
} from '../Main/styles';
import RepositoryCustos from "../../components/repository/repositoryCustos";
import getRealm from "../../services/realm";


export default function Calcula() {
    const [repositories, setRepositories] = useState('');
    const [valueInput, setValueInput] = useState('');
    const [input, setInput] = useState('');
    const [inputPrice, setInputPrice] = useState('');


    async function handleCompareValue(price){
        const realm = await getRealm();
        let list = realm.objects('Repository').filtered('price =  9');
        for (let p of list) {
            console.log(`  ${(p.price * input)/p.quantidade} `);
        }
        setInput('')
        //console.tron.log(price)
    }


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
                <InputCustos
                    placeholder="Quanto vc utilizou desse material?"
                    value={`${input}`}
                    onChangeText={text => setInput(Number(text))}
                    keyboardType="numeric"

                />

            </Form2>

            <Form2>
            <Button title='calcular custos'
                    onPress={handleCompareValue}
            >
            </Button>
            </Form2>



        </ContainerCustos>
    );
}



Calcula.navigationOptions = {
    title: 'CalculaScreen',
};
