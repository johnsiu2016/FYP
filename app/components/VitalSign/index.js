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
    var l = console.log;
    var {containerWidth, containerHeight} = this.props;

    if (!this.firstWidth) {
      this.firstWidth = containerWidth;
    }

    l(containerHeight);
    l(containerWidth);
    l(this.firstWidth);
    var scale = containerHeight * containerWidth/this.firstWidth;
    l(scale);

    return (
      <div style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexFlow: 'row wrap',
        color: '#00bd00'
      }}>

        <div style={{flex: '0.3'}}>
          <div style={{fontSize: '2em'}}>
            HR
          </div>
          <div style={{alignSelf: 'center'}}>
            <div style={{fontSize: `${scale*0.2}px`, lineHeight: `${scale*0.2}px`, textAlign: 'center'}}>
              120
            </div>
            <div style={{fontSize: `${scale*0.2}px`, lineHeight: `${scale*0.2}px`, textAlign: 'center'}}>
              50
            </div>
          </div>
        </div>

        <div style={{flex: '0.7', fontSize: `${scale*0.95}px`, lineHeight: `${scale*0.95}px`}}>
          90
        </div>
      </div>
    );
  }
}

export default Dimensions()(VitalSign) // Enhanced component