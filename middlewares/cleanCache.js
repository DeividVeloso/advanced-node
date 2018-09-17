const { clearHash } = require('../services/cache')

module.exports = async (req, res, next) => {
  await next(); //usado para esperar todo o processamento do BLOG POST
                //Pois se der erro antes não apagar o cache.

  clearHash(req.user.id);
};
