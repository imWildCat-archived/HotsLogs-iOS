/**
 * Created by wildcat on 31/03/15.
 * Project: HotsLogs iOS Client (unofficial)
 */

'use strict';

var React = require('react-native');

var {
  Image,
  View,
  Text,
  ListView
  } = React;

var HeroDetailService = require('../../../services/hero_detail');


class TalentsTab extends React.Component {

  componentWillMount() {
    HeroDetailService.getHeroTalents(this.props.heroName).then((data) => {
      console.log('data is: ' + data);
      this._setupDataSource(data);
    }).catch((error) => {
      console.log(error);
    });
    this._setupDataSource();
  }


  _setupDataSource(data) {

    if (typeof data === 'undefined') {
      var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

      this.setState({dataSource: ds.cloneWithRows([])});
    } else {
      var sectionIDs = ['1', '4', '7', '10', '13', '16', '20'];
      var talentIDs = [];
      var dataBlob = {};

      for (var i = 0; i < sectionIDs.length; i++) {
        talentIDs[i] = [];
        var key = 'l' + sectionIDs[i];

        for (var j = 0; j < data[key].length; j++) {
          var talentKey = key + 't' + j;
          var talentData = data[key][j];

          talentIDs[i].push(talentKey);
          dataBlob[talentKey] = talentData;
        }
      }

      var getRowData = (dataBlob, sectionID, rowID) => {
        return dataBlob[rowID];
      };

      var getSectionData = (dataBlob, sectionID) => {
        return 'Level ' + sectionID;
      };
      var dataSource = new ListView.DataSource({
        getRowData: getRowData,
        getSectionHeaderData: getSectionData,
        rowHasChanged: (row1, row2) => row1.name !== row2.name,
        sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
      });
      this.setState({
        dataSource: dataSource.cloneWithRowsAndSections(dataBlob, sectionIDs, talentIDs)
      });
    }
  }

  _renderRow(rowData:Object, sectionID:String, rowID:String) {
    console.log(rowData.icon);
    return (
      <View style={{height: 62, backgroundColor: '#300F46'}}>
        <View style={{height: 61, flexDirection: 'row', alignItems: 'center'}}>
          <View style={{flex: 2, flexDirection: 'row', alignItems: 'center'}}>
            <Image
              style={{width: 30, height: 30, borderWidth: 1, borderColor: '#49165B', marginLeft: 15}}
              source={{uri: rowData.icon}}
            />
            <Text style={{textAlign:'center', fontSize: 16, color: '#F8F8F8', marginLeft: 10}}>
            {rowData.name}
            </Text>
          </View>
          <Text style={{flex: 1, textAlign:'center', fontSize: 16, color: '#F8F8F8'}}>{rowData.popularity}</Text>
          <Text style={{flex: 1, textAlign:'center', fontSize: 16, color: '#F8F8F8'}}>{rowData.winRate}</Text>
        </View>
        <View style={{height: 1, backgroundColor: '#8B572A', marginLeft: 15, marginRight: 0}} />
      </View>
    )
  }

  _renderSectionHeader(sectionData:Object, sectionID:String) {
    return (
      <View style={{flex: 1, flexDirection: 'row', backgroundColor: '#49165B', height: 25, alignItems: 'center', marginTop: -1}}>
        <Text style={{color: '#F8F8F8', fontSize: 12, marginLeft: 10}}>{sectionData}</Text>
      </View>
    )
  }

  render() {
    return (
    <View style={{flex: 1, backgroundColor: '#300F46'}}>
      <View style={{
        flexDirection: 'row', alignItems: 'center', marginTop: 64,
        height: 40, backgroundColor: '#251039'
      }}>
        <Text style={{flex: 2, textAlign: 'center', color: '#F8F8F8', fontSize: 19}}>Talent</Text>
        <Text style={{flex: 1, textAlign: 'center', color: '#F8F8F8', fontSize: 19}}>Popularity</Text>
        <Text style={{flex: 1, textAlign: 'center', color: '#F8F8F8', fontSize: 19}}>Win Rate</Text>
      </View>
      <ListView
        style={{flex: 1, backgroundColor: '#300F46'}}
        automaticallyAdjustContentInsets={false}
        dataSource={this.state.dataSource}
        renderRow={this._renderRow}
        renderSectionHeader={this._renderSectionHeader}
      />
    </View>
    )
  }
}

module.exports = TalentsTab;