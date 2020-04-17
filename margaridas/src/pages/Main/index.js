import React, {useState, useEffect} from 'react';
import {Keyboard, Alert, View, Button} from 'react-native';
import {
  Container,
  Title,
  Form,
  Input,
  Submit,
  IconAdd,
  List,
  Loading,
  Form2
} from './styles';
import Repository from '../../components/repository/index';

import api from '../../services/api';
import getRealm from '../../services/realm';
import {isDeclaredPredicate} from '@babel/types';

export default function Main() {
  const [input, setInput] = useState('');
  const [inputQuantidade, setInputQuantidade] = useState('');
  const [inputPrice, setInputPrice] = useState('');


  const [error, setError] = useState('');
  const [loading, setloading] = useState(false);
  const [repositories, setRepositories] = useState('');

  async function saveRepository(valueInputName, valueInputQuant, valueInputPrice) {
    const realm = await getRealm();
    const ID = realm.objects('Repository').sorted('id', true).length > 0
        ? realm.objects('Repository').sorted('id', true)[0]
        .id + 1
        : 1;
    const data = {
      id: ID,
      name: valueInputName,
      quantidade: valueInputQuant,
      price: valueInputPrice,
    };
    realm.write(() => {
      realm.create('Repository', data, 'modified');
    });
    return data;
  }

  async function handleAddRepository() {
      await saveRepository(input, inputQuantidade, inputPrice);
      setInput('');
      setInputQuantidade('');
      setInputPrice('');
      setError(false);
      Keyboard.dismiss();
   // } catch (err) {
     // setError(true);
    //}
    //setloading(false);
  }

  async function handleDelRepository(repository) {
    Alert.alert(
      'Atenção!',
      `Deseja excluir o repositório "${repository.name}"?`,
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

  async function handleRefreshRepository(dados_repo) {
    const response = await api.get(`/repos/${dados_repo.fullName}`);
    const data = await saveRepository(response.data);
    setRepositories(
      repositories.map(repo => (repo.id == data.id ? data : repo)),
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
            onChangeText={number => setInputQuantidade(number)}
            keyboardShouldPersistTaps="handle"
            keyboardType="numeric"


        />
      </Form>
      <Form>
        <Input
            autocCapitalize="none"
            autoCorrect={false}
            error={error}
            placeholder="Preço que comprou"
            value={`${inputPrice}`}
            editable={!loading}
            onChangeText={number => setInputPrice(number)}
            keyboardShouldPersistTaps="handle"
            keyboardType="numeric"

        />
      </Form>
      <Form2>
        <Button title="Adicionar" onPress={handleAddRepository}>
          {loading ? <Loading /> : <Button
              title=""/>}
        </Button>
      </Form2>

      <List
        keyboardShouldPersistTaps="handle"
        data={repositories}
        keyExtractor={item => String(item.id)}
        renderItem={({item}) => (
          <Repository
            data={item}
            onRefresh={() => handleRefreshRepository(item)}
            deleteItem={() => handleDelRepository(item)}
          />
        )}
      />


    </Container>
  );
}


Main.navigationOptions = {
  title: 'HomeScreen',
};
