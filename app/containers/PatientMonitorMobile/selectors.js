import { createSelector } from 'reselect';

/**
 * Direct selector to the patientMonitorMobile state domain
 */
const selectPatientMonitorMobileDomain = () => state => state.get('patientMonitorMobile');

/**
 * Other specific selectors
 */


/**
 * Default selector used by PatientMonitorMobile
 */

const selectPatientMonitorMobile = () => createSelector(
  selectPatientMonitorMobileDomain(),
  (substate) => substate.toJS()
);

export default selectPatientMonitorMobile;
export {
  selectPatientMonitorMobileDomain,
};
