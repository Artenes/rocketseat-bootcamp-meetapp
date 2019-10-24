import styled from 'styled-components/native';
import { TouchableOpacity } from 'react-native';

export const Container = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 30px 0;
`;

export const SelectedDay = styled.Text`
  color: #fff;
  font-size: 20px;
  font-weight: bold;
  margin: 0 15px;
`;

export const ChangeDayButton = styled(TouchableOpacity)``;
