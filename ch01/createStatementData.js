// 중간 데이터 구조를 인수로 전달
export default function createStatementData(invoice, plays){
  const statementData = {};
  statementData.customer = invoice.customer;
  statementData.performances = invoice.performances.map(enrichPerformance);
  statementData.totalAmount = totalAmount(statementData);
  statementData.totalVolumeCredits = totalVolumeCredits(statementData);
  return statementData;
  

  function enrichPerformance(aPerformance){
    const calculator = new PerformanceCalculator(aPerformance, playFor(aPerformance));
    const result = Object.assign({}, aPerformance);
    result.play = calculator.play;  
    result.amount = amountFor(result);
    result.volumeCredits = volumeCreditsFor(result);
    return result;
  }

  function playFor(aPerformance){
    return  plays[aPerformance.playID];
  }

  // 함수 위임하기
  function amountFor(aPerformance){
    return new PerformanceCalculator(aPerformance, playFor(aPerformance)).amount;
  }

  function volumeCreditsFor(aPerformance){
    let result = 0;
    result += Math.max(aPerformance.audience - 30, 0);

    if("comedy" === aPerformance.play.type) {
      result += Math.floor(aPerformance.audience / 5);
    }
    return result;
  }

  function totalVolumeCredits(data){
    return data.performances
      .reduce((total, p) => total + p.volumeCredits, 0);
    
  }

  function totalAmount(data){
    return data.performances
      .reduce((total, p) => total + p.amount, 0);

  }
}

// 공연료 계산기 생성
class PerformanceCalculator{
  constructor(aPerformance, aPlay){
    this.performance = aPerformance;
    this.play = aPlay;
  }

  // 함수 옮기기
  get amount(){
    let result = 0;

    switch(this.play.type){
      case "tragedy":
        result = 40000;
        if(this.performance.audience > 30){
          result += 1000 * (this.performance.audience - 30);
        }
        break;
      case "comedy":
        result = 30000;
        if(this.performance.audience > 20){
          result += 10000 + 500 * (this.performance.audience - 20);
        }
        result += 300 * this.performance.audience;
        break;
      default:
        throw new Error(`알수 없는 쟝르: ${this.play.type}`); 
    }
    return result;
  }
}