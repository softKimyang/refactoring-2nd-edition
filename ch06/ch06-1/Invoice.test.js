import sampleInvoiceData from './sampledata.js';
import Invoice from './Invoice.js'

let invoice;

beforeEach(() => {
  invoice = new Invoice(sampleInvoiceData());
});


test(`invoice test`, () =>{
  expect(invoice.customer).toEqual('Brian');
  expect(invoice.orders[0].amount).toEqual(2000);
  expect(invoice.totalOutStanding).toEqual(6500);
})