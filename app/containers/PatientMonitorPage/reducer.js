/*
 *
 * PatientMonitorPage reducer
 *
 */

import {fromJS} from 'immutable';
import uuid from 'node-uuid';

import {
  CHANGE_LAYOUT1,
  CHANGE_ITEMS1,
  RESET_LAYOUT1,
  ADD_ITEM1,
  REMOVE_ITEM1,
  CHANGE_LAYOUT2,
  RESET_LAYOUT2,
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

const initialState = JSON.parse(JSON.stringify(getFromLS('PatientMonitorPage'))) || fromJS({
    layout1: initL1T1.layout1,
    items1: initL1T1.items1,
    layout2: {
      i: uuid.v4(),
      x: 0,
      y: 0,
      w: 12,
      h: 1
    },
    leftDrawer: {
      i: '',
      open: false
    },
    play: false
  });


function patientMonitorPageReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_LAYOUT1:
      return state.set('layout1', action.layout1);

    case CHANGE_ITEMS1:
      return state.set('items1', action.items1);

    case RESET_LAYOUT1:
      let initL1T1 = initialLayout1AndItem1();

      return state.set('layout1', initL1T1.layout1)
        .set('items1', initL1T1.items1);

    case ADD_ITEM1:
      return state.set('layout1', state.get('layout1').concat(action.layout1))
        .set('items1', state.get('items1').merge(action.items1));

    case REMOVE_ITEM1:
      return state.set('layout1', state.get('layout1').filter((el) => el.i != action.i))
        .set('items1', state.get('items1').delete(action.i));


    case CHANGE_LAYOUT2:
      return state.set('layout2', action.layout1);

    case RESET_LAYOUT2:
      return state.set('layout2', {
        i: uuid.v4(),
        x: 0,
        y: 0,
        w: 12,
        h: 1
      });

    case ADD_ITEM2:
      return state.set('layout2', state.get('layout2').concat(action.layout2));

    case REMOVE_ITEM2:
      return state.set('layout2', state.get('layout2').filter((el) => el.i != action.i));


    case PLAY_MODE:
      return state.set('play', !state.get('play'));


    case HANDLE_LEFT_DRAWER_TOGGLE:
      return state.setIn(['leftDrawer', 'i'], i)
        .setIn(['leftDrawer', 'open'], !state.getIn(['leftDrawer', 'open']));

    case HANDLE_LEFT_DRAWER_CLOSE:
      return state.setIn(['leftDrawer', 'i'], '')
        .setIn(['leftDrawer', 'open'], false);

    case HANDLE_WAVEFORM_CHANGE:
      return state.setIn(['items1', state.getIn(['leftDrawer', 'i']), 'waveform'], action.value);

    case HANDLE_COLOR_CHANGE:
      return state.setIn(['items1', state.getIn(['leftDrawer', 'i']), 'color'], action.value);

    case HANDLE_SCALE_CHANGE:
      return state.setIn(['items1', state.getIn(['leftDrawer', 'i']), 'scale'], action.value);

    case HANDLE_SPEED_CHANGE:
      return state.setIn(['items1', state.getIn(['leftDrawer', 'i']), 'speed'], action.value);

    default:
      return state;
  }
}

getFromLS = (key) => {
  if (localStorage) {
    try {
      return JSON.parse(localStorage.getItem(key)) || null;
    } catch (e) {
      console.log(e);
    }
  }
};

initialLayout1AndItem1 = () => {
  var i = uuid.v4();
  return {
    layout1: [
      {
        i: i,
        x: 0,
        y: 0,
        w: 12,
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
};

export default patientMonitorPageReducer;
