/**
 * Created by wildcat on 29/03/15.
 * Project: HotsLogs iOS Client (unofficial)
 */

'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  Image,
  ListView,
  } = React;

var Network = require('../../utils/network');
var IndexRankService = require('../../services/index_rank');

var HeroDetailPage = require('../hero_detail_page');

var DeltaLabel = require('./delta_label');
var ImageSources = require('../../utils/image_resources');

class MainPage extends React.Component {

  setDataSource(data) {
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1.hero !== r2.hero});

    this.setState({data: [], dataSource: ds.cloneWithRows(data)});
  }

  componentWillMount() {

    IndexRankService().then((data) => {
      this.setDataSource(data);
    }).catch((error) => {
      console.log(error);
    });
    console.log('componentWillMount()');

    this.setDataSource([]);
  }

  _onListViewItemPressed(heroName) {
    this.props.navigator.push({
      title: heroName,
      component: HeroDetailPage,
      passProps: {heroName: heroName}
    });
  }

  _renderRow(rowData, sectionID, rowID) {
    var imageName = ImageSources.getHeroImage(rowData.hero);

    return (
      <TouchableHighlight rowID={rowID} onPress={() => this._onListViewItemPressed(rowData.hero)}>
      <View style={{height: 62, backgroundColor: '#300F46'}}>
        <View style={{height: 61, flexDirection: 'row', alignItems: 'center'}}>
          <View style={{flex: 1, alignItems: 'center'}}>
            <Image
              style={{width: 30, height: 30, borderWidth: 1, borderColor: '#F5A623'}}
              source={{uri: imageName, isStatic: true}}
            />
          </View>
          <Text style={{flex: 2, textAlign: 'center', fontSize: 16, color: 'white'}}>{rowData.popularity}</Text>
          <Text style={{flex: 2, textAlign: 'center', fontSize: 16, color: 'white'}}>{rowData.winPercent}</Text>
          <DeltaLabel style={{flex: 1}} text={rowData.delta} />
        </View>
        <View style={{height: 1, backgroundColor: '#8B572A', marginLeft: 15, marginRight: 0}}></View>
      </View>
      </TouchableHighlight>
    );
  }


  render() {
    return (
      <View style={{flex: 1, backgroundColor: '#300F46'}}>
        <View style={{
          flexDirection: 'row', alignItems: 'center', marginTop: 64,
          height: 40, backgroundColor: '#251039'
        }}>
          <Text style={{flex: 1, textAlign: 'center', color: '#ffffff', fontSize: 19}}>Hero</Text>
          <Text style={{flex: 2, textAlign: 'center', color: '#ffffff', fontSize: 19}}>Popularity</Text>
          <Text style={{flex: 2, textAlign: 'center', color: '#ffffff', fontSize: 19}}>Win Percent</Text>
          <Text style={{flex: 1, textAlign: 'center', color: '#ffffff', fontSize: 19}}>% Δ</Text>
        </View>
        <ListView
          automaticallyAdjustContentInsets={false}
          dataSource={this.state.dataSource}
          renderRow={this._renderRow.bind(this)} />
      </View>
    );
  }
}

module.exports = MainPage;