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

import uuid from 'node-uuid';

import FloatingActionButton from 'material-ui/FloatingActionButton';

import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';

import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';

import Slider from 'material-ui/Slider';

import SelectField from 'material-ui/SelectField';

import Drawer from 'material-ui/Drawer';

import VitalSign from 'components/VitalSign';

import {
  changeLayout1,
  changeItems1,
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

import selectPatientMonitorPageItems1 from 'containers/PatientMonitorPage/selectors';

var color = {
  'green': '#00bd00',
  'purple': '#CC00FF',
  'yellow': '#FFFF00'
};

class PatientMonitorPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  createCustomElement1 = (el) => {
    var {handleLeftDrawerToggle, onRemoveItem1, items1} = this.props;
    var removeStyle = {
      position: 'absolute',
      top: 0,
      right: '0px',
      cursor: 'pointer'
    };

    el = {
      ...el,
      ...items1[el.i]
    };

    return (
      <div key={el.i} data-grid={el}>
        <div style={{height: '15%'}}>
          <span style={{
            fontSize: '2em',
            color: color[el.strokeStyle],
            position: 'absolute',
            left: '0px'
          }}>{el.waveform}</span>

          <FontIcon className="material-icons" style={{position: 'absolute', top: 0, right: '30px', cursor: 'pointer'}}
                    onTouchTap={handleLeftDrawerToggle.bind(this, el.i)}>
            build
          </FontIcon>

          <FontIcon style={removeStyle}
                    className="material-icons"
                    onClick={onRemoveItem1.bind(this, el.i)}>
            close
          </FontIcon>

        </div>
        <Card containerStyle={{height: '100%', width: '100%'}} style={{height: '85%', width: '100%'}}>
          <ECG waveform={el.waveform}
               strokeStyle={el.strokeStyle}
               lineWidth={el.lineWidth}
               scale={el.scale}
               speed={el.speed}
               showBuffer={true}/>
        </Card>
      </div>
    )
  };

  createPlayElement1 = (el) => {
    var {items1} = this.props;

    el = {
      ...el,
      ...items1[el.i]
    };

    return (
      <div key={el.i} data-grid={el}>
        <div style={{height: '15%'}}>
          <span style={{
            fontSize: '2em',
            color: color[el.strokeStyle],
            position: 'absolute',
            left: '0px'
          }}
          >
            {el.waveform}
          </span>
        </div>
        <div style={{height: '85%', width: '100%'}}>
          <ECG waveform={el.waveform}
               strokeStyle={el.strokeStyle}
               lineWidth={el.lineWidth}
               scale={el.scale}
               speed={el.speed}
               showBuffer={false}/>
        </div>
      </div>
    )
  };

  onResizeStop1 = () => {
    this.forceUpdate();
  };

  createElement2 = (el) => {
    var removeStyle = {
      position: 'absolute',
      right: '2px',
      top: 0,
      cursor: 'pointer'
    };

    return (
      <div key={el.i} data-grid={el}>
        <div style={{height: '15%'}}>
          <FontIcon className="material-icons"
                    style={removeStyle}
                    onClick={this.onRemoveItem2.bind(this, el.i)}>
            close
          </FontIcon>
        </div>
        <Card containerStyle={{width: '100%', height: '100%'}} style={{width: '100%', height: '85%'}}>
          <VitalSign shouldResize={resize || false}/>
        </Card>
      </div>
    )
  };

  onResizeStop2 = () => {
    this.forceUpdate();
  };

  render() {
    const {layout1, layout2, items1, leftDrawer, play} = this.state;

    var waveformValue = items1[leftDrawer.i] ? items1[leftDrawer.i].waveform : "ECG - II";
    var colorValue = items1[leftDrawer.i] ? items1[leftDrawer.i].strokeStyle : "green";
    var scaleValue = items1[leftDrawer.i] ? items1[leftDrawer.i].scale : 0.8;
    var speedValue = items1[leftDrawer.i] ? items1[leftDrawer.i].speed : 3;

    var customMode = (
      <Grid fluid={true}>
        <Row>
          <Col lg={9} style={{height: '95vh', overflowY: 'auto', background: grey900}}>
            <ReactGridLayout
              layout={layout1}
              cols={12}
              rowHeight={200}
              onLayoutChange={this.onLayoutChange1}
              onResizeStop={this.onResizeStop1}>

              {this.state.layout1.map(this.createCustomElement1)}

            </ReactGridLayout>
            <div style={{
              display: 'flex',
              flexFlow: 'row wrap',
              justifyContent: 'flex-end'
            }}
            >
              <FloatingActionButton
                style={{marginLeft: '20px'}}
                onClick={this.onResetLayout1}>
                <FontIcon className="material-icons">
                  restore
                </FontIcon>
              </FloatingActionButton>
              <FloatingActionButton
                style={{marginLeft: '20px'}}
                onClick={this.onAddItem1}>
                <FontIcon className="material-icons">
                  add
                </FontIcon>
              </FloatingActionButton>
              <FloatingActionButton
                style={{marginLeft: '20px'}}
                onClick={this.onPlayMode}>
                <FontIcon className="material-icons">
                  play_arrow
                </FontIcon>
              </FloatingActionButton>
            </div>
            <Drawer
              width={300}
              open={this.state.leftDrawer.open}
              openSecondary={true}
            >
              <List>
                <Subheader>WaveForm Type and Color</Subheader>
                <ListItem>
                  <div>WaveForm</div>
                  <SelectField
                    floatingLabelText="WaveForm Type"
                    value={waveformValue}
                    onChange={this.handleWaveformChange}
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
                    onChange={this.handleColorChange}
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
                      onChange={this.handleScaleChange}
                    />
                    <div style={{'textAlign': 'center'}}>{scaleValue}</div>
                  </ListItem>

                  <ListItem>
                    <div>Speed</div>
                    <Slider
                      min={0}
                      max={10}
                      step={0.5}
                      defaultValue={speedValue}
                      value={speedValue}
                      onChange={this.handleSpeedChange}
                    />
                    <div style={{'textAlign': 'center'}}>{speedValue}</div>
                  </ListItem>
                </div>
              </List>
              <Divider />
              <MenuItem onTouchTap={this.handleLeftDrawerClose}>Save</MenuItem>
            </Drawer>
          </Col >

          <Col lg={3} style={{height: '95vh', overflowY: 'auto', background: grey800}}>
            <ReactGridLayout
              layout={layout2}
              cols={12}
              rowHeight={200}
              onLayoutChange={this.onLayoutChange2}
              onResizeStop={this.onResizeStop2}>

              {this.state.layout2.map(this.createElement2)}

            </ReactGridLayout>
            <div>
              <button onClick={this.onResetLayout2} style={{color: 'red'}}>reset</button>
            </div>
            <div>
              <button onClick={this.addItem2} style={{color: 'red'}}>add</button>
            </div>
          </Col>
        </Row>
        <Row>
          <Col lg={12} style={{height: '5vh', background: grey700}}>

          </Col>
        </Row>
      </Grid>
    );

    var playMode = (
      <Grid fluid={true}>
        <Row>
          <Col lg={9} style={{height: '95vh', overflowY: 'auto', background: grey900}}>
            <ReactGridLayout
              layout={layout1}
              cols={12}
              rowHeight={200}
              isDraggable={false}
              isResizable={false}
              onLayoutChange={this.onLayoutChange1}
              onResizeStop={this.onResizeStop1}>

              {this.state.layout1.map(this.createPlayElement1)}

            </ReactGridLayout>
            <div style={{
              display: 'flex',
              flexFlow: 'row wrap',
              justifyContent: 'flex-end'
            }}
            >
              <FloatingActionButton
                style={{marginLeft: '20px'}}
                onClick={this.onPlayMode}>
                <FontIcon className="material-icons">
                  play_arrow
                </FontIcon>
              </FloatingActionButton>
            </div>
          </Col >

          <Col lg={3} style={{height: '95vh', overflowY: 'auto', background: grey800}}>
            <ReactGridLayout
              layout={layout2}
              cols={12}
              rowHeight={200}
              onLayoutChange={this.onLayoutChange2}
              onResizeStop={this.onResizeStop2}>

              {this.state.layout2.map(this.createElement2)}

            </ReactGridLayout>
            <div>
              <button onClick={this.resetLayout2} style={{color: 'red'}}>reset</button>
            </div>
            <div>
              <button onClick={this.onAddItem2} style={{color: 'red'}}>add</button>
            </div>
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

  static getFromLS = (key) => {
    if (localStorage) {
      try {
        return JSON.parse(localStorage.getItem(key)) || null;
      } catch (e) {
        console.log(e);
      }
    }
  };

  static saveToLS = (key, value) => {
    if (localStorage) {
      try {
        localStorage.setItem(key, JSON.stringify(value));
      } catch (e) {
        console.log(e);
      }
    }
  };
}

const mapStateToProps = selectPatientMonitorPageItems1();

function mapDispatchToProps(dispatch) {
  return {
    onLayoutChange1: (layout1) => dispatch(changeLayout1(layout1)),
    onResetLayout1: () => dispatch(resetLayout1()),
    onAddItem1: () => dispatch(addItem1()),
    onRemoveItem1: (i) => dispatch(removeItem1(i)),

    onLayoutChange2: (layout2) => dispatch(changeLayout2(layout2)),
    onResetLayout2: () => dispatch(resetLayout2()),
    onAddItem2: () => dispatch(addItem2()),
    onRemoveItem2: (i) => dispatch(removeItem2()),

    onPlayMode: () => dispatch(playMode()),

    handleLeftDrawerToggle: (i) => dispatch(handleLeftDrawerToggle(i)),
    handleLeftDrawerClose: () => dispatch(handleLeftDrawerClose()),
    handleWaveformChange: (event, index, value) => dispatch(handleWaveformChange(value)),
    handleColorChange: (event, index, value) => dispatch(handleColorChange(value)),
    handleScaleChange: (event, index, value) => dispatch(handleScaleChange(value)),
    handleSpeedChange: (event, index, value) => dispatch(handleSpeedChange(value))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PatientMonitorPage);
