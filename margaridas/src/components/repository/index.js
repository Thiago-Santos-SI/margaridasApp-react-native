import React, {useState} from 'react';
import {StyleSheet, Button, View} from 'react-native'
import {
  Container,
  Name,
  ContainerIcons,
  ContainerButtons, NameQuantidade
} from './styles';
import { Icon, ThemeProvider } from 'react-native-elements';
import getRealm from "../../services/realm";
import Dialog, {DialogContent, DialogTitle, SlideAnimation} from "react-native-popup-dialog";
import {Form, Form2, Input} from "../../pages/Main/styles";



const repository = ({data, updateAnimation, deleteItem}) => {
    const [updateName, setUpdateName] = useState('');
    const [slideAnimation2, setSlideAnimation2] = useState(false);
    const [error, setError] = useState('');


    async function handleUpdate(repository){
        try {
            const realm = await getRealm();
            realm.write(()=>{
                realm.create('Repository', {id: data.id , name: updateName}, 'modified');
            });
            setUpdateName('');

        }catch (e) {
            console.log(e)
        }
    }

    return(
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
                <Icon
                    raised
                    name="edit"
                    type='font-awesome'
                    color='#256FC7'
                    onPress={() => {
                        setSlideAnimation2(true)
                    }}/>
            </ContainerIcons>

            <Dialog
                onDismiss={() => {
                    setSlideAnimation2(false)
                }}
                onTouchOutside={() => {
                    setSlideAnimation2(false)
                }}
                visible={slideAnimation2}
                dialogTitle={<DialogTitle title="Digite o novo nome do material selecionado   " />}
                dialogAnimation={new SlideAnimation({ slideFrom: 'bottom' })}>
                <DialogContent>
                    <Form>
                        <Input
                            error={error}
                            placeholder="Nome do material"
                            value={`${updateName}`}
                            onChangeText={text => setUpdateName(text)}
                        />
                    </Form>
                    <Form2>
                        <Button title="atualizar"
                                onPress={handleUpdate}>
                        </Button>
                    </Form2>

                </DialogContent>
            </Dialog>
        </Container>
    )
} ;

export default repository;
