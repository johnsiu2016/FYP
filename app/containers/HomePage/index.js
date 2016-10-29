/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a neccessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import {FormattedMessage} from 'react-intl';
import messages from './messages';

import MaterialCard from 'components/MaterialCard';

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

var color = {
  'green': '#00bd00',
  'purple': '#CC00FF',
  'yellow': '#FFFF00'
};

class HomePage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);

    var i = uuid.v4();
    var tempLayout = HomePage.initialLayout1();
    tempLayout[0].i = i;
    var tempItems = {
      [i]: HomePage.initialItems1()
    };

    this.state = {
      layout1: JSON.parse(JSON.stringify(HomePage.getFromLS('layout1'))) || tempLayout,
      layout2: JSON.parse(JSON.stringify(HomePage.getFromLS('layout2'))) || HomePage.initialItem2(),
      items1: JSON.parse(JSON.stringify(HomePage.getFromLS('items1'))) || tempItems,
      leftDrawer: {
        i: '',
        open: false
      },
      play: false
    };

    this.shouldResize = false;
  }

  onLayoutChange1 = (layout1) => {
    HomePage.saveToLS('layout1', layout1);
    HomePage.saveToLS('items1', this.state.items1);
    this.setState({
      layout1
    });
  };

  onLayoutChange2 = (layout2) => {
    HomePage.saveToLS('layout2', layout2);
    this.setState({layout2});
  };

  resetLayout1 = () => {
    var i = uuid.v4();
    var tempLayout = HomePage.initialLayout1();
    tempLayout[0].i = i;
    var tempItems = {
      [i]: HomePage.initialItems1()
    };

    this.shouldResize = true;
    this.setState({
      layout1: tempLayout,
      items1: tempItems
    });
  };

  resetLayout2 = () => {
    this.setState({
      layout2: HomePage.initialItem2(),
    });
  };

  onResizeStop1 = () => {
    this.shouldResize = true;
    this.forceUpdate();
  };

  onAddItem1 = () => {
    var i = uuid.v4();
    this.setState({
      layout1: [
        ...this.state.layout1,
        {
          i: i,
          x: 0,
          y: Infinity, // puts it at the bottom
          w: 12,
          h: 1
        }
      ],
      items1: {
        ... this.state.items1,
        [i]: {
          waveform: 'ECG - II',
          strokeStyle: 'green',
          scale: 0.7,
          speed: 3,
          lineWidth: 3
        }
      }
    });
  };

  onRemoveItem1 = (i) => {
    var temp = {
      ...this.state.items1,
    };
    delete temp[i];
    this.setState({
      layout1: this.state.layout1.filter((el) => el.i != i),
      items1: temp
    });
  };

  onPlay1 = () => {
    this.setState({
      play: !this.state.play
    });
  };

  handleLeftDrawerToggle = (i) => {
    this.setState({
      leftDrawer: {
        i: i,
        open: !this.state.leftDrawer.open
      }
    });
  };

  handleLeftDrawerClose = () => {
    HomePage.saveToLS('items1', this.state.items1);
    this.setState({
      leftDrawer: {
        i: '',
        open: false
      }
    });
  };

  handleWaveFromChange = (event, index, value) => {
    var temp = {
      ...this.state.items1,
    };
    temp[this.state.leftDrawer.i].waveform = value;
    this.setState({
      items1: temp
    });
  };

  handleColorChange = (event, index, value) => {
    var temp = {
      ...this.state.items1,
    };
    temp[this.state.leftDrawer.i].strokeStyle = value;
    this.setState({
      items1: temp
    });
  };

  handleScaleChange = (event, value) => {
    var temp = {
      ...this.state.items1,
    };
    temp[this.state.leftDrawer.i].scale = value;
    this.setState({
      items1: temp
    });
  };

  handleSpeedChange = (event, value) => {
    var temp = {
      ...this.state.items1,
    };
    temp[this.state.leftDrawer.i].speed = value;
    this.setState({
      items1: temp
    });
  };

  createCustomElement1 = (el) => {
    var removeStyle = {
      position: 'absolute',
      top: 0,
      right: '0px',
      cursor: 'pointer'
    };
    var resize = this.shouldResize;
    this.shouldResize = false;

    el = {
      ...el,
      ...this.state.items1[el.i]
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
                    onTouchTap={this.handleLeftDrawerToggle.bind(this, el.i)}>
            build
          </FontIcon>

          <FontIcon style={removeStyle}
                    className="material-icons"
                    onClick={this.onRemoveItem1.bind(this, el.i)}>
            close
          </FontIcon>

        </div>
        <Card containerStyle={{height: '100%', width: '100%'}} style={{height: '85%', width: '100%'}}>
          <ECG shouldResize={resize || false}
               waveform={el.waveform}
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
    var resize = this.shouldResize;
    this.shouldResize = false;

    el = {
      ...el,
      ...this.state.items1[el.i]
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
          <ECG shouldResize={resize || false}
               waveform={el.waveform}
               strokeStyle={el.strokeStyle}
               lineWidth={el.lineWidth}
               scale={el.scale}
               speed={el.speed}
               showBuffer={false}/>
        </div>
      </div>
    )
  };

  onAddItem2 = () => {
    this.setState({
      layout2: [
        ...this.state.layout2,
        {
          i: uuid.v4(),
          x: 9,
          y: Infinity, // puts it at the bottom
          w: 12,
          h: 1
        }
      ]
    });
  };

  onRemoveItem2 = (i) => {
    this.setState({layout2: this.state.layout2.filter((el) => el.i != i)});
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
        <MaterialCard/>
        <FontIcon className="material-icons"
                  style={removeStyle}
                  onClick={this.onRemoveItem2.bind(this, el.i)}>
          close
        </FontIcon>
      </div>
    )
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
                onClick={this.resetLayout1}>
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
                onClick={this.onPlay1}>
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
                    onChange={this.handleWaveFromChange}
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
              onLayoutChange={this.onLayoutChange2}>

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
                onClick={this.onPlay1}>
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
              onLayoutChange={this.onLayoutChange2}>

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

  static initialLayout1 = () => [
    {
      x: 0,
      y: 0,
      w: 12,
      h: 1
    }
  ];

  static initialItems1 = () => ({
    waveform: 'ECG - II',
    strokeStyle: 'green',
    scale: 0.7,
    speed: 3,
    lineWidth: 3
  });

  static initialItem2 = () => [
    {i: uuid.v4(), x: 0, y: 0, w: 12, h: 1}
  ];
}

export default HomePage;