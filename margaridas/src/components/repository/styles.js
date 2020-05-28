import styled from 'styled-components/native';


export const Container = styled.View`
  background-color: #fff;
  padding: 20px;
  border-radius: 4px;
  margin-bottom: 15px;
  flex-direction: row;
  

`;

export const ContainerCustos = styled.View`
  background-color: #FFF;
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 15px;
  margin-left: 18px;
`;

export const Name = styled.Text`
  font-weight: bold;
  font-size: 18px;
  color: #333;
  
`;

export const NameQuantidade = styled.Text`
  font-weight: bold;
  font-size: 16px;
  color: #333;
  
`;

export const NameCustos = styled.Text`
  font-weight: bold;
  font-size: 18px;
  color: #333;
  
`;

export const NameItem = styled.Text`
  font-weight: bold;
  font-size: 25px;
  color: #333;
  text-align: center;
  
`;


export const NameCusto = styled.Text`
  font-weight: bold;
  font-size: 25px;
  color: #333;
 
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



export const ContainerIcons = styled.View`
  flex-direction: column;
  justify-content: center;
  margin-left: 28px;
  margin-top: -20px;
`;





