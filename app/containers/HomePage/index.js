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

import {Responsive, WidthProvider} from 'react-grid-layout';
const ResponsiveReactGridLayout = WidthProvider(Responsive);

export default class HomePage extends React.Component { // eslint-disable-line react/prefer-stateless-function

  render() {
    var layouts = {
      lg: [
        {i: '1', x: 0, y: 0, w: 4, h: 2.5, isResizable: false},
        {i: '2', x: 8, y: 0, w: 4, h: 2.5}
      ]
    };

    return (
      <ResponsiveReactGridLayout className="layout" layouts={layouts}
                                 breakpoints={{lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0}}
                                 cols={{lg: 12, md: 10, sm: 6, xs: 4, xxs: 2}}>

        <div key={"1"}>
          <MaterialCard/>
        </div>

        <div key={"2"}>
          <MaterialCard/>
        </div>

      </ResponsiveReactGridLayout>
    );
  }
}
