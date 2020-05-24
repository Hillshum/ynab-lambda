
(function(){
const text = window.getSelection().toString();

const path = 'https://5m5oojlwpe.execute-api.us-east-1.amazonaws.com/test/paystub';

fetch(path, {
  method: 'POST',
  body: text
})

}())