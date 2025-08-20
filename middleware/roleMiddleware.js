
const roleMiddleware = (allowedRoles)=>{
    return (req, res, next)=>{

        if(!req.user) {
            return res.status(401).json({
                success: false,
                message: 'User not authenticated.'
            });
        }

        if(!allowedRoles.includes(req.user.role)){
            return res.status(403).json({
                success: false,
                message: 'You do not have permission to access this route.'
            });
        }

        // User has required role, continue
        next();
    }
}

module.exports = roleMiddleware;