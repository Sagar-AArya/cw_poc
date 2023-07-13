import to from 'await-to-js';

import JwtHelper from '../../utils/common/JWT_Helper';

const SECRET_KEY = process.env.JWT_SECRET;

export default async function handler(req, res) {
	let err, result;

	[err, result] = await to(JwtHelper.verifyToken(req, SECRET_KEY));
	if(err) {
		return res.status(401).json({ message: err.message });
	}

	return res.status(200).send({success: true });
}