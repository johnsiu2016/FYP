/*
 *
 * PatientMonitorMobile
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import selectPatientMonitorMobile from './selectors';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import styles from './styles.css';

export class PatientMonitorMobile extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div className={styles.patientMonitorMobile}>
      <Helmet
        title="PatientMonitorMobile"
        meta={[
          { name: 'description', content: 'Description of PatientMonitorMobile' },
        ]}
      />
        <FormattedMessage {...messages.header} />
      </div>
    );
  }
}

const mapStateToProps = selectPatientMonitorMobile();

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PatientMonitorMobile);
