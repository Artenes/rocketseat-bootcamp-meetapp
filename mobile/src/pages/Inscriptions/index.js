import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import api from '~/services/api';

import Background from '~/components/Background';
import ActionBar from '~/components/ActionBar';
import Meetup from '~/components/Meetup';

import { Container, List, NoMeetup, NoMeetupText } from './styles';

export default function Inscriptions() {
  const [meetups, setMeetups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [canceling, setCanceling] = useState(false);

  useEffect(() => {
    async function loadMeetups() {
      const response = await api.get('registrations');
      setMeetups(response.data);
      setLoading(false);
    }
    loadMeetups();
  }, []);

  async function handleCancenlation(meetup) {
    try {
      setCanceling(true);
      // await api.post('registrations', {
      //   meetup_id: meetup.id,
      // });
      Alert.alert('Inscrição cancelada com sucesso');
    } catch (error) {
      const message = error.response
        ? error.response.data.error
        : 'Erro de conexão';
      Alert.alert('Falha na inscrição', message);
    }
    setCanceling(false);
  }

  return (
    <Background>
      <Container>
        <ActionBar />
        {meetups.length === 0 && !loading && (
          <NoMeetup>
            <Icon name="search" size={100} color="#fff" />
            <NoMeetupText>Nenhum meetup encontrado</NoMeetupText>
          </NoMeetup>
        )}
        {loading && <ActivityIndicator size="large" />}
        {!loading && (
          <List
            data={meetups}
            keyExtractor={item => String(item.title)}
            renderItem={({ item }) => (
              <Meetup
                data={item}
                onClick={() => handleCancenlation(item)}
                loading={canceling}
                canRegister={false}
              />
            )}
          />
        )}
      </Container>
    </Background>
  );
}

Inscriptions.navigationOptions = {
  tabBarLabel: 'Inscrições',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="local-offer" size={20} color={tintColor} />
  ),
};
