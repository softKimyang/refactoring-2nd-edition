# Refactoring 2nd edition (Martin Fowler)

__개발 환경__ :  Node.js 

__언어__ : javascript

__테스트 프레임워크__ :  jest 
***
## 개발환경 세팅
 
 Node.js 설치 확인 : node -v
1. 작업 directory 생성
2. npm init
3. npm install --save-dev jest
4. npm install --save-dev @babel/core @babel/preset-env @babel/plugin-transform-modules-commonjs
5. jest.config.js 생성
6. .babelrc 생성 
7. package.json 수정

## 실행
__js파일 실행__ : node js파일

__개별파일 테스트__ : npx jest 파일명

__전체 테스트__ : npm test