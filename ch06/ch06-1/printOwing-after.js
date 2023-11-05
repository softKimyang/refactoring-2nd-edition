function printOwing(invoice) {
  let outstanding = 0;

  printBanner();

  // 미해결 채무(outstanding)을 계산한다.
  for (const o of invoice.orders) {
    outstanding += o.amount;
  }

  recordDueDate(invoice);
  printDetail(invoice, outstanding);
}

function printBanner() {
  console.log('*********************');
  console.log('***** 고객 채무 *****');
  console.log('*********************');
}

function printDetail(invoice, outstanding) {
    console.log(`고객명: ${invoice.customer}`);
    console.log(`채무액: ${outstanding}`);
    console.log(`마감일: ${invoice.dueDate.toLocaleDateString()}`);
}

function recordDueDate(invoice){
    //const today = Clock.today;
    const today = new Date();
  invoice.dueDate = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() + 30
  );

}

export {printOwing} ;
