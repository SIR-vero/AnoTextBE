const verifyRoles = (...allowedRoles) => (req, res, next) => {
    if(!req?.roles){console.log('verifyRoles sent 401!'); return res.sendStatus(401);}
    const rolesArray = [...allowedRoles];
    console.log(rolesArray);
    console.log(req.roles);

    const result = req.roles.map(role => rolesArray.includes(role)).find(val => val === true);
    if(!result){ console.log('verifyRoles sent 401 2!'); return res.sendStatus(401);}
    next();
}

module.exports = verifyRoles