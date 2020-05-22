import React, {useState, useEffect} from 'react';
import { Button} from 'react-native-elements';
import {Keyboard, StyleSheet, Text} from 'react-native'
import {
    NameItem,
    ContainerCustos, NameCustos, NameCusto, NameResult, NameCheck, Name
} from './styles';
import {
    Form, Input,
    InputCustos,Form2,
} from "../../pages/Main/styles";

 import CheckBox from '@react-native-community/checkbox';
 import getRealm from "../../services/realm";

const repositoryCustos = ({data, valuetint, addPrecoTotal}) => {

    const [input, setInput] = useState('');
    const [result, setResult] = useState(0);
    const [error, setError] = useState('');
    const [isSelected, setSelection] = useState(false);
    const [check, setCheck] = useState(true);
    const [change, setChange] = useState(true);

    useEffect(() => {
        async function loadRepository() {
            const realm = await getRealm();
            const tint = realm.objects('Tinta');
            const val = tint.length
            setChange(val)
            if (val===0){
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
                if (value == 0 || undefined || null){
                    setError(true);
                }else {
                    console.log(value)
                    addPrecoTotal(value)
                    setResult(value)
                    setInput('')
                    setError(false)
                    Keyboard.dismiss();
                }
            }else{
                setCheck(false)
                for (let p of tint) {
                    const valueTint =  `${p.priceTinta}`
                    const value = isSelected ? (parseInt(valueTint)+(data.price * input)/data.quantidade) : (data.price * input)/data.quantidade
                    if (value == 0 || undefined || null){
                        setError(true);
                    }else {
                        console.log(value)
                        addPrecoTotal(value)
                        setResult(value)
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
        <ContainerCustos style={styles.view}>
            <NameItem> {data.name.toUpperCase()}</NameItem>
            <NameCustos>Quantidade comprada: {data.quantidade} {data.unidade} </NameCustos>
            <NameCustos>preço que comprou: {data.price.toFixed(2)}R$</NameCustos>
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
                    onPress={handleCompareValue}>
            </Button>

            <NameCusto>Custo do produto: {result.toFixed(2)} R$ </NameCusto>
        </ContainerCustos>

    )
};


const styles = StyleSheet.create({
    view:{
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.36,
        shadowRadius: 6.68,

        elevation: 11
    }
})


export default repositoryCustos;
