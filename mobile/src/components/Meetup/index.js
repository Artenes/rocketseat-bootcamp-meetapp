import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt-BR';
import PropTypes from 'prop-types';

import {
  Container,
  Banner,
  Title,
  InfoContainer,
  InfoRow,
  InfoText,
  InscriptionButton,
} from './styles';

export default function Meetup({ data, canRegister, onClick }) {
  const [loading, setLoading] = useState(false);
  const date = parseISO(data.date);

  // date-fns does not capitalize months: https://github.com/date-fns/date-fns/issues/674
  // so just for consistency let's take each part individually and mount the stirng as we wish
  const day = format(date, 'd');
  const month = format(date, 'MMMM', { locale: pt });
  const hour = format(date, 'HH');
  const capitalizedMonth = month.charAt(0).toUpperCase() + month.slice(1);

  const formattedDate = `${day} de ${capitalizedMonth}, às ${hour}h`;

  async function handleClick() {
    setLoading(true);
    const hadError = await onClick(data);
    if (hadError) {
      setLoading(false);
    }
  }

  return (
    <Container>
      <Banner source={{ uri: data.banner }} />
      <InfoContainer>
        <Title>{data.title}</Title>
        <InfoRow>
          <Icon name="event" size={14} color="#999999" />
          <InfoText>{formattedDate}</InfoText>
        </InfoRow>
        <InfoRow>
          <Icon name="place" size={14} color="#999999" />
          <InfoText>{data.localization}</InfoText>
        </InfoRow>
        <InfoRow>
          <Icon name="person" size={14} color="#999999" />
          <InfoText>Organizador: {data.organizer.name}</InfoText>
        </InfoRow>
        <InscriptionButton
          canRegister={canRegister}
          onPress={handleClick}
          loading={loading}>
          {canRegister ? 'Realizar inscriçao' : 'Cancelar inscrição'}
        </InscriptionButton>
      </InfoContainer>
    </Container>
  );
}

Meetup.propTypes = {
  data: PropTypes.shape({
    date: PropTypes.string.isRequired,
    banner: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    localization: PropTypes.string.isRequired,
    organizer: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  canRegister: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};
