### 6.1 함수 추출하기

###### 반대 리팩터링 : _함수 인라인하기_

#### 배경

  코드를 언제 독립된 함수로 묶어야 하는가?
  
  1. 길이 : 함수 하나가 한 화면을 넘어가면 안 된다.
  2. 재사용성 : 두 번 이상 사용할 코드는 함수로 만들고, 한 번만쓰이는 코드는 인라인 상태로 놔둔다.
  3. __목적과 구현의 분리__ : 함수로 추출한 뒤 '무슨 일'에 걸맞는 __이름__ 을 짓는다.


#### 절차
1. 함수를 새로 만들고 목적을 잘 드러내는 이름을 붙인다.('어떻게'가 아닌 __'무엇을'__ 하는 지가 드러나야 한다.)
2. 추출할 코드를 원본 함수에서 복사하여 새 함수에 붙여넣는다.
3. 추출한 코드 중 원본 함수의 지역 변수를 참조하거나 추출한 함수의 유효범위를 벗어나는 변수는 없는지 검사한다. 있다면 매개변수로 전달한다.
4. 변수를 다 처리했다면 컴파일한다.
5. 원본 함수에서 추출한 코드 부분을 새로 만든 함수를 호출하는 문장으로 바꾼다.(즉, 추출한 함수로 일을 __위임__ 한다.)
6. 테스트한다.
7. 다른 코드에 방금 추출한 것과 똑같거나 비슷한 코드가 없는지 살핀다. 있다면 방금 추출한 새 함수를 호출하도록 바꿀지 검토한다([인라인 코드를 함수 호출로 바꾸기](./ch08/REVIEW-8-5.md))

#### 예시 : 리팩터링 예제
```
function printOwing(invoice){
  let outstanding = 0;

  console.log("*********************");
  console.log("***** 고객 채무 *****");
  console.log("*********************");

  // 미해결 채무(outstanding)을 계산한다.
  for (const o of invoice.orders){
    outstanding += o.amount;
  }

  // 마감일(dueDate)을 기록한다.
  const today = Clock.today;
  invoice.dueDate = new Date(today.getFullYear(), today.getMonth(),
                                  today.getDate() + 30);

  // 세부 사항을 출력한다.
  console.log(`고객명: ${invoice.customer}`);
  console.log(`채무액: ${outstanding}`);
  console.log(`마감일: ${invoice.dueDate.toLocaleDateString()}`);
}
```
#### 예시 : 유효범위를 벗어나는 변수가 없을 때
```
function printOwing(invoice) {
  let outstanding = 0;

  printBanner();

  // 미해결 채무(outstanding)을 계산한다.
  for (const o of invoice.orders) {
    outstanding += o.amount;
  }

  // 마감일(dueDate)을 기록한다.
  const today = Clock.today;
  invoice.dueDate = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() + 30
  );

  printDetail();

  function printBanner() {
    console.log('*********************');
    console.log('***** 고객 채무 *****');
    console.log('*********************');
  }

  function printDetail() {
    console.log(`고객명: ${invoice.customer}`);
    console.log(`채무액: ${outstanding}`);
    console.log(`마감일: ${invoice.dueDate.toLocaleDateString()}`);
  }
}

```
>printDetail()은 printOwing()에 중첩되도록 정의했다. 중첩 함수를 지원하지 않는 언어에서는 불가능한 방법이다. 이 때는 함수를 __최상위 수준으로 추출하는 문제__ 로 볼 수 있다. 아래의 [예시 : 지역 변수를 사용할 때](#예시-:-지역-변수를-사용할-때)를 참고


#### 예시 : 지역 변수를 사용할 때 
```
function printOwing(invoice) {
  let outstanding = 0;

  printBanner();

  // 미해결 채무(outstanding)을 계산한다.
  for (const o of invoice.orders) {
    outstanding += o.amount;
  }

  recordDueDate(invoice);
  printDetail(invoice, outstanding);
}

function printBanner() {
  console.log('*********************');
  console.log('***** 고객 채무 *****');
  console.log('*********************');
}

function printDetail(invoice, outstanding) {
    console.log(`고객명: ${invoice.customer}`);
    console.log(`채무액: ${outstanding}`);
    console.log(`마감일: ${invoice.dueDate.toLocaleDateString()}`);
}

function recordDueDate(invoice){
    //const today = Clock.today;
    const today = new Date();
  invoice.dueDate = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() + 30
  );

}
```
