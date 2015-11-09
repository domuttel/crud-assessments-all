var pg = require('pg');
var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/planets';

var client = new pg.Client(connectionString);

client.connect();
var query = client.query('CREATE TABLE planets(id SERIAL PRIMARY KEY, name VARCHAR(20) not null, inhabitable BOOLEAN not null, size VARCHAR(20) not null, dist_from_sun VARCHAR(100) not null');
query.on('end', function() { client.end(); });