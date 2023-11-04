export default function statement(invoice, plays){
  let totalAmount = 0;

  let result = `청구 내역 (고객명: ${invoice.customer})\n`;

  console.log(`usd : ${usd(50000)}`);

  for(let perf of invoice.performances){
    result += `${playFor(perf).name}: ${usd(amountFor(perf))}(${perf.audience})석\n`;
  }
  // 함수 추출 후 임시 이름 부여
  totalAmount += appleSauce();

  result += `총액: ${usd(totalAmount)}\n`;
  result += `적립 포인트: ${totalVolumeCredits()}점\n`
  return result;

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

  function usd(aNumber){
    return new Intl.NumberFormat("en-US",
                  {style: "currency",
                  currency: "USD",
                  minimumFractionDigits: 2}).format(aNumber/100);
  }

  function totalVolumeCredits(){
    let result = 0;
    for(let perf of invoice.performances){
      result  += volumeCreditsFor(perf);
    }
    return result;
  }
  // totalAmount() 임시 이름
  function appleSauce(){
    let result = 0;
    for(let perf of invoice.performances){
      result += amountFor(perf);
    }
    return result;
  }
}