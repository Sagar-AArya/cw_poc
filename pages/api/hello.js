// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import sequalizeConfig from "../../db/setup/sequalize_config";

export default async function handler(req, res) {
  const userInput = req.body.username; // User-supplied input

  // Vulnerable code
  const query = `SELECT * FROM users WHERE username = '${userInput}';`;

  let result = sequalizeConfig.getSequelize().query(query);
  return res.status(200).json({success: true, data: result});
}
