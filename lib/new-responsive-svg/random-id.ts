export function randomId(numChars: number = 6) {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  let result = "";
  for (let i = 0; i < numChars; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}
