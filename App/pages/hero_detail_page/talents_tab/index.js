/**
 * Created by wildcat on 31/03/15.
 * Project: HotsLogs iOS Client (unofficial)
 */

'use strict';

var React = require('react-native');

var {
  View,
  Text,
  ListView
  } = React;

var HeroDetailService = require('../../../services/hero_detail');


class TalentsTab extends React.Component {

  componentWillMount() {
    HeroDetailService.getHeroTalents('Sylvanas').then( (data) => {

    }).catch((error) => {
      console.log(error);
    });
  }

  render() {
    return (
      <View>
      </View>
    )
  }
}

module.exports = TalentsTab;