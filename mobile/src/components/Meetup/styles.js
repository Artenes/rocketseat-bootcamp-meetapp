import styled from 'styled-components/native';

import Button from '~/components/Button';

export const Container = styled.View`
  background: #fff;
  border-radius: 4px;
  margin-bottom: 30px;
`;

export const Banner = styled.Image`
  height: 150px;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
`;

export const Title = styled.Text`
  color: #333333;
  font-size: 18px;
  font-weight: bold;
`;

export const InfoContainer = styled.View`
  padding: 20px;
`;

export const InfoRow = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 10px;
`;

export const InfoText = styled.Text`
  margin-left: 5px;
  color: #999999;
  font-size: 13px;
`;

export const InscriptionButton = styled(Button).attrs({
  textStyle: {
    fontSize: 16,
  },
})`
  margin-top: 15px;
  background: ${props => (props.canRegister ? '#F94D6A' : '#D44059')};
`;
