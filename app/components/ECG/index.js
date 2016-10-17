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
  constructor(props) {
    super(props);

    var self = this;
    this.dataIndex = 0;
    this.maxY = 0;
    this.minY = 0;
    this.data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0.08, 0.18, 0.08, 0, 0, 0, 0, 0, 0, -0.04,
      -0.08, 0.3, 0.7, 0.3, -0.17, 0.00, 0.04, 0.04,
      0.05, 0.05, 0.06, 0.07, 0.08, 0.10, 0.11, 0.11,
      0.10, 0.085, 0.06, 0.04, 0.03, 0.01, 0.01, 0.01,
      0.01, 0.02, 0.03, 0.05, 0.05, 0.05, 0.03, 0.02, 0, 0, 0].map(function (a) {
      self.maxY = a > self.maxY ? a : self.maxY;
      self.minY = a < self.minY ? a : self.minY;
      return a;
    });
  }

  componentDidMount() {
    var self = this;
    var flag = true;
    self.draw();
    setInterval(function() {
      self.requestData(flag).then((data) => {
        self.data = data;
        flag = !flag;
      });

    }, 1000);

  }

  componentDidUpdate() {
    this.draw();
  }

  requestData = (flag) => {
    var self = this;
    return (async function () {
      console.log(`async   ${Date.now()/1000}`);
      await self.sleep(100);
      console.log(`async 2 ${Date.now()/1000}`);
      if (flag) {
        return [
          0, 0, 0, 0, 0.0000050048828125, 0.0000137939453125, 0.000049560546875, 0.00008740234375, 0.00015966796875,
          0.000262451171875, 0.0003975830078125, 0.0005687255859375, 0.0007802734375, 0.001037353515625,
          0.0013468017578125, 0.00172119140625, 0.0021756591796875, 0.0027232666015625, 0.0033880615234375,
          0.004206787109375, 0.0052380371093750005, 0.006586181640625, 0.008400146484375001, 0.010904296875,
          0.0144892578125, 0.0196798095703125, 0.049684204101562504, 0.0886883544921875, 0.11185363769531251,
          0.134164306640625, 0.137352294921875, 0.1160369873046875, 0.08516308593750001, 0.0539765625,
          0.014997436523437501, -0.015882568359375, -0.0387554931640625, -0.06125732421875, -0.0745780029296875,
          -0.07479357910156251, -0.0725338134765625, -0.0418538818359375, 0.08582861328125001, 0.397717529296875,
          0.8136408691406251, 1.2295617980957032, 0.9944150390625001, 0.2824605712890625, -0.38949267578125,
          -0.597251220703125, -0.425675537109375, -0.1537947998046875, -0.0500914306640625, -0.0111041259765625,
          0.0027451171875, 0.0071739501953125, 0.008443359375, 0.0094327392578125, 0.012530517578125,
          0.0176046142578125, 0.0300162353515625, 0.0433489990234375, 0.056962646484375004,
          0.0704832763671875, 0.0770511474609375, 0.0898175048828125, 0.10311853027343751, 0.117046142578125,
          0.1312630615234375, 0.1529300537109375, 0.167607177734375, 0.1899068603515625, 0.2124422607421875,
          0.235044677734375, 0.2575535888671875, 0.2724073486328125, 0.286978271484375, 0.3007579345703125,
          0.3067425537109375, 0.3106370849609375, 0.303756103515625, 0.2897236328125, 0.25916931152343753,
          0.2200599365234375, 0.1728209228515625, 0.133416259765625, 0.086224853515625, 0.05493408203125,
          0.02409423828125, 0.00922607421875, -0.0043409423828125, -0.0097349853515625, -0.013127685546875,
          -0.01423095703125, -0.013834716796875, -0.012556030273437501, -0.010675048828125, -0.00835888671875,
          -0.0057305908203125, -0.0000562744140625].map(function (a) {
          self.maxY = a > self.maxY ? a : self.maxY;
          self.minY = a < self.minY ? a : self.minY;
          return a;
        });
      } else {
        return [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
          0.08, 0.18, 0.08, 0, 0, 0, 0, 0, 0, -0.04,
          -0.08, 0.3, 0.7, 0.3, -0.17, 0.00, 0.04, 0.04,
          0.05, 0.05, 0.06, 0.07, 0.08, 0.10, 0.11, 0.11,
          0.10, 0.085, 0.06, 0.04, 0.03, 0.01, 0.01, 0.01,
          0.01, 0.02, 0.03, 0.05, 0.05, 0.05, 0.03, 0.02, 0, 0, 0].map(function (a) {
          self.maxY = a > self.maxY ? a : self.maxY;
          self.minY = a < self.minY ? a : self.minY;
          return a;
        });
      }
    })();
  };

  getDataPoint = () => {
    var self = this;
    var py;

    if (++self.dataIndex >= self.data.length) self.dataIndex = 0;

    if (self.props.a) {
      py = self.convertToGraphCoord(self.canvas, self.data[self.dataIndex]);
    } else {
      py = (((self.maxY - self.minY) / 2 - self.data[self.dataIndex]) / (self.maxY - self.minY)) * self.h;
    }

    return py;
  };


  sleep(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
  }

  convertToGraphCoord(g, num) {
    return (g.height / 2) * -(num * 0.8) + g.height / 2;
  }

  draw = () => {
    var self = this;

    if (self.animation) {
      cancelAnimationFrame(self.animation);
      self.animation = null;
    }

    var ecg = this.canvas;
    var ctx = ecg.getContext('2d');
    this.w = ecg.width;
    this.h = ecg.height;
    var px = 0;
    var opx = 0;
    var speed = 3.5;
    var scanBarWidth = 20;
    var fps = 200;

    this.py = this.h * 0.8;
    var opy = this.py;

    ctx.strokeStyle = '#00bd00';
    ctx.lineWidth = 3;

    animate();

    function animate() {
      setTimeout(function () {
        self.py = self.getDataPoint();
        px += speed;

        ctx.clearRect(px, 0, scanBarWidth, self.h);
        ctx.beginPath();
        ctx.moveTo(opx, opy);
        ctx.lineTo(px, self.py);
        ctx.stroke();

        opx = px;
        opy = self.py;


        if (opx > self.w) {
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