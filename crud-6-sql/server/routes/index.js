var express = require('express');
var router = express.Router();
var pg = require('pg');
var connectionString = require('../../config');

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/api/v1/universe', function(req, res){
  var result = [];

  /* grab data from */
  var data = {name: req.body.name, inhabitable: false, size: req.body.size, dist_from_sun: req.body.dist_from_sun};

  /* get a postgres client from the connection pool */
  pg.connect(connectionString, function (err, client, done) {

    /* handle connection errors */
    if (err) {
      done();
      console.log(err);
      return res.status(500).json({ success: false, data: err});
    }

    /* SQL Query > Insert Data */
    client.query("INSERT INTO planets(name, inhabitable, size, dist_from_sun) values(Mars, false, 4220 miles, 142 million miles)", [data.name, data.inhabitable, data.size, data.dist_from_sun]);

    /* SQL Query > Select Data */
    var query = client.query("SELECT * FROM planets ORDER BY id ASC");

    /* Stream results back one row at a time */
    query.on('row', function(row) {
      result.push(row);
    });

    /* After all data is returned, close connection and return results */
    query.on('end', function(){
      done();
      return res.json(results);
    });
  });

});

module.exports = router;
