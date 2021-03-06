/**
 *
 * Ecg
 *
 */

import React from 'react';

import {FormattedMessage} from 'react-intl';
import messages from './messages';
import styles from './styles.css';

import Dimensions from 'react-dimensions'
import {Grid, Row, Col} from 'react-bootstrap';

let color = {
  'green': '#00bd00',
  'purple': '#CC00FF',
  'yellow': '#FFFF00',
  'white': '#FFFFFF',
  'red': '#FC0203',
  'blue': '#03FDFB',
};

class ECG extends React.Component { // eslint-disable-line react/prefer-stateless-function

  static defaultProps = {
    waveform: 'ECG-II',
    strokeStyle: 'green',
    lineWidth: 3,
    scale: 0.8,
    speed: 3,
    showBuffer: true
  };

  constructor(props) {
    super(props);

    this.ecgDataBuffer = [];
    this.ecgData = null;
    this.dataIndex = 0;

    this.canvas = null;
    this.w = 0;
    this.h = 0;
    this.py = 0;
    this.px = 0;

    this.interval = null;
  }

  componentDidMount() {
    let self = this;

    self.animation = self.draw();
    self.animation.start();

    self.props.socket && self.props.socket.on(self.props.i, (data) => {
      if (self.ecgDataBuffer.length < 20) {
        self.ecgDataBuffer.push(data);
      }
      if (self.props.showBuffer) {
        console.log(`${self.props.waveform} buffer: ${self.ecgDataBuffer.length}`);
      }
    });

    global.dispatchEvent(new Event('resize'));
  }

  componentWillUnmount() {

  }

  componentDidUpdate() {
    let self = this;

    self.props.socket && self.props.socket.on(self.props.i, (data) => {
      if (self.ecgDataBuffer.length < 20) {
        self.ecgDataBuffer.push(data);
      }
      if (self.props.showBuffer) {
        console.log(`${self.props.waveform} buffer: ${self.ecgDataBuffer.length}`);
      }
    });

    self.animation && self.animation.cancel();
    self.animation = self.draw();
    self.animation.start();
  }

  draw = () => {
    let self = this;

    let ecg = this.canvas;
    let ctx = ecg.getContext('2d');
    let speed = self.props.speed;
    let scanBarWidth = 20;
    let animationID = 0;

    self.w = ecg.width;
    self.h = ecg.height;

    let opx = self.px;
    let opy = self.py || self.h / 2;

    ctx.strokeStyle = color[self.props.strokeStyle];
    ctx.lineWidth = self.props.lineWidth;

    function animate() {
      self.py = self.getDataPoint();
      self.px += speed;

      ctx.clearRect(self.px, 0, scanBarWidth, self.h);
      ctx.beginPath();
      ctx.moveTo(opx, opy);
      ctx.lineTo(self.px, self.py);
      ctx.stroke();

      opx = self.px;
      opy = self.py;

      if (opx > self.w) {
        self.px = opx = -speed;
      }

      animationID = requestAnimationFrame(animate);
    }

    return {
      start: () => {
        animationID = requestAnimationFrame(animate);
      },
      cancel: () => {
        cancelAnimationFrame(animationID);
      }
    }
  };

  getDataPoint = () => {
    let self = this;
    let py;

    if (self.ecgData) {

      py = self.convertToGraphCoord(self.ecgData[self.dataIndex], self.h);

      self.dataIndex = self.dataIndex + 1;
      if (self.dataIndex >= self.ecgData.length) {
        self.dataIndex = 0;
        self.ecgData = self.ecgDataBuffer.shift();
      }

      return py;

    } else {
      if (self.ecgDataBuffer.length > 0) {
        self.ecgData = self.ecgDataBuffer.shift();
      }
      return self.h / 2
    }
  };

  render() {
    let {containerWidth, containerHeight} = this.props;
    return (
      <canvas width={containerWidth}
              height={containerHeight}
              ref={(c) => this.canvas = c}>
      </canvas>
    );
  }

  convertToGraphCoord = (num, height) => {
    return (height / 2) * -(num * this.props.scale) + height / 2;
  }
}

export default Dimensions()(ECG) // Enhanced component