'use strict';

const FS = require('fs');
const directoryTree = require('directory-tree');
const getFolderSize = require('get-folder-size');

function dependencyGraph(root) {
    directoryTree(root, { extensions: /.json$/ }, function(item, PATH) {
        if (item.name === 'package.json') {
            const packageInfo = JSON.parse(FS.readFileSync(item.path));
            const packageDir = PATH.dirname(item.path);
            getFolderSize(packageDir, /node_modules$/, function(err, size) {
                if (err) { throw err; }
               
                console.log(`${packageInfo.name} = ${size} bytes`);
            });
        }
    })
}

module.exports = dependencyGraph;