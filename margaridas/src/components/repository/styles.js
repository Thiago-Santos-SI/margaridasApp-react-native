import styled from 'styled-components/native';


export const Container = styled.View`
  background-color: #fff;
  padding: 20px;
  border-radius: 9px;
  margin-bottom: 15px;
  flex-direction: row;
  display: flex;
  margin-left: 25px;
  margin-right: 25px;
`;

export const ContainerIcons = styled.View`
  display: flex;
  justify-content: space-between;
  
`;

export const ContainerCustoProduto = styled.View`
  display: flex;
  
`;

export const ContainerPrecoVenda = styled.View`
  display: flex;
  margin-right: 20px;
  margin-top: 10px;
  border-radius: 6px;
  
`;

export const ContainerValorTotal = styled.View`
  flex: 1;
  margin-right: 50px;
  margin-top: 10px;
`;



export const ContainerCustos = styled.View`
  background-color: #FFF;
  padding: 20px;
  display: flex;
  border-radius: 10px;
  margin-bottom: 15px;
  margin-left: 18px;
  margin-right: 18px;
  height: auto;
`;


export const Name = styled.Text`
  font-weight: bold;
  font-size: 14px;
  color: #333;
    margin-left: 15px;
    margin-top: 5px;

`;

export const NameGrande = styled.Text`
  font-weight: bold;
  font-size: 22px;
  color: #333;
  margin-left: 15px;
  
`;

export const NameQuantidade = styled.Text`
  font-weight: bold;
  font-size: 16px;
  color: #333;
  
`;

export const NameCustos = styled.Text`
  font-weight: bold;
  font-size: 15px;
  color: #333;
  margin-left: 15px;
    margin-top: 5px;
`;

export const NameItem = styled.Text`
  font-weight: bold;
  font-size: 25px;
  color: #333;
  text-align: center;
  
`;


export const NameCusto = styled.Text`
  font-weight: bold;
  font-size: 22px;
  color: #333;
  margin-left: 15px;
    margin-top: 5px;
 
`;

export const NameCheck = styled.Text`
  font-weight: bold;
  font-size: 15px;
  color: #333;
  margin-top: 5px;
 
`;

export const NameResult = styled.Text`
  font-weight: bold;
  font-size: 25px;
  color: #333;
 
`;

export const Description = styled.Text.attrs({
  numberOfLines: 2,
})`
  color: #666;
  margin-top: 5px;
  line-height: 20px;
`;

