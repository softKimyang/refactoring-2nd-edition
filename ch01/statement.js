export default function statement(invoice, plays){
  let totalAmount = 0;
  let volumeCredits = 0;
  let result = `청구 내역 (고객명: ${invoice.customer})\n`;
  // format 변수 제거하기
  // const format = new Intl.NumberFormat("en-US",
  //                 {style: "currency",
  //                 currency: "USD",
  //                 minimumFractionDigits: 2}).format;

  console.log(`format : ${format(50000/100)}`);

  for(let perf of invoice.performances){
    volumeCredits  += volumeCreditsFor(perf);

    result += `${playFor(perf).name}: ${format(amountFor(perf)/100)}(${perf.audience})석\n`;
    totalAmount += amountFor(perf);
  }

  result += `총액: ${format(totalAmount/100)}\n`;
  result += `적립 포인트: ${volumeCredits}점\n`
  return result;

  // 매개변수 제거
  function amountFor(aPerformance){
    let result = 0;

    switch(playFor(aPerformance).type){
      case "tragedy":
        result = 40000;
        if(aPerformance.audience > 30){
          result += 1000 * (aPerformance.audience - 30);
        }
        break;
      case "comedy":
        result = 30000;
        if(aPerformance.audience > 20){
          result += 10000 + 500 * (aPerformance.audience - 20);
        }
        result += 300 * aPerformance.audience;
        break;
      default:
        throw new Error(`알수 없는 쟝르: ${playFor(aPerformance).type}`); 
    }
    return result;
  }

  function playFor(aPerformance){
    return  plays[aPerformance.playID];
  }

  function volumeCreditsFor(aPerformance){
    let result = 0;
    result += Math.max(aPerformance.audience - 30, 0);

    if("comedy" === playFor(aPerformance).type) {
      result += Math.floor(aPerformance.audience / 5);
    }
    return result;
  }

  function format(aNumber){
    return new Intl.NumberFormat("en-US",
                  {style: "currency",
                  currency: "USD",
                  minimumFractionDigits: 2}).format(aNumber);
  }
}