var express = require('express');
var server = express();

server.use('/frameworks', express.static('./bower_components'));
server.use('/', express.static('./www'));
server.listen(3000);