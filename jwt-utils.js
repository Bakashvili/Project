const jwt = require('jsonwebtoken')
require('dotenv').config()
const cookieParser = require('cookie-parser');
 const getNewAccessToken = (enterUsername)=>
{
    return jwt.sign( { username: enterUsername}, process.env.ACCESS_TOKEN_SECRET)
}

// const verifyAccessToken = (req, res, next)=>
// {
//     const authHeader = req.headers['authorization']
//     const token = authHeader && authHeader.split(' ')[1]

//     if(token == null) return res.sendStatus(401)

//     jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, jwtData)=>
//     { 
//         if(err) return res.sendStatus(403)
//         req.body.username = jwtData.username
//         next()
//     })
// }
// const verifyAccessToken = (token) => {

//     if (token == null) return res.sendStatus(401);

//     jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, jwtData) => {
//         if (err) return res.sendStatus(403);
//         req.body.username = jwtData.username;
//     });
// }
// const verifyAccessToken = (token) => {
//     return new Promise((resolve, reject) => {
//       if (token == null) {
//         resolve(null);
//       } else {
//         jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, jwtData) => {
//           if (err) {
//             resolve(null);
//           } else {
//             const username = jwtData.username;
//             resolve(username);
//           }
//         });
//       }
//     });
//   };
const verifyAccessToken = async (token) => {
    if (token == null) {
      return null;
    } else {
      try {
        const jwtData = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const username = jwtData.username;
        return username;
      } catch (err) {
        return null;
      }
    }
  };


module.exports = { getNewAccessToken, validateAccessToken: verifyAccessToken }