import React, {useState, useEffect} from 'react';
import { Button} from 'react-native-elements';
import {Alert, Text, View, KeyboardAvoidingView, StyleSheet, Keyboard, Animated} from 'react-native';
import {
    ContainerCustos,
    Form2,
    Input,
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
    TitleVenda, ContainerCardsList, FormButton, FormButtonApp, FormButtonAndIcon
} from '../Main/styles';
import RepositoryCustos, {screenWidth} from "../../components/materialsConts/repositoryCustos";


import getRealm from "../../services/realm";
import Dialog, {DialogContent, DialogTitle, SlideAnimation} from "react-native-popup-dialog";
import Icon from "react-native-vector-icons/FontAwesome";
import {
    ContainerPrecoVenda,
    ContainerValorTotal,
    NameQuantidade
} from "../../components/repository/styles";
import Slider from '@react-native-community/slider';
import {set} from "react-native-reanimated";


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
    const [venda, setVenda] = useState((0).toFixed(2));
    const [selectedValue, setSelectedValue] = useState(0);
    const [tinta, setTinta] = useState('');
    const [count, setCount] = useState('');
    const [tintForFunction, setTintForFunction] = useState('');
    const [hideCard, setHideCard] = useState(true);


    async function HideCardFalse(){
        setHideCard(false)
    }
    async function HIdeCArdtrue(){
        setHideCard(true)
    }


    useEffect(()=>{
        const HandleHideCard = () =>{
            setHideCard(false)
        }
        Keyboard.addListener('keyboardDidShow', HandleHideCard)

        const HandleShowCard = () =>{
            setHideCard(true)
        }
        Keyboard.addListener('keyboardDidHide', HandleShowCard)


        return () => {
            Keyboard.removeListener('keyboardDidShow', HandleHideCard)
            Keyboard.removeListener('keyboardDidHide', HandleShowCard)
        }

    },[])

    async function handleAddSale(){
        async function SaveValueSale(a, b, c){
            const realm = await getRealm();
            const data = {
                id: 1,
                Sale: Number(parseFloat(((a + b) * c)))
            };
            realm.write(() => {
                realm.create('Sale', data, 'modified');
            });
            return data;
        }
        try {
            const value = await SaveValueSale(total, total, porcentagem)
            console.log(value)
            const realm = await getRealm();
            let valueSale = realm.objects('Sale');
            for (let p of valueSale) {
                const val = Number(`${p.Sale}`)
                setVenda(val.toFixed(2))
                console.log(venda)
            }
        }
        catch (e) {
            console.log(e)
            setError(true)
        }
    }


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
            if (val===0){
                setCount("vc não cadastrou nenhum material ainda")
            }
            if (val===1){
                setCount("você tem "+ val +" material")
            }else {
                setCount("você tem "+ val +" materiais")

            }
            let valueTintInDataBase = realm.objects('Tinta');
            for (let p of valueTintInDataBase) {
                const val = `${p.priceTinta}`
                setTintForFunction(val + 'R$')
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
            const realm = await getRealm();
            let valueProfit = realm.objects('Lucro');
            for (let p of valueProfit) {
                const val = `${p.priceLucro}`
                setPorcentagem(parseInt(val)/100)
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
            let valuePercent = realm.objects('Percentage');
            for (let p of valuePercent) {
                const val = `${p.pricePercentage}`
                setPorcentagem(parseInt(val)/100)
            }
            setLucro('');
            Keyboard.dismiss();
        }
        catch (e) {
            setError(true);
            console.log(e)
        }
    }


    return (
        <KeyboardAvoidingView
            style={{flex: 1}}
        >
        <ContainerCustos>
            <TitleCount>{count}</TitleCount>
            <ContainerCardsList>
                <List
                snapToInterval={screenWidth}
                horizontal={false}
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
                        UpdateFunctionVenda={() => handleAddSale()}
                    />
                )}
            />
            </ContainerCardsList>
            <FormButton>
                <Button title=''
                        icon={
                            <Icon
                                type='font-awesome'
                                name="eye"
                                size={30}
                                color="white"
                            />
                        }
                        onPress={HIdeCArdtrue}>
                </Button>


            </FormButton>

            {hideCard && (
                    <FormResults style={styles.shadow}>
                <FormButtonAndIcon>
                    <View style={{flex: 1}}>
                        <Button
                            title="Definir valor de lucro"
                            color='#333'
                            type={"outline"}
                            onPress={() => setSlideAnimation(true)}>
                        </Button>
                    </View>
                    <Text>   </Text>
                    <Icon
                        type='font-awesome'
                        name="eye-slash"
                        size={30}
                        color="#333"
                        onPress={HideCardFalse}
                    />
                    <Text>   </Text>
                    <View style={{flex:1}}>
                        <Button
                            title="Definir valor da tinta"
                            color='#256FC7'
                            type={"outline"}
                            onPress={() => setSlideAnimation2(true)}
                        />
                    </View>


                </FormButtonAndIcon>
                <View style={{flexDirection: "row", justifyContent: "center"}}>

                    <ContainerValorTotal>
                        <PequenoTitleTotal> Valor total</PequenoTitleTotal>
                        <TitleTotal style={{fontSize: 25 }}>R$ {total.toFixed(1)} </TitleTotal>
                    </ContainerValorTotal>
                    <ContainerPrecoVenda>
                        <PequenoTitleTotal>Preço de venda</PequenoTitleTotal>
                        <TitleVenda style={{fontSize: 25 }}>R$ {venda}</TitleVenda>
                    </ContainerPrecoVenda>

                </View>

                <TitlePorcentagem>Seu valor de lucro atual: {porcentagem} %</TitlePorcentagem>

            </FormResults>
                )}

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
                                        onPress={() => {
                                            {
                                                handleAddPorcentagem();
                                                setSlideAnimation(false)
                                            }
                                        }}>
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
    shadow:{
        shadowColor: "#000",
        shadowOffset: {
            width: 10,
            height: 12,
        },
        shadowOpacity: 0.0,
        shadowRadius: 16.00,

        elevation: 200,
    },

});

Calcula.navigationOptions = {
    title: 'CalculaScreen',
};
