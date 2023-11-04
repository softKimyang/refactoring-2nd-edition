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
    // 변수 인라인하기
    let thisAmount = amountFor(perf, playFor(perf));
    
    volumeCredits += Math.max(perf.audience - 30, 0);

    if("comedy" === playFor(perf).type) {
      volumeCredits += Math.floor(perf.audience / 5);
    }

    result += `${playFor(perf).name}: ${format(thisAmount/100)}(${perf.audience})석\n`;
    totalAmount += thisAmount;
  }

  result += `총액: ${format(totalAmount/100)}\n`;
  result += `적립 포인트: ${volumeCredits}점\n`
  return result;

  function amountFor(aPerformance, play){
    let result = 0;
    // 함수 선언 바꾸기 
    // play 를 함수 playFor()로  교체
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
        throw new Error(`알수 없는 쟝르: ${playFor(aPerformance).type}`); // 함수 선언 바꾸기
    }
    return result;
  }

  function playFor(aPerformance){
    return  plays[aPerformance.playID];
  }
}