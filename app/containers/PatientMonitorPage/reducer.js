/*
 *
 * PatientMonitorPage reducer
 *
 */

import {fromJS} from 'immutable';
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

var initL1T1 = initialLayout1AndItem1();

const initialState = fromJS(getFromLS('patientMonitorPage')) || fromJS({
    layout1: initL1T1.layout1,
    items1: initL1T1.items1,
    items2: initL1T1.items2,
    leftDrawer: {
      i: '',
      open: false
    },
    play: false
  });


function patientMonitorPageReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_LAYOUT1:
      let layout1 = state.set('layout1', fromJS(action.layout1));

      saveToLS('patientMonitorPage', layout1);
      return layout1;

    case RESET_LAYOUT1:
      let initL1T1 = initialLayout1AndItem1();

      return state.set('layout1', fromJS(initL1T1.layout1))
        .set('items1', fromJS(initL1T1.items1))
        .set('items2', fromJS(initL1T1.items2));

    case ADD_ITEM1:
      return state.update('layout1', layout1 => layout1.concat(fromJS(action.layout1)))
        .update('items1', items1 => items1.merge(action.items1));

    case REMOVE_ITEM1:
      return state.set('layout1', state.get('layout1').filter((el) => el.get('i') != action.i))
        .set('items1', state.get('items1').delete(action.i));

    case ADD_ITEM2:
      return state.update('layout1', layout1 => layout1.concat(fromJS(action.layout1)))
        .update('items2', items2 => items2.merge(action.items2));

    case REMOVE_ITEM2:
      return state.set('layout1', state.get('layout1').filter((el) => el.get('i') != action.i))
        .set('items2', state.get('items2').delete(action.i));


    case PLAY_MODE:
      return state.set('play', !state.get('play'));


    case HANDLE_LEFT_DRAWER_TOGGLE:
      return state.setIn(['leftDrawer', 'i'], action.i)
        .setIn(['leftDrawer', 'open'], !state.getIn(['leftDrawer', 'open']));

    case HANDLE_LEFT_DRAWER_CLOSE:
      let temp = state.setIn(['leftDrawer', 'i'], '')
        .setIn(['leftDrawer', 'open'], false);

      saveToLS('patientMonitorPage', temp);
      return temp;

    case HANDLE_WAVEFORM_CHANGE:
      return state.setIn(['items1', state.getIn(['leftDrawer', 'i']), 'waveform'], action.value);

    case HANDLE_COLOR_CHANGE:
      return state.setIn(['items1', state.getIn(['leftDrawer', 'i']), 'strokeStyle'], action.value);

    case HANDLE_SCALE_CHANGE:
      return state.setIn(['items1', state.getIn(['leftDrawer', 'i']), 'scale'], action.value);

    case HANDLE_SPEED_CHANGE:
      return state.setIn(['items1', state.getIn(['leftDrawer', 'i']), 'speed'], action.value);

    default:
      return state;
  }
}

function saveToLS(key, value) {
  if (localStorage) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.log(e);
    }
  }
}

function getFromLS(key) {
  if (localStorage) {
    try {
      return JSON.parse(localStorage.getItem(key)) || null;
    } catch (e) {
      console.log(e);
    }
  }
}

function  initialLayout1AndItem1() {
  var i1 = uuid.v4();
  var i2 = uuid.v4();
  return {
    layout1: [
      {
        i: i1,
        x: 0,
        y: 0,
        w: 10,
        h: 1
      },
      {
        i: i2,
        x: 10,
        y: 0,
        w: 2,
        h: 1
      }
    ],
    items1: {
      [i1]: {
        waveform: 'ECG - II',
        strokeStyle: 'green',
        scale: 0.7,
        speed: 3,
        lineWidth: 3
      }
    },
    items2: {
      [i2]: {
        color: 'green'
      }
    }
  }
}

export default patientMonitorPageReducer;
