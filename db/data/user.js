const to = require("await-to-js").to;

const sequalizeConfig = require("../setup/sequalize_config");
const commonFunctions = require("../../utils/common/commonFunctions");

const UserTwo = (function(){
    async function create(attachment_json, options) {
        let [err, result] = await to(sequalizeConfig.getSequelize().models.user.create(attachment_json, options));
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

    async function update(attachment_json, options) {
        let [err, result] = await to(sequalizeConfig.getSequelize().models.user.update(attachment_json, options));
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
        let [err, result] = await to(sequalizeConfig.getSequelize().models.user.findOne(options));
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
        let [err, result] = await to(sequalizeConfig.getSequelize().models.user.findAll(options));
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

    async function deleteUser(options) {
        let [err, result] = await to(sequalizeConfig.getSequelize().models.user.destroy(options));
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
        let [err, result] = await to(sequalizeConfig.getSequelize().models.user.findAndCountAll(options));
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
        deleteUser,
        getAndCountAll
    }
}());

module.exports = UserTwo;