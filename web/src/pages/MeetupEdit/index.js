import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';
import { MdAddCircleOutline } from 'react-icons/md';
import * as Yup from 'yup';

import BannerInput from './BannerInput';
import { updateProfileRequest } from '~/store/modules/user/actions';
import { Container } from './styles';

const thenPasswordIsRequired = (oldPassword, field) =>
  oldPassword
    ? field.required('informe uma senha').min(6, 'deve ter ao menos 6 dígitos')
    : field;

const thenConfirmPasswordIsRequired = (passwordField, field) =>
  passwordField
    ? field
        .required('informe a senha novamente')
        .oneOf([Yup.ref('password')], 'senhas não são iguais')
    : field;

const schema = Yup.object().shape({
  name: Yup.string().required('informe seu nome'),
  email: Yup.string()
    .email('e-mail inválido')
    .required('informe seu email'),
  oldPassword: Yup.string(),
  password: Yup.string().when('oldPassword', thenPasswordIsRequired),
  confirmPassword: Yup.string().when('password', thenConfirmPasswordIsRequired),
});

export default function Profile() {
  const dispatch = useDispatch();
  const profile = useSelector(state => state.user.profile);
  const loading = useSelector(state => state.user.loading);

  function handleSubmit(data, { resetForm }) {
    dispatch(updateProfileRequest(data));
    const { name, email } = data;
    resetForm({ name, email });
  }

  return (
    <Container>
      <Form initialData={profile} onSubmit={handleSubmit} schema={schema}>
        <BannerInput />
        <Input type="text" name="tile" placeholder="Título do Meetup" />
        <Input
          multiline
          type="text"
          name="description"
          placeholder="Descrição completa"
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
