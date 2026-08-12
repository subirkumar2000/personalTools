const dateTime = new Date();

document.querySelector("#current-year").textContent = dateTime.getFullYear();

const inputField = `      
        <div class="input">
          <input type="text" class="expense-type" placeholder="Enter expanse type">
          <input type="number" class="amount" placeholder="Amount (₹ 0000.00)">
          <button type="button" class="remove-input">
            <i class="bi bi-trash3-fill"></i>
          </button>
        </div>
    `;

let monthlyExpanseArr = JSON.parse(localStorage.getItem("monthlyExpanse"));
let monthNameArr = JSON.parse(localStorage.getItem("monthName"));
let fixExpanseObj = JSON.parse(localStorage.getItem("fixExpanse"));
let fixIncomeObj = JSON.parse(localStorage.getItem("fixIncome"));

const monthField = document.querySelector("#month-field");

if (monthNameArr == null) {
  monthlyExpanseArr = [];
  monthNameArr = [];
} else {
  for (let i = 0; i < monthNameArr.length; i++) {

    for(let m=0; m<12; m++){
      let monthName = document.querySelectorAll('#month-name li')[m];
      if(monthName.dataset.value == monthNameArr[i]){
        monthName.classList.add('active');
      }
      
    }

    let monthFieldCode = `
        <div class="monthly-data">
          <div class="heading">
            <h3>${monthNameArr[i]}</h3>
            <div class="heading-btn">
            <button type="button" class="add">
              <i class="bi bi-plus-lg"></i>
            </button>
            <button type="button" class="remove">
              <i class="bi bi-shield-fill-x"></i>
            </button>
            <button type="button" class="minimize">
              <i class="bi bi-chevron-down"></i>
              </button>
        </div>
      </div>
      
      <div class="input-field">
      </div>
    </div>
        `;
    monthField.insertAdjacentHTML("beforeend", monthFieldCode);

    for (let j = 0; j < monthlyExpanseArr[i].monthlyExpanseType.length; j++) {
      monthField
        .querySelectorAll(".input-field")
        [i].insertAdjacentHTML("beforeend", inputField);

      monthField
        .querySelectorAll(".input-field")
        [i].querySelectorAll(".expense-type")[j].value =
        monthlyExpanseArr[i].monthlyExpanseType[j];

      monthField
        .querySelectorAll(".input-field")
        [i].querySelectorAll(".amount")[j].value =
        monthlyExpanseArr[i].monthlyExpanseAmount[j];
    }
  }
}

if (fixExpanseObj == null) {
  fixExpanseObj = {
    fixExpanseType: [],
    fixExpanseAmount: [],
  };
} else {
  document.querySelector('#default-field').remove();
  
  let fixExpanseField = document.querySelector("#fix-expanse");

  for (let j = 0; j < fixExpanseObj.fixExpanseType.length; j++) {
    fixExpanseField
      .querySelector(".input-field")
      .insertAdjacentHTML("beforeend", inputField);

    fixExpanseField
      .querySelector(".input-field")
      .querySelectorAll(".expense-type")[j].value =
      fixExpanseObj.fixExpanseType[j];

    fixExpanseField.querySelector(".input-field").querySelectorAll(".amount")[
      j
    ].value = fixExpanseObj.fixExpanseAmount[j];
  }
}

if (fixIncomeObj == null) {
  fixIncomeObj = {
    fixIncomeSource: [],
    fixIncomeAmount: [],
  };
} else {
  let fixIncomeField = document.querySelector("#fix-income");

  for (let j = 0; j < fixIncomeObj.fixIncomeSource.length; j++) {
    fixIncomeField
      .querySelector(".input-field")
      .querySelectorAll(".expense-type")[j].value =
      fixIncomeObj.fixIncomeSource[j];

    fixIncomeField.querySelector(".input-field").querySelectorAll(".amount")[
      j
    ].value = fixIncomeObj.fixIncomeAmount[j];
  }
}

const monthSelectSection = document.querySelector(".month-select");

document.addEventListener("click", function (event) {
  if (event.target.closest("#month-btn")) {
    monthSelectSection.style = "display: block;";
  }else if (monthSelectSection && !monthSelectSection.contains(event.target)) {
    monthSelectSection.style = "display: none;";
  }
});


monthField.addEventListener("click", (event) => {
  if (event.target.closest(".minimize")) {
    let monthlyData = event.target.closest(".monthly-data");

    if (monthlyData.classList.contains("minimize")) {
      monthlyData.querySelector(".input-field").style = "display: flex;";
      monthlyData.classList.remove("minimize");
      event.target.classList.remove("bi-chevron-up");
      event.target.classList.add("bi-chevron-down");
    } else {
      monthlyData.querySelector(".input-field").style = "display: none;";
      monthlyData.classList.add("minimize");

      event.target.classList.remove("bi-chevron-down");
      event.target.classList.add("bi-chevron-up");
    }
  }

  if (event.target.closest(".add")) {
    event.target
      .closest(".monthly-data")
      .querySelector(".input-field")
      .insertAdjacentHTML("beforeend", inputField);
  }

  if (event.target.closest(".remove-input")) {
    event.target.closest(".input").remove();
  }

  if (event.target.closest(".remove")) {
    let selectMonth = event.target
      .closest(".heading")
      .querySelector("h3").textContent;

    for (let i = 0; i < 12; i++) {
      let monthName = document.querySelectorAll("#month-name li")[i];
      if (monthName.dataset.value == selectMonth) {
        monthName.classList.remove("active");
      }
    }

    event.target.closest(".monthly-data").remove();
  }
});

for (let i = 0; i < 12; i++) {
  document
    .querySelectorAll("#month-name li")
    [i].addEventListener("click", (event) => {
      let monthName = event.target.dataset.value;

      if (!event.target.classList.contains("active")) {
        let monthFieldCode = `
        <div class="monthly-data">
          <div class="heading">
            <h3>${monthName}</h3>
            <div class="heading-btn">
            <button type="button" class="add">
              <i class="bi bi-plus-lg"></i>
            </button>
            <button type="button" class="remove">
              <i class="bi bi-shield-fill-x"></i>
            </button>
            <button type="button" class="minimize">
              <i class="bi bi-chevron-down"></i>
              </button>
        </div>
      </div>
      <hr />
      <div class="input-field">
        ${inputField}
      </div>
    </div>
        `;

        monthField.insertAdjacentHTML("beforeend", monthFieldCode);

        event.target.classList.add("active");
      }

      monthSelectSection.style = "display: none";
    });
}

document.querySelector("#fix-expanse").addEventListener("click", (event) => {
  if (event.target.closest(".remove-input")) {
    event.target.closest(".input").remove();
  }
});

document
  .querySelector("#fix-expanse .add")
  .addEventListener("click", (event) => {
    event.target
      .closest("#fix-expanse")
      .querySelector(".input-field")
      .insertAdjacentHTML("beforeend", inputField);
  });

let isFixExpanseMinimize = false;

document
  .querySelector("#fix-expanse .minimize")
  .addEventListener("click", (event) => {
    if (isFixExpanseMinimize == true) {
      event.target.closest("#fix-expanse").querySelector(".input-field").style =
        "display: flex;";
      event.target.classList.remove("bi-chevron-up");
      event.target.classList.add("bi-chevron-down");
      isFixExpanseMinimize = false;
    } else {
      event.target.closest("#fix-expanse").querySelector(".input-field").style =
        "display: none;";
      event.target.classList.remove("bi-chevron-down");
      event.target.classList.add("bi-chevron-up");
      isFixExpanseMinimize = true;
    }
  });

document
  .querySelector("#fix-income .minimize")
  .addEventListener("click", (event) => {
    if (isFixExpanseMinimize == true) {
      event.target.closest("#fix-income").querySelector(".input-field").style =
        "display: flex;";
      event.target.classList.remove("bi-chevron-up");
      event.target.classList.add("bi-chevron-down");
      isFixExpanseMinimize = false;
    } else {
      event.target.closest("#fix-income").querySelector(".input-field").style =
        "display: none;";
      event.target.classList.remove("bi-chevron-down");
      event.target.classList.add("bi-chevron-up");
      isFixExpanseMinimize = true;
    }
  });

document.querySelector("#save-data").addEventListener("click", () => {
  monthlyExpanseArr = [];
  monthNameArr = [];
  fixExpanseObj.fixExpanseType = [];
  fixExpanseObj.fixExpanseAmount = [];
  fixIncomeObj.fixIncomeSource = [];
  fixIncomeObj.fixIncomeAmount = [];

  let monthField = document.querySelector("#month-field");

  for (let i = 0; i < monthField.children.length; i++) {
    let monthData = document.querySelectorAll(".monthly-data")[i];

    let monthName = monthData.querySelector("h3").textContent;

    monthlyExpanseArr.push({
      monthlyExpanseType: [],
      monthlyExpanseAmount: [],
    });

    monthNameArr.push(monthName);

    let inputField = monthData.querySelector(".input-field");

    for (let j = 0; j < inputField.children.length; j++) {
      let inputFieldType =
        inputField.querySelectorAll(".expense-type")[j].value;

      let inputFieldAmount = inputField.querySelectorAll(".amount")[j].value;

      monthlyExpanseArr[i].monthlyExpanseType.push(inputFieldType);

      monthlyExpanseArr[i].monthlyExpanseAmount.push(inputFieldAmount);
    }
  }

  let fixExpanseInputField = document.querySelector(
    "#fix-expanse .input-field",
  );

  for (let i = 0; i < fixExpanseInputField.children.length; i++) {
    let inputFieldType =
      fixExpanseInputField.querySelectorAll(".expense-type")[i].value;

    let inputFieldAmount =
      fixExpanseInputField.querySelectorAll(".amount")[i].value;

    fixExpanseObj.fixExpanseType.push(inputFieldType);

    fixExpanseObj.fixExpanseAmount.push(inputFieldAmount);
  }

  let fixIncomeInputField = document.querySelector("#fix-income .input-field");

  for (let i = 0; i < fixIncomeInputField.children.length; i++) {
    let inputFieldType =
      fixIncomeInputField.querySelectorAll(".income-source")[i].value;

    let inputFieldAmount =
      fixIncomeInputField.querySelectorAll(".amount")[i].value;

    fixIncomeObj.fixIncomeSource.push(inputFieldType);

    fixIncomeObj.fixIncomeAmount.push(inputFieldAmount);
  }

  localStorage.setItem("monthlyExpanse", JSON.stringify(monthlyExpanseArr));

  localStorage.setItem("monthName", JSON.stringify(monthNameArr));

  localStorage.setItem("fixExpanse", JSON.stringify(fixExpanseObj));

  localStorage.setItem("fixIncome", JSON.stringify(fixIncomeObj));

  alert("Yearly Expanse Data Save Successfully!");
});
