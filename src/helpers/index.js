const { createJWT } = require("./createToken");
const { paginated } = require("./paginated");
const { uploadInBucket } = require("./uploadAWS-S3");
const { isImageValid } = require("./validateImage");


module.exports = { createJWT, isImageValid, uploadInBucket,paginated };
