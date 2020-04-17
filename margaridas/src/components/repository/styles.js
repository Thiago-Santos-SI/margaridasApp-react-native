import styled from 'styled-components/native';
import IconsFontAwesome from 'react-native-vector-icons/FontAwesome';
import IconsMaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import IconAntDesign from 'react-native-vector-icons/AntDesign';

export const Container = styled.View`
  background-color: #fff;
  padding: 20px;
  border-radius: 4px;
  margin-bottom: 15px;
`;

export const Name = styled.Text`
  font-weight: bold;
  font-size: 18px;
  color: #333;
`;



export const Description = styled.Text.attrs({
  numberOfLines: 2,
})`
  color: #666;
  margin-top: 5px;
  line-height: 20px;
`;

export const Stats = styled.View`
  flex-direction: row;
`;

export const Stat = styled.View`
  flex-direction: row;
  margin-right: 15px;
  align-content: center;
`;


export const StatCount = styled.Text`
  margin-left: 6px;
`;

export const ContainerIcons = styled.View`
  flex-direction: row;
  margin-top: 15px;
  justify-content: space-between;
`;

export const ContainerButtons = styled.View`
  flex-direction: row;
`;

export const ButtonIcon = styled.TouchableOpacity`
  margin-left: 10px;
`;

export const IconTrash = styled(IconsFontAwesome).attrs({
  name: 'trash-o',
})`
  font-size: 16px;
  color: #7159c1;
`;

export const IconWeb = styled(IconsMaterialCommunityIcons).attrs({
  name: 'web',
})`
  font-size: 16px;
  color: #7159c1;
`;

export const IconRefresh = styled(IconsFontAwesome).attrs({
  name: 'refresh',
})`
  font-size: 16px;
  color: #7159c1;
`;

export const IconStar = styled(IconsFontAwesome).attrs({
  name: 'star',
})`
  font-size: 13px;
  margin-top: 3px;
  color: #333;
`;

export const IconFork = styled(IconsFontAwesome).attrs({
  name: 'code-fork',
})`
  font-size: 13px;
  margin-top: 3px;
  color: #333;
`;

export const IconEyes = styled(IconAntDesign).attrs({
  name: 'eye',
})`
  font-size: 13px;
  margin-top: 3px;
  color: #333;
`;
