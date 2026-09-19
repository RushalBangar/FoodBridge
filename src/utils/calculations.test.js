import { expect, test, describe } from 'vitest';
import { calculateImpact } from './calculations';

describe('calculateImpact', () => {
  test('calculates impact correctly with picked up posts', () => {
    const posts = [
      { status: 'picked_up', quantity: '50 servings', donorId: 'donor1' },
      { status: 'available', quantity: '20 servings', donorId: 'donor1' },
      { status: 'picked_up', quantity: '10', donorId: 'donor2' },
      { status: 'claimed', quantity: '100 kg', donorId: 'donor3' }
    ];

    const result = calculateImpact(posts);
    
    // Total picked up meals = 50 + 10 = 60
    expect(result.mealsSaved).toBe(60);
    // kg diverted = 60 * 0.4 = 24.0
    expect(result.kgDiverted).toBe(24.0);
    // Unique donors = donor1, donor2, donor3 = 3
    expect(result.activeDonors).toBe(3);
  });

  test('handles empty posts gracefully', () => {
    const result = calculateImpact([]);
    
    expect(result.mealsSaved).toBe(0);
    expect(result.kgDiverted).toBe(0);
    expect(result.activeDonors).toBe(0);
  });

  test('handles malformed quantity gracefully', () => {
    const posts = [
      { status: 'picked_up', quantity: 'not_a_number', donorId: 'donor1' }
    ];
    const result = calculateImpact(posts);
    expect(result.mealsSaved).toBe(0);
  });
});
