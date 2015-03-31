var Network = require('../utils/network');
var HTMLParser = require('../utils/html_parser');

var getHeroTalents = function (heroName:string) {

  return Network.get('https://www.hotslogs.com/Sitewide/HeroDetails?Hero=' + encodeURIComponent(heroName))
    .then((responseText) => {

      var nodes = HTMLParser.find(responseText, "//x:table[@class='rgMasterTable'][1]//x:tbody/x:tr");
      var dataRows = {
        l1: [],
        l4: [],
        l7: [],
        l10: [],
        l13: [],
        l16: [],
        l20: [],
      };
      console.log('nodes count:' + nodes.length);

      var currentLevel = 0;

      for (var i = 1; i <= nodes.length; i++) {
        var levelString = HTMLParser.find(responseText, "//x:table[@class='rgMasterTable'][1]//x:tbody/x:tr[" + i + "]/x:td[2]/x:p/text()").toString();
        if (levelString.indexOf('Level:') >= 0) {
          currentLevel = parseInt(levelString.replace('Level:', ''));
          console.log(currentLevel);
        } else {
          var icon = HTMLParser.findFirst(responseText, "//x:table[@class='rgMasterTable'][1]//x:tbody/x:tr[" + i + "]//x:img/@src").value;
          var name = HTMLParser.findFirst(responseText, "//x:table[@class='rgMasterTable'][1]//x:tbody/x:tr[" + i + "]//x:td[4]/text()").toString();
          var popularity = HTMLParser.findFirst(responseText, "//x:table[@class='rgMasterTable'][1]//x:tbody/x:tr[" + i + "]//x:td[6]/text()").toString();
          var winRate = HTMLParser.findFirst(responseText, "//x:table[@class='rgMasterTable'][1]//x:tbody/x:tr[" + i + "]//x:td[7]/text()").toString();

          dataRows['l'+currentLevel].push({
            name: name,
            icon: icon,
            popularity: popularity,
            winRate: winRate
          });
        }

      }

      console.log(dataRows);

      return dataRows;
    });
};

exports.getHeroTalents = getHeroTalents;