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

import ReactGrid, {Responsive, WidthProvider} from 'react-grid-layout';

const ResponsiveReactGridLayout = WidthProvider(Responsive);
const ReactGridLayout = WidthProvider(ReactGrid);


class HomePage extends React.Component { // eslint-disable-line react/prefer-stateless-function

  render() {

    var layouts = {
      lg: [
        {i: 'r11', x: 0, y: 0, w: 9, h: 0.96, static: true},
        {i: 'r12', x: 9, y: 0, w: 3, h: 0.96, static: true},
        {i: 'r21', x: 0, y: 0.96, w: 12, h: 0.04, static: true}
      ]
    };

    var layout = [
      {i: 'a', x: 0, y: 0, w: 12, h: 1},
      {i: 'b', x: 0, y: 1, w: 12, h: 1},
      {i: 'c', x: 0, y: 2, w: 12, h: 1},
      {i: 'd', x: 0, y: 3, w: 12, h: 1},
      {i: 'e', x: 0, y: 4, w: 12, h: 1}
    ];

    return (
      <ResponsiveReactGridLayout
        layouts={layouts}
        breakpoints={{lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0}}
        cols={{lg: 12, md: 10, sm: 6, xs: 4, xxs: 2}}
        containerPadding={[0, 0]}
        margin={[0, 0]}
        rowHeight={window.innerHeight}>


        <ReactGridLayout key={"r11"}
                         layout={layout}
                         cols={12}
                         rowHeight={250}>

          <div key={'a'}>
            <SimpleLineChart/>
          </div>

          <div key={'b'}>
            <SimpleLineChart/>
          </div>

          <div key={'c'}>
            <SimpleLineChart/>
          </div>

        </ReactGridLayout>

        <div key={"r12"} style={{background: 'red'}}>

        </div>

        <div key={"r21"} style={{background: 'green'}}>

        </div>

      </ResponsiveReactGridLayout>
    );
  }
}

export default HomePage;