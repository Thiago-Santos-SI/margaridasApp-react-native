import styled from 'styled-components/native';


export const Container = styled.View`
  background-color: #fff;
  padding: 20px;
  border-radius: 4px;
  margin-bottom: 15px;
`;

export const ContainerCustos = styled.View`
  background-color: #FFF;
  padding: 20px;
  border-radius: 4px;
  margin-bottom: 15px;
`;

export const Name = styled.Text`
  font-weight: bold;
  font-size: 18px;
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

export const Description = styled.Text.attrs({
  numberOfLines: 2,
})`
  color: #666;
  margin-top: 5px;
  line-height: 20px;
`;



export const ContainerIcons = styled.View`
  flex-direction: row;
  margin-top: 15px;
  justify-content: space-between;
`;

export const ContainerButtons = styled.View`
  flex-direction: row;
`;




