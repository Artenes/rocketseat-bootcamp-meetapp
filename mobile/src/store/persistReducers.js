import AsyncStorage from '@react-native-community/async-storage';
import { persistReducer } from 'redux-persist';

export default reducers => {
  return persistReducer(
    {
      key: 'gobarber',
      storage: AsyncStorage,
      whitelist: ['auth', 'user'],
    },
    reducers
  );
};
