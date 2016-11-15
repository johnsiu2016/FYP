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

const selectLayout1 = () => createSelector(
  selectPatientMonitorPageDomain(),
  (patientMonitorState) => patientMonitorState.get('layout1')
);

const selectItems1 = () => createSelector(
  selectPatientMonitorPageDomain(),
  (patientMonitorState) => patientMonitorState.get('items1')
);

const selectItems2 = () => createSelector(
  selectPatientMonitorPageDomain(),
  (patientMonitorState) => patientMonitorState.get('items2')
);

const selectLeftDrawer = () => createSelector(
  selectPatientMonitorPageDomain(),
  (patientMonitorState) => patientMonitorState.get('leftDrawer')
);

const selectPlay = () => createSelector(
  selectPatientMonitorPageDomain(),
  (patientMonitorState) => patientMonitorState.get('play')
);

export {
  selectPatientMonitorPageDomain,
  selectLayout1,
  selectItems1,
  selectItems2,
  selectLeftDrawer,
  selectPlay
};
