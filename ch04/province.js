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

  addProducer(arg){
    this._producers.push(arg);
    this._totalProduction += arg.production;
  }

  get shortfall(){
    return this._demand - this._totalProduction;
  }

  get profit(){
    return this.demandValue - this.demandCost;
  }

  get demandValue(){
    return this.satisfiedDemand + this.price;
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
        remainingDemand ==contribution;
        result += contribution * p.cost;
        });
    return result;
  }
}

