const { Sequelize, DataTypes } = require('sequelize');

module.exports = function (sequelize) {
	let column_definitions = {
		id: {
			type: DataTypes.UUID,
			defaultValue: Sequelize.UUIDV4,
			allowNull: false,
			primaryKey: true
        },
        user_id: {
            type: DataTypes.UUID,
			allowNull: false
        },
		client_id: {
            type: DataTypes.UUID,
			allowNull: false
        },
		city: {
            type: DataTypes.STRING
        },
		client_secret: {
            type: DataTypes.UUID,
			allowNull: false
        },
        status: {
			type: DataTypes.ENUM("ACTIVE", "INACTIVE"),
			defaultValue: "ACTIVE"
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
		tableName: 'app_user',
		timestamps: true,
		updatedAt: 'updated_date',
		createdAt: 'created_date'
	};

	return sequelize.define('app_user', column_definitions, model_options);
}
