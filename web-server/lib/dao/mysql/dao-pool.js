var _poolModule = require('generic-pool');
var mysqlConfig = require('../../../../shared/config/mysql');
var mysql = require('mysql');

var env = process.env.NODE_ENV || 'development';
if(mysqlConfig[env]) {
  mysqlConfig = mysqlConfig[env];
}

/*
 * Create mysql connection pool.
 */
const factory = {
  create: function() {
    return mysql.createConnection({
              host: mysqlConfig.host,
              user: mysqlConfig.user,
              password: mysqlConfig.password,
              database: mysqlConfig.database
           });
    },

    destroy: function(client) {
      client.end();
    }
};

const opts = {
  max: 10, 
  idleTimeoutMillis: 30000,
  log: false
};

var createMysqlPool = function() {
  return _poolModule.createPool(factory, opts);
};

exports.createMysqlPool = createMysqlPool;
