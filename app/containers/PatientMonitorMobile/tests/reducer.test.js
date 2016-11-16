import expect from 'expect';
import patientMonitorMobileReducer from '../reducer';
import { fromJS } from 'immutable';

describe('patientMonitorMobileReducer', () => {
  it('returns the initial state', () => {
    expect(patientMonitorMobileReducer(undefined, {})).toEqual(fromJS({}));
  });
});
