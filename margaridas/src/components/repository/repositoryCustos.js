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

const repositoryCustos = ({data, props }) => {
    const [text, setText] = useState('');




    return(
        <ContainerCustos>
            <NameItem> {data.name}</NameItem>
            <NameCustos>Quantidade comprada: {data.quantidade} {data.unidade} </NameCustos>
            <NameCustos>preço que comprou: {data.price.toFixed(2)}R$</NameCustos>
            <InputCustos
                placeholder="Quanto vc utilizou desse material?"
                value={props.value}
                onChangeText={props.onChangeText}
            />
            <Button title="calcular"
                    onPress={}>
            </Button>
            <NameCusto>Custo do produto: </NameCusto>

        </ContainerCustos>
    )
};

export default repositoryCustos;
