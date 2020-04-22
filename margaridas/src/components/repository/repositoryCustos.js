import React from 'react';
import {Button, StyleSheet, Text} from 'react-native'
import {
    Container,
    Name,
    ContainerIcons,
    ContainerButtons,
    NameItem,
    ContainerCustos, NameCustos
} from './styles';
import {Input, InputCustos} from "../../pages/Main/styles";

const repositoryCustos = ({data, onRefresh, deleteItem}) => (
    <ContainerCustos>
        <NameItem> {data.name}</NameItem>
        <NameCustos>Quantidade comprada: {data.quantidade} {data.unidade} </NameCustos>
        <NameCustos>preço que comprou: {data.price}.00 R$</NameCustos>
        <InputCustos
            placeholder="Quanto vc utilizou desse material?"

        />

    </ContainerCustos>
);

export default repositoryCustos;
