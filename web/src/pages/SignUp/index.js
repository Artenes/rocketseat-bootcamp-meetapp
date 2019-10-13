import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import logo from '~/assets/logo.svg';

import { signUpRequest } from '~/store/modules/auth/actions';

const schema = Yup.object().shape({
  name: Yup.string().required('informe seu nome'),
  email: Yup.string()
    .email('e-mail inválido')
    .required('informe seu email'),
  password: Yup.string()
    .min(6, 'deve ter ao menos 6 dígitos')
    .required('informe uma senha'),
});

export default function SignUp() {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.auth.loading);

  function handleSubmit({ name, email, password }) {
    dispatch(signUpRequest(name, email, password));
  }

  return (
    <>
      <img src={logo} alt="Meetapp" />
      <Form onSubmit={handleSubmit} schema={schema}>
        <Input name="name" placeholder="Nome completo" />
        <Input name="email" type="text" placeholder="Digite seu e-mail" />
        <Input
          name="password"
          type="password"
          placeholder="Sua senha secreta"
        />
        <button type="submit">{loading ? 'Carregando' : 'Criar conta'}</button>
        <Link to="/">Já tenho login</Link>
      </Form>
    </>
  );
}
