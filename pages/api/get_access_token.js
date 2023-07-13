import to from 'await-to-js';
import _ from 'lodash';

import JwtHelper from '../../utils/common/JWT_Helper';
const SECRET_KEY = process.env.JWT_SECRET;

export default async function handler(req, res) {
	console.log("req.method", req.method);
	if(req.method !== "POST") {
		res.status(404).json({ message: "Not found" });
	}

	let refresh_token = req.body.refresh_token;
	if (!refresh_token) {
		return res.status(401).json({ "message": "Refresh token is invalid" });
	}

	let [err, result] = await to(JwtHelper.verifyToken(refresh_token, SECRET_KEY));
	if(err) {
		return res.status(500).json({ message: err.message });
	}

	console.log("result", result);
	let payload = _.omit(result, ["iat", "exp"]);
	let access_token = JwtHelper.generateToken(payload, SECRET_KEY, process.env.JWT_ACCESS_TOKEN_EXPIRY);

	res.status(200).json({ access_token });
}