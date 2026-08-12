let userInput = JSON.parse(localStorage.getItem("userInput"));
let fixExpanseObj = JSON.parse(localStorage.getItem("fixExpanse"));
let fixIncomeObj = JSON.parse(localStorage.getItem("fixIncome"));
let monthlyExpenseObj = JSON.parse(localStorage.getItem("monthlyExpanse"));
let monthNameObj = JSON.parse(localStorage.getItem("monthName"));

const transactionTable = document.querySelector("#transaction-table > table");

const monthNameList = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

let monthlyFixExpense = 0;
let monthlyIncome = 0;

let saving = Number(userInput.saving);
let currentMonth = Number(userInput.month);

let fixExpanseAmountArr = fixExpanseObj.fixExpanseAmount;
let fixExpanseTypeArr = fixExpanseObj.fixExpanseType;

let fixIncomeAmountArr = fixIncomeObj.fixIncomeAmount;
let fixIncomeSourceArr = fixIncomeObj.fixIncomeSource;

let fixIncomeList = "";
let fixExpanseList = "";

for (let i = 0; i < fixExpanseAmountArr.length; i++) {
  monthlyFixExpense += Number(fixExpanseAmountArr[i]);
  fixExpanseList += `
${fixExpanseTypeArr[i]} : ${fixExpanseAmountArr[i]}`;
}

for (let i = 0; i < fixIncomeAmountArr.length; i++) {
  monthlyIncome = Number(fixIncomeAmountArr[i]);
  fixIncomeList = `
${fixIncomeSourceArr[i]} : ${fixIncomeAmountArr[i]}`;
}

for (let i = currentMonth - 1; i < 12; i++) {
  let monthlyExpanseIndex = monthNameObj.indexOf(monthNameList[i]);

  let totalExpense = 0;

  saving += monthlyIncome;

  totalExpense += monthlyFixExpense;

  if (monthlyExpanseIndex >= 0) {
    let monthlyExpanseArr =
      monthlyExpenseObj[monthlyExpanseIndex].monthlyExpanseAmount;

    for (let e = 0; e < monthlyExpanseArr.length; e++) {
      totalExpense += Number(monthlyExpanseArr[e]);
    }
  }

  saving -= totalExpense;

  transactionTable.innerHTML += ` <tr>
        <td>${monthNameList[i]}</td>
        <td class="js-saving">₹ ${saving}</td>
        <td class="js-expanse">₹ ${totalExpense}</td>
      </tr>
    `;
}

let index = 0;
for (let i = currentMonth - 1; i < 12; i++) {

  document
    .querySelectorAll(".js-expanse")
    [index].addEventListener("dblclick", (event) => {
      let monthlyExpanseList = "";

      let monthlyExpanseIndex = monthNameObj.indexOf(monthNameList[i]);

      if (monthlyExpanseIndex >= 0) {
        let monthlyExpanseArr =
          monthlyExpenseObj[monthlyExpanseIndex].monthlyExpanseAmount;
        let monthlyExpanseTypeArr =
          monthlyExpenseObj[monthlyExpanseIndex].monthlyExpanseType;

        for (let e = 0; e < monthlyExpanseArr.length; e++) {
          monthlyExpanseList += `
${monthlyExpanseTypeArr[e]} : ${monthlyExpanseArr[e]} `;
        }
      }

      alert(
        ` --- ${monthNameList[i]} ---\n${monthlyExpanseList}\n${fixExpanseList}`,
      );
    });

  document
    .querySelectorAll(".js-saving")
    [index].addEventListener("dblclick", (event) => {
      alert(fixIncomeList);
    });

    index++
}
