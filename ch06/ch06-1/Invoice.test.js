import sampleInvoiceData from './sampledata.js';
import Invoice from './Invoice.js';
import {printOwing , calulateOutstanding} from './printOwing-after.js'

let invoice;

beforeEach(() => {
  invoice = new Invoice(sampleInvoiceData());
});


test(`invoice test`, () =>{
  expect(invoice.customer).toEqual('Brian');
  expect(invoice.orders[0].amount).toEqual(2000);
  expect(invoice.totalOutStanding).toEqual(6500);
});


test('calulateOutstanding test', () => {
  const result = calulateOutstanding(invoice);
  expect(result).toEqual(6500);
})