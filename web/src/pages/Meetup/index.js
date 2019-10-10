import React, { useState, useEffect } from 'react';
import { MdEvent, MdEdit, MdDeleteForever } from 'react-icons/md';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt-BR';
import { Link } from 'react-router-dom';

import api from '~/services/api';
import { Container } from './styles';

export default function Meetup({ match }) {
  const { id } = match.params;
  const [meetup, setMeetup] = useState([]);

  useEffect(() => {
    async function loadMeetups() {
      const response = await api.get('meetups');

      // for simplicity, instead of creating another endpoint in backend
      // just query for the data in the list of meetups
      const data = response.data.find(m => m.id === Number(id));

      const date = parseISO(data.date);

      // date-fns does not capitalize months: https://github.com/date-fns/date-fns/issues/674
      // so just for consistency let's take each part individually and mount the stirng as we wish
      const day = format(date, 'd');
      const month = format(date, 'MMMM', { locale: pt });
      const hour = format(date, 'HH');
      const capitalizedMonth = month.charAt(0).toUpperCase() + month.slice(1);

      const formattedDate = `${day} de ${capitalizedMonth}, às ${hour}h`;

      setMeetup({
        ...data,
        formattedDate,
      });
    }

    loadMeetups();
  }, [id]);

  function handleCancelation() {
    // handle canelation
  }

  return (
    <Container>
      <header>
        <h1>{meetup.title}</h1>
        <nav>
          <Link to={`/meetup/${meetup.id}/edit`}>
            <MdEdit size={20} color="#fff" />
            Editar
          </Link>
          <button onClick={handleCancelation} type="button">
            <MdDeleteForever size={20} color="#fff" />
            Cancelar
          </button>
        </nav>
      </header>
      <div>
        <img
          src="https://camunda.com/img/events/meetup-example.jpg"
          alt={meetup.title}
        />
        <p>{meetup.description}</p>
        <ul>
          <li>
            <MdEvent size={20} /> {meetup.formattedDate}
          </li>
          <li>
            <FaMapMarkerAlt size={18} /> {meetup.localization}
          </li>
        </ul>
      </div>
    </Container>
  );
}
