const { Sequelize, DataTypes } = require('sequelize');

module.exports = function (sequelize) {
	let column_definitions = {
		id: {
			type: DataTypes.UUID,
			defaultValue: Sequelize.UUIDV4,
			allowNull: false,
			primaryKey: true
		},
		providerAccountId: {
			type: DataTypes.STRING(50),
			unique: true,
			allowNull: false
		},
		provider: {
			type: DataTypes.STRING(50),
			allowNull: false
		},
		emailVerified: {
			type: DataTypes.DATE,
		},
		name: {
			type: DataTypes.STRING(50),
			allowNull: false
		},
		first_name: {
			type: DataTypes.STRING(50),
			allowNull: false
		},
		middle_name: {
			type: DataTypes.STRING(50)
		},
		last_name: {
			type: DataTypes.STRING(50),
			allowNull: false
		},
		email: {
			type: DataTypes.STRING(50),
			allowNull: false
		},
		created_date: {
			type: DataTypes.DATE,
			allowNull: true,
			defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
		},
		updated_date: {
			type: DataTypes.DATE,
			allowNull: true,
			defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
		},
		user_type: {
			type: DataTypes.ENUM("APP_USER", "USER"),
			defaultValue: "USER"
		},
		status: {
			type: DataTypes.ENUM("ACTIVE", "INACTIVE"),
			defaultValue: "ACTIVE"
		},
		created_by: {
			type: DataTypes.TEXT,
			allowNull: true
		},
		updated_by: {
			type: DataTypes.DATE,
			allowNull: true,
			defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
		}
	};

	let model_options = {
		sequelize,
		tableName: 'user',
		timestamps: true,
		updatedAt: 'updated_date',
		createdAt: 'created_date'
	};

	return sequelize.define('user', column_definitions, model_options);
}