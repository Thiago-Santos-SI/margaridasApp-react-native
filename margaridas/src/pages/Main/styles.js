import styled from 'styled-components/native';
import IconMaterialIcons from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
import {getStatusBarHeight} from 'react-native-status-bar-height';

export const Container = styled(LinearGradient).attrs({
  colors: ['#7159c1', '#9b50c1'],
  start: {x: 0, y: 0},
  end: {x: 1, y: 1},
})`
  flex: 1;
  padding-top: ${25 + getStatusBarHeight()}px;
  padding-bottom: 10px;
`;

export const ContainerCustos = styled(LinearGradient).attrs({
  colors: ['#7159c1', '#9b50c1'],
  start: {x: 0, y: 0},
  end: {x: 1, y: 1},
})`
  
  height: 20px;
  flex: 1;
`;

export const ContainerCardsList = styled(LinearGradient).attrs({
  colors: ['#7159c1', '#9b50c1'],
  start: {x: 0, y: 0},
  end: {x: 1, y: 1},
})`
  max-height: 90%;
`;


export const Title = styled.Text`
  font-size: 26px;
  color: #fff;
  font-weight: bold;
  padding: 0px 20px;
`;
export const TitleCount = styled.Text`
  font-family: 'Roboto';
  font-size: 25px;
  color: #fff;
  font-weight: bold;
  padding: 0px 20px;
`;

export const PequenoTitleTotal = styled.Text`
  font-size: 16px;
  color: #333;
  font-weight: bold;
  margin-left: 35px;
`;

export const TitleTotal = styled.Text`
  font-size: 32px;
  color: #2480f1;
  font-weight: bold;
  margin-left: 35px;
`;

export const TitleVenda = styled.Text`
  font-size: 32px;
  color: #36ad4a;
  font-weight: bold;
  margin-left: 35px;
`;

export const TitlePorcentagem = styled.Text`
  font-size: 20px;
  color: #333;
  margin-top: 5px;
  font-weight: bold;
  margin-left: 30px;
`;


export const FormResults = styled.View`
  background-color: #fff;
  border-top-left-radius: 40px;
  border-top-right-radius: 40px;
  position: absolute;
  bottom: 0;
  right: 0;
  left: 0;
  border-width: 2px;
  border-color: #7159c1;
`;

export const FormButton = styled.View`
  flex-direction: row;
  margin-top: 100px;
  justify-content: center;
  position: absolute;
  bottom: 0;
  right: 0;
  left: 0;
`;

export const FormButtonApp = styled.View`
  justify-content: center;
`;


export const Form = styled.View`
  flex-direction: row;
  margin-top: 10px;
  padding: 0 20px;
`;

export const FormListTint = styled.View`
  flex-direction: row;
  margin-top: 30px;
  padding: 0 30px;
`;


export const Form2 = styled.View`
  flex-direction: row;
  margin-top: 10px;
  padding: 0 20px;
  justify-content: center;

`;

export const FormButtonAndIcon = styled.View`
  flex-direction: row;
  margin-top: 10px;
  padding: 0 20px;
  justify-content: center;

`;

export const InputTint = styled.TextInput.attrs({
  placeholderTextColor: '#999',
})`
  flex: 1;
  padding: 8px 15px;
  border-radius: 4px;
  font-size: 16px;
  color: #333;
  background: #fff;
  border: 2px solid ${props => (props.error ? '#FF7272' : '#333')};
`;

export const Input = styled.TextInput.attrs({
  placeholderTextColor: '#999',
})`
  flex: 1;
  padding: 8px 15px;
  border-radius: 4px;
  font-size: 13px;
  color: #333;
  background: #fff;
  border: 2px solid ${props => (props.error ? '#FF7272' : '#FFF')};
`;

export const ButtonContainer = styled.TouchableOpacity`
	width: 100px;
	height: 40px;
	padding: 12px;
	border-radius: 10px;	
    background-color: aqua;
    align-self: center;
`;

export const InputCustos = styled.TextInput.attrs({
  placeholderTextColor: '#999',
})`
  padding: 8px 15px;
  border-radius: 4px;
  font-size: 16px;
  color: #333;
  background: #fff;
  border: 2px solid ${props => (props.error ? '#FF7272' : '#FFF')};
`;

export const Submit = styled.TouchableOpacity`
  background-color: #6bd4c1;
  margin-left: 10px;
  justify-content: center;
  border-radius: 4px;
  padding: 0 14px;
`;

export const IconAdd = styled(IconMaterialIcons).attrs({
  name: 'add',
})`
  color: #fff;
  font-size: 22px;
`;

export const List = styled.FlatList.attrs({
  //contentContainerStyle: {paddingHorizontal: 20},
  showsVerticalScrollIndicator: false,
})`
  margin-top: 20px;
`;

export const Loading = styled.ActivityIndicator.attrs({
  color: '#FFF',
})``;
