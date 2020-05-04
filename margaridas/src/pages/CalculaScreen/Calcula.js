import React, {useState, useEffect} from 'react';

import {Button, Text, View, ScrollView, KeyboardAvoidingView} from 'react-native';
import {
    Container, ContainerCustos, Form2, Input, InputCustos,
    List, Title, Formm, TitleTotal, Form
} from '../Main/styles';
import RepositoryCustos from "../../components/repository/repositoryCustos";


import getRealm from "../../services/realm";
import {Name} from "../../components/repository/styles";
import RepositoryTest from "../../components/repository/repositoryTest";
import Dialog, {DialogContent, DialogTitle, SlideAnimation} from "react-native-popup-dialog";


export default function Calcula({route}) {
    const [repositories, setRepositories] = useState('');
    const [tint, setTint] = useState('');
    const [input, setInput] = useState('');
    const [total,setTotal] = useState(0);
    const [slideAnimation, setSlideAnimation] = useState(false);
    const [lucro, setLucro] = useState('');
    const [error, setError] = useState('');




    useEffect(() => {
        async function loadRepository() {
            const realm = await getRealm();
            const data = realm.objects('Repository').sorted('name', true);
            const data2 = realm.objects('Tinta');
            setRepositories(data);
            setTint(data2)
        }
        loadRepository();
    }, []);

    return (
        <KeyboardAvoidingView
            style={{flex: 1}}
        >
        <ContainerCustos >
            <Title>Todos seus Materiais</Title>

            <List
                horizontal={true}
                keyboardShouldPersistTaps="handle"
                dataTint={tint}
                data={repositories}
                keyExtractor={item => String(item.id)}
                renderItem={({item}) => (
                    <RepositoryCustos
                        data={item}
                        dataTint={route.params['valorTinta']}
                        value={input}
                        onChangeText={setInput}
                        addPrecoTotal={(valor) => setTotal(state => state + valor)}
                    />
                )}
            />

            <Formm>
                <Form2>
                    <Button
                        title="Definir valor de lucro"
                        color="#7A36B2"
                        onPress={() => setSlideAnimation(true)}
                    />
                </Form2>
                <TitleTotal> Custo Total: {total.toFixed(2)} R$</TitleTotal>
                <TitleTotal> Preço de venda: </TitleTotal>
            </Formm>

            <Dialog
                onDismiss={() => {
                    setSlideAnimation(false)
                }}
                onTouchOutside={() => {
                    setSlideAnimation(false)
                }}
                visible={slideAnimation}
                dialogTitle={<DialogTitle title="Definir valor de lucro para calculo             " />}
                dialogAnimation={new SlideAnimation({ slideFrom: 'bottom' })}>
                <DialogContent>
                    <Form>
                        <Input
                            error={error}
                            placeholder="Definir valor de lucro para calculo"
                            value={`${lucro}`}
                            onChangeText={number => setLucro(Number(number))}
                            keyboardType="numeric"

                        />
                        <Button title="add"
                               >
                        </Button>
                    </Form>
                </DialogContent>
            </Dialog>

        </ContainerCustos>
        </KeyboardAvoidingView>
    );
}

Calcula.navigationOptions = {
    title: 'CalculaScreen',
};
