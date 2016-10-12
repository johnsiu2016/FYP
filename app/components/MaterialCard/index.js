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
      <CardHeader
        title="URL Avatar"
        subtitle="Subtitle"
      />
      <CardTitle title="Card title" subtitle="Card subtitle"/>
      <CardText>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
        Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
        Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
      </CardText>
      <CardActions>
        <FlatButton label="Action1"/>
        <FlatButton label="Action2"/>
      </CardActions>
    </Card>
  );
}

export default MaterialCard;
