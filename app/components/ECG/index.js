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


class ECG extends React.Component { // eslint-disable-line react/prefer-stateless-function

  componentDidMount() {
    this.draw()
  }

  componentDidUpdate() {
    this.draw()
  }

  draw = () => {
    var self = this;

    if (self.animation) {
      cancelAnimationFrame(self.animation);
      self.animation = null;
    }

    var ecg = this.canvas;
    var ctx = ecg.getContext('2d');
    var w = ecg.width;
    var h = ecg.height;
    var px = 0;
    var opx = 0;
    var speed = 3;
    var scanBarWidth = 20;
    var fps = 60;

    this.py = h * 0.8;
    var opy = this.py;

    ctx.strokeStyle = '#00bd00';
    ctx.lineWidth = 3;

    animate();

    function animate() {
      setTimeout(function () {
        px += speed;

        ctx.clearRect(px, 0, scanBarWidth, h);
        ctx.beginPath();
        ctx.moveTo(opx, opy);
        ctx.lineTo(px, self.py);
        ctx.stroke();

        opx = px;
        opy = self.py;

        if (opx > w) {
          px = opx = -speed;
        }

        self.animation = requestAnimationFrame(animate);

      }, 1000 / fps);
    }
  };

  draw2 = () => {
    var self = this;

    if (self.animation) {
      cancelAnimationFrame(self.animation);
      self.animation = null;
    }

    var ecg = this.canvas;
    var ctx = ecg.getContext('2d');

    ctx.fillStyle = "#dbbd7a";
    ctx.fill();

    var fps = 60;
    var n = 1;

    var data = [
      148, 149, 149, 150, 150, 150, 143, 82, 82, 82, 82, 82, 82, 82,
      148, 149, 149, 150, 150, 150, 143, 82, 82, 82, 82, 82, 82, 82,
      148, 149, 149, 150, 150, 150, 143, 82, 82, 82, 82, 82, 82, 82,
      148, 149, 149, 150, 150, 150, 143, 82, 82, 82, 82, 82, 82, 82,
      148, 149, 149, 150, 150, 150, 143, 82, 82, 82, 82, 82, 82, 82,
      148, 149, 149, 150, 150, 150, 143, 82, 82, 82, 82, 82, 82, 82,
      148, 149, 149, 150, 150, 150, 143, 82, 82, 82, 82, 82, 82, 82,
      148, 149, 149, 150, 150, 150, 143, 82, 82, 82, 82, 82, 82, 82,
      148, 149, 149, 150, 150, 150, 143, 82, 82, 82, 82, 82, 82, 82,
      148, 149, 149, 150, 150, 150, 143, 82, 82, 82, 82, 82, 82, 82,];

    drawWave();

    function drawWave() {
      setTimeout(function () {
        requestAnimationFrame(drawWave);
        ctx.lineWidth = "3";
        ctx.strokeStyle = 'green';

        // Drawing code goes here
        n += 1;
        if (n >= data.length) {
          n = 1;
        }
        ctx.beginPath();
        ctx.moveTo(n - 1, data[n - 1]);
        ctx.lineTo(n, data[n]);
        ctx.stroke();

        ctx.clearRect(n + 1, 0, 10, ecg.height);

      }, 1000 / fps);
    }
  };

  onMouseMove = (e) => {
    var r = this.canvas.getBoundingClientRect();
    this.py = e.clientY - r.top;
  };

  render() {
    var {containerWidth, containerHeight} = this.props;
    return (
      <canvas ref={(c) => this.canvas = c}
              width={containerWidth}
              height={containerHeight}
              onMouseMove={this.onMouseMove}>
      </canvas>
    );
  }
}

export default Dimensions()(ECG) // Enhanced component