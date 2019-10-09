import { all, takeLatest, put, call } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from '~/services/api';
import { updateProfileFailure, updateProfileSuccess } from './actions';

export function* updateProfile({ payload }) {
  try {
    const { name, email, ...rest } = payload;

    const profile = Object.assign(
      { name, email },
      rest.oldPassword ? rest : {}
    );

    yield call(api.put, 'users', profile);

    toast.success('Perfil atualizado');
    // backend does not send data back, but if it did no throw any error
    // that means the form data is valid, so just use to update the store
    yield put(updateProfileSuccess({ name, email }));
  } catch (error) {
    // The proper way would be for the back-end to return a code to represent the error
    // but for simplicity sake, we will check the error message and translate it
    const message = error.response && error.response.data.error;

    if (message === 'User already exists') {
      toast.error('E-mail já em uso');
    } else if (message === 'Password does not match') {
      toast.error('Senha inválida');
    } else {
      toast.error('Erro ao atualizar perfil');
    }
    yield put(updateProfileFailure());
  }
}

export default all([takeLatest('@user/UPDATE_PROFILE_REQUEST', updateProfile)]);
