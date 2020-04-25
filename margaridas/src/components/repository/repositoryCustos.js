import React, {useState, useEffect} from 'react';
import {Button, StyleSheet, Text} from 'react-native'
import {
    Container,
    Name,
    ContainerIcons,
    ContainerButtons,
    NameItem,
    ContainerCustos, NameCustos, NameCusto
} from './styles';
import {Input, InputCustos} from "../../pages/Main/styles";
import {} from '../../pages/Main/index'
import getRealm from "../../services/realm";

const repositoryCustos = ({data, props, value, onChangeText }) => {
    const [input, setInput] = useState('');

    async function handleCompareValue(repo){
        const realm = await getRealm();
        let list = realm.objects('Repository')
        for (let p of list) {
            const value = ` ${(p.price * input)/p.quantidade} `
            console.log(value)
        }
        setInput('')
        //console.tron.log(price)
    }

    return(
        <ContainerCustos>
            <NameItem> {data.name}</NameItem>
            <NameCustos>Quantidade comprada: {data.quantidade} {data.unidade} </NameCustos>
            <NameCustos>preço que comprou: {data.price.toFixed(2)}R$</NameCustos>
            <InputCustos
                placeholder="Quanto vc utilizou desse material?"
                value={input}
                onChangeText={setInput}
            />
            <Button title="calcular"
                    onPress={handleCompareValue}>
            </Button>
            <NameCusto>Custo do produto: </NameCusto>

        </ContainerCustos>
    )
};

export default repositoryCustos;
