import crypto from "crypto";

const createSalt = (): Promise<string> => {
  return new Promise((resolve, reject) => {
    crypto.randomBytes(64, (err, buf) => {
      if (err) reject(err);
      resolve(buf.toString("base64"));
    });
  });
};

const createHashedPassword = (plainPassword: string): Promise<{ password: string; salt: string }> => {
  return new Promise(async (resolve, reject) => {
    const salt: string = await createSalt();
    crypto.pbkdf2(plainPassword, salt, 9999, 64, "sha512", (err, key) => {
      if (err) reject(err);
      resolve({ password: key.toString("base64"), salt });
    });
  });
};

const makePasswordHashed = (plainPassword: string, salt: string) => {
  return new Promise(async (resolve, reject) => {
    crypto.pbkdf2(plainPassword, salt, 9999, 64, "sha512", (err, key) => {
      if (err) reject(err);
      resolve(key.toString("base64"));
    });
  });
};

// export default crypto_;
export { createSalt, createHashedPassword, makePasswordHashed };
