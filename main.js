// inicializacion de variables
let nombre;
let apellido;
let numero=2;
let secuencia = [];

//inicio del programa



let submit=document.querySelector(".submit");
submit.addEventListener('click',()=>{
    var output=document.querySelector(".output");
    console.log(output);
    const data={
        nombre: document.getElementById("NAME").value,
        apellido: document.getElementById("LASTNAME").value,
        edad: document.getElementById("AGE").value
    };

    nombre=data.nombre;
    apellido=data.apellido;
    edad=data.edad;

    console.log(nombre);
    console.log(apellido);
    console.log(edad);

        let newlist=document.createElement('div');
        newlist.classList.add('addData');
        newlist.innerHTML=`
          <div class="NameContainer">${data.name}</div>
          <a href="mailto:anushaviswanathan55610@ieee.org">${data.email}</a><br>
          <a href="www.anushaviswanathan.com">${data.websitelink}</a>
          <div class="SkillContainer">${data.skills}</div>
        `
        console.log(newlist);
        output.appendChild(newlist);

        let input=document.querySelectorAll('input');

        input.forEach(input => {
            input.value = '';
          });
    
})


