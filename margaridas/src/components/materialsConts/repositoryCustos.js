import React, {useState, useEffect, useContext} from 'react';
import { Button} from 'react-native-elements';
import {Keyboard, StyleSheet, Text, Dimensions, View} from 'react-native'
import {
    NameItem,
    ContainerCustos, NameCustos, NameCusto, NameCheck, Name, ContainerIcons, ContainerCustoProduto
} from '../repository/styles';
import {
    Container,
    Form, InputCustos, Title,
} from "../../pages/Main/styles";

import CheckBox from '@react-native-community/checkbox';
import getRealm from "../../services/realm";

const repositoryCustos = ({data, addPrecoTotal, UpdateFunctionVenda}) => {

    const [input, setInput] = useState('');
    const [error, setError] = useState('');
    const [result, setResult] = useState('');
    const [isSelected, setSelection] = useState(false);
    const [check, setCheck] = useState(true);


    useEffect(() => {
        async function loadRepository() {
            const realm = await getRealm();
            const tint = realm.objects('Tinta');
            const val = tint.length
            if (val === 0){
                setCheck(true)
            }else {
                setCheck(false)
            }
        }
        loadRepository();
    }, [addPrecoTotal]);


    async function handleCompareValue(){
        try {
            const realm = await getRealm();
            const tint = realm.objects('Tinta');
            const val = tint.length
            if (val===0){
                setSelection(false)
                setCheck(true)
                const value = (data.price * input)/data.quantidade
                if (!(value == 0 || undefined || null)) {
                    console.log(value)
                    addPrecoTotal(value)
                    Number(setResult(value))
                    setInput('')
                    setError(false)
                    Keyboard.dismiss();
                } else {
                    setError(true);
                }
            }else {
                setCheck(false)
                for (let p of tint) {
                    const valueTint =  `${p.priceTinta}`
                    const value = isSelected ? (parseInt(valueTint)+(data.price * input)/data.quantidade) : (data.price * input)/data.quantidade
                    if (value == 0 || undefined || null){
                        setError(true);
                    }else {
                        console.log(value)
                        addPrecoTotal(value)
                        Number(setResult(value))
                        setInput('')
                        setError(false)
                        Keyboard.dismiss();
                    }
                }
            }

        }catch (e) {
            setError(true)
        }
    }

    return(

        <View style={styles.viewpai}>
            <ContainerCustos style={styles.view}>

            <NameItem numberOfLines={1}> {data.name.toUpperCase()}</NameItem>

            <View style={{flexDirection: "row"}}>

                <View style={{flex: 1}}>

                    <Name>Quantidade comprada</Name>
                    <NameCustos numberOfLines={1} style={{color: '#1da835'}}><NameCustos numberOfLines={1} style={{fontSize: 22 , color:'#1da835'}}> {data.quantidade.toFixed(1)}</NameCustos> {data.unidade}</NameCustos>
                    <Name>Preço que comprou</Name>
                    <NameCustos style={{color: '#1557ba', fontSize: 22}}>R$ {data.price.toFixed(1)}</NameCustos>

                </View>

                <ContainerCustoProduto>

                    <Name>Custo do produto</Name>
                    <NameCusto style={{color: '#dc2b2b', fontSize: 23}}>R$ {Number(result).toFixed(2)}</NameCusto>

                </ContainerCustoProduto>

            </View>

            <Form>
            <CheckBox
                disabled={check}
                value={isSelected}
                onValueChange={setSelection}
                />
            <NameCheck>Usou tinta nesse material? {isSelected ? "👍" : "👎"}</NameCheck>
            </Form>
            <InputCustos
                placeholder="Quanto vc utilizou desse material?"
                autocCapitalize="none"
                error={error}
                value={input}
                onChangeText={setInput}
                keyboardType="numeric"
            />
            <Text> </Text>
            <Button title="calcular"
                    color='#256FC7'
                    onPress={() => {{
                            handleCompareValue();
                            UpdateFunctionVenda();
                        }}}
            />
        </ContainerCustos>
        </View>
    )
};

export const screenWidth = Dimensions.get('screen').width

const styles = StyleSheet.create({
    view:{
        width: screenWidth - 36,
        shadowColor: "#000",
        shadowOffset: {
            width: 10,
            height: 5,
        },
        shadowOpacity: 0,
        shadowRadius: 1.68,
        elevation: 100
    },
    viewpai:{
        height: 'auto'
    }
})


export default repositoryCustos;
