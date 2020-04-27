import React, {useState, useEffect} from 'react';
import {Button, StyleSheet, Text} from 'react-native'
import {
    NameItem,
    ContainerCustos, NameCustos, NameCusto, NameResult
} from './styles';
import {
    Form, Input,
    InputCustos,Form2
} from "../../pages/Main/styles";
import getRealm from "../../services/realm";

const repositoryCustos = ({data, props, value, onChangeText }) => {

    const [input, setInput] = useState('');
    const [result, setResult] = useState(0);

    async function handleCompareValue(){
        const value = ` ${(data.price * input)/data.quantidade} `
        console.log(value)
        setResult(value)
        setInput('')
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
                keyboardType="numeric"
            />
            <Button title="calcular"
                    color="#7A36B2"
                    onPress={handleCompareValue}>
            </Button>

            <NameCusto>Custo do produto: <NameResult> {result}R$ </NameResult> </NameCusto>
        </ContainerCustos>

    )
};


export default repositoryCustos;
