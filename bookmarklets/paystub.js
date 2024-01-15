(function(){
const text = window.getSelection().toString();

const path = 'http://localhost:3000/paystub';

fetch(path, {
  method: 'POST',
  body: text
}).then(res => {
  const div = document.createElement('div');
  const color = res.ok ? 'green' : 'red';
  div.setAttribute('style', `position: fixed; top: 20px; right: 50%; height: 2em; width: 200px; background-color: ${color};`);
  div.innerText = res.ok ? 'Success' : 'Error';
  document.body.appendChild(div);
  setTimeout(() => document.body.removeChild(div), 5000);
})

}())