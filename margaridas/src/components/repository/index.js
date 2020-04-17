import React from 'react';
import {Button, StyleSheet} from 'react-native'
import {
  Container,
  Name,
  Description,
  Stats,
  Stat,
  StatCount,
  ContainerIcons,
  ContainerButtons,
  ButtonIcon,
  IconStar,
  IconFork,
  IconRefresh,
  IconTrash,
  IconWeb,
  IconEyes,
} from './styles';

const repository = ({data, onRefresh, deleteItem}) => (
  <Container>
    <Name>{data.name}</Name>
    <Name>{data.quantidade}</Name>
    <Name>{data.price}</Name>

    <ContainerIcons>
      <ContainerButtons style={styles.a}>

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

        <ButtonIcon onPress={() => {}}>

        </ButtonIcon>
      </ContainerButtons>
    </ContainerIcons>
  </Container>
);

const styles = StyleSheet.create({
  a: {
  },
});

export default repository;
