 import React, {useState, useEffect} from 'react';
import {Button, Keyboard, StyleSheet, Text} from 'react-native'
import {
    NameItem,
    ContainerCustos, NameCustos, NameCusto, NameResult, NameCheck
} from './styles';
import {
    Form, Input,
    InputCustos,Form2,
} from "../../pages/Main/styles";

 import CheckBox from '@react-native-community/checkbox';

const repositoryCustos = ({data, props, onChangeText }) => {

    const [input, setInput] = useState('');
    const [result, setResult] = useState(0);
    const [error, setError] = useState('');
    const [isSelected, setSelection] = useState(false);

    async function handleCompareValue(){
        try {
            const value = ` ${isSelected ? (2+(data.price * input)/data.quantidade) : (data.price * input)/data.quantidade}`
            if (value == 0 || undefined || null){
                setError(true);
            }else {
                console.log(value)
                setResult(value)
                setInput('')
                setError(false)
                Keyboard.dismiss();
            }
        }catch (e) {
            setError(true)
        }
    }


    return(
        <ContainerCustos>
            <NameItem> {data.name}</NameItem>
            <NameCustos>Quantidade comprada: {data.quantidade} {data.unidade} </NameCustos>
            <NameCustos>preço que comprou: {data.price.toFixed(2)}R$</NameCustos>
            <Form>
            <CheckBox
                value={isSelected}
                onValueChange={setSelection}
                />
            <NameCheck>Usou tinta nesse material? {isSelected ? "👍" : "👎"}</NameCheck>
            </Form>
            <InputCustos
                placeholder="Quanto vc utilizou desse material?"
                autocCapitalize="none"
                error={error}
                value={input}
                onChangeText={setInput}
                keyboardType="numeric"
            />
            <Text> </Text>
            <Button title="calcular"
                    color="#7A36B2"
                    onPress={handleCompareValue}>
            </Button>

            <NameCusto>Custo do produto: <NameResult> {result} R$ </NameResult> </NameCusto>
        </ContainerCustos>

    )
};


export default repositoryCustos;
