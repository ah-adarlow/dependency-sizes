var express = require('express');
var router = express.Router();
var dependencyGraph = require('../index');

/* GET home page. */
router.get('/', function(req, res, next) {
  var graph = dependencyGraph();
  var graphJSON = {
    nodes: JSON.stringify(graph.nodes),
    edges: JSON.stringify(graph.edges),
  };
  res.render('index', { graph: graph, graphJSON: graphJSON });
});

module.exports = router;
