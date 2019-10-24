import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { withNavigationFocus } from 'react-navigation';
import { format } from 'date-fns';

import api from '~/services/api';

import Background from '~/components/Background';
import ActionBar from '~/components/ActionBar';
import DateSelector from '~/components/DateSelector';
import Meetup from '~/components/Meetup';

import { Container, List, NoMeetup, NoMeetupText } from './styles';

function Meetups() {
  const [meetups, setMeetups] = useState([]);
  const [date, setDate] = useState(new Date());
  const [page, setPage] = useState(0);
  const [loadingDay, setLoadingDay] = useState(false);

  function loadMeetups(nextPage) {
    const inDay = format(date, 'yyyy-MM-dd');
    return api.get(`events?date=${inDay}&page=${nextPage}`);
  }

  async function loadMoreMeetups() {
    const nextPage = page + 1;
    const response = await loadMeetups(nextPage);
    setMeetups([...meetups, ...response.data]);
    setPage(nextPage);
  }

  useEffect(() => {
    async function loadDay() {
      setLoadingDay(true);
      const nextPage = 1;
      const response = await loadMeetups(nextPage);
      setMeetups(response.data);
      setPage(nextPage);
      setLoadingDay(false);
    }
    loadDay();
  }, [date]);

  async function handleInscription(meetup) {
    try {
      await api.post('registrations', {
        meetup_id: meetup.id,
      });
      Alert.alert('Inscrição realizada com sucesso');
    } catch (error) {
      const message = error.response
        ? error.response.data.error
        : 'Erro de conexão';
      Alert.alert('Falha na inscrição', message);
    }
    return true;
  }

  return (
    <Background>
      <Container>
        <ActionBar />
        <DateSelector date={date} onChange={newDate => setDate(newDate)} />
        {meetups.length === 0 && !loadingDay && (
          <NoMeetup>
            <Icon name="search" size={100} color="#fff" />
            <NoMeetupText>Nenhum meetup encontrado</NoMeetupText>
          </NoMeetup>
        )}
        {loadingDay && <ActivityIndicator size="large" />}
        {!loadingDay && (
          <List
            data={meetups}
            keyExtractor={item => String(item.id)}
            onEndReachedThreshold={0.2}
            onEndReached={loadMoreMeetups}
            renderItem={({ item }) => (
              <Meetup data={item} onClick={handleInscription} canRegister />
            )}
          />
        )}
      </Container>
    </Background>
  );
}

Meetups.navigationOptions = {
  tabBarLabel: 'Meetups',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="format-list-bulleted" size={20} color={tintColor} />
  ),
};

export default withNavigationFocus(Meetups);
