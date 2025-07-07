const isCityMatched = (city, responseCity) => {
  return city.trim().toLowerCase() === responseCity.trim().toLowerCase();
};

const validateCity = (city, responseCity) => {
  if (!isCityMatched(city, responseCity)) {
    throw new Error(`City not found`);
  }
};

module.exports = {
  validateCity,
};
