import { all, takeLatest, put, call } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import history from '~/services/history';

import api from '~/services/api';
import { finishMeetupSave } from './actions';

export function* createMeetup({ payload }) {
  try {
    payload.image_id = payload.banner;

    yield call(api.post, 'meetups', payload);

    history.push('/dashboard');
  } catch (error) {
    const message = error.response
      ? error.response.data.error
      : 'Erro de conexão';
    toast.error(message);
  }
  yield put(finishMeetupSave());
}

export function* updateProfile({ payload }) {
  try {
    payload.data.image_id = payload.banner;

    yield call(api.put, `meetups/${payload.id}`, payload.data);

    history.push(`/meetup/${payload.id}`);
  } catch (error) {
    const message = error.response
      ? error.response.data.error
      : 'Erro de conexão';
    toast.error(message);
  }
  yield put(finishMeetupSave());
}

export default all([
  takeLatest('@meetup/CREATE_REQUEST', createMeetup),
  takeLatest('@meetup/UPDATE_REQUEST', updateProfile),
]);
