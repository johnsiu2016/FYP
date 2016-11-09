import { createSelector } from 'reselect';

/**
 * Direct selector to the patientMonitorPage state domain
 */
const selectPatientMonitorPageDomain = () => state => state.get('patientMonitorPage');

/**
 * Other specific selectors
 */


/**
 * Default selector used by PatientMonitorPage
 */

const selectPatientMonitorPageItems1 = () => createSelector(
  selectPatientMonitorPageDomain(),
  (substate) => substate.get('items1').toJS()
);

export default selectPatientMonitorPageItems1;
export {
  selectPatientMonitorPageDomain,
};
