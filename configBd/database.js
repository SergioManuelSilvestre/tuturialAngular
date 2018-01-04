

// Asynchronous crypto
const crypto = require('crypto').randomBytes(256).toString('hex');

// server node exports = nodule.export parecido com export component

module.exports =
{
    uri: 'mongodb://localhost:27017/blogBD',
    secret: crypto,
    db: 'blogBD'
}
// ficheiro do tipo formato json 