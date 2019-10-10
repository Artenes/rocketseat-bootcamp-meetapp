import React, { useState, useEffect } from 'react';
import {
  MdAddCircleOutline,
  MdChevronRight,
  MdSentimentDissatisfied,
} from 'react-icons/md';
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt-BR';
import { Link } from 'react-router-dom';

import api from '~/services/api';
import { Container, Meetup, NoMeetup } from './styles';

export default function Dashboard() {
  const [meetups, setMeetups] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadMeetups() {
      const response = await api.get('meetups');

      const data = response.data.map(meetup => {
        const date = parseISO(meetup.date);

        // date-fns does not capitalize months: https://github.com/date-fns/date-fns/issues/674
        // so just for consistency let's take each part individually and mount the stirng as we wish
        const day = format(date, 'd');
        const month = format(date, 'MMMM', { locale: pt });
        const hour = format(date, 'HH');
        const capitalizedMonth = month.charAt(0).toUpperCase() + month.slice(1);

        const formattedDate = `${day} de ${capitalizedMonth}, às ${hour}h`;

        return {
          ...meetup,
          formattedDate,
        };
      });

      setMeetups(data);
      setLoading(false);
    }

    loadMeetups();
  }, []);

  return (
    <Container>
      <header>
        <h1>Meus meetups</h1>
        <Link to="/meetup">
          <MdAddCircleOutline size={20} color="#fff" />
          Novo meetup
        </Link>
      </header>

      {meetups.length === 0 && !loading && (
        <NoMeetup>
          <MdSentimentDissatisfied size={100} color="#fff" />
          <h2>Nenhum meetup encontrado</h2>
        </NoMeetup>
      )}

      <div>
        {meetups.map(meetup => (
          <Meetup to={`meetup/${meetup.id}`} key={meetup.id}>
            <strong>{meetup.title}</strong>
            <p>
              {meetup.formattedDate}
              <MdChevronRight size={24} color="#fff" />
            </p>
          </Meetup>
        ))}
      </div>
    </Container>
  );
}
