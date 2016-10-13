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

import sizeMe from 'react-sizeme';

import MaterialCard from 'components/MaterialCard';
import SimpleLineChart from 'components/SimpleLineChart'

import ReactGrid, {Responsive, WidthProvider} from 'react-grid-layout';

import {grey900, grey800, grey700} from 'material-ui/styles/colors';

const ResponsiveReactGridLayout = WidthProvider(Responsive);
const ReactGridLayout = WidthProvider(ReactGrid);


class HomePage extends React.Component { // eslint-disable-line react/prefer-stateless-function

  constructor(props) {
    super(props);
    this.state = {
      rowHeight: window.innerHeight
    };
  }

  render() {

    var layouts = {
      lg: [
        {i: 'r11', x: 0, y: 0, w: 9, h: 0.96, static: true},
        {i: 'r12', x: 9, y: 0, w: 3, h: 0.96, static: true},
        {i: 'r21', x: 0, y: 0.96, w: 12, h: 0.04, static: true}
      ]
    };

    var layout1 = [
      {i: 'a', x: 0, y: 0, w: 12, h: 1},
      {i: 'b', x: 0, y: 1, w: 12, h: 1},
      {i: 'c', x: 0, y: 2, w: 12, h: 1},
      {i: 'd', x: 0, y: 3, w: 12, h: 1},
      {i: 'e', x: 0, y: 4, w: 12, h: 1}
    ];

    var layouts1 = {
      lg: [
        {i: 'a', x: 0, y: 0, w: 12, h: 1},
        {i: 'b', x: 0, y: 1, w: 12, h: 1},
        {i: 'c', x: 0, y: 2, w: 12, h: 1},
        {i: 'd', x: 0, y: 3, w: 12, h: 1},
        {i: 'e', x: 0, y: 4, w: 12, h: 1}
      ]
    };

    var layouts11 = {
      lg: [
        {i: 'a1', x: 0, y: 0, w: 9, h: 1},
        {i: 'a2', x: 0, y: 1, w: 9, h: 1},
        {i: 'a3', x: 0, y: 2, w: 9, h: 1},
        {i: 'b1', x: 9, y: 0, w: 3, h: 0.75},
        {i: 'b2', x: 9, y: 0.75, w: 3, h: 0.75},
        {i: 'b3', x: 9, y: 1.5, w: 3, h: 0.75}
      ]
    };

    var layout2 = [
      {i: 'a', x: 0, y: 0, w: 1, h: 1},
      {i: 'b', x: 0, y: 1, w: 1, h: 1},
      {i: 'c', x: 0, y: 2, w: 1, h: 1},
      {i: 'd', x: 0, y: 3, w: 1, h: 1},
      {i: 'e', x: 0, y: 4, w: 1, h: 1}
    ];

    return (
      <ResponsiveReactGridLayout
        layouts={layouts11}
        breakpoints={{lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0}}
        cols={{lg: 12, md: 10, sm: 6, xs: 4, xxs: 2}}
        rowHeight={200}>

        <div key={'a1'}>
          <SimpleLineChart/>
        </div>

        <div key={'a2'}>
          <SimpleLineChart/>
        </div>

        <div key={'a3'}>
          <SimpleLineChart/>
        </div>

        <div key={'b1'}>
          <MaterialCard/>
        </div>

        <div key={'b2'}>
          <MaterialCard/>
        </div>

        <div key={'b3'}>
          <MaterialCard/>
        </div>

      </ResponsiveReactGridLayout>
      // <ResponsiveReactGridLayout
      //   layouts={layouts}
      //   breakpoints={{lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0}}
      //   cols={{lg: 12, md: 10, sm: 6, xs: 4, xxs: 2}}
      //   containerPadding={[0, 0]}
      //   margin={[0, 0]}
      //   rowHeight={window.innerHeight}>
      //
      //   <div key={"r11"} style={{background: grey800}}>
      //     <ResponsiveReactGridLayout
      //       layouts={layouts1}
      //       breakpoints={{lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0}}
      //       cols={{lg: 12, md: 10, sm: 6, xs: 4, xxs: 2}}
      //       rowHeight={250}>
      //
      //       <div key={'a'}>
      //         <SimpleLineChart/>
      //       </div>
      //
      //       <div key={'b'}>
      //         <SimpleLineChart/>
      //       </div>
      //
      //       <div key={'c'}>
      //         <SimpleLineChart/>
      //       </div>
      //     </ResponsiveReactGridLayout>
      //   </div>
      //
      //   <div key={"r12"} style={{background: grey900}}>
      //     <ReactGridLayout
      //       layout={layout2}
      //       cols={1}
      //       rowHeight={150}>
      //
      //       <div key={'a'}>
      //         <MaterialCard/>
      //       </div>
      //
      //       <div key={'b'}>
      //         <MaterialCard/>
      //       </div>
      //
      //       <div key={'c'}>
      //         <MaterialCard/>
      //       </div>
      //
      //     </ReactGridLayout>
      //   </div>
      //
      //   <div key={"r21"} style={{background: grey700}}>
      //
      //   </div>
      //
      // </ResponsiveReactGridLayout>
    );
  }
}

export default HomePage;