### 6.5 함수 선언 바꾸기
###### 반대 리팩터링 : _함수이름 바꾸기_ , _시그니처 바꾸기_
#### 배경
함수의 이름이 좋으면 함수의 구현 코드를 살펴볼 필요 없이 호출문만 보고도 무슨 일을 하는 지 파악할 수 있다.

함수의 매개변수는 함수를 사용하는 문맥을 설정한다.
매개변수를 객체로 정하면 함수의 캡슐화 수준이 높아진다.

이 문제의 정답은 없다.  어떻게 연결하는 것이 더 나은지 잘 이해하게 될 때마다 그에 맞게 코드를 개선할 수 있도록 함수 선언 바꾸기 리팩터링과 친숙해져야만 한다.


#### 절차

* 간단한 절차
  
  1. 매개변수를 제거하려거든 먼저 함수 본문에서 제거 대상 매개변수를 참조하는 곳은 없는지 확인한다.
  2. 메서드 선언을 원하는 형태로 바꾼다.
  3. 기존 메서드 선언을 참조하는 부분을 모두 찾아서 바뀐 형태로 수정한다.
  4. 테스트한다.

  변경할 대상이 둘 이상이면 나눠서 처리하는 편이 나을 때가 많다. 따라서 이름 변경과 매개변수 추가를 모두 하고 싶다면 각각을 독립적으로 처리하자(그러다 문제가 생기면 작업을 되돌리고 '마이그레이션 절차'를 따른다).

* 마이그레이션 절차
  
  1. 이어지는 추출 단계를 수월하게 만들어야 한다면 함수의 본문을 적절히 리팩터링한다.
  2. 함수 본문을 새로운 함수로 추출한다.
  3. 추출한 함수에 매개변수를 추가해야 한다면 '간단한 절차'를 따라 추가한다.
  4. 테스트한다.
  5. 기존 함수를 인라인한다.
  6. 이름을 임시로 붙여뒀다면 함수 선언 바꾸기를 한 번 더 적용해서 원래 이름으로 되돌린다.
  7. 테스트한다.



#### 예시 : 함수 이름 바꾸기(간단한 절차)
before
```
// 함수 이름 바꾸기(간단한 절차 ): before
function circum(radius){
  return 2 * Math.PI * radius;
}
```
after 
```
// 함수 이름 바꾸기(간단한 절차 ) : rename 
function circumference(radius){
  return 2 * Math.PI * radius;
}
```
#### 예시 : 함수 이름 바꾸기(마이그레이션 절차)
before
```
function circum(radius){
  return 2 * Math.PI * radius;
}
```
after 
```

function circum(radius){
  return circumference(radius);
}

function circumference(radius){
  return 2 * Math.PI * radius;
}
```

* 정리

  1. 간단한 절차 : circum()본문 전체를 circumference() 함수로 추출한다.
  2. 테스트 한다.
  3. circum() 함수에 circumference()함수를 인라인한다.
  4. 테스트
  5. 기존 circum() 함수를 삭제한다.


#### 예시 : 매개변수 추가하기
before
```
class Book{
  constructor(data){
    this._bookName = data.bookName;
    this._reservation = data.reservation;
    this._customer = [];
    data.reservation.forEach(data.customer);
  }

  addReservation(customer){
    this._reservation.push(customer);
  }
}
```
after
```
// 새로운 요구사항 : 예약 시 우선순위 큐를 지원하라.
class Book{
  constructor(data){
    this._bookName = data.bookName;
    this._reservation = data.reservation;
    this._customer = [];
    data.reservation.forEach(data.customer);
  }
  // 1. addReservation() 본문을 추출한다.
  // 2. 매개변수 추가
  addReservation(customer){
    zz_addReservation(customer, false);
  }

  zz_addReservation(customer, isPriority){
    // 매개변수를 사용하는지 확인 (javascript)
    assert(isPriority === true || isPriority === false);
    this._reservation.push(customer);
  }
}
```

#### 예시 : 매개변수를 속성으로 바꾸기
//고객이 뉴잉글랜드에 살고 있는지 확인하는 함수
```
function inNewEnglnd(aCustomer){
  return ["MA", "CT", "ME", "VT", "NH", "RI"].include(aCustomer.addres.state);
}
```
// 1. 함수 추출하기 전에 변수 추출
```
function inNewEnglnd(aCustomer){
  const stateCode = aCustomer.addres.state;
  return ["MA", "CT", "ME", "VT", "NH", "RI"].include(stateCode);
}
```
// 2. 함수 추출하기로 새 함수 만들기
```
function inNewEnglnd(aCustomer){
  const stateCode = aCustomer.addres.state;
  return ["MA", "CT", "ME", "VT", "NH", "RI"].include(stateCode);
}

function xxNEWinNewEngland(stateCode){
  return ["MA", "CT", "ME", "VT", "NH", "RI"].include(stateCode);
}
```
// 3. 변수 인라인하기
```
function inNewEnglnd(aCustomer){
  return xxNEWinNewEngland(Customer.addres.state);
}

function xxNEWinNewEngland(stateCode){
  return ["MA", "CT", "ME", "VT", "NH", "RI"].include(stateCode);
}
```
// 4. 함수 인라인하기
```
const inNewEnglnd = someCustomers.filter(c => xxNEWinNewEngland(Customer.addres.state));

function xxNEWinNewEngland(stateCode){
  return ["MA", "CT", "ME", "VT", "NH", "RI"].include(stateCode);
}
```