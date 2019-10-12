import React, { useRef, useEffect, useState } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import pt from 'date-fns/locale/pt-BR';

import { useField } from '@rocketseat/unform';

import 'react-datepicker/dist/react-datepicker.css';

/**
 * Also the error message was hardcoded because it was not getting
 * the one sent by unform (using yup).
 */
export default function ReactDatePicker({ name, placeholder }) {
  registerLocale('pt', pt);
  const ref = useRef(null);
  const { fieldName, registerField, defaultValue, error } = useField(name);
  const [selected, setSelected] = useState(defaultValue);

  useEffect(() => {
    setSelected(defaultValue);
  }, [defaultValue]);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: ref.current,
      path: 'props.selected',
      clearValue: pickerRef => {
        pickerRef.clear();
      },
    });
  }, [fieldName, ref.current]); //eslint-disable-line

  return (
    <>
      <DatePicker
        name={fieldName}
        selected={selected}
        onChange={date => setSelected(date)}
        ref={ref}
        placeholderText={placeholder}
        dateFormat="d 'de' MMMM', às' HH':'mm"
        showTimeSelect
        locale="pt"
        timeCaption="Hora"
      />
      {error && <span>informe uma data</span>}
    </>
  );
}
