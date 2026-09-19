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
  return {
    mealsSaved: meals,
    kgDiverted: parseFloat((meals * 0.4).toFixed(1)),
    activeDonors: donors.size
  };
};
