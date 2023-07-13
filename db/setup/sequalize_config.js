const Sequelize = require("sequelize").Sequelize;
const to = require("await-to-js").to;

const _User = require("../models/user");
const _AppUser = require("../models/app_user");

let envVars = process.env;

const SequalizeConfig = (function () {
	let common_options = {
		dialect: envVars.DB_dialect,
		logging: process.env.DB_LOGGING == "enabled" ? true: false // true - to see the queries
	};

	// Production options
	let sequelize_options = {
		// // < ---  For Cloud Run 
		...common_options,
		host: envVars.DB_socketpath,
		pool: {
			max: 5,
			min: 0,
			acquire: 30000,
			idle: 10000
		},
		dialectOptions: {
			// e.g. socketPath: '/cloudsql/my-awesome-project:us-central1:my-cloud-sql-instance'
			// same as host string above
			socketPath: envVars.DB_socketpath
		},
		// For Cloud Run --- >
	};

	let dev_options = {
		...common_options,
		host: envVars.DB_host
	};

	if (process.env.NEXT_PUBLIC_NODE_ENV == "development") {
		sequelize_options = dev_options;
	}

	const sequelize = new Sequelize(envVars.DB_database, envVars.DB_username, envVars.DB_password, sequelize_options);

	let UserModel = _User(sequelize);
	let AppUserModel = _AppUser(sequelize);

	// UserModel <-> AppUserModel relationship - start
	let options = {
		foreignKey: 'user_id',
		as: "app_user"
	};

	UserModel.hasOne(AppUserModel, options);

	options = {
		foreignKey: 'user_id',
		as: "user"
	};
	
	AppUserModel.belongsTo(UserModel, options);
	// UserModel <-> AppUserModel relationship - end
	

	async function syncModels() {
		// If you want to drop the existing table and create new one pass the options
		// { force: true }

		// {alter: true} - along with altering a table if there are any changes, it'll create the new table as well.
		let [err, result] = await to(sequelize.sync({ alter: true }));
		if (err) {
			console.log("err while syncing the models is -------- \n ", JSON.stringify(err));
		}

		return result;
	}

	function getSequelize() {
		return sequelize;
	}

	return {
		syncModels,
		getSequelize
	};
})();

module.exports = SequalizeConfig;