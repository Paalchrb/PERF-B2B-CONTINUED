/*****************************************************************************
 * Middleware for authorizing users & allow access to private api routes.
 * 
 * Token must be passed to API route in header with prop name x-auth-token
 * 
 * Decoded payload is assigned to req.user and kan be accessed in any private API 
 * route. req.user has this format:
 * req.user = {
 *    id: <userid>,
 *    companyId: <companyId>
 * }
 * 
 * To apply middleware pass it as second argument in your API route
 ****************************************************************************/
const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = async function(req, res, next) {
  // Get token from header
  const token = req.header('x-auth-token');

  // Check if not token
  if (!token) {
    return res
      .status(401)
      .json({ msg: 'No token, authorization denied' });
  }

  // Verify token
  try {
    await jwt.verify(token, config.get('jwtSecret'), (error, decoded)=>{
      if(error){
        return res
          .status(401)
          .json({ msg: 'Token is not valid' });
      }
      else{
        req.user = decoded.user;
        next();
      }
    });
  } catch (error) {
    console.error('something wrong with auth middleware')
    return res
      .status(500)
      .json({ msg: 'Server Error' });
  }
};
