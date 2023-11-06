import Order from './Order.js'

export default class Invoice{
  constructor(doc){
    this._customer = doc.customer;
    this._totalOutstanding = 0;
    this._orders = [];
    this.orderArray(doc);
  };

  orderArray(doc){
    if(!Array.isArray(doc.orders)){
      throw new Error('orders invoice is wrong') ;
    }
    if(doc.orders.length == 0){
      throw new Error('orders invoice has no invoice') ;
    }
    doc.orders
    .forEach((element) => {
        this.addOrders(new Order(element));
    });
  }

  addOrders(arg){
    this._orders.push(arg);
    this._totalOutstanding += arg.amount;
  }

  get customer() {return this._customer;}
  get orders() { return this._orders.slice()};

  get totalOutStanding(){ return this._totalOutstanding; }
  
}

