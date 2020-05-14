import React, {useState} from 'react';
import {Text, Button, View} from 'react-native'
import {
  Container, Name, ContainerIcons, NameQuantidade
} from './styles';
import { Icon, ThemeProvider } from 'react-native-elements';
import getRealm from "../../services/realm";
import Dialog, {DialogContent, DialogTitle, SlideAnimation, DialogButton, DialogFooter} from "react-native-popup-dialog";
import {Form, Input} from "../../pages/Main/styles";



export const repository = ({data, deleteItem, }) => {
    const [updateName, setUpdateName] = useState('');
    const [slideAnimation2, setSlideAnimation2] = useState(false);
    const [defaultAnimationDialog, setDefaultAnimationDialog] = useState(false);
    const [error, setError] = useState('');


    async function handleUpdate(){
        try {
            const realm = await getRealm();
            realm.write(()=>{
                realm.create('Repository', {
                    id: data.id ,
                    name: updateName
                    },
                    'modified');
            });
            setUpdateName('');
            setSlideAnimation2(false)

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
                  onPress={() => {setDefaultAnimationDialog(true)}}
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
                dialogAnimation={new SlideAnimation({ slideFrom: 'bottom' })}
                footer={
                <DialogFooter>
                    <DialogButton
                        text="atualizar"
                        bordered
                        onPress={handleUpdate}
                    />
                </DialogFooter>
                }>
                <DialogContent>
                    <Form>
                        <Input
                            error={error}
                            placeholder="Nome do material"
                            value={`${updateName}`}
                            onChangeText={text => setUpdateName(text)}
                        />
                    </Form>
                </DialogContent>
            </Dialog>

            <Dialog
                onDismiss={() => {
                    setDefaultAnimationDialog(false)
                }}
                onTouchOutside={() => {
                    setDefaultAnimationDialog(false)
                }}
                width={0.9}
                visible={defaultAnimationDialog}
                rounded
                actionsBordered
                dialogTitle={
                    <DialogTitle
                        title="ATENÇÃO"
                        style={{
                            backgroundColor: '#F7F7F8',
                        }}
                        hasTitleBar={false}
                        align="left"
                    />
                }
                footer={
                    <DialogFooter>
                        <DialogButton
                            text="CANCEL"
                            bordered
                            onPress={() => {setDefaultAnimationDialog(false)}}
                        />
                        <DialogButton
                            text="OK"
                            bordered
                            onPress={()=> {{
                                deleteItem();
                                setDefaultAnimationDialog(false)}}}
                        />
                    </DialogFooter>
                }>
                <DialogContent
                    style={{
                        backgroundColor: '#F7F7F8',
                    }}>
                    <Name> Deseja excluir o material {data.name} ?</Name>
                </DialogContent>
            </Dialog>

        </Container>
    )
} ;

export default repository;
