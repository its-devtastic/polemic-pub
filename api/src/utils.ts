import { customAlphabet } from "nanoid";

export const generateKey = customAlphabet(
  "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
);

export const generatePrefixedId = (prefix: string) =>
  `${prefix}_${generateKey(16)}`;
