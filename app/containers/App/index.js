/**
 *
 * App.react.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a neccessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import Helmet from 'react-helmet';

import styles from './styles.css';


// material-ui theme
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import AppBar from 'material-ui/AppBar';
// material-ui theme end

import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';

import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';

import {Link} from 'react-router';

export default class App extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    children: React.PropTypes.node,
  };

  constructor(props) {
    super(props);
    this.state = {open: false};
  }

  handleToggle = () => this.setState({open: !this.state.open});

  handleClose = () => this.setState({open: false});

  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
        <div>
          <Helmet
            titleTemplate="%s - Patient Monitor"
            defaultTitle="Patient Monitor"
            meta={[
              {name: 'description', content: 'A Patient Monitor application'},
            ]}
          />

          <div className={this.state.open ? styles.container : ''}>
            <AppBar
              style={this.state.open ? {display: 'none'}:{}}
              title="Patient Monitor"
              iconElementLeft={
                <IconButton>
                  <FontIcon className="material-icons"
                            onClick={this.handleToggle}>
                    menu
                  </FontIcon>
                </IconButton>
              }/>
            {React.Children.toArray(this.props.children)}
          </div>

          <Drawer
            docked={false}
            width={300}
            open={this.state.open}
            onRequestChange={(open) => this.setState({open})}
          >
            <MenuItem onTouchTap={this.handleClose}><Link to="/patientMonitor">Patient Monitor Desktop</Link></MenuItem>
            <MenuItem onTouchTap={this.handleClose}><Link to="/patientMonitorMobile">Patient Monitor Mobile</Link></MenuItem>
          </Drawer>
        </div>
      </MuiThemeProvider>)
  }
};