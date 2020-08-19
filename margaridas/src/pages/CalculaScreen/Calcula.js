import React, {useState, useEffect} from 'react';
import { Button} from 'react-native-elements';
import {Alert, Text, View, KeyboardAvoidingView, StyleSheet, Keyboard} from 'react-native';
import {
    Container,
    ContainerCustos,
    Form2,
    Input,
    InputCustos,
    List,
    Title,
    FormResults,
    TitleTotal,
    Form,
    TitlePorcentagem,
    TitleCount,
    FormListTint,
    InputTint,
    PequenoTitleTotal,
    TitleVenda
} from '../Main/styles';
import RepositoryCustos from "../../components/materialsConts/repositoryCustos";


import getRealm from "../../services/realm";
import Dialog, {DialogContent, DialogTitle, SlideAnimation} from "react-native-popup-dialog";
import {Picker} from "@react-native-community/picker";
import Icon from "react-native-vector-icons/FontAwesome";
import {Name, NameQuantidade} from "../../components/repository/styles";
import Slider from '@react-native-community/slider';


export default function Calcula({route}) {
    const [repositories, setRepositories] = useState('');
    const [tint, setTint] = useState('');
    const [input, setInput] = useState('');
    const [total,setTotal] = useState(0);
    const [slideAnimation, setSlideAnimation] = useState(false);
    const [slideAnimation2, setSlideAnimation2] = useState(false);
    const [lucro, setLucro] = useState('');
    const [error, setError] = useState('');
    const [porcentagem, setPorcentagem] = useState(0);
    const [venda, setVenda] = useState(0);
    const [selectedValue, setSelectedValue] = useState(150);
    const [tinta, setTinta] = useState('');
    const [count, setCount] = useState('');
    const [tintForFunction, setTintForFunction] = useState('');

    useEffect(() => {
        async function loadRepository() {
            const realm = await getRealm();
            const data = realm.objects('Repository').sorted('name', true);
            const data2 = realm.objects('Tinta');
            setRepositories(data);
            setTint(data2)
        }
        async function CheckItem(){
            const realm = await getRealm()
            const data = realm.objects('Repository')
            const val = data.length;
            setCount("você tem "+ val +" material")
            if (val===0){
                setCount("vc não cadastrou nenhum material ainda")
            }
        }
        CheckItem()
        loadRepository();
    }, []);

    const createTwoButtonAlert = () =>
        Alert.alert(
            "Alert Title",
            "My Alert Msg",
            [
                { text: "OK", onPress: () => console.log("OK Pressed") }
            ],
            { cancelable: false }
        );



    async function saveTinta(value) {
        const realm = await getRealm();
        const data = {
            id: 1,
            priceTinta: parseInt(value)
        };
        realm.write(() => {
            realm.create('Tinta', data, 'modified');
        });
        return data;
    }

    async function handleAddTint(){
        try {
            const value = await saveTinta(tinta)
            console.log(value)
            setTinta('');
            const realm = await getRealm();
            let valueTintInDataBase = realm.objects('Tinta');
            for (let p of valueTintInDataBase) {
                const val = `${p.priceTinta}`
                setTintForFunction(val + 'R$')
            }
        }
        catch (e) {
            console.log(e)
            setError(true)
        }
    }


    async function handleDeleteTint(){
        const realm = await getRealm();
        realm.write(() => {
            let allTint = realm.objects('Tinta');
            realm.delete(allTint);
            setTintForFunction('Nenhum preço definido')
            console.log(allTint)
        })
    }

    async function handleVenda(){
        setVenda((total + total) * porcentagem )
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
            //console.log(selectedValue)
            const realm = await getRealm();
            let valuePorcentagem = realm.objects('Lucro');
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
            id: 3,
            pricePercentage: parseInt(value)
        };
        realm.write(() => {
            realm.create('Percentage', data, 'modified');
        });
        return data;
    }

    async function handleAddLucro(){
        try {
            const value = await saveLucro(lucro)
            console.log(value)
            const realm = await getRealm();
            let valuePorcentagem = realm.objects('Percentage');
            for (let p of valuePorcentagem) {
                const val = `${p.pricePercentage}`
                setPorcentagem(parseInt(val)/100)
            }
            //console.log(porcentagem)
            setLucro('');
            Keyboard.dismiss();
        }
        catch (e) {
            setError(true);
            console.log(e)
        }
    }

    async function handleTest(){
        const realm = await getRealm();
        realm.write(()=>{
            const query = realm.objects('Lucro')
            realm.delete(query);
            console.log(query)
        })
    }

    return (
        <KeyboardAvoidingView
            style={{flex: 1}}
        >
        <ContainerCustos >
            <Title>Todos seus Materiais</Title>
            <TitleCount>{count}</TitleCount>
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
                        valuetint={setTint}
                    />
                )}
            />

            <FormResults>
                <Form2>
                    <Button
                        title="Definir valor de lucro"
                        type="outline"
                        raised={true}
                        color='#7a36b2'
                        onPress={() => setSlideAnimation(true)}
                    />
                    <Text>  </Text>
                    <Button
                        title="Definir valor da tinta"
                        type="outline"
                        raised={true}
                        color='#256FC7'
                        onPress={() => setSlideAnimation2(true)}
                    />

                </Form2>
                <View style={styles.view}>
                    <View style={styles.viewResults}>
                        <PequenoTitleTotal> Valor total</PequenoTitleTotal>
                        <TitleTotal>R$ {total.toFixed(2)} </TitleTotal>
                    </View>
                    <View style={{padding: 20}}/>

                    <View style={styles.viewResults}>
                        <PequenoTitleTotal>Preço de venda</PequenoTitleTotal>
                        <TitleVenda>R$ {venda.toFixed(2)}</TitleVenda>
                    </View>

                </View>

                <TitlePorcentagem> Seu valor de lucro atual: {porcentagem} %</TitlePorcentagem>

            </FormResults>

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
                        <View>
                        <View style={styles.viewGuide}>
                            <Button title='  guia'
                                    icon={
                                        <Icon
                                            type='font-awesome'
                                            name="book"
                                            size={15}
                                            color="white"
                                        />
                                    }
                                    onPress={createTwoButtonAlert}>
                            </Button>

                        </View>
                        <View style={styles.viewBig}>
                        <View style={styles.viewpicker}>
                            <Slider
                                style={{width: 200, height: 40}}
                                minimumValue={0}
                                maximumValue={100}
                                minimumTrackTintColor="#000"
                                maximumTrackTintColor="#000000"
                                onValueChange={(item) => setSelectedValue(item)}
                            />
                            <Text>                          {selectedValue.toFixed(1)} %</Text>
                            <Text>

                            </Text>
                            <Text>                  Automatico</Text>
                            <View style={styles.buttonPLus}>
                                <Button title=""
                                        icon={
                                            <Icon
                                                type='font-awesome'
                                                name="plus"
                                                size={20}
                                                color="white"
                                            />
                                        }
                                        onPress={handleAddPorcentagem}>
                                </Button>
                            </View>

                        </View>
                        <View
                            style={{
                                borderLeftWidth: 1,
                                borderLeftColor: '#333',
                            }}
                        />
                        <View style={styles.viewpicker}>
                        <Input
                            error={error}
                            placeholder="Definir lucro"
                            value={`${lucro}`}
                            onChangeText={number => setLucro(Number(number))}
                            keyboardType="numeric"
                        />

                        <Text>            Manual</Text>
                            <View style={styles.buttonPLus}>
                                <Button title=""
                                        icon={
                                            <Icon
                                                type='font-awesome'
                                                name="plus"
                                                size={20}
                                                color="white"
                                            />
                                        }
                                        onPress={handleAddLucro}>
                                </Button>
                            </View>


                        </View>
                        </View>
                        </View>
                    </Form>

                </DialogContent>
            </Dialog>

            <Dialog
                onDismiss={() => {
                    setSlideAnimation2(false)
                }}
                onTouchOutside={() => {
                    setSlideAnimation2(false)
                }}
                visible={slideAnimation2}
                dialogTitle={<DialogTitle title="Valor da tinta para o calculo                      " />}
                dialogAnimation={new SlideAnimation({ slideFrom: 'bottom' })}>
                <DialogContent>
                    <Form2>
                        <View style={styles.view}>
                            <Button title='  guia'
                                    icon={
                                        <Icon
                                            type='font-awesome'
                                            name="book"
                                            size={15}
                                            color="white"
                                        />
                                    }
                                    onPress={createTwoButtonAlert}>
                            </Button>
                        </View>

                    </Form2>

                    <Form>
                        <InputTint
                            error={error}
                            placeholder="Preço que comprou a tinta"
                            value={`${tinta}`}
                            onChangeText={number => setTinta(Number(number))}
                            keyboardType="numeric"

                        />
                    </Form>
                    <FormListTint>
                        <NameQuantidade>Valor de tinta atual: {tintForFunction}</NameQuantidade>
                    </FormListTint>

                    <Form2>
                        <Button title="confirmar"
                                onPress={() => {
                                    {
                                        handleAddTint();
                                    }
                                }}>
                        </Button>
                        <Text> </Text>
                        <Button title="deletar preço de tinta"
                                onPress={() => {
                                    {
                                        handleDeleteTint();
                                    }
                                }}>
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

    },
    view:{
        flexDirection: 'row',
        padding: 5,

    },
    viewResults:{
        flexDirection: 'column',
    },
    viewGuide:{
        padding: 5,
        width: 100,
        alignContent: 'center',
        alignSelf: 'center'
    },
    viewBig:{
        marginTop:10,
        flexDirection: 'row',
        padding: 5,

    },
    buttonPLus:{
        width: 50,
        alignContent: 'center',
        alignSelf: 'center'

    },
});

Calcula.navigationOptions = {
    title: 'CalculaScreen',
};
