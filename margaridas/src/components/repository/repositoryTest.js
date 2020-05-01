import React from 'react';
import { StyleSheet, Button} from 'react-native'
import {
    Container,
    Name,
    ContainerIcons,
    ContainerButtons,
} from './styles';

const repositoryTest = ({data}) => (
    <Container>
        <Name>tinta: {data.priceTinta}</Name>
    </Container>
);

export default repositoryTest;
