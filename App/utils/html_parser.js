var xpath = require('xpath');
var parse5 = require('parse5');
var xmlser = require('xmlserializer');
var dom = require('xmldom').DOMParser;

var parser = new parse5.Parser();

var find = function (htmlString, xpathString) {
  var document = parser.parse(htmlString);
  var xhtml = xmlser.serializeToString(document);
  var doc = new dom().parseFromString(xhtml);

  var select = xpath.useNamespaces({"x": "http://www.w3.org/1999/xhtml"});
  //var xpathStringWithNamespace = xpathString.replace(/\/\//g, '//x:').replace(/\/([^/|^x])/g, '/x:$1');
  //return select(xpathStringWithNamespace, doc); // namespace x:...
  return select(xpathString, doc);
};

var findFirst = function (htmlString, xpathString) {
  var nodes = find(htmlString, xpathString);
  if (nodes.length > 0) {
    return nodes[0];
  } else {
    return null;
  }

};

exports.find = find;
exports.findFirst = findFirst;