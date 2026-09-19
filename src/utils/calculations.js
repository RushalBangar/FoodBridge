export const calculateImpact = (posts) => {
  let meals = 0;
  let donors = new Set();
  
  posts.forEach(p => {
    if (p.status === 'picked_up') {
      const quantityNum = parseInt(p.quantity?.split(' ')[0]) || 0;
      meals += quantityNum;
    }
    if (p.donorId) donors.add(p.donorId);
  });

  // Approximate 1 meal = 0.4kg of food
  const kgDiverted = parseFloat((meals * 0.4).toFixed(1));
  // 1 kg of rescued food = ~2.5 kg of CO2e emissions avoided
  const co2Avoided = parseFloat((kgDiverted * 2.5).toFixed(1));

  return {
    mealsSaved: meals,
    kgDiverted,
    co2Avoided,
    activeDonors: donors.size
  };
};
