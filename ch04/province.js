import Producer from './producer.js';

export default class Province{
  constructor(doc){
    this._name = doc.name;
    this._producers = [];
    this._totalProduction = 0;
    this._demand = doc.demand;
    this._price = doc.price;
    doc.producers.forEach(element => {
      this.addProducer(new Producer(this, element));
    });
  }

  get name(){ return this._name;}
  get producers() { 
    return this._producers.slice();
  }
  get totalProduction() { return this._totalProduction;}
  set totalProduction(arg) { this._totalProduction = arg;}
  get demand() { 
    if(this._demand <= 0 || this._demand == ""){
    this._demand = 0; 
  }return this._demand;
}
  set demand(arg) { this._demand = arg;}
  get price() { return this._price;}
  set price(arg) {this._price = arg;}

  addProducer(arg){
    this._producers.push(arg);
    this._totalProduction += arg.production;
  }

  get shortfall(){
   // 자바스크립트에서는 함수에 ()를 하지 않아도 되므로 주의 해야 한다.
    return this.demand - this._totalProduction;
  }

  get profit(){
    return this.demandValue - this.demandCost;
  }
  
  get demandValue(){
    return this.satisfiedDemand * this.price;
  }

  get satisfiedDemand(){
    return Math.min(this._demand, this._totalProduction);
  }

  get demandCost(){
    let remainingDemand = this.demand;
    let result = 0;
    this.producers
      .sort((a,b) => a.cost - b.cost)
      .forEach(p => {
        const contribution = Math.min(remainingDemand, p.production);
        remainingDemand -= contribution;
        result += contribution * p.cost;
        });
    return result;
  }
}

