module.exports = {
    //"system"
    user: process.env.NODE_ORACLEDB_USER || "system",

    // Instead of hard coding the password, consider prompting for it,
    // passing it in an environment variable via process.env, or using
    // External Authentication.

    // "oracle"
    password: process.env.NODE_ORACLEDB_PASSWORD || "oracle",

    // For information on connection strings see:
    // https://github.com/oracle/node-oracledb/blob/master/doc/api.md#connectionstrings

    // "localhost:1521/oracletest",
    connectString: process.env.NODE_ORACLEDB_CONNECTIONSTRING || "localhost:1521/oracletest",
    
    // Setting externalAuth is optional.  It defaults to false.  See:
    // https://github.com/oracle/node-oracledb/blob/master/doc/api.md#extauth
    externalAuth: process.env.NODE_ORACLEDB_EXTERNALAUTH ? true : false
};
