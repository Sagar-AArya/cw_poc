const to = require('await-to-js').to;
const sequalizeConfig = require('../db/setup/sequalize_config');
const appUser = require('../db/data/app_user');

const AppUser = (function(){
    
    async function verifyAppUser(client_id, client_secret) {
        let options = {
          include: {
            model: sequalizeConfig.getSequelize().models.user,
            as: "user",
			where: {
				user_type: "APP_USER"
			}
          },
          where: {
			client_id,
			client_secret
          }
        };
      
        let [err, result] = await to(appUser.get(options));
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

module.exports = AppUser;