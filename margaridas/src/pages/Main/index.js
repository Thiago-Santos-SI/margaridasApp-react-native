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
        unidade: valuePicker

    };
    if (valueInputName === undefined || '' ){
        setError(true);
    }else{
        realm.write(() => {
            realm.create('Repository', data, 'modified');
        });
    }
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
          if (input === undefined || ''){
              setError(true);
          }
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

  /*
  async function handleRefreshRepository(dados_repo) {
    const response = await api.get(`/repos/${dados_repo.fullName}`);
    const data = await saveRepository(response.data);
    setRepositories(
      repositories.map(repo => (repo.id == data.id ? data : repo)),
    );
  }
   */

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
      <Title>Materiais</Title>
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
              style={{ height: 50, width: 150, backgroundColor:'#7A36B2', color:'#FFF' }}
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
              title='Adicionar'
              onPress={handleAddRepository}>
          </Button>
          <Text> </Text>
          <Button
              title='calcular custos'
              onPress={() => navigation.navigate('CalculaScreen')}>
          </Button>
      </Form2>

      <List
        keyboardShouldPersistTaps="handle"
        data={repositories}
        keyExtractor={item => String(item.id)}
        renderItem={({item}) => (
          <Repository
            data={item}
            //onRefresh={() => handleRefreshRepository(item)}
            deleteItem={() => handleDelRepository(item)}
          />
        )}
      />
    </Container>
  );
}
const styles = StyleSheet.create({
    button: {
        padding: 5,
        backgroundColor: '#FFF'
    },
});

Main.navigationOptions = {
  title: 'HomeScreen',
};
