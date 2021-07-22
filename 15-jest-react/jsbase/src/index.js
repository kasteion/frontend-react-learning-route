const cities = [
  "Ciudad de México",
  "Bogotá",
  "Lima",
  "Buenos Aires",
  "Guadalajara",
];

const randomCity = () => {
  const city = cities[Math.floor(Math.random() * cities.length)];
  return city;
};

const reverseString2 = (str) => {
  return new Promise((resolve, reject) => {
    if (!str) {
      reject(Error("Error"));
    }
    resolve(str.split("").reverse().join(""));
  });
};

module.exports = randomCity;
