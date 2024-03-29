const jwt=require('jsonwebtoken');

const authenticateUser = (req,res,next)=>{
    const authHeader = req.headers['authorization']

    if (!authHeader) {
        return res.status(401).json({ message: 'Authorization header is missing' });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Token is missing from the authorization header' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        if (!decoded || !decoded.username || !decoded.password) {
          return res.status(401).json({ message: 'Invalid token' });
        }
        req.user = decoded;
        next(); 
      } 
      catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }
};

module.exports = authenticateUser;