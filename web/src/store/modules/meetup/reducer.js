import produce from 'immer';

const INITIAL_STATE = {
  loading: false,
};

export default function meetup(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@meetup/UPDATE_REQUEST':
      case '@meetup/CREATE_REQUEST':
        draft.loading = true;
        break;
      case '@meetup/SAVE_FINISHED':
        draft.loading = false;
        break;
      default:
        break;
    }
  });
}
