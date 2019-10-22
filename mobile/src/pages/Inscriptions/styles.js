import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  flex: 1;
`;

export const List = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: { padding: 30 },
})``;

export const NoMeetup = styled.View`
  align-items: center;
  justify-content: center;
  flex: 1;
`;

export const NoMeetupText = styled.Text`
  color: #fff;
  font-size: 18px;
`;
