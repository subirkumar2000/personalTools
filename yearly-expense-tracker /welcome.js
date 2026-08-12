const dateTime = new Date();

let userInput = {
  month : 0,
  saving : 0,
}

document.querySelector('#current-year').textContent = dateTime.getFullYear();
const currentMonth = (dateTime.getMonth()) + 1;

const monthInput = document.querySelector('#month');
const totalSaving = document.querySelector('#saving');
const showTransitionBtn = document.querySelector('#show-transition-btn');


for (let i = 0; i < 12; i++) {
  let monthList = document.querySelectorAll('#month-name li')[i];
  
  if(monthList.dataset.id == currentMonth){
    monthList.classList.add('active');
    userInput.month = monthList.dataset.id;
    monthInput.value = monthList.dataset.value;
  }
    
  monthList.addEventListener('click', (event) => {
    for (let i = 0; i < 12; i++) {
      document.querySelectorAll('#month-name li')[i].classList.remove('active');
    }
    event.target.classList.add('active');
    
    userInput.month = monthList.dataset.id;
    monthInput.value = monthList.dataset.value;
  });
    
  document.querySelector('#month-btn').onclick = () => {
      document.querySelector('#month-select').style = "display: none"
  }
}

monthInput.addEventListener('click', () => {
  document.querySelector('#month-select').style = "display: block;"
})

showTransitionBtn.addEventListener('click', () => {
  userInput.saving = totalSaving.value || 0;
  
  localStorage.setItem('userInput', JSON.stringify(userInput));
  
  window.location.href = "./transaction/transaction.html";
});