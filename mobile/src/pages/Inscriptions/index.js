import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { withNavigationFocus } from 'react-navigation';
import PropTypes from 'prop-types';

import api from '~/services/api';

import Background from '~/components/Background';
import ActionBar from '~/components/ActionBar';
import Meetup from '~/components/Meetup';

import { Container, List, NoMeetup, NoMeetupText } from './styles';

function Inscriptions({ isFocused }) {
  const [meetups, setMeetups] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadMeetups() {
      const response = await api.get('registrations');
      setMeetups(response.data);
      setLoading(false);
    }
    if (isFocused) {
      loadMeetups();
    }
  }, [isFocused]);

  async function handleCancenlation(meetup) {
    try {
      await api.delete(`registrations/${meetup.id}`);
      setMeetups(meetups.filter(m => m.id !== meetup.id));
      Alert.alert('Inscrição cancelada com sucesso');
      // we return false for the component not try to update any state
      // since it was removed from the list at this point
      return false;
    } catch (error) {
      const message = error.response
        ? error.response.data.error
        : 'Erro de conexão';
      Alert.alert('Falha ao cancelar', message);
      // we return true for the component update its loading state
      return true;
    }
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
            keyExtractor={item => String(item.registration_id)}
            renderItem={({ item }) => (
              <Meetup
                data={item}
                onClick={handleCancenlation}
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

Inscriptions.propTypes = {
  isFocused: PropTypes.bool.isRequired,
};

export default withNavigationFocus(Inscriptions);
