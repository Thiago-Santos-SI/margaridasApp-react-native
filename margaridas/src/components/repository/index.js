import React from 'react';
import {Button, StyleSheet} from 'react-native'
import {
  Container,
  Name,
  ContainerIcons,
  ContainerButtons,

} from './styles';

const repository = ({data, onRefresh, deleteItem}) => (
  <Container>
    <Name>Nome: {data.name}</Name>
    <Name>Quantidade comprada: {data.quantidade} {data.unidade} </Name>
    <Name>preço que comprou: {data.price}.00 R$</Name>

    <ContainerIcons>
      <ContainerButtons>
        <Button
                onPress={onRefresh}
                title="Refresh"
                color="#2E86C1"
        >
        </Button>

        <Button onPress={deleteItem}
                title="delete"
                color="#CB4335">
        </Button>
      </ContainerButtons>
    </ContainerIcons>
  </Container>
);

export default repository;
