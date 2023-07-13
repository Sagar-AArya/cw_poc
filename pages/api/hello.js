// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getToken } from "next-auth/jwt";

const secret = process.env.NEXTAUTH_SECRET;

export default async function handler(req, res) {
  const token = await getToken({ req, secret });

  console.log("token", token);

  if (token) {
    console.log("JSON Web Token", token);
    return res.status(200).json({ success: true, data: ["1", "2"] });
  } else {
    return res.status(401).json({ success: false });
  }
}
