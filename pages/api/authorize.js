import to from 'await-to-js';

import JwtHelper from '../../utils/common/JWT_Helper';
import appUser from '../../middleware/app_user';

const SECRET_KEY = process.env.JWT_SECRET;

export default async function handler(req, res) {
    let req_query = req.query;
    let req_body = req.body;

	let client_id = req_query.client_id || req_body.client_id;
	let client_secret = req_query.client_secret || req_body.client_secret;

	if(!client_id || !client_secret) {
		return res.status(401).json({ success: false, message: "client id and client secret are required" });
	}

    let [err, result] = await to(appUser.verifyAppUser(client_id, client_secret));
    if(err) {
        console.log("Err", err);
        return res.status(400).json({ success: false, message: err.message || "Internal server error" });
    }

	if(!result) {
		return res.status(401).json({ success: false, message: "invalid credentials" });
	}

	let payload = { client_id: result.client_token };

	let access_token = JwtHelper.generateToken(payload, SECRET_KEY, process.env.JWT_ACCESS_TOKEN_EXPIRY);
	let refresh_token = JwtHelper.generateToken(payload, SECRET_KEY, process.env.JWT_REFRESH_TOKEN_EXPIRY);

	return res.status(200).json({ access_token, refresh_token });
}