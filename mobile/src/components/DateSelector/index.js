import React, { useMemo } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  format,
  addDays,
  subDays,
  isBefore,
  setHours,
  setMinutes,
  setSeconds,
} from 'date-fns';
import pt from 'date-fns/locale/pt-BR';

import { Container, SelectedDay, ChangeDayButton } from './styles';

export default function DateSelector({ date, onChange }) {
  const formattedDate = useMemo(() => {
    // date-fns does not capitalize months: https://github.com/date-fns/date-fns/issues/674
    // so just for consistency let's take each part individually and mount the stirng as we wish
    const day = format(date, 'd');
    const month = format(date, 'MMMM', { locale: pt });
    const capitalizedMonth = month.charAt(0).toUpperCase() + month.slice(1);
    return `${day} de ${capitalizedMonth}`;
  }, [date]);

  function handlePreviousDay() {
    const previousDay = setSeconds(
      setMinutes(setHours(subDays(date, 1), 0), 0),
      0
    );
    const today = setSeconds(setMinutes(setHours(new Date(), 0), 0), 0);
    const isYesterday = isBefore(previousDay, today);
    if (!isYesterday) {
      onChange(previousDay);
    }
  }

  function handleNextDay() {
    onChange(addDays(date, 1));
  }

  return (
    <Container>
      <ChangeDayButton onPress={handlePreviousDay}>
        <Icon name="chevron-left" size={36} color="#fff" />
      </ChangeDayButton>
      <SelectedDay>{formattedDate}</SelectedDay>
      <ChangeDayButton onPress={handleNextDay}>
        <Icon name="chevron-right" size={36} color="#fff" />
      </ChangeDayButton>
    </Container>
  );
}
