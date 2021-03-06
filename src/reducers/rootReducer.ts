import { combineReducers } from 'redux';

import actionReducer from 'reducers/actionReducer';
import systemIntakesReducer from 'reducers/systemIntakesReducer';

import authReducer from './authReducer';
import businessCaseReducer from './businessCaseReducer';
import businessCasesReducer from './businessCasesReducer';
import fileReducer from './fileReducer';
import systemIntakeReducer from './systemIntakeReducer';
import systemsReducer from './systemsReducer';

const rootReducer = combineReducers({
  search: systemsReducer,
  systemIntake: systemIntakeReducer,
  systemIntakes: systemIntakesReducer,
  businessCase: businessCaseReducer,
  businessCases: businessCasesReducer,
  action: actionReducer,
  auth: authReducer,
  files: fileReducer
});

export default rootReducer;

export type AppState = ReturnType<typeof rootReducer>;
