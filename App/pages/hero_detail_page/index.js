/**
 * Created by wildcat on 30/03/15.
 * Project: HotsLogs iOS Client (unofficial)
 */

'use strict';

var React = require('react-native');

var {
  View,
  Text,
  TabBarIOS,
  } = React;

var TabBarItemIOS = TabBarIOS.Item;

var TalentsTab = require('./talents_tab');


class HeroDetailPage extends React.Component {

  componentWillMount() {
    this.setState({
      selectedTab: 'talents'
    });
  }

  _renderTab() {
    return (
      <TalentsTab heroName={this.props.heroName} />
    )
  }

  render() {
    
    return (
      <TabBarIOS>
        <TabBarItemIOS
          title="Talents"
          icon={{uri: 'fa_light', isStatic: true}}
          selected={this.state.selectedTab === 'talents'}
          onPress={() => {
            this.setState({
              selectedTab: 'talents',
            });
          }}>
        { this._renderTab() }
        </TabBarItemIOS>
        <TabBarItemIOS
          title="Builds"
          icon={{uri: 'fa_tasks', isStatic: true}}
          selected={this.state.selectedTab === 'builds'}
          onPress={() => {
            this.setState({
              selectedTab: 'builds',
            });
          }}>
        { this._renderTab() }
        </TabBarItemIOS>
        <TabBarItemIOS
          title="Win Rates"
          icon={{uri: 'fa_bar', isStatic: true}}
          selected={this.state.selectedTab === 'win_rates'}
          onPress={() => {
            this.setState({
              selectedTab: 'win_rates',
            });
          }}>
        { this._renderTab() }
        </TabBarItemIOS>
        <TabBarItemIOS
          title="VS Others"
          icon={{uri: 'fa_hammer', isStatic: true}}
          selected={this.state.selectedTab === 'vs_others'}
          onPress={() => {
            this.setState({
              selectedTab: 'vs_others',
            });
          }}>
        { this._renderTab() }
        </TabBarItemIOS>
      </TabBarIOS>
    )
  }
}

module.exports = HeroDetailPage;