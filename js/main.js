const inputHTML = document.getElementById('codeEncrypt')
const inputAHTML = document.getElementById('A')
const inputBHTML = document.getElementById('B')
const inputCHTML = document.getElementById('C')
const btnEncrypt = document.querySelector('.btnEncrypt')
const resultHTML = document.querySelector('.result')

const encrypt = () => {
  const texto = inputHTML.value
  const funcao = {
    a: parseInt(inputAHTML.value),
    b: parseInt(inputBHTML.value),
    c: parseInt(inputCHTML.value)
  }
  
  if (funcao['a'] >= 0) {
    if ( (funcao['b'] / (2 * funcao['a'])) < 32 ) {
      let cript = criptografar(texto, funcao)
      resultHTML.innerHTML = `<p>Sua mensagem criptografada: <strong>${cript}</strong></p>`
    } else {
      resultHTML.innerHTML = `<p>A coordenada 'x' do vértice deve ser menor que 32</p>`
    }
  } else {
    resultHTML.innerHTML = `<p>O valor de 'a' não pode ser negativo</p>`
  }
}

const decrypt = () => {
  const texto = inputHTML.value
  const funcao = {
    a: parseInt(inputAHTML.value),
    b: parseInt(inputBHTML.value),
    c: parseInt(inputCHTML.value)
  }

  if (funcao['a'] >= 0) {
    if ( (funcao['b'] / (2 * funcao['a'])) < 32 ) {
      let decript = descripgrafar(texto, funcao)
      resultHTML.innerHTML = `<p>Sua mensagem descriptografada: <strong>${decript}</strong></p>`
    } else {
      resultHTML.innerHTML = `<p>A coordenada 'x' do vértice deve ser menor que 32</p>`
    }
  } else {
    resultHTML.innerHTML = `<p>O valor de 'a' não pode ser negativo</p>`
  }
}

function criptografar(texto, funcao) {
  let cript = "";

  for (let posicao = 0; posicao < texto.length; posicao++) {
      const letra = texto[posicao];
      if (posicao === 0) {
          const valor_bruto = funcao['a'] * (letra.charCodeAt(0) ** 2) + funcao['b'] * letra.charCodeAt(0) + funcao['c'];
          cript += String.fromCharCode(Math.floor(valor_bruto / 95) + 32);
          cript += String.fromCharCode((valor_bruto % 95) + 32);
      } else {
          const valor_bruto = funcao['a'] * (letra.charCodeAt(0) ** 2) + funcao['b'] * letra.charCodeAt(0) + (funcao['c'] + cript.charCodeAt(2 * posicao - 1));
          cript += String.fromCharCode(Math.floor(valor_bruto / 95) + 32);  // Caractere adjacente
          cript += String.fromCharCode((valor_bruto % 95) + 32);
      }
  }

  return cript;
}

function descripgrafar(texto, funcao) {
  let decript = "";

  for (let posicao = 0; posicao < texto.length; posicao++) {
      const letra = texto[posicao];
      if (posicao === 0) {
          const valor_original = (letra.charCodeAt(0) - 32) * 95 + (texto.charCodeAt(posicao + 1) - 32);
          const traducao = Math.floor( Math.sqrt( 1 / funcao['a'] * (valor_original - ( (4 * funcao['a'] * funcao['c'] - funcao['b'] ** 2) / (4 * funcao['a']) )) ) - ( funcao['b'] / (2 * funcao['a']) ) );
          decript += String.fromCharCode(traducao);
      } else {
          if (posicao % 2 === 0) {
            const valor_original = (letra.charCodeAt(0) - 32) * 95 + (texto.charCodeAt(posicao + 1) - 32);
            const traducao = Math.floor( Math.sqrt( 1 / funcao['a'] * (valor_original - ( (4 * funcao['a'] * (funcao['c'] + texto.charCodeAt(posicao - 1)) - funcao['b'] ** 2) / (4 * funcao['a']) )) ) - ( funcao['b'] / (2 * funcao['a']) ) );//const traducao = Math.floor((valor_original - funcao['b'] - texto.charCodeAt(posicao - 1)) / funcao['a']);
            decript += String.fromCharCode(traducao);
          }
      }
  }

  return decript;
}