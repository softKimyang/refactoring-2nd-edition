### 6.3 변수 추출하기
###### 반대 리팩터링 : _변수 추출하기_
#### 배경

  표현식이 너무 복잡해서 이해하기 어려울 때가 있을 때 지역 변수를 활용하면 표현식을 쪼개 관리하기 더 쉽게 만들 수 있다.

변수 추출을 고려한다고 함은 표현식에 이름을 붙이고 싶다는 뜻이다. 이름을 붙이기로 했다면 그 이름이 들어갈 문맥도 살펴야 한다. 현재 함수에서만 의미가 있다면 변수로 추출하는 것이 좋다.

#### 절차
1. 추출하려는 표현식에 부작용은 없는 지 확인한다.
2. 불변 변수를 하나 선언하고 이름을 붙일 표현식의 복제본을 대입한다.
3. 원본 표현식을 새로 만든 변수로 교체한다.
4. 테스트한다.
5. 표현식을 여러 곳에서 사용한다면 각각을 새로 만든 변수로 교체한다. 하나 교체할 때마다 테스트한다.

#### 예시
before
```
function price(order){
  // 가격(price) = 기본 가격 - 수량 할인 + 배송비
  return order.quantity * order.itemPrice - 
  Math.max(0,order.quantity - 500) * order.itemPrice * 0.05+
  Math.min(order.quantity + order.itemPrice * 0.1 ,100);
}
```
after 1단계
```
function price(order){
  // 가격(price) = 기본 가격 - 수량 할인 + 배송비
  const basePrice = order.quantity * order.itemPrice;
  return  basePrice- 
  Math.max(0,order.quantity - 500) * order.itemPrice * 0.05 +
  Math.min(basePrice * 0.1 ,100);
}
```
after 2단계
```
function price(order){
  // 가격(price) = 기본 가격 - 수량 할인 + 배송비
  const basePrice = order.quantity * order.itemPrice;
  return  basePrice- 
    Math.max(0,order.quantity - 500) * order.itemPrice * 0.05 +
    Math.min(basePrice * 0.1 ,100);
}
```
after 3단계
```
function price(order){
  // 가격(price) = 기본 가격 - 수량 할인 + 배송비
  const basePrice = order.quantity * order.itemPrice;
  const quantityDiscount = 
      Math.max(0,order.quantity - 500) * order.itemPrice * 0.05;
  return  basePrice - 
    quantityDiscount + Math.min(basePrice * 0.1 ,100);
}
```
after 4단계
```
function price(order){
  // 가격(price) = 기본 가격 - 수량 할인 + 배송비
  const basePrice = order.quantity * order.itemPrice;
  const quantityDiscount = Math.max(0,order.quantity - 500) * order.itemPrice * 0.05;
  const shippling = Math.min(basePrice * 0.1 ,100)
  return  basePrice - quantityDiscount + shippling;
}
```

#### 예시 : class 안에서
before
```
class Order{
  constructor(aRecord){
    this._data = aRecord;
  }

  get quantity() {return this._data.quantity;}
  get itemPrice() {return this._data.itemPrice;}

  get price() {
    return this.quantity * this.itemPrice -
      Math.max(0, this.quantity - 500) * this.itemPrice * 0.05 +
      Math.min(this.quantity + this.itemPrice * 0.1, 100);
  }
}
```
after
```
class Order{
  constructor(aRecord){
    this._data = aRecord;
  }

  get quantity() {return this._data.quantity;}
  get itemPrice() {return this._data.itemPrice;}

  get price() {
    return basePrice() -
    quantityDiscount() +
    shipping();
  }

  get basePrice() { return this.quantity * this.itemPrice;}
  get quantityDiscount() {return  Math.max(0, this.quantity - 500) * this.itemPrice * 0.05;}
  get shipping() {return Math.min(this.quantity + this.itemPrice * 0.1, 100);}
}
```
