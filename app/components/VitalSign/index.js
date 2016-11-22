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

var color = {
  'green': '#00bd00',
  'purple': '#CC00FF',
  'yellow': '#FFFF00',
  'white': '#FFFFFF',
  'red': '#FC0203',
  'blue': '#03FDFB',
};

var data = {
  'HR': {
    'top': 120,
    'bottom': 50,
    'data': 60
  },
  'SpO2': {
    'top': 100,
    'bottom': 90,
    'data': 97
  },
  'RP': {
    'top': 45,
    'bottom': 8,
    'data': 40
  },
  'ABP': {
    'systolic': 116,
    'diastolic': 78,
    'mean': 91
  },
  'PAP': {
    'systolic': 28,
    'diastolic': 15,
    'mean': 21
  },
  'NBP': {
    'systolic': 120,
    'diastolic': 80,
    'mean': 90
  }
};

class VitalSign extends React.Component { // eslint-disable-line react/prefer-stateless-function
  componentDidUpdate() {
    global.dispatchEvent(new Event('resize'));
  }

  render() {
    var {containerHeight, w, strokeStyle, vitalSign} = this.props;
    var scaleRatio = w / 12;
    var scaleContainerHeight = containerHeight * scaleRatio;
    var element = null;

    switch (vitalSign) {
      case "HR":
      case "SpO2":
      case "RP":
        element = (
          <div style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexFlow: 'row wrap',
            color: color[strokeStyle]
          }}>

            <div style={{flex: '0.4'}}>
              <div style={{fontSize: '2em'}}>
                {vitalSign}
              </div>
              <div style={{alignSelf: 'center'}}>
                <div style={{
                  fontSize: `${scaleContainerHeight * 0.2}px`,
                  lineHeight: `${scaleContainerHeight * 0.2}px`,
                  textAlign: 'center'
                }}>
                  {data[vitalSign].top}
                </div>
                <div style={{
                  fontSize: `${scaleContainerHeight * 0.2}px`,
                  lineHeight: `${scaleContainerHeight * 0.2}px`,
                  textAlign: 'center'
                }}>
                  {data[vitalSign].bottom}
                </div>
              </div>
            </div>

            <div style={{
              flex: '0.6',
              fontSize: `${scaleContainerHeight * 0.9}px`,
              lineHeight: `${scaleContainerHeight * 0.9}px`
            }}>
              {data[vitalSign].data}
            </div>
          </div>
        );
        break;
      case "ABP":
      case "PAP":
      case "NBP":
        element = (
          <div style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexFlow: 'row wrap',
            color: color[strokeStyle]
          }}>

            <div style={{flex: '0.15'}}>
              <div style={{fontSize: '2em'}}>
                {vitalSign}
              </div>
            </div>

            <div style={{
              flex: '0.6',
              fontSize: `${scaleContainerHeight * 0.4}px`,
              lineHeight: `${scaleContainerHeight * 0.4}px`,
              alignSelf: 'center'
            }}>
              {data[vitalSign].systolic}
              {"/"}
              {data[vitalSign].diastolic}
            </div>

            <div style={{
              flex: '0.25',
              fontSize: `${scaleContainerHeight * 0.4}px`,
              lineHeight: `${scaleContainerHeight * 0.4}px`,
              alignSelf: 'center'
            }}>
              {"("}
              {data[vitalSign].mean}
              {")"}
            </div>
          </div>
        );
        break;
    }

    return element;
  }
}

export default Dimensions()(VitalSign) // Enhanced component
