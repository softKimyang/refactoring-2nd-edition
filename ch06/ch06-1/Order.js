export default class Order{
  constructor(data){
    this._amount = data.amount;
  }
  get amount(){return this._amount;}
}