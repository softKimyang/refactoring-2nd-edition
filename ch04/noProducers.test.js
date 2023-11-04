import Province from './province.js';
import sampleProvinceData from './sampledata.js';

let noProducers;
beforeEach(() => {
  const data = {
    name : "No producers",
    producers: [],
    demand: 30,
    price: 20
  };
  noProducers = new Province(data);
});

test('shortfall', () =>{
  expect(noProducers.shortfall).toEqual(30);
})
test('profit', () => {
  expect(noProducers.profit).toEqual(0);
});

test('string for producers', () => {
  const data = {
    name : "string producers",
    producers: "",
    demand: 30,
    price: 20
  };
  const province = new Province(data);
  expect(province.shortfall).equal(0);
})
