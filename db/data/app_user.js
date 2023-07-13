const to = require("await-to-js").to;

const sequalizeConfig = require("../setup/sequalize_config");
const commonFunctions = require("../../utils/common/commonFunctions");

const AppUser = (function(){
    async function create(account_json, options) {
        let [err, result] = await to(sequalizeConfig.getSequelize().models.app_user.create(account_json, options));
        if (err) {
            let output = {
                hasErrors: true,
                errorType: "DbError"
            };

            output = {...output, ...err, message: err.message};
            throw output;
        }

        return result.dataValues;
    }

    async function update(account_json, options) {
        let [err, result] = await to(sequalizeConfig.getSequelize().models.app_user.update(account_json, options));
        if (err) {
            let output = {
                hasErrors: true,
                errorType: "DbError"
            };

            output = {...output, ...err, message: err.message};
            throw output;
        }

        return result;
    }

    async function get(options) {
        let [err, result] = await to(sequalizeConfig.getSequelize().models.app_user.findOne(options));
        if (err) {
            let output = {
                hasErrors: true,
                errorType: "DbError"
            };

            output = {...output, ...err, message: err.message};
            throw output;
        }

        result = commonFunctions.safelyParseStr(JSON.stringify(result));
        return result;
    }

    async function getAll(options) {
        let [err, result] = await to(sequalizeConfig.getSequelize().models.app_user.findAll(options));
        if (err) {
            let output = {
                hasErrors: true,
                errorType: "DbError"
            };

            output = {...output, ...err, message: err.message};
            throw output;
        }

        result = commonFunctions.safelyParseStr(JSON.stringify(result));
        return result;
    }

    async function deleteAppUser(options) {
        let [err, result] = await to(sequalizeConfig.getSequelize().models.app_user.destroy(options));
        if (err) {
            let output = {
                hasErrors: true,
                errorType: "DbError"
            };

            output = {...output, ...err, message: err.message};
            throw output;
        }

        return result;
    }

    async function getAndCountAll(options) {
        let [err, result] = await to(sequalizeConfig.getSequelize().models.app_user.findAndCountAll(options));
        if (err) {
            let output = {
                hasErrors: true,
                errorType: "DbError"
            };

            output = {...output, ...err, message: err.message};
            throw output;
        }

        result = commonFunctions.safelyParseStr(JSON.stringify(result));
        return result;
    }

    return {
        create,
        update,
        get,
        getAll,
        deleteAppUser,
        getAndCountAll
    }
}());

module.exports = AppUser;