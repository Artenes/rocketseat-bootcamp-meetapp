import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';
import { MdAddCircleOutline } from 'react-icons/md';
import * as Yup from 'yup';
import { format, parseISO } from 'date-fns';

import BannerInput from './BannerInput';
import { Container } from './styles';
import api from '~/services/api';

const schema = Yup.object().shape({
  title: Yup.string().required(),
  description: Yup.string().required(),
  localization: Yup.string().required(),
  date: Yup.date().required(),
  image_id: Yup.number().required(),
});

export default function MeetupEdit({ match }) {
  const { id } = match.params;
  const loading = useSelector(state => state.auth.loading);
  const [meetup, setMeetup] = useState({});

  useEffect(() => {
    async function loadMeetupIfEditing() {
      if (!id) {
        return;
      }

      const response = await api.get('meetups');

      // for simplicity, instead of creating another endpoint in backend
      // just query for the data in the list of meetups
      const data = response.data.find(m => m.id === Number(id));
      const date = parseISO(data.date);

      setMeetup({
        ...data,
        date: format(date, "dd'/'MM'/'yyyy"),
      });
    }

    loadMeetupIfEditing();
  }, [id]);

  function handleSubmit() {
    // send to update
  }

  return (
    <Container>
      <Form initialData={meetup} onSubmit={handleSubmit} schema={schema}>
        <BannerInput name="image_id" />
        <Input type="text" name="title" placeholder="Título do Meetup" />
        <Input
          multiline
          name="description"
          placeholder="Descrição completa"
          value={meetup.description}
        />
        <Input type="text" name="date" placeholder="Data do meetup" />
        <Input type="text" name="localization" placeholder="Localização" />

        <button type="submit">
          {loading ? (
            'Carregando'
          ) : (
            <>
              <MdAddCircleOutline size={24} color="#fff" />
              Salvar meetup
            </>
          )}
        </button>
      </Form>
    </Container>
  );
}
