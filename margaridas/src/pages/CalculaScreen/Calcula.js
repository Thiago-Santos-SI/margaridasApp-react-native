import React, {useState, useEffect} from 'react';

import {Button, Text, View, ScrollView, KeyboardAvoidingView, StyleSheet, Keyboard} from 'react-native';
import {
    Container, ContainerCustos, Form2, Input, InputCustos,
    List, Title, Formm, TitleTotal, Form, TitlePorcentagem
} from '../Main/styles';
import RepositoryCustos from "../../components/repository/repositoryCustos";


import getRealm from "../../services/realm";
import {Name} from "../../components/repository/styles";
import RepositoryTest from "../../components/repository/repositoryTest";
import Dialog, {DialogContent, DialogTitle, SlideAnimation} from "react-native-popup-dialog";
import Realm from 'realm'
import {Picker} from "@react-native-community/picker";

export default function Calcula({route}) {
    const [repositories, setRepositories] = useState('');
    const [tint, setTint] = useState('');
    const [input, setInput] = useState('');
    const [total,setTotal] = useState(0);
    const [slideAnimation, setSlideAnimation] = useState(false);
    const [lucro, setLucro] = useState('');
    const [error, setError] = useState('');
    const [porcentagem, setPorcentagem] = useState(0);
    const [venda, setVenda] = useState(0);
    const [selectedValue, setSelectedValue] = useState('metro');



    async function handleVenda(){
        setVenda(total + total * porcentagem )
        console.log(venda)
    }

    async function savePorcentagem(value) {
        const realm = await getRealm();
        const data = {
            id: 2,
            priceLucro: parseInt(value)
        };
        realm.write(() => {
            realm.create('Lucro', data, 'modified');
        });
        return data;
    }

    async function handleAddPorcentagem() {
        try {
            await savePorcentagem(selectedValue);
            console.log(selectedValue)
            const realm = await getRealm();
            let valuePorcentagem = realm.objects('Lucro').filtered('id = 2');
            for (let p of valuePorcentagem) {
                const val = `${p.priceLucro}`
                setPorcentagem(parseInt(val)/100)
                //console.log(porcentagem)
            }
            setError(false);
            Keyboard.dismiss();
        } catch (err) {
            setError(true);
        }
    }

    async function saveLucro(value) {
        const realm = await getRealm();
        const data = {
            id: 1,
            priceLucro: parseInt(value)
        };
        realm.write(() => {
            realm.create('Lucro', data, 'modified');
        });
        return data;
    }

    async function handleAddLucro(){
        try {
            const value = await saveLucro(lucro)
            console.log(value)
            setLucro('');
            const realm = await getRealm();
            let valuePorcentagem = realm.objects('Lucro');
            for (let p of valuePorcentagem) {
                const val = `${p.priceLucro}`
                setPorcentagem(parseInt(val)/100)
                //console.log(porcentagem)
            }
        }
        catch (e) {
            setError(true);
            console.log(e)
        }
    }

    async function handleTest(){
        const realm = await getRealm();
        let valuePorcentagem = realm.objects('Lucro');
        console.log(valuePorcentagem)
    }


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
                       // addPrecoVenda={setVenda(total + total)}
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
                    <Text>  </Text>
                    <Button
                        title="Calcular preço de venda"
                        color="#7A36B2"
                        onPress={handleVenda}
                    />

                </Form2>
                <TitleTotal> Custo Total: {total.toFixed(2)} R$</TitleTotal>
                <TitlePorcentagem> Preço de venda: {venda.toFixed(2)} R$</TitlePorcentagem>
                <TitlePorcentagem> Seu valor de lucro atual: {porcentagem} %</TitlePorcentagem>

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
                        <Picker
                            selectedValue={selectedValue}
                            style={styles.picker}
                            onValueChange ={(itemValue, itemIndex) => setSelectedValue(itemValue)}
                        >
                            <Picker.Item label="150%" value={150} />
                            <Picker.Item label="120%" value={120} />
                            <Picker.Item label="100%" value={100} />
                            <Picker.Item label="50%" value={50} />
                            <Picker.Item label="30%" value={30} />
                            <Picker.Item label="20%" value={20} />
                            <Picker.Item label="10%" value={10} />

                        </Picker>
                        <Input
                            error={error}
                            placeholder="Definir valor de lucro para calculo"
                            value={`${lucro}`}
                            onChangeText={number => setLucro(Number(number))}
                            keyboardType="numeric"

                        />
                    </Form>
                    <Form2>
                        <Button title="add"
                                onPress={handleAddLucro}>
                        </Button>
                        <Text> </Text>
                        <Button title="add p"
                                onPress={handleAddPorcentagem}>
                        </Button>
                        <Text> </Text>

                        <Button title="test"
                                onPress={handleTest}>
                        </Button>
                    </Form2>
                </DialogContent>
            </Dialog>

        </ContainerCustos>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    button: {
        padding: 5,
        backgroundColor: '#FFF'
    },
    picker:{
        height: 50,
        width: 150,
        backgroundColor:'#7a36b2',
        color:'#FFF',

    }
});

Calcula.navigationOptions = {
    title: 'CalculaScreen',
};
