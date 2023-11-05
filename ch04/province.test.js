import sampleProvinceData from './sampleData';
import Province from './province.js';

let asia;

beforeEach(() =>{
  asia = new Province(sampleProvinceData());
});

test('shortfall', () => {
  expect(asia.shortfall).toEqual(5);
  expect(asia.totalProduction).toEqual(25);
})

test('profit', () => {
  expect(asia.producers[0].name).toEqual('Byzantinum');
  expect(asia.profit).toEqual(230);
})
test('demand setter test', () => {
  asia.demand = 20;
  expect(asia.shortfall).toEqual(-5);
  expect(asia.demandValue).toEqual(20 * asia.price);
  expect(asia.profit).toEqual(190);
})
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
test('empty string demand', () =>{
  asia.demand = "";
  expect(asia.shortfall).toEqual(-25);
  expect(asia.profit).toEqual(0);
});

test('string for producers', () =>{
  const data = {
    name: "String producers",
    producers: "",
    demand: 30,
    price: 20
  };
  const prov = new Province(data);
  expect(() => prov.shortfall).toThrow( Error('producer data is wrong'));
});
