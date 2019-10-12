import { all, takeLatest, put, call } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import history from '~/services/history';

import api from '~/services/api';
import { finishMeetupSave } from './actions';

export function* createMeetup({ payload }) {
  try {
    payload.image_id = payload.banner;

    yield call(api.post, 'meetups', payload);

    toast.success('Meetup criada');
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

    /**
     FIXME retarded bug of the day.
     bug: Meetup details is not updated after editing it
     frequency: sometimes
     steps: - edit and save a meetup
            - you will get redirected to details page
            - observe that the old information is still being displayed
     info: - it is not backend fault's, tested on postman
           - code is ok, it sends new data to backend and then it redirects
           - details component actually hit the server to get the meetup details and it comes with old information
      suspect: race condition, page change is so fast that in the server there is no time to actually save the meetup
      bafore fetching its details again
      temporary solution: don't redirect user after editing a meetup
      real solution: quantum computing or put a delay in the function (which is kinda hacky)
     */
    toast.success('Meetup atualizada');
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
