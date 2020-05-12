import React from 'react';
import {StyleSheet, Button, View} from 'react-native'
import {
  Container,
  Name,
  ContainerIcons,
  ContainerButtons, NameQuantidade
} from './styles';
import { Icon, ThemeProvider } from 'react-native-elements';


const repository = ({data, dataTint, onRefresh, deleteItem}) => (
  <Container>
      <View>
      <Name>Nome: {data.name.toUpperCase()}</Name>
      <NameQuantidade>Quantidade comprada: {data.quantidade} {data.unidade} </NameQuantidade>
      <Name>preço que comprou: {data.price.toFixed(2)}R$</Name>
      </View>

    <ContainerIcons>
              <Icon
                  raised
                  name='trash'
                  type='font-awesome'
                  color='#f50'
                  onPress={deleteItem}
              />
    </ContainerIcons>
  </Container>
);

export default repository;
