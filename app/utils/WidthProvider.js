import React, {Component} from 'react';
import SizeMe from 'react-sizeme';
const WidthProvider = (ComposedComponent) => class extends Component {

  constructor(props) {
    super(props)
  }

  componentWillMount() {
    this.setState({
      //width: this.props.size.width,
      //rowHeight: this.props.size.height,
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      //width: nextProps.size.width,
      //rowHeight: nextProps.size.height
    });
  }

  render() {
    return (
      <ComposedComponent {...this.props} {...this.state} />
    );
  }

};

export default (ComposedComponent) => SizeMe({
  monitorWidth: true,
  monitorHeight: true
})(WidthProvider(ComposedComponent));
