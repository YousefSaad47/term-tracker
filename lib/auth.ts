import * as jose from 'jose';

const secret = new TextEncoder().encode(process.env.JWT_SECRET);

export const generateJWT = async (
  userId: string,
  role: string,
  expiresIn: string
) => {
  return new jose.SignJWT({ role })
    .setSubject(userId)
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime(expiresIn)
    .sign(secret);
};

export const verifyJWT = async (token: string) => {
  try {
    const { payload } = await jose.jwtVerify(token, secret);
    return payload;
    // eslint-disable-next-line
  } catch (err) {
    return null;
  }
};
