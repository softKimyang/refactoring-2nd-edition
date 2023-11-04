import Province from './province.js';
import sampleProvinceData from './sampledata.js';

// npx jest ./ch04/province.test.js
test('shortfall test', () => {
  const asia = new Province(sampleProvinceData());
  expect(asia.shortfall).toEqual(5);
});

