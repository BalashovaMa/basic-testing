import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },
  { a: 10, b: 5, action: Action.Subtract, expected: 5 },
  { a: 5, b: 5, action: Action.Subtract, expected: 0 },
  { a: 8, b: 3, action: Action.Subtract, expected: 5 },
  { a: 1, b: 3, action: Action.Multiply, expected: 3 },
  { a: 8, b: 3, action: Action.Multiply, expected: 24 },
  { a: 3, b: 3, action: Action.Multiply, expected: 9 },
  { a: 3, b: 3, action: Action.Divide, expected: 1 },
  { a: 10, b: 2, action: Action.Divide, expected: 5 },
  { a: 20, b: 10, action: Action.Divide, expected: 2 },
  { a: 3, b: 3, action: Action.Exponentiate, expected: 27 },
  { a: 5, b: 2, action: Action.Exponentiate, expected: 25 },
  { a: 8, b: 4, action: Action.Exponentiate, expected: 4096 },
  { a: 2, b: 3, action: 'invalid', expected: null },
  { a: 2, b: 3, action: '', expected: null },
  { a: 2, b: 3, action: null, expected: null },
  { a: 'invalid', b: 3, action: Action.Add, expected: null },
  { a: 2, b: 'invalid', action: Action.Add, expected: null },
  { a: 'invalid', b: 'invalid', action: Action.Add, expected: null },
];

describe('simpleCalculator', () => {
  // This test case is just to run this test suite, remove it when you write your own tests
  test.each(testCases)(
    'should return $expected when a=$a, b=$b, and action=$action',
    ({ a, b, action, expected }) => {
      const result = simpleCalculator({ a, b, action });
      expect(result).toBe(expected);
    },
  );
  // Consider to use Jest table tests API to test all cases above
});
