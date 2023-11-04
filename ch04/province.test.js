import Province from './province.js';
import sampleProvinceData from './sampledata.js';
// npx jest ./ch04/province.test.js

let asia ;
beforeEach(() => {
  asia = new Province(sampleProvinceData());
  
});

test('province test', () => {
  expect(asia.shortfall).toEqual(5);
  expect(asia.profit).toEqual(230);
});

test('production test', () => {
  asia.producers[0].production = 20;
  expect(asia.totalProduction).toEqual(36);
  expect(asia.shortfall).toEqual(-6);
  expect(asia.profit).toEqual(292);
});

// 예외 상황들
test('zero demand', () => {
  asia.demand = 0;
  expect(asia.shortfall).toEqual(-25);
  expect(asia.profit).toEqual(0);
})
test('negative demand', () => {
  asia.demand = -1;
  expect(asia.shortfall).toEqual(-25);
  expect(asia.profit).toEqual(0);
})
test('empty string demand', () => {
  asia.demand = "";
  expect(asia.shortfall).NaN;
  expect(asia.profit).NaN;
})

