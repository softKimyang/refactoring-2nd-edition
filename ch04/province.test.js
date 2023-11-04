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
})

