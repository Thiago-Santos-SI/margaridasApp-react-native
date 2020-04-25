import React from 'react';
import { StyleSheet, Button} from 'react-native'
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
    <Name>preço que comprou: {data.price.toFixed(2)}R$</Name>

    <ContainerIcons>
      <ContainerButtons>


        <Button onPress={deleteItem}
                title="delete"
                color="#CB4335">
        </Button>
      </ContainerButtons>
    </ContainerIcons>
  </Container>
);

export default repository;
