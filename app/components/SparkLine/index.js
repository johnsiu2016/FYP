/**
*
* SparkLine
*
*/

import React from 'react';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

import styles from './styles.css';

import { Sparklines, SparklinesLine } from 'react-sparklines';

function SparkLine(prop) {
  return (
    <Sparklines data={prop.data} limit={5} width={100} height={20} margin={5}>
      <SparklinesLine color="blue" />
    </Sparklines>
  );
}

export default SparkLine;