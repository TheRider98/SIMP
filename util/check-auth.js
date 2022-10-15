const jwt = require("express-jwt");
const jwks = require("jwks-rsa");
const axios = require("axios");

module.exports = (req, res, next) => {
  jwt({
    secret: jwks.expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: "https://dev-smzgyb-n.us.auth0.com/.well-known/jwks.json",
    }),
    audience: "check-auth-api",
    issuer: "https://dev-smzgyb-n.us.auth0.com/",
    algorithms: ["RS256"],
  });

  next();
};
