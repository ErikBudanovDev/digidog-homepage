import { OAuth2Client } from 'google-auth-library';

export default async function handler(req, res) {
  const { code } = req.query;

  if (!code) {
    return res.status(400).json({ error: 'Missing authorization code' });
  }

  const oauth = new OAuth2Client({
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    redirectUri: process.env.GOOGLE_REDIRECT_URI,
  });

  try {
    const { tokens } = await oauth.getToken(code);

    res.status(200).json({
      message: 'Success! Copy the refresh_token below and set it as GOOGLE_REFRESH_TOKEN in your .env.local and Vercel env vars.',
      refresh_token: tokens.refresh_token,
      access_token: tokens.access_token,
      scope: tokens.scope,
      expiry_date: tokens.expiry_date,
    });
  } catch (error) {
    res.status(500).json({
      error: 'Token exchange failed',
      details: error.message,
    });
  }
}
