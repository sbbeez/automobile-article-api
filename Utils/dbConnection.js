const keys = require("../Config/keys");
const { Client } = require("pg");

exports.getDatabaseClient = () => {
    let client = new Client({ connectionString: keys.connectionString });
    client.connect();
    return client;
}

