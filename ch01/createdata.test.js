import plays from './data/plays.js'
import invoices from './data/invoices.js'
import createData from './createStatementData.js'

const invoice = invoices[0];
// const expected = `청구 내역 (고객명: BigCo)
// hamlet: $650.00(55)석
// As You Like It: $580.00(35)석
// Othello: $500.00(40)석
// 총액: $1,730.00
// 적립 포인트: 47점`;

// test('리팩토링 전 테스트 ', () =>{
//   expect(html(invoice, plays)).toMatchSnapshot();
// });


const data = createData(invoice, plays);
data.performances.map(play => console.log(play));

test('createData test', () => {
  expect('BigCo').toEqual(data.customer);
  expect('hamlet').toEqual(data.performances[0].play.name);
  expect(55).toEqual(data.performances[0].audience);
  expect(173000).toEqual(data.totalAmount);
  expect(47).toEqual(data.totalVolumeCredits);
})
