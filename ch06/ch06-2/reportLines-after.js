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