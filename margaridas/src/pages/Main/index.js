import React, {useState, useEffect} from 'react';
import {Keyboard, Alert} from 'react-native';
import {
  Container,
  Title,
  Form,
  Input,
  Submit,
  IconAdd,
  List,
  Loading,
} from './styles';
import Repository from '../../components/repository/index';

import api from '../../services/api';
import getRealm from '../../services/realm';
import {isDeclaredPredicate} from '@babel/types';

export default function Main() {
  const [input, setInput] = useState('');
  const [error, setError] = useState('');
  const [loading, setloading] = useState(false);
  const [repositories, setRepositories] = useState('');

  async function saveRepository(valueInput) {
    const realm = await getRealm();
    const id = realm.objects('Repository').sorted('id', true).length > 0
        ? realm.objects('Repository').sorted('id', true)[0]
        .id + 1
        : 1;

    const data = {
      id,
      name: valueInput,
    };

    realm.write(() => {
      realm.create('Repository', data, 'modified');
    });
    return data;
  }

  async function handleAddRepository() {

    setloading(true);
   // try {

      // const response = await api.get(`/repos/${input}`);
      await saveRepository(input);
      setInput('');
      setError(false);
      Keyboard.dismiss();
  //  } catch (err) {
     // setError(true);
   // }
    setloading(false);
  }

  async function handleAdd(){
    console.tron.log(input);
    //console.log(input)
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
      <Title>Repositórios</Title>

      <Form>
        <Input
          autocCapitalize="none"
          autoCorrect={false}
          error={error}
          placeholder="Procurar repositório..."
          value={input}
          editable={!loading}
          onChangeText={setInput}
          keyboardShouldPersistTaps="handle"
        />
        <Submit onPress={handleAddRepository}>
          {loading ? <Loading /> : <IconAdd />}
        </Submit>
      </Form>

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
