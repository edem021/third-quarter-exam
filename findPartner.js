function findPartner(customer, candidates) {
  const goodPartners = candidates.filter(canditate => 
    canditate.favoriteGenre === customer.favoriteGenre &&
    canditate.hobbies.some(hobby => customer.hobbies.includes(hobby))
  );

  if (goodPartners.length === 0) return null;

  return goodPartners.reduce((youngestPartner, currentPartner) => currentPartner.age > youngestPartner ? youngestPartner : currentPartner);
}


module.exports = findPartner