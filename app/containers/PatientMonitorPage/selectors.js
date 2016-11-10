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
  (patientMonitorState) => substate.get('layout1').toJS()
);

const selectItems1 = () => createSelector(
  selectPatientMonitorPageDomain(),
  (patientMonitorState) => substate.get('layout1').toJS()
);

const selectLayout2 = () => createSelector(
  selectPatientMonitorPageDomain(),
  (patientMonitorState) => substate.get('layout2').toJS()
);

const selectLeftDrawer = () => createSelector(
  selectPatientMonitorPageDomain(),
  (patientMonitorState) => substate.get('leftDrawer').toJS()
);

const selectPlay = () => createSelector(
  selectPatientMonitorPageDomain(),
  (patientMonitorState) => substate.get('play').toJS()
);

export {
  selectPatientMonitorPageDomain,
  selectLayout1,
  selectItems1,
  selectLayout2,
  selectLeftDrawer,
  selectPlay
};
