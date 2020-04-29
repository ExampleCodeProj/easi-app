import { SystemState } from 'types/system';
import { Action } from 'redux-actions';
import { fetchSystemShorts } from 'types/routines';

const initialState: SystemState = {
  systemShorts: []
};

function systemsReducer(
  state = initialState,
  action: Action<any>
): SystemState {
  switch (action.type) {
    case fetchSystemShorts.SUCCESS:
      return {
        ...state,
        systemShorts: action.payload
      };
    default:
      return state;
  }
}

export default systemsReducer;
