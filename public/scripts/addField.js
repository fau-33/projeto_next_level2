//Procura o botão
document.querySelector('#add-time')

//Quando clicar no botão
.addEventListener('click', cloneField)



//Executar uma ação
function cloneField(){
  

  //Duplicar os campos.Que campos?
  const newFieldContainer = document.querySelector('.schedule-item').cloneNode(true)//boolean: true ou false

  //Pega os campos. Que campos?
  const fields = newFieldContainer.querySelectorAll('input');
  
  //Para cada campo, limpar
  fields.forEach(function(field){
    //pega o field do momento e limpa ele
    field.value = "";
  })

  //Colocar a página: Onde?
  document.querySelector('#schedule-items').appendChild(newFieldContainer)
}

