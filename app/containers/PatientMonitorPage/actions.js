/*
 *
 * PatientMonitorPage actions
 *
 */
import uuid from 'node-uuid';

import {
  CHANGE_LAYOUT1,
  RESET_LAYOUT1,
  ADD_ITEM1,
  REMOVE_ITEM1,
  ADD_ITEM2,
  REMOVE_ITEM2,
  PLAY_MODE,
  HANDLE_LEFT_DRAWER_TOGGLE,
  HANDLE_LEFT_DRAWER_CLOSE,
  HANDLE_WAVEFORM_CHANGE,
  HANDLE_COLOR_CHANGE,
  HANDLE_SCALE_CHANGE,
  HANDLE_SPEED_CHANGE
} from './constants';

export function changeLayout1(layout1) {
  return {
    type: CHANGE_LAYOUT1,
    layout1: layout1
  };
}

export function resetLayout1() {
  return {
    type: RESET_LAYOUT1
  };
}

export function addItem1() {
  var i = uuid.v4();
  return {
    type: ADD_ITEM1,
    layout1: [
      {
        i: i,
        x: 0,
        y: Infinity, // puts it at the bottom
        w: 10,
        h: 1
      }
    ],
    items1: {
      [i]: {
        waveform: 'ECG - II',
        strokeStyle: 'green',
        scale: 0.7,
        speed: 3,
        lineWidth: 3
      }
    }
  }
}

export function removeItem1(i) {
  return {
    type: REMOVE_ITEM1,
    i: i
  };
}

export function addItem2() {
  var i = uuid.v4();
  return {
    type: ADD_ITEM2,
    layout1: [
      {
        i: i,
        x: 10,
        y: Infinity, // puts it at the bottom
        w: 2,
        h: 1
      }
    ],
    items2: {
      [i]: {
        color: 'green'
      }
    }
  }
}

export function removeItem2(i) {
  return {
    type: REMOVE_ITEM2,
    i: i
  };
}

export function playMode() {
  return {
    type: PLAY_MODE,
  };
}

export function handleLeftDrawerToggle(i) {
  return {
    type: HANDLE_LEFT_DRAWER_TOGGLE,
    i: i
  };
}

export function handleLeftDrawerClose() {
  return {
    type: HANDLE_LEFT_DRAWER_CLOSE,
  };
}

export function handleWaveformChange(value) {
  return {
    type: HANDLE_WAVEFORM_CHANGE,
    value: value
  };
}

export function handleColorChange(value) {
  return {
    type: HANDLE_COLOR_CHANGE,
    value: value
  };
}

export function handleScaleChange(value) {
  return {
    type: HANDLE_SCALE_CHANGE,
    value: value
  };
}

export function handleSpeedChange(value) {
  return {
    type: HANDLE_SPEED_CHANGE,
    value: value
  };
}