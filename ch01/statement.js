export default function statement(invoice, plays){
  let totalAmount = 0;
  let volumeCredits = 0;
  let result = `청구 내역 (고객명: ${invoice.customer})\n`;
  const format = new Intl.NumberFormat("en-US",
                  {style: "currency",
                  currency: "USD",
                  minimumFractionDigits: 2}).format;

  console.log(`format : ${format(50000/100)}`);

  for(let perf of invoice.performances){
    const play = plays[perf.playID];
    let thisAmount = 0;
    console.log(`perf : ${play.type}`)
    switch(play.type){
      case "tragedy":
        thisAmount = 40000;
        if(perf.audience > 30){
          thisAmount += 1000 * (perf.audience - 30);
        }
        break;
      case "comedy":
        thisAmount = 30000;
        if(perf.audience > 20){
          thisAmount += 10000 + 500 * (perf.audience - 20);
        }
        thisAmount += 300 * perf.audience;
        break;
      default:
        throw new Error(`알수 없는 쟝르: ${play.type}`);
    }

    //point
    volumeCredits += Math.max(perf.audience - 30, 0);

    // provide more point per 5 comedy audience 
    if("comedy" === play.type) {
      volumeCredits += Math.floor(perf.audience / 5);
    }

    // print 
    result += `${play.name}: ${format(thisAmount/100)}(${perf.audience})석\n`;
    totalAmount += thisAmount;
  }

  result += `총액: ${format(totalAmount/100)}\n`;
  result += `적립 포인트: ${volumeCredits}점\n`
  return result;
}