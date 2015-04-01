/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  NavigatorIOS,
  ListView
} = React;

var MainPage = require('./App/pages/main_page');

var HeroDetailPage = require('./App/pages/hero_detail_page/talents_tab');


class App extends React.Component {

  _onRightButtonPress() {
    this.refs.nav.push({
      title: 'Jaina',
      component: HeroDetailPage,
      passProps: {heroName: 'Jaina'}
    });

  }

  render(){
    return (
      <NavigatorIOS
        ref="nav"
        style={styles.container}
        initialRoute={{
          component: MainPage,
          title: 'HotsLogs',
          //rightButtonTitle: 'TestView',
          //onRightButtonPress: this._onRightButtonPress.bind(this)
          }}
        />
    );
  }

}



var styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});

AppRegistry.registerComponent('HotsLogsIOS', () => App);
