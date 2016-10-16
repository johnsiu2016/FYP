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
import SimpleLineChart from 'components/SimpleLineChart'

import ReactGrid, {WidthProvider} from 'react-grid-layout';
const ReactGridLayout = WidthProvider(ReactGrid);

import {grey900, grey800, grey700} from 'material-ui/styles/colors';

import {Grid, Row, Col} from 'react-bootstrap';

import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';

import SparkLine from 'components/SparkLine';
import ECG from 'components/Ecg';

class HomePage extends React.Component { // eslint-disable-line react/prefer-stateless-function

  render() {

    var layout1 = [
      {i: 'a1', x: 0, y: 0, w: 12, h: 1},
      {i: 'a2', x: 0, y: 1, w: 12, h: 1},
      {i: 'a3', x: 0, y: 2, w: 12, h: 1}
    ];

    var layout2 = [
      {i: 'b1', x: 9, y: 0, w: 12, h: 1},
      {i: 'b2', x: 9, y: 1, w: 12, h: 1},
      {i: 'b3', x: 9, y: 2, w: 12, h: 1}
    ];

    return (
      <Grid fluid={true}>
        <Row>
          <Col lg={8} style={{height: '95vh', overflowY: 'auto', background: grey900}}>
            <ReactGridLayout
              layout={layout1}
              cols={12}
              rowHeight={250}>

              <div key={'a1'}>
                <Card style={{height: '100%', width: '100%'}} containerStyle={{height: '100%', width: '100%'}}>
                  <ECG></ECG>
                </Card>
              </div>

              <div key={'a2'}>
                <Card style={{height: '100%', width: '100%'}} containerStyle={{height: '100%', width: '100%'}}>
                  <ECG></ECG>
                </Card>
              </div>

              <div key={'a3'}>
                <Card style={{height: '100%', width: '100%'}} containerStyle={{height: '100%', width: '100%'}}>
                  <ECG></ECG>
                </Card>
              </div>
            </ReactGridLayout>
          </Col >
          <Col lg={4} style={{height: '95vh', overflowY: 'auto', background: grey800}}>
            <ReactGridLayout
              layout={layout2}
              cols={12}
              rowHeight={200}>

              <div key={'b1'}>
                <MaterialCard/>
              </div>

              <div key={'b2'}>
                <MaterialCard/>
              </div>

              <div key={'b3'}>
                <MaterialCard/>
              </div>

            </ReactGridLayout>
          </Col>
        </Row>
        <Row style={{height: '5vh', background: grey700}}>
          <Col lg={12}>

          </Col>
        </Row>
      </Grid>
    );
  }
}

export default HomePage;