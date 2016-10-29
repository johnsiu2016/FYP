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

var data = {
  'ECG - II': [
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
    -0.0057305908203125, -0.0000562744140625
  ],
  'PPG': [
    -0.615617, -0.593225, -0.561621, -0.520447, -0.4697, -0.409714, -0.341109, -0.264733, -0.181634, -0.0930303, -0.000284727,
    0.0951251, 0.19164, 0.287667, 0.381656, 0.472156, 0.557875, 0.637704, 0.710714, 0.776128, 0.833297, 0.881714, 0.921045,
    0.951157, 0.972135, 0.984253, 0.987913, 0.983624, 0.971983, 0.953633, 0.929243, 0.899507, 0.865121, 0.826765, 0.785082,
    0.740661, 0.694015, 0.645587, 0.59582, 0.545196, 0.494246, 0.443533, 0.393608, 0.344981, 0.298127, 0.253494, 0.211507,
    0.172554, 0.136978, 0.105059, 0.0770082, 0.0529552, 0.0329633, 0.0170408, 0.00512365, -0.00293051, -0.00733322, -0.00836638,
    -0.00638339, -0.00180418, 0.00489955, 0.0132056, 0.0225461, 0.0323575, 0.0421177, 0.0513493, 0.0596349, 0.0666362, 0.0720919,
    0.0758241, 0.0777405, 0.0777992, 0.0759569, 0.0721549, 0.0663167, 0.058373, 0.0483321, 0.0363186, 0.0225527, 0.00728563,
    -0.00926222, -0.0269201, -0.0455507, -0.0650429, -0.0853176, -0.106298, -0.127884, -0.149957, -0.172377, -0.194996,
    -0.217691, -0.240364, -0.26293, -0.285325, -0.30749, -0.329363, -0.350911, -0.37213, -0.393034, -0.413638, -0.433932,
    -0.453862, -0.473337, -0.492255, -0.510515, -0.528009, -0.544592, -0.56005, -0.574047, -0.586056, -0.595292, -0.600716, -0.601094
  ],
  'RBBB': [
    -0.038147, -0.0387573, -0.039978, -0.0384521, -0.0363159, -0.0317383, -0.0238037, -0.0134277, -0.00274658, 0.0088501,
    0.0192261, 0.0296021, 0.0357056, 0.0393677, 0.0393677, 0.0369263, 0.0311279, 0.020752, 0.00579834, -0.0088501,
    -0.022583, -0.0320435, -0.0390625, -0.0402832, -0.0384521, -0.0350952, -0.0320435, -0.0308228, -0.0311279, -0.0317383,
    -0.0338745, -0.0396729, -0.0479126, -0.0405884, 0.00427246, 0.101929, 0.232849, 0.35553, 0.430603, 0.446472,
    0.414429, 0.352783, 0.266113, 0.159912, 0.0454712, -0.0549316, -0.124817, -0.159912, -0.169373, -0.162354,
    -0.147705, -0.13031, -0.115356, -0.100708, -0.088501, -0.078125, -0.0701904, -0.0683594, -0.0723267, -0.078125,
    -0.0827026, -0.0820923, -0.0808716, -0.078125, -0.0750732, -0.0708008, -0.065918, -0.0604248, -0.0558472, -0.0500488,
    -0.0442505, -0.0357056, -0.0259399, -0.0115967, 0.00488281, 0.0228882, 0.0405884, 0.0552368, 0.0662231, 0.0741577,
    0.0799561, 0.085144, 0.0888062, 0.0930786, 0.09552, 0.0967407, 0.0961304, 0.0924683, 0.0848389, 0.0732422,
    0.0582886, 0.0421143, 0.0238037, 0.00579834, -0.0140381, -0.0338745, -0.0491333, -0.0567627, -0.0585938, -0.0570679
  ]
};

var color = {
  'green': '#00bd00',
  'purple': '#CC00FF',
  'yellow': '#FFFF00'
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
    var self = this;

    self.animation = self.draw();
    self.animation.start();

    this.interval = setInterval(function () {
      self.requestData(self.props.waveform).then((data) => {
        self.ecgDataBuffer.push(data);
        if (self.props.showBuffer) {
          console.log(`${self.props.waveform} buffer: ${self.ecgDataBuffer.length}`);
        }
      });
    }, 1800);

    global.dispatchEvent(new Event('resize'));
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  componentDidUpdate() {
    var self = this;

    if (this.props.shouldResize) {
      global.dispatchEvent(new Event('resize'));
    }

    self.animation.cancel();
    self.animation = self.draw();
    self.animation.start();
  }

  draw = () => {
    var self = this;

    var ecg = this.canvas;
    var ctx = ecg.getContext('2d');
    var speed = self.props.speed;
    var scanBarWidth = 20;
    var animationID = 0;

    self.w = ecg.width;
    self.h = ecg.height;

    var opx = self.px;
    var opy = self.py || self.h / 2;

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

  requestData = (waveform) => {
    return new Promise((resolve) => {
      resolve(data[waveform]);
    });
  };

  getDataPoint = () => {
    var self = this;
    var py;

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
    var {containerWidth, containerHeight} = this.props;
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