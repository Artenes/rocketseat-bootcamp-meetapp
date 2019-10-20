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

    const response = yield call(api.put, 'users', profile);

    Alert.alert('Profile updated', 'Your profile was updated');
    yield put(updateProfileSuccess(response.data));
  } catch (error) {
    Alert.alert('Profile update error', 'Verify your data');
    yield put(updateProfileFailure());
  }
}

export default all([takeLatest('@user/UPDATE_PROFILE_REQUEST', updateProfile)]);
