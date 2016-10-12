/**
 *
 * MaterialCard
 *
 */

import React from 'react';

import {FormattedMessage} from 'react-intl';
import messages from './messages';

import styles from './styles.css';

import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

function MaterialCard() {
  return (
    <Card
      className={styles.materialCard}
    >

    </Card>
  );
}

export default MaterialCard;
