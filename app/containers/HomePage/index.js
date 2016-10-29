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

import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';

import ECG from 'components/Ecg';

import FontIcon from 'material-ui/FontIcon';

import uuid from 'node-uuid';

import FloatingActionButton from 'material-ui/FloatingActionButton';

import ContentAdd from 'material-ui/svg-icons/content/add';

import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import Divider from 'material-ui/Divider';
import Download from 'material-ui/svg-icons/file/file-download';
import ArrowDropRight from 'material-ui/svg-icons/navigation-arrow-drop-right';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Checkbox from 'material-ui/Checkbox';
import Toggle from 'material-ui/Toggle';

import Slider from 'material-ui/Slider';

import SelectField from 'material-ui/SelectField';

import Drawer from 'material-ui/Drawer';

import ContentInbox from 'material-ui/svg-icons/content/inbox';

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
      }
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
          waveform: 'RBBB',
          strokeStyle: 'yellow',
          scale: 0.8,
          speed: 3,
          lineWidth: 3
        }
      }
    });
  };

  onRemoveItem1 = (i) => {
    this.setState({layout1: this.state.layout1.filter((el) => el.i != i)});
  };

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  handleToggle = () => this.setState({open: !this.state.open});

  handleChange = (event, index, value) => {
    console.log(value);
    this.setState({value});
  };

  createElement1 = (el) => {
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
          <span style={{fontSize: '2em', color: '#00bd00', position: 'absolute', left: '0px'}}>ECG - II</span>

          <IconMenu style={removeStyle}
                    iconButtonElement={
                      <IconButton>
                        <FontIcon className="material-icons">
                          more_vert
                        </FontIcon>
                      </IconButton>
                    }
          >
            <MenuItem primaryText="Waveform"
                      leftIcon={
                        <div>
                          <FontIcon className="material-icons">
                            show_chart
                          </FontIcon>
                        </div>
                      }
                      onTouchTap={this.handleOpen}/>
            <MenuItem primaryText="Delete"
                      leftIcon={
                        <div>
                          <FontIcon className="material-icons">
                            close
                          </FontIcon>
                        </div>
                      }
                      onClick={this.onRemoveItem1.bind(this, el.i)}/>
          </IconMenu>

        </div>
        <Card containerStyle={{height: '100%', width: '100%'}} style={{height: '85%', width: '100%'}}>
          <ECG shouldResize={resize || false}
               waveform={el.waveform}
               strokeStyle={el.strokeStyle}
               lineWidth={el.lineWidth}
               scale={el.scale}
               speed={el.speed}/>
        </Card>
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
    const {layout1, layout2} = this.state;

    return (
      <Grid fluid={true}>
        <Row>
          <Col lg={8} style={{height: '95vh', overflowY: 'auto', background: grey900}}>
            <ReactGridLayout
              layout={layout1}
              cols={12}
              rowHeight={250}
              onLayoutChange={this.onLayoutChange1}
              onResizeStop={this.onResizeStop1}>

              {this.state.layout1.map(this.createElement1)}

            </ReactGridLayout>
            <FloatingActionButton onClick={this.onAddItem1}>
              <ContentAdd/>
            </FloatingActionButton>
            <div>
              <button onClick={this.resetLayout1} style={{color: 'red'}}>reset</button>
            </div>
            <Drawer
              width={300}
              open={this.state.open}
              openSecondary={true}
            >
              <List>
                <Subheader>WaveForm Type and Color</Subheader>
                <ListItem>
                  <div>WaveForm</div>
                  <SelectField
                    floatingLabelText="WaveForm Type"
                    value={this.state.value}
                    onChange={this.handleChange}
                  >
                    <MenuItem value={1} primaryText="Never"/>
                    <MenuItem value={2} primaryText="Every Night"/>
                    <MenuItem value={3} primaryText="Weeknights"/>
                  </SelectField>
                </ListItem>
                <ListItem>
                  <div>Color</div>
                  <SelectField
                    floatingLabelText="Color Display"
                    value={this.state.value}
                    onChange={this.handleChange}
                  >
                    <MenuItem value={1} primaryText="Never"/>
                    <MenuItem value={2} primaryText="Every Night"/>
                    <MenuItem value={3} primaryText="Weeknights"/>
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
                      max={100}
                      step={5}
                      defaultValue={50}
                      value={this.state.secondSlider}
                      onChange={this.handleSecondSlider}
                    />
                  </ListItem>

                  <ListItem>
                    <div>Speed</div>
                    <Slider
                      min={0}
                      max={100}
                      step={10}
                      defaultValue={50}
                      value={this.state.secondSlider}
                      onChange={this.handleSecondSlider}
                    />
                  </ListItem>
                </div>
              </List>
              <Divider />
              <MenuItem onTouchTap={this.handleClose}>Finish</MenuItem>
              <MenuItem onTouchTap={this.handleClose}>Reset</MenuItem>
            </Drawer>
          </Col >

          <Col lg={4} style={{height: '95vh', overflowY: 'auto', background: grey800}}>
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
      waveform: 'RBBB',
      strokeStyle: 'yellow',
      scale: 0.8,
      speed: 3,
      lineWidth: 3
  });

  static initialItem2 = () => [
    {i: uuid.v4(), x: 0, y: 0, w: 12, h: 1}
  ];
}

export default HomePage;