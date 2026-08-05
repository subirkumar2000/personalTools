const htmlCode = document.querySelector('#html-code');
const cssCode = document.querySelector('#css-code');
const jsCode = document.querySelector('#js-code');
const jsProblem = document.querySelector('#js-problem');
const prompt = document.querySelector('#prompt');

document.querySelectorAll('#field-btn li')[0].classList.add('js-active');

document.querySelector('#generate-btn').addEventListener('click', () => {
  let newCode;
  newCode = htmlCode.value.replace('<link rel="stylesheet" href="style.css">', `<style>
  ${cssCode.value}
  </style>`);
  
  newCode = newCode.replace('<script src="main.js"></script>', `<script>
  ${jsCode.value}
  </script>`);
  
  prompt.value = `"${newCode}" - is JavaScript solution is prefect for the bellow problem. "${jsProblem.value}"`;
});

for (let i = 0; i < 4; i++) {
  document.querySelectorAll('#field-btn li')[i].addEventListener('click',(event) => {
    
    let fieldBtnId = event.target.dataset.id;
    
    for(let i=0; i<4; i++){
      document.querySelectorAll('#field-btn li')[i].classList.remove('js-active');
      document.querySelectorAll('form > div')[i].style = 'display: none;';
    }
    document.getElementById(fieldBtnId).style = 'display: flex;';
    event.target.classList.add('js-active');
  });
}

document.querySelector('#copy-prompt').addEventListener('click', () => {
  navigator.clipboard.writeText(prompt.value);
});

for(let i=0; i<5; i++){
  document.querySelectorAll('textarea')[i].addEventListener('input', ()=> {
    for (let j = 0; j < 4; j++) {
      let textareaField = document.querySelectorAll('form textarea')[j];
      let fieldBtn = document.querySelectorAll('#field-btn li')[j];

      if(textareaField.value != ''){
        fieldBtn.classList.add('js-fill');
      } else if (fieldBtn.classList.contains('js-fill')){
        fieldBtn.classList.remove('js-fill');
      }
    }
  })
}