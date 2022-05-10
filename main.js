// inicializacion de variables
let nombre;
let apellido;
let edad;
let sexo;
let educacion;
let puesto;
var Empleados;
var j=0;

//inicio del programa
Empleados=prompt('¿Cuantos empleados seran registrados?');
console.log(Empleados);

function agregados (){
            var output=document.querySelector(".output");
            console.log(output);
            const data={
                nombre: document.getElementById("NAME").value,
                apellido: document.getElementById("LASTNAME").value,
                edad: document.getElementById("AGE").value,
                sexo: document.getElementById("SEX").value,
                puesto: document.getElementById("JOB").value,
                estudios: document.getElementById("STUDIES").value
            };
            
                let newlist=document.createElement('div');
                newlist.classList.add('addData');
                newlist.innerHTML=`
                <div class="NameContainer">${data.nombre}</div>
                <div class="NameContainer">${data.apellido}</div>
                <div class="NameContainer">${data.edad}</div>
                <div class="NameContainer">${data.sexo}</div>
                <div class="NameContainer">${data.puesto}</div>
                <div class="NameContainer">${data.estudios}</div>
                `
                console.log(newlist);
                output.appendChild(newlist);

                let input=document.querySelectorAll('input');

                input.forEach(input => {
                    input.value = '';
                });
}

function agregar (){
    for (let i=0 ; i<Empleados; i++ ){
        agregados()
        console.log(i)
        console.log(agregados)
    }
}