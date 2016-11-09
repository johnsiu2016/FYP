import expect from 'expect';
import patientMonitorPageReducer from '../reducer';
import { fromJS } from 'immutable';

describe('patientMonitorPageReducer', () => {
  it('returns the initial state', () => {
    expect(patientMonitorPageReducer(undefined, {})).toEqual(fromJS({}));
  });
});
