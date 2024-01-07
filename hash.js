const bcrypt = require('bcrypt');
const servHashPassword = async(password)=>{
    return await bcrypt.hash(password, 10);
}
module.exports = {
    servHashPassword: servHashPassword
}