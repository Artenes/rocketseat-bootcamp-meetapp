import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

export default reducers => {
  return persistReducer(
    {
      key: 'io.github.artenes.meetapp',
      storage,
      whitelist: ['auth', 'user'],
    },
    reducers
  );
};
