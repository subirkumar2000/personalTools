const body = document.querySelector('body');

setInterval(() => {
  let fontRed = Math.round(Math.random()*255);
  let fontGreen = Math.round(Math.random()*255);
  let fontBlue = Math.round(Math.random()*255);
  

  let backRed = Math.round(Math.random()*255);
  let backGreen = Math.round(Math.random()*255);
  let backBlue = Math.round(Math.random()*255);

  body.style = `color: rgb(${fontRed}, ${fontGreen}, ${fontBlue})`;
}, 1000);