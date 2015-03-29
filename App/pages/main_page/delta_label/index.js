/**
 * Created by wildcat on 29/03/15.
 * Project: HotsLogs iOS Client (unofficial)
 */

'use strict';

var React = require('react-native');
var {
  Text
  } = React;

var merge = require('merge');

//style={{flex: 1, textAlign: 'center', fontSize: 16, color: 'green'}}
class DeltaLabel extends React.Component {

  render() {
    var text = this.props.text;
    var num = parseFloat(text);
    var color = 'green';
    if (num < 0) {
      color = 'red';
    }

    var style = {
      textAlign: 'center',
      fontSize: 16,
      color: color,
    };

    if(typeof this.props.style !== 'undefined') {
      style = merge(style, this.props.style);
    }

    return (
      <Text style={style}>{text}</Text>
    );
  }
}

module.exports = DeltaLabel;