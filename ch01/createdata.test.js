import plays from './data/plays.js'
import invoices from './data/invoices.js'
import createData from './createStatementData.js'

const invoice = invoices[0];

const data = createData(invoice, plays);

test('createData test', () => {
  expect('BigCo').toEqual(data.customer);
  expect('hamlet').toEqual(data.performances[0].play.name);
  expect(55).toEqual(data.performances[0].audience);
  expect(173000).toEqual(data.totalAmount);
  expect(47).toEqual(data.totalVolumeCredits);
})
