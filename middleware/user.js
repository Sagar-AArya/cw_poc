const to = require('await-to-js').to;
const user = require('../db/data/user');
const sequalizeConfig = require('../db/setup/sequalize_config');

const User = (function(){
    
    async function verifyAppUser(email) {
        let options = {
          include: {
            model: sequalizeConfig.getSequelize().models.app_user,
            as: "app_user"
          },
          where: {
            email
          }
        };
      
        let [err, result] = await to(user.get(options));
        if(err) {
            console.log("err", err);
            throw err;
        }

        return result;
      }

    return {
        verifyAppUser
    }
}());

module.exports = User;