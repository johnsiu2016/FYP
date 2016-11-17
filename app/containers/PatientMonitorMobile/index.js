/*
 *
 * PatientMonitorPage
 *
 */

import React from 'react';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import selectPatientMonitorPage from './selectors';
import styles from './styles.css';

import ReactGrid, {WidthProvider} from 'react-grid-layout';
const ReactGridLayout = WidthProvider(ReactGrid);

import {grey900, grey800, grey700} from 'material-ui/styles/colors';

import {Grid, Row, Col} from 'react-bootstrap';

import {Card} from 'material-ui/Card';

import ECG from 'components/Ecg';

import FontIcon from 'material-ui/FontIcon';

import FloatingActionButton from 'material-ui/FloatingActionButton';

import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';

import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';

import Slider from 'material-ui/Slider';

import SelectField from 'material-ui/SelectField';

import Drawer from 'material-ui/Drawer';

import VitalSign from 'components/VitalSign';

import {Scrollbars} from 'react-custom-scrollbars';

import {createStructuredSelector} from 'reselect';

import {
  changeLayout1,
  resetLayout1,
  addItem1,
  removeItem1,

  changeLayout2,
  resetLayout2,
  addItem2,
  removeItem2,

  playMode,

  handleLeftDrawerToggle,
  handleLeftDrawerClose,
  handleWaveformChange,
  handleColorChange,
  handleScaleChange,
  handleSpeedChange
} from './actions';

import {
  selectLayout1,
  selectItems1,
  selectLayout2,
  selectLeftDrawer,
  selectPlay
} from './selectors';

var color = {
  'green': '#00bd00',
  'purple': '#CC00FF',
  'yellow': '#FFFF00'
};

class PatientMonitorMobile extends React.Component { // eslint-disable-line react/prefer-stateless-function
  componentDidMount() {
    window.addEventListener("keyup", this.props.onPlayModeKeyUp);
  }

  componentWillUnmount() {
    window.removeEventListener("keyup", this.props.onPlayModeKeyUp);
  }

  // waveform
  createCustomElement1 = (el) => {
    var {handleLeftDrawerToggle, onRemoveItem1, items1} = this.props;

    var removeStyle = {
      position: 'absolute',
      top: 0,
      right: '0px',
      cursor: 'pointer'
    };

    var i = el.get('i');
    var item1 = items1.get(i);
    var waveform = item1.get('waveform');
    var strokeStyle = item1.get('strokeStyle');
    var lineWidth = item1.get('lineWidth');
    var scale = item1.get('scale');
    var speed = item1.get('speed');

    if (el.get('y') === null) {
      el = el.set('y', Infinity);
    }

    return (
      <div key={i} data-grid={el.toObject()}>
        <div style={{height: '15%'}}>
          <span style={{
            fontSize: '2em',
            color: color[strokeStyle],
            position: 'absolute',
            left: '0px'
          }}>
            {waveform}
          </span>

          <FontIcon className="material-icons" style={{position: 'absolute', top: 0, right: '30px', cursor: 'pointer'}}
                    onTouchTap={handleLeftDrawerToggle.bind(this, i)}>
            build
          </FontIcon>

          <FontIcon style={removeStyle}
                    className="material-icons"
                    onClick={onRemoveItem1.bind(this, i)}>
            close
          </FontIcon>

        </div>
        <Card containerStyle={{height: '100%', width: '100%'}} style={{height: '85%', width: '100%'}}>
          <ECG waveform={waveform}
               strokeStyle={strokeStyle}
               lineWidth={lineWidth}
               scale={scale}
               speed={speed}
               showBuffer={true}/>
        </Card>
      </div>
    )
  };

  createPlayElement1 = (el) => {
    var {items1} = this.props;

    var i = el.get('i');
    var item1 = items1.get(i);
    var waveform = item1.get('waveform');
    var strokeStyle = item1.get('strokeStyle');
    var lineWidth = item1.get('lineWidth');
    var scale = item1.get('scale');
    var speed = item1.get('speed');

    if (el.get('y') === null) {
      el = el.set('y', Infinity);
    }

    return (
      <div key={i} data-grid={el.toObject()}>
        <div style={{height: '15%'}}>
          <span style={{
            fontSize: '2em',
            color: color[strokeStyle],
            position: 'absolute',
            left: '0px'
          }}
          >
            {waveform}
          </span>
        </div>
        <div style={{height: '85%', width: '100%'}}>
          <ECG waveform={waveform}
               strokeStyle={strokeStyle}
               lineWidth={lineWidth}
               scale={scale}
               speed={speed}
               showBuffer={false}/>
        </div>
      </div>
    )
  };

  // vital sign
  createElement2 = (el) => {
    var {onRemoveItem2} = this.props;

    var removeStyle = {
      position: 'absolute',
      right: '2px',
      top: 0,
      cursor: 'pointer'
    };

    var i = el.get('i');
    var w = el.get('w');

    return (
      <div key={i} data-grid={el.toObject()}>
        <div style={{height: '15%'}}>
          <FontIcon className="material-icons"
                    style={removeStyle}
                    onClick={onRemoveItem2.bind(this, i)}>
            close
          </FontIcon>
        </div>
        <Card containerStyle={{width: '100%', height: '100%'}} style={{width: '100%', height: '85%'}}>
          <VitalSign w={w}/>
        </Card>
      </div>
    )
  };

  createPlayElement2 = (el) => {
    var i = el.get('i');
    var w = el.get('w');

    return (
      <div key={i} data-grid={el.toObject()}>
        <div style={{height: '15%'}}>
        </div>
        <div style={{width: '100%', height: '85%'}}>
          <VitalSign w={w}/>
        </div>
      </div>
    )
  };

  render() {
    var {
      onLayoutChange1,
      onAddItem1,
      onPlayMode,
      onResetLayout1,
      handleWaveformChange,
      handleColorChange,
      handleScaleChange,
      handleSpeedChange,
      handleLeftDrawerClose,
      onLayoutChange2,
      onResetLayout2,
      onAddItem2
    } = this.props;

    var {
      layout1,
      items1,
      layout2,
      leftDrawer,
      play
    } = this.props;

    var i = leftDrawer.get('i');
    var open = leftDrawer.get('open');
    var item1 = items1.get(i);
    var waveformValue = item1 ? item1.get('waveform') : "ECG - II";
    var colorValue = item1 ? item1.get('strokeStyle') : "green";
    var scaleValue = item1 ? item1.get('scale') : 0.8;
    var speedValue = item1 ? item1.get('speed') : 3;

    var customMode = (
      <Grid fluid={true}>
        <Row>
          <Col lg={9} style={{height: '95vh', background: grey900, overflow: 'auto'}}
               className={styles.patientMonitorMobile}>
            <ReactGridLayout
              cols={12}
              rowHeight={200}
              onLayoutChange={onLayoutChange1}
              onResizeStop={() => this.forceUpdate()}>

              {layout1.map(this.createCustomElement1)}

            </ReactGridLayout>

            <div style={{
              display: 'flex',
              flexFlow: 'row wrap',
              justifyContent: 'flex-end'
            }}
            >
              <FloatingActionButton
                style={{marginLeft: '20px'}}
                onClick={onResetLayout1}>
                <FontIcon className="material-icons">
                  restore
                </FontIcon>
              </FloatingActionButton>
              <FloatingActionButton
                style={{marginLeft: '20px'}}
                onClick={onAddItem1}>
                <FontIcon className="material-icons">
                  add
                </FontIcon>
              </FloatingActionButton>
              <FloatingActionButton
                style={{marginLeft: '20px'}}
                onClick={onPlayMode}>
                <FontIcon className="material-icons">
                  play_arrow
                </FontIcon>
              </FloatingActionButton>
            </div>
          </Col >

          <Col lg={3} style={{height: '95vh', background: grey800, overflow: 'auto'}}
               className={styles.patientMonitorMobile}>
            <ReactGridLayout
              cols={12}
              rowHeight={200}
              onLayoutChange={onLayoutChange2}
              onResizeStop={() => this.forceUpdate()}>

              {layout2.map(this.createElement2)}

            </ReactGridLayout>

            <div style={{
              display: 'flex',
              flexFlow: 'row wrap',
              justifyContent: 'flex-end'
            }}
            >
              <FloatingActionButton
                style={{marginLeft: '20px'}}
                onClick={onResetLayout2}>
                <FontIcon className="material-icons">
                  restore
                </FontIcon>
              </FloatingActionButton>
              <FloatingActionButton
                style={{marginLeft: '20px'}}
                onClick={onAddItem2}>
                <FontIcon className="material-icons">
                  add
                </FontIcon>
              </FloatingActionButton>
            </div>
          </Col>
        </Row>

        <Row>
          <Col lg={12} style={{height: '5vh', background: grey700}}>

          </Col>
        </Row>

        <Drawer
          width={300}
          open={open}
          openSecondary={true}
        >
          <List>
            <Subheader>WaveForm Type and Color</Subheader>
            <ListItem>
              <div>WaveForm</div>
              <SelectField
                floatingLabelText="WaveForm Type"
                value={waveformValue}
                onChange={handleWaveformChange}
              >
                <MenuItem value="ECG - II" primaryText="ECG - II"/>
                <MenuItem value="PPG" primaryText="PPG"/>
                <MenuItem value="RBBB" primaryText="RBBB"/>
                <MenuItem value="Bigeminy" primaryText="Bigeminy"/>
              </SelectField>
            </ListItem>
            <ListItem>
              <div>Color</div>
              <SelectField
                floatingLabelText="Color Display"
                value={colorValue}
                onChange={handleColorChange}
              >
                <MenuItem value="green" primaryText="Green"/>
                <MenuItem value="purple" primaryText="Purple"/>
                <MenuItem value="yellow" primaryText="Yellow"/>
              </SelectField>
            </ListItem>
          </List>
          <Divider />
          <List>
            <Subheader>Scale and Speed</Subheader>
            <div>
              <ListItem>
                <div>Scale</div>
                <Slider
                  min={0}
                  max={2}
                  step={0.05}
                  defaultValue={scaleValue}
                  value={scaleValue}
                  onChange={handleScaleChange}
                />
                <div style={{'textAlign': 'center'}}>
                  {scaleValue}
                </div>
              </ListItem>

              <ListItem>
                <div>Speed</div>
                <Slider
                  min={0}
                  max={10}
                  step={0.5}
                  defaultValue={speedValue}
                  value={speedValue}
                  onChange={handleSpeedChange}
                />
                <div style={{'textAlign': 'center'}}>
                  {speedValue}
                </div>
              </ListItem>
            </div>
          </List>
          <Divider />
          <MenuItem onTouchTap={handleLeftDrawerClose}>Save</MenuItem>
        </Drawer>
      </Grid>
    );

    var playMode = (
      <Grid fluid={true}>
        <Row>
          <Col lg={9} style={{height: '95vh', background: grey900, overflow: 'auto'}} className={styles.patientMonitorMobile}>

            <ReactGridLayout
              cols={12}
              rowHeight={200}
              isDraggable={false}
              isResizable={false}>

              {layout1.map(this.createPlayElement1)}

            </ReactGridLayout>
          </Col >

          <Col lg={3} style={{height: '95vh', background: grey900, overflow: 'auto'}} className={styles.patientMonitorMobile}>
            <ReactGridLayout
              cols={12}
              rowHeight={200}
              isDraggable={false}
              isResizable={false}>

              {layout2.map(this.createPlayElement2)}

            </ReactGridLayout>
          </Col>
        </Row>
        <Row>
          <Col lg={12} style={{height: '5vh', background: grey700}}>

          </Col>
        </Row>
      </Grid>
    );
    return play ? playMode : customMode;
  }
}

const mapStateToProps = createStructuredSelector({
  layout1: selectLayout1(),
  items1: selectItems1(),
  layout2: selectLayout2(),
  leftDrawer: selectLeftDrawer(),
  play: selectPlay()
});

function mapDispatchToProps(dispatch) {
  return {
    onLayoutChange1: (layout1) => dispatch(changeLayout1(layout1)),
    onResetLayout1: () => dispatch(resetLayout1()),
    onAddItem1: () => dispatch(addItem1()),
    onRemoveItem1: (i) => dispatch(removeItem1(i)),

    onLayoutChange2: (layout2) => dispatch(changeLayout2(layout2)),
    onResetLayout2: () => dispatch(resetLayout2()),
    onAddItem2: () => dispatch(addItem2()),
    onRemoveItem2: (i) => dispatch(removeItem2(i)),

    onPlayMode: () => dispatch(playMode()),
    onPlayModeKeyUp: (e) => e.keyCode === 27 ? dispatch(playMode()) : null,

    handleLeftDrawerToggle: (i) => dispatch(handleLeftDrawerToggle(i)),
    handleLeftDrawerClose: () => dispatch(handleLeftDrawerClose()),
    handleWaveformChange: (event, index, value) => dispatch(handleWaveformChange(value)),
    handleColorChange: (event, index, value) => dispatch(handleColorChange(value)),
    handleScaleChange: (event, value) => dispatch(handleScaleChange(value)),
    handleSpeedChange: (event, value) => dispatch(handleSpeedChange(value))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PatientMonitorMobile);
