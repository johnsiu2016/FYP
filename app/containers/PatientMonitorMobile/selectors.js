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

const selectLayout1 = () => createSelector(
  selectPatientMonitorMobileDomain(),
  (patientMonitorMobileState) => patientMonitorMobileState.get('layout1')
);

const selectItems1 = () => createSelector(
  selectPatientMonitorMobileDomain(),
  (patientMonitorMobileState) => patientMonitorMobileState.get('items1')
);

const selectLayout2 = () => createSelector(
  selectPatientMonitorMobileDomain(),
  (patientMonitorMobileState) => patientMonitorMobileState.get('layout2')
);

const selectLeftDrawer = () => createSelector(
  selectPatientMonitorMobileDomain(),
  (patientMonitorMobileState) => patientMonitorMobileState.get('leftDrawer')
);

const selectPlay = () => createSelector(
  selectPatientMonitorMobileDomain(),
  (patientMonitorMobileState) => patientMonitorMobileState.get('play')
);

export {
  selectPatientMonitorMobileDomain,
  selectLayout1,
  selectItems1,
  selectLayout2,
  selectLeftDrawer,
  selectPlay
};
