'use strict';

var fs = require('fs');
var path = require('path');

function readSizeRecursive(item, ignoreRegExp) {
  var ignoreRegExp;

  if (ignoreRegExp && ignoreRegExp.test(item)) {
    return 0;
  }
  else {
    var stats = fs.lstatSync(item);
    var total = stats.size || 0;
  
    if (stats.isDirectory()) {
        var list = fs.readdirSync(item);
        for (var dirItem of list) {
            total += readSizeRecursive(
                path.join(item, dirItem),
                ignoreRegExp
            );
        }
    }

    return total;    
  }
}

module.exports = readSizeRecursive;
