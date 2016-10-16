/**
 *
 * MaterialCard
 *
 */

import React from 'react';

import {FormattedMessage} from 'react-intl';
import messages from './messages';

import Dimensions from 'react-dimensions'

import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';


class MaterialCard extends React.Component {
  render() {
    return (
      <Card style={{width: '100%', height: '100%'}}>
        <CardHeader
          title="Heart Rate"
        />
        <CardText>
          60
        </CardText>
      </Card>
    );
  }
}


export default MaterialCard // Enhanced component