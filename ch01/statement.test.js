import plays from './data/plays.js'
import invoices from './data/invoices.js'
import html from './statement.js'

const invoice = invoices[0];
const expected = `청구 내역 (고객명: BigCo)
hamlet: $650.00(55)석
As You Like It: $580.00(35)석
Othello: $500.00(40)석
총액: $1,730.00
적립 포인트: 47점`;

test('리팩토링 전 테스트 ', () =>{
  expect(html(invoice, plays)).toMatchSnapshot();
});
