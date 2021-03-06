const mongoose = require("mongoose");
const redis = require("redis");
const util = require("util");
const keys = require("../config/keys");

const client = redis.createClient(keys.redisUrl);

client.hget = util.promisify(client.hget);

const exec = mongoose.Query.prototype.exec;

mongoose.Query.prototype.cache = function(option = {}) {
  this.useCache = true;
  this.hashKey = JSON.stringify(option.key || "");

  return this; //Para deixar chaining colocar outras funcoes depois do cache se quiser ex: .limt(1)
};

mongoose.Query.prototype.exec = async function() {
  if (!this.useCache) {
    return await exec.apply(this, arguments);
  }

  const key = JSON.stringify(
    Object.assign({}, this.getQuery, {
      collection: this.mongooseCollection.name
    })
  );

  const cacheValue = await client.hget(this.hashKey, key);
  if (cacheValue) {
    console.log("PEgou do Cache");
    const doc = JSON.parse(cacheValue);

    return Array.isArray(doc)
      ? doc.map(d => new this.model(d))
      : new this.model(doc);
  }
  console.log("NAO PEgou do Cache");
  const result = await exec.apply(this, arguments);
  console.log("OPS", this.hashKey, key);
  client.hset(this.hashKey, key, JSON.stringify(result), "EX", 10);

  return result;
};

module.exports = {
  clearHash(hashKey) {
    client.del(JSON.stringify(hashKey));
  }
};
