var Network = require('../utils/network');
var HTMLParser = require('../utils/html_parser');

var fetchData = function () {

  return Network.get('https://www.hotslogs.com')
    .then((responseText) => {

      var nodes = HTMLParser.find(responseText, "//x:table[@class='rgMasterTable'][1]//x:tbody/x:tr");
      var dataRows = [];

      for (var i = 0; i < nodes.length; i++) {
        var innerHTML = nodes[i].toString();
        var avatar = 'https:' + HTMLParser.findFirst(innerHTML, '//x:img/@src').value;
        var hero = HTMLParser.findFirst(innerHTML, '//x:a/text()').toString();
        var popularity = HTMLParser.findFirst(responseText, "//x:table[@class='rgMasterTable'][1]//x:tbody/x:tr[" + (i + 1) + "]/x:td[4]/text()").toString();
        var winPercent = HTMLParser.findFirst(responseText, "//x:table[@class='rgMasterTable'][1]//x:tbody/x:tr[" + (i + 1) + "]/x:td[5]/text()").toString();

        var deltaNode = HTMLParser.findFirst(responseText, "//x:table[@class='rgMasterTable'][1]//x:tbody/x:tr[" + (i + 1) + "]/x:td[6]/x:font/text()");

        var row = {
          avatar: avatar,
          hero: hero,
          popularity: popularity,
          winPercent: winPercent,
          delta: deltaNode ? deltaNode.toString() : null
        };

        dataRows.push(row);
      }

      return dataRows;
    });
};

module.exports = fetchData;