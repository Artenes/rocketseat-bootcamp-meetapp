import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';
import { MdAddCircleOutline } from 'react-icons/md';
import * as Yup from 'yup';

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
        <Input name="name" placeholder="Nome completo" />
        <Input name="email" type="text" placeholder="Digite seu e-mail" />

        <hr />

        <Input type="password" name="oldPassword" placeholder="Senha atual" />

        <Input type="password" name="password" placeholder="Nova senha" />
        <Input
          type="password"
          name="confirmPassword"
          placeholder="Confirmação de senha"
        />
        <button type="submit">
          {loading ? (
            'Carregando'
          ) : (
            <>
              <MdAddCircleOutline size={24} color="#fff" />
              Salvar perfil
            </>
          )}
        </button>
      </Form>
    </Container>
  );
}
