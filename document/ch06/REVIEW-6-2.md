### 6.2 함수 인라인하기

###### 반대 리팩터링 : _함수 추출하기_

#### 배경

  때로는 함수 본문이 이름만큼 명확한 경우가 있다. 또는 함수 본문 코드를 이름만큼 깔끔하게 리팩터링할 때도 있다. 이럴 때는 그 함수를 제거한다.

  리팩터링 과정에서 잘못 추출된 함수들도 다시 인라인한다.

  간접 호출을 과하게 쓰는 코드로 흔한 인라인 대상이다.


#### 절차
1. 다형 메서드인지 확인한다.
2. 인라인할 함수를 호출하는 곳을 모두 찾는다.
3. 각 호출문을 함수 본문으로 교체한다.
4. 하나씩 교체할 때마다 테스트한다.
5. 함수 정의(원래 함수)를 삭제한다.

#### 예시 1. 단순한 예제
before
```
function rating(aDriver){
  return moreThanFiveLateDeliveries(aDriver) ? 2 : 1;
}

function moreThanFiveLateDeliveries(aDriver){
  return aDriver.numberOfLateDeliveries > 5;
}
```
after
```
function rating(aDriver){
  return aDriver.numberOfLateDeliveries > 5 ? 2 : 1;
}

// function moreThanFiveLateDeliveries(aDriver){
//   return aDriver.numberOfLateDeliveries > 5;
// }
```

#### 예시 2. 과하게 함수 추출한 경우. 
before
```
function reportLines(aCustomer){
  const lines = [];
  gatherCustomerData(lines, aCustomer);
  return lines;
}

function gatherCustomerData(out, aCustomer){
  out.push(["name", aCustomer.name]);
  out.push(["location", aCustomer.location]);
}
```
after
```
function reportLines(aCustomer){
  const lines = [];
  lines.push(["name", aCustomer.name]);
  lines.push(["location", aCustomer.location]);
  return lines;
}

// 하나씩 옮기고 테스트한다.
// function gatherCustomerData(out, aCustomer){
//   out.push(["name", aCustomer.name]);
//   out.push(["location", aCustomer.location]);
// }
```