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
    // that means the form data is valid, so just use it to update the store
    yield put(updateProfileSuccess({ name, email }));
  } catch (error) {
    const message = error.response
      ? error.response.data.error
      : 'Erro de conexão';
    toast.error(message);
    yield put(updateProfileFailure());
  }
}

export default all([takeLatest('@user/UPDATE_PROFILE_REQUEST', updateProfile)]);
