import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';
import { MdAddCircleOutline } from 'react-icons/md';
import * as Yup from 'yup';
import { parseISO } from 'date-fns';

import BannerInput from './BannerInput';
import DatePicker from './DatePicker';
import { Container } from './styles';
import api from '~/services/api';

// The data validation error message has no effect on react-datepicker
const schema = Yup.object().shape({
  title: Yup.string().required('informe um título'),
  description: Yup.string().required('informe uma descrição'),
  localization: Yup.string().required('informe uma localização'),
  date: Yup.date('informe uma data válida').required('informe uma data'),
  banner: Yup.number().required('selecione um banner'),
});

export default function MeetupEdit({ match }) {
  const { id } = match.params;
  const loading = useSelector(state => state.auth.loading);
  const [meetup, setMeetup] = useState({});
  const [description, setDescription] = useState('');

  // Don't know if it is unform's fault (https://github.com/Rocketseat/unform/issues/129)
  // or is something else being a jerk about showing text in a textarea
  // while other inputs display values ok, textare does not show anything
  useEffect(() => {
    setDescription(meetup.description);
  }, [meetup]);

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

      setMeetup({ ...data, date });
    }

    loadMeetupIfEditing();
  }, []); //eslint-disable-line

  function handleSubmit() {
    // send to update
  }

  return (
    <Container>
      <Form initialData={meetup} onSubmit={handleSubmit} schema={schema}>
        <BannerInput name="banner" />
        <Input type="text" name="title" placeholder="Título do Meetup" />
        <Input
          multiline
          name="description"
          placeholder="Descrição completa"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
        <DatePicker name="date" placeholder="Data do meetup" />
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
