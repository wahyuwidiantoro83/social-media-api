const date = new Date("2023-10-31T06:49:38.961Z");
const dateNow = new Date();

console.log(Math.floor(date.getTime() / (1000 * 3600 * 24)));
console.log(Math.floor(dateNow.getTime() / (1000 * 3600 * 24)));
