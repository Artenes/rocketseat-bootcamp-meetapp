import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { withNavigationFocus } from 'react-navigation';
import { format } from 'date-fns';
import PropTypes from 'prop-types';

import api from '~/services/api';

import Background from '~/components/Background';
import ActionBar from '~/components/ActionBar';
import DateSelector from '~/components/DateSelector';
import Meetup from '~/components/Meetup';

import { Container, List } from './styles';

function Dashboard({ isFocused }) {
  const [meetups, setMeetups] = useState([]);
  const [date, setDate] = useState(new Date());

  async function loadMeetups() {
    const inDay = format(date, 'yyyy-MM-dd');
    const response = await api.get('events', {
      date: inDay,
    });
    setMeetups(response.data);
  }

  useEffect(() => {
    if (isFocused) {
      loadMeetups();
    }
  }, [isFocused, date]);

  async function handleInscription() {}

  return (
    <Background>
      <Container>
        <ActionBar />
        <DateSelector date={date} onChange={newDate => setDate(newDate)} />
        <List
          data={meetups}
          keyExtractor={item => String(item.title)}
          renderItem={({ item }) => (
            <Meetup data={item} onClick={handleInscription} canRegister />
          )}
        />
      </Container>
    </Background>
  );
}

Dashboard.navigationOptions = {
  tabBarLabel: 'Meetups',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="format-list-bulleted" size={20} color={tintColor} />
  ),
};

export default withNavigationFocus(Dashboard);

Dashboard.propTypes = {
  isFocused: PropTypes.bool.isRequired,
};
