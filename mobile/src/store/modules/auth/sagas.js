import { Alert } from 'react-native';
import { takeLatest, call, put, all, delay } from 'redux-saga/effects';

import api from '~/services/api';

import { signInSuccess, signFailure, signUpSuccess } from './actions';

export function* signIn({ payload }) {
  try {
    const { email, password } = payload;

    const response = yield call(api.post, 'sessions', {
      email,
      password,
    });

    const { token, user } = response.data;

    api.defaults.headers.Authorization = `Bearer ${token}`;

    // used to delay an execution
    // yield delay(3000);

    yield put(signInSuccess(token, user));
  } catch (error) {
    const message = error.response ? error.response.data.error : 'Erro de conexão';
    Alert.alert('Falha no SignIn', message);
    yield put(signFailure());
  }
}

export function* signUp({ payload }) {
  try {
    const { name, email, password } = payload;

    yield call(api.post, 'users', {
      name,
      email,
      password,
    });

    // sign in the user after sign up
    const response = yield call(api.post, 'sessions', {
      email,
      password,
    });

    const { token, user } = response.data;

    api.defaults.headers.Authorization = `Bearer ${token}`;

    yield put(signUpSuccess());
    yield put(signInSuccess(token, user));
  } catch (error) {
    const message = error.response ? error.response.data.error : 'Erro de conexão';
    Alert.alert('Falha no SignUp', message);
    yield put(signFailure());
  }
}

export function setToken({ payload }) {
  if (!payload) return;

  const { token } = payload.auth;

  if (token) {
    api.defaults.headers.Authorization = `Bearer ${token}`;
  }
}

export default all([
  takeLatest('persist/REHYDRATE', setToken),
  takeLatest('@auth/SIGN_IN_REQUEST', signIn),
  takeLatest('@auth/SIGN_UP_REQUEST', signUp),
]);
