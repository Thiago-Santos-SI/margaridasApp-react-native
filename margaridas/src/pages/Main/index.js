import React, {useState, useEffect} from 'react';
import {Keyboard, Alert, View, Button, StyleSheet, Text} from 'react-native';
import {
    Container,
    Title,
    Form,
    Input,
    List,
    Loading,
    Form2,

} from './styles';
import Repository from '../../components/repository/index';
import RepositoryTest from '../../components/repository/repositoryTest';
import Dialog, {

    DialogTitle,
    DialogContent,
    SlideAnimation,
} from 'react-native-popup-dialog';


import {Picker} from '@react-native-community/picker';
import Realm from 'realm'
import getRealm from '../../services/realm';
import TintaSchema from "../../schemas/TintaSchema";
import {ContainerCustos, Name} from "../../components/repository/styles";

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
export default function Main({navigation}) {
    const [input, setInput] = useState('');
    const [inputQuantidade, setInputQuantidade] = useState('');
    const [inputPrice, setInputPrice] = useState('');
    const [selectedValue, setSelectedValue] = useState('metro');
    const [error, setError] = useState('');
    const [loading, setloading] = useState(false);
    const [repositories, setRepositories] = useState('');
    const [repositoriesTint, setRepositoriesTint] = useState('');
    const [slideAnimation, setSlideAnimation] = useState(false);
    const [tinta, setTinta] = useState('');

    async function saveTinta(value) {
        const realm = await getRealm();
        /*
        const ID = realm.objects('Tinta').sorted('id', true).length > 0
            ? realm.objects('Tinta').sorted('id', true)[0]
            .id + 1
            : 1; */
       // let dado = realm.objects('Tinta')[0]

        const data = {
            id: 1,
            priceTinta: parseInt(value)
        };
        realm.write(() => {
            realm.create('Tinta', data, 'modified');
        });
        return data;
    }

    async function handleAddTinta(){
        try {
            const value = await saveTinta(tinta)
            console.log(value)
            setTinta('');
        }
        catch (e) {
            setError(true)
        }

    }

    async function handleDeletTint(){
        const realm = await getRealm();
        realm.write(() => {
            let allTint = realm.objects('Tinta');
            realm.delete(allTint);
            console.log(allTint)
        })
    }

    async function handleTest(){

        const realm = await getRealm();

        const tint = realm.objects('Tinta');
        for (let p of tint) {
            console.log(`  ${p.priceTinta}`);
        }

        const dado = realm.objects('Tinta')[0];
        console.log(dado)
    }

    async function saveRepository(valueInputName, valueInputQuant, valueInputPrice, valuePicker) {
        const realm = await getRealm();
        //auto-increment
        const ID = realm.objects('Repository').sorted('id', true).length > 0
            ? realm.objects('Repository').sorted('id', true)[0]
            .id + 1
            : 1;
        const data = {
            id: ID,
            name: valueInputName,
            quantidade: valueInputQuant,
            price: valueInputPrice,
            unidade: valuePicker,
        };
        realm.write(() => {
            realm.create('Repository', data, 'modified');
        });

        return data;
    }


    async function handleAddRepository() {
        try {
            await saveRepository(input, inputQuantidade, inputPrice, selectedValue);
            setInput('');
            setInputQuantidade('');
            setInputPrice('');
            setError(false);
            Keyboard.dismiss();
        } catch (err) {
            setError(true);
        }
        //setloading(false);
    }


    async function handleDelRepository(repository) {
        Alert.alert(
            'Atenção!',
            `Deseja excluir o Material "${repository.name}"?`,
            [
                {
                    text: 'Confirmar',
                    onPress: async () => {
                        try {
                            const realm = await getRealm();
                            realm.write(() => realm.delete(repository));
                            const data = realm.objects('Repository').sorted('name', true);
                            setRepositories(data);
                        } catch (err) {
                            console.log('Algo de errado não esta certo', err);
                        }
                    },
                },
                {text: 'Cancelar', onPress: () => {}},
            ],
        );
    }

    useEffect(() => {
        async function loadRepository() {
            const realm = await getRealm();
            const data = realm.objects('Repository').sorted('name', true);
            setRepositories(data);
        }
        loadRepository();
    }, []);

    return (
        <Container>
            <Form>
                <Title>Materiais</Title>
                <Button
                    title="Definir valor da tinta"
                    color="#40A36D"
                    onPress={() => {
                        setSlideAnimation(true)
                    }}
                />
            </Form>
            <Form>
                <Input
                    autocCapitalize="none"
                    autoCorrect={false}
                    error={error}
                    placeholder="Nome material"
                    value={input}
                    editable={!loading}
                    onChangeText={(input) =>setInput(input)}
                    keyboardShouldPersistTaps="handle"
                />
            </Form>
            <Form>
                <Input
                    autocCapitalize="none"
                    autoCorrect={false}
                    error={error}
                    placeholder="Quantidade comprada"
                    value={`${inputQuantidade}`}
                    editable={!loading}
                    onChangeText={text => setInputQuantidade(Number(text))}
                    keyboardShouldPersistTaps="handle"
                    keyboardType="numeric"


                />
                <Picker
                    selectedValue={selectedValue}
                    style={styles.picker}
                    onValueChange ={(itemValue, itemIndex) => setSelectedValue(itemValue)}
                >
                    <Picker.Item label="metro" value="metro" />
                    <Picker.Item label="centimetro" value="centimetro" />
                </Picker>
            </Form>
            <Form>
                <Input
                    error={error}
                    placeholder="Preço que comprou"
                    value={`${inputPrice}`}
                    onChangeText={number => setInputPrice(Number(number))}
                    keyboardType="numeric"

                />
            </Form>

            <Form2>
                <Button
                    color="#40A36D"
                    title='Adicionar'
                    onPress={handleAddRepository}>
                </Button>
                <Text> </Text>
                <Button
                    color="#40A36D"
                    title='calcular custos'
                    onPress={() => navigation.navigate('CalculaScreen', {valorTinta:tinta})}>
                </Button>
                <Text> </Text>
                <Button
                    color="#40A36D"
                    title='Test'
                    onPress={handleTest}>
                </Button>
            </Form2>

            <List
                keyboardShouldPersistTaps="handle"
                dataTint={repositoriesTint}
                data={repositories}
                keyExtractor={item => String(item.id)}
                renderItem={({item}) => (
                    <Repository
                        data={item}
                        dataTint={tinta}
                        //onRefresh={() => handleRefreshRepository(item)}
                        deleteItem={() => handleDelRepository(item)}
                    />
                )}
            />

            <Dialog
                onDismiss={() => {
                    setSlideAnimation(false)
                }}
                onTouchOutside={() => {
                    setSlideAnimation(false)
                }}
                visible={slideAnimation}
                dialogTitle={<DialogTitle title="Valor da tinta para o calculo" />}
                dialogAnimation={new SlideAnimation({ slideFrom: 'bottom' })}>
                <DialogContent>
                    <Form>
                        <Input
                            error={error}
                            placeholder="Definir preço da tinta"
                            value={`${tinta}`}
                            onChangeText={number => setTinta(Number(number))}
                            keyboardType="numeric"

                        />
                        <Button title="add"
                                onPress={handleAddTinta}>
                        </Button>
                        <Button title="del"
                                onPress={handleDeletTint}>
                        </Button>
                    </Form>
                </DialogContent>
            </Dialog>

        </Container>
    );
}

Main.navigationOptions = {
    title: 'HomeScreen',
};
