/**
 *
 * VitalSign
 *
 */

import React from 'react';

import Dimensions from 'react-dimensions'

import {FormattedMessage} from 'react-intl';
import messages from './messages';
import styles from './styles.css';

class VitalSign extends React.Component { // eslint-disable-line react/prefer-stateless-function
  componentDidUpdate() {
      global.dispatchEvent(new Event('resize'));
  }

  render() {
    var {containerHeight, w} = this.props;
    var scaleRatio = w/12;
    var scaleContainerHeight = containerHeight * scaleRatio;

    return (
      <div style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexFlow: 'row wrap',
        color: '#00bd00'
      }}>

        <div style={{flex: '0.4'}}>
          <div style={{fontSize: '2em'}}>
            HR
          </div>
          <div style={{alignSelf: 'center'}}>
            <div style={{fontSize: `${scaleContainerHeight*0.2}px`, lineHeight: `${scaleContainerHeight*0.2}px`, textAlign: 'center'}}>
              120
            </div>
            <div style={{fontSize: `${scaleContainerHeight*0.2}px`, lineHeight: `${scaleContainerHeight*0.2}px`, textAlign: 'center'}}>
              50
            </div>
          </div>
        </div>

        <div style={{flex: '0.6', fontSize: `${scaleContainerHeight*0.9}px`, lineHeight: `${scaleContainerHeight*0.9}px`}}>
          90
        </div>
      </div>
    );
  }
}

export default Dimensions()(VitalSign) // Enhanced component
