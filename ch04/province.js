import Producer from './producer';
export default class Province{

  constructor(doc){
    this._name = doc.name;
    this._demand = doc.demand;
    this._price = doc.price;
    this._totalProduction = 0;
    this._producers = [];
    this.producerArray(doc);
  }
  producerArray(doc){
    if(!Array.isArray(doc.producers)){
      throw new Error('producer data is wrong') ;
    }
    if(doc.producers.length == 0){
      throw new Error('producer data has no data') ;
    }
    doc.producers.forEach(element => {
      this.addProducer(new Producer(this, element));
    });
  }

  addProducer(arg){
    this._producers.push(arg);
    this._totalProduction += arg.production;
  }
  checkArgAndReturnNumber(arg){
    const argNum = parseInt(arg);
    return Number.isNaN( argNum ) ? 0 : ( argNum <= 0 ? 0 : argNum);
  }
  
  get name() { return this._name;}
  get producers() { return this._producers.slice()};
  get demand() {return this._demand;}
  set demand(arg){
    this._demand = this.checkArgAndReturnNumber(arg);
  }
  get price() { return this._price;}
  set price(arg){
    this._price = this.checkArgAndReturnNumber(arg);
  }

  get totalProduction(){
    return this._totalProduction;
  }
  set totalProduction(arg){
    this._totalProduction = this.checkArgAndReturnNumber(arg);
  }

  get shortfall(){
    return this._demand - this.totalProduction;
  }

  get profit(){
      return this.demandValue - this.demandCost;
  }
  get demandValue(){
    return this.satisfiedDemand * this.price;
  }

  get satisfiedDemand(){
    return Math.min(this._demand, this.totalProduction);
  }
  get demandCost(){
    //재고확인 추가
    let remainingDemand = this.demand;
    let result = 0;
    this.producers
      .sort((a, b) => a.cost - b.cost)  // 적은 비용 순으로 정렬
      .forEach(p => {
        const contribution = Math.min(remainingDemand, p.production);
        remainingDemand -= contribution;
        result += p.cost * contribution;
      });
      return result;
  }
}