'use strict';

const FS = require('fs');
const directoryTree = require('directory-tree');
const getFolderSize = require('./bin/size');

function dependencyGraph(root) {
    root = root || __dirname;

    let nodes = {};
    let edges = [];

    let tree = directoryTree(root, { extensions: /.json$/ }, function(item, PATH) {
        if (item.name === 'package.json') {
            const packageInfo = JSON.parse(FS.readFileSync(item.path));
            const packageDir = PATH.dirname(item.path);
            const size = Math.round(getFolderSize(packageDir, /node_modules$/) / 1024);
            nodes[packageInfo.name] = size;

            for (const dep in packageInfo.dependencies) {
                edges.push({
                    from: packageInfo.name,
                    to: dep,
                });
            }
        }
    });

    let nodesArray = [];
    for (const node in nodes) {
        nodesArray.push({
            id: node,
            label: node,
            value: nodes[node],
            title: nodes[node] + ' KB',
        });
    }

    return {
        nodes: nodesArray,
        edges: edges,
    };
}

module.exports = dependencyGraph;