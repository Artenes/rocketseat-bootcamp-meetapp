import { all, takeLatest, put, call } from 'redux-saga/effects';
import { Alert } from 'react-native';

import api from '~/services/api';
import { updateProfileFailure, updateProfileSuccess } from './actions';

export function* updateProfile({ payload }) {
  try {
    const { name, email, ...rest } = payload;

    const profile = {
      name,
      email,
      ...(rest.oldPassword ? rest : {}),
    };

    yield call(api.put, 'users', profile);

    Alert.alert('Perfil atualizado', 'Seu perfil foi atualizado com sucesso');
    // if data is valid, just put it back again in store
    yield put(updateProfileSuccess({ name, email }));
  } catch (error) {
    const message = error.response
      ? error.response.data.error
      : 'Erro de conexão';
    Alert.alert('Falha em atualizar perfil', message);
    yield put(updateProfileFailure());
  }
}

export default all([takeLatest('@user/UPDATE_PROFILE_REQUEST', updateProfile)]);
