const parodyString = string => string.split("").map((letter, index) => index % 2 === 0 ? letter.toUpperCase() : letter.toLowerCase()).join("");

module.exports = parodyString