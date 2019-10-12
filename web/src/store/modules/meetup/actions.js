export function createMeetupRequest(data) {
  return {
    type: '@meetup/CREATE_REQUEST',
    payload: data,
  };
}

export function updateMeetupRequest(id, data) {
  return {
    type: '@meetup/UPDATE_REQUEST',
    payload: { id, data },
  };
}

export function finishMeetupSave() {
  return {
    type: '@meetup/SAVE_FINISHED',
  };
}
