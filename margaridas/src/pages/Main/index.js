import React, {useState, useEffect} from 'react';
import {Keyboard, StyleSheet} from 'react-native';
import {
    Container,
    Title,
    Form,
    Input,
    List,
    Form2,
} from './styles';
import Repository from '../../components/repository/index';
import { Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';


import {Picker} from '@react-native-community/picker';
import getRealm from '../../services/realm';


export default function Main({navigation}) {
    const [input, setInput] = useState('');
    const [inputQuantidade, setInputQuantidade] = useState('');
    const [inputPrice, setInputPrice] = useState('');
    const [selectedValue, setSelectedValue] = useState('metro');
    const [error, setError] = useState('');
    const [loading, setloading] = useState(false);
    const [repositories, setRepositories] = useState('');
    const [repositoriesTint, setRepositoriesTint] = useState('');
    const [tinta, setTinta] = useState('');
    const [count, setCount] = useState('');


    const saveRepository = async (valueInputName, valueInputQuant, valueInputPrice, valuePicker) => {
        const realm = await getRealm();
        //auto-increment
        const ID = realm.objects('Repository').sorted('id', true).length > 0
            ? realm.objects('Repository').sorted('id', true)[0]
            .id + 1
            : 1;
        const data = {
            id: ID,
            name: valueInputName,
            quantidade: parseFloat(valueInputQuant),
            price: parseFloat(valueInputPrice),
            unidade: valuePicker,
        };
        realm.write(() => {
            realm.create('Repository', data, 'modified');
        });
        return data;
    }

    async function handleAddRepository() {
        try {
            await saveRepository(input, parseFloat(inputQuantidade), parseFloat(inputPrice), selectedValue);
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

     const handleDeleteRepository = async (repository) => {
        try {
            const realm = await getRealm();
            realm.write(() => realm.delete(repository));
            const data = realm.objects('Repository').sorted('name', true);
            setRepositories(data);
        } catch (err) {
            console.log('Algo de errado não esta certo', err);
        }
    }

    useEffect(()=>{
        async function CheckItem(){
            const realm = await getRealm()
            const data = realm.objects('Repository')
            const val = data.length;
            if (val < 1){
                setCount('')
            }else {
                setCount('Materiais')
            }
        }
        CheckItem()
    },[handleAddRepository])


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
                <Title>Cadastro</Title>
                <Button
                    title="calcular custos   "
                    raised={true}
                    color="#7a36b2"
                    iconRight={true}
                    icon={
                        <Icon
                            name="arrow-right"
                            size={30}
                            color="white"
                        />
                    }
                    onPress={() => navigation.navigate('CalculaScreen', {valorTinta:tinta})}
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
                    onChangeText={text => setInputQuantidade((text))}
                    keyboardShouldPersistTaps="handle"
                    keyboardType="numeric"
                />

                <Picker style={styles.picker}
                    selectedValue={selectedValue}
                    onValueChange ={(itemValue, itemIndex) => setSelectedValue(itemValue)}>

                    <Picker.Item label="metro" value="metro" />
                    <Picker.Item label="centimetro" value="centimetro" />
                </Picker>
            </Form>
            <Form>
                <Input
                    error={error}
                    placeholder="Preço que comprou"
                    value={`${inputPrice}`}
                    onChangeText={number => setInputPrice(number)}
                    keyboardType="numeric"

                />
            </Form>

            <Form2>
                <Button
                    color='#256FC7'
                    raised={true}
                    title='Adicionar'
                    onPress={handleAddRepository}>
                </Button>

            </Form2>
            <Title> {count}</Title>
            <List
                keyboardShouldPersistTaps="handle"
                dataTint={repositoriesTint}
                data={repositories}
                keyExtractor={item => String(item.id)}
                renderItem={({item}) => (
                    <Repository
                        data={item}
                        dataTint={tinta}
                        deleteItem={() => handleDeleteRepository(item)}
                    />
                    )}
            />

        </Container>
    );
}

const styles = StyleSheet.create({
    button: {
        padding: 5,
        backgroundColor: '#FFF',
        flex:1,
        alignSelf: 'center'
    },
    picker:{
        height: 50,
        width: 150,
        backgroundColor:'#7a36b2',
        color:'#FFF',
    }
});

Main.navigationOptions = {
    title: 'HomeScreen',
};
