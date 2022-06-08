// inicializacion de variables
let nombre;
let apellido;
let edad;
let sexo;
let educacion;
let puesto;
var Empleados=1;
var i=0;
let username__1;
let password__1;
var Empleados__1;
var modificador=1;
var save_changes=0;
var change=0;
let matrix_emplee=[];
let matrix_emplee_name=[];
let matrix_emplee_lastname=[];
let matrix_emplee_age=[];
let matrix_emplee_sex=[];
let matrix_emplee_job=[];
let matrix_emplee_study=[];
let proof_index=0;
let proof_number=0;
var contador = 0;
var Empleados=0;


//inicio del programa 
//acceso mediante contraseña

function Iniciar (){
    const userdata={
        username__1: document.getElementById("USERNAME").value,
        password__1: document.getElementById("PASSWORDS").value,
    };

    username__1=[userdata.username__1];
    password__1=[userdata.password__1];

    console.log(userdata)
    console.log(username__1)
    console.log(password__1)

    if (username__1=="Admin" && password__1=="Admin"){
        proof_index=1;
        window.location.href = "./HTML/seleccion.html";
}

else{
    Swal.fire({
        icon: 'error',
        title: 'Lo sentimos',
        text: 'Tu usuario y contraseña no coinciden',
      })
}
}


//Registro del numero de epleados a cargar
function Empleador__registro(){

    const registro__empleados={
        Empleados__1: document.getElementById("Numerodeempleados").value
    };
    console.log (Empleados__1)
    Empleados= Number([registro__empleados.Empleados__1]);
    console.log(Empleados);
    localStorage.setItem("Numerodeempleados",Empleados);

    if(Empleados>0){
        proof_number=1;
        window.location.href = "./register.html";
    }
    else{
        Swal.fire({
            icon: 'error',
            title: 'Lo sentimos',
            text: 'Debe registrar al menos un empleado nuevo',
          })
    }
}

function ir_a_registros (){
    var storedValue = localStorage.getItem("Numerodeempleados");
    Empleados=storedValue;
    console.log(Empleados)
    if(i==Empleados || Empleados==0 || Empleados==null){
        window.location.href = "./registros.html";
    }
     else{   
            Swal.fire({
            title: 'No ha ingresado a todos los empleados, desea continuar?',
            showDenyButton: true,
            confirmButtonText: 'Continuar',
            denyButtonText: `Regresar`,
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire('Redireccionando', '', 'success')
              Empleados=i;
              localStorage.setItem("Numerodeempleados",Empleados);
              window.location.href = "./registros.html";
              
            } else if (result.isDenied) {
              Swal.fire('Continue el registro', '', 'info')
            }
          })
    }
}
function Cerrar (){
    window.location.href = "../index.html";
}
function ir_a_agregar (){
    window.location.href = "./empleados.html";
}

//Ingreso de datos a partir de formulario HTML
function agregados (){
            const data={
                nombre: document.getElementById("NAME").value,
                apellido: document.getElementById("LASTNAME").value,
                edad: document.getElementById("AGE").value,
                sexo: document.getElementById("SEX").value,
                puesto: document.getElementById("JOB").value,
                estudios: document.getElementById("STUDIES").value,
                numero: i+1
            };
            const {nombre, apellido, edad, sexo, puesto, estudios}=data;

            localStorage.setItem('Datos_de_Empleados', JSON.stringify(data));
            var storedValue = localStorage.getItem("Numerocontador");
            contador=parseInt(storedValue,10);
            console.log(i);

            if(change == 0 ) {
                
                matrix_emplee_name[i]=nombre;
                matrix_emplee_lastname[i]=apellido;
                matrix_emplee_age[i]=edad;
                matrix_emplee_sex[i]=sexo;
                matrix_emplee_job[i]=puesto;
                matrix_emplee_study[i]=estudios;
            }
            else{
                matrix_emplee_name[modificador]=nombre;
                matrix_emplee_lastname[modificador]=apellido;
                matrix_emplee_age[modificador]=edad;
                matrix_emplee_sex[modificador]=sexo;
                matrix_emplee_job[modificador]=puesto;
                matrix_emplee_study[modificador]=estudios;
                i=i-1;
            }


            localStorage.setItem('matriz_empleados_nombre', JSON.stringify(matrix_emplee_name));
            localStorage.setItem('matriz_empleados_apellido', JSON.stringify(matrix_emplee_lastname));
            localStorage.setItem('matriz_empleados_edad', JSON.stringify(matrix_emplee_age));
            localStorage.setItem('matriz_empleados_sexo', JSON.stringify(matrix_emplee_sex));
            localStorage.setItem('matriz_empleados_trabajo', JSON.stringify(matrix_emplee_job));
            localStorage.setItem('matriz_empleados_estudios', JSON.stringify(matrix_emplee_study));

            if (change==1){
                ir_a_registros ()
            }
            //imprime los datos en pantalla
        //printscreen()   
            //Limpieza de datos en el formulario
                let input=document.querySelectorAll('input');
                input.forEach(input => {
                    input.value = '';
                });
                i++;
}

// Confirmacion de datos
function Confirmation() {
    const data={
        nombre: document.getElementById("NAME").value,
        apellido: document.getElementById("LASTNAME").value,
        edad: document.getElementById("AGE").value,
        sexo: document.getElementById("SEX").value,
        puesto: document.getElementById("JOB").value,
        estudios: document.getElementById("STUDIES").value,
        numero: i+1
    };
    var {nombre, apellido, edad, sexo, puesto, estudios}=data;


    Swal.fire({
        title: 'Desea guardar los datos del empleado?',
        text: "Empleado: " + nombre + ' ' + apellido + " Edad: " + edad + ' Sexo:  ' + sexo + ' Puesto: '+ puesto+ ' Estuidos: '+ estudios,
        showDenyButton: true,
        confirmButtonText: 'Guardar',
        denyButtonText: `Corregir`,
      }).then((result) => {
        if (result.isConfirmed) {
        contador=i;
        localStorage.setItem("Numerocontador",contador);
        change=0;
        localStorage.setItem('cambios', JSON.stringify(change));

          agregados()
          
        } else if (result.isDenied) {
          Swal.fire('Modifique los Datos', '', 'info')
        }
      })

}

//Funcion encargada de imprimir los datos en pantalla
function printscreen (){
    var storedValue = localStorage.getItem("Numerodeempleados");
    Empleados=storedValue;
    console.log(i)
    console.log(Empleados)
    if (Empleados==0 || Empleados==null){
        Swal.fire({
            title: 'Aun no ha registrado ningun empleado',
          })
    }

    var storedValue = localStorage.getItem("Numerodeempleados");
    Empleados=storedValue;

    var output=document.querySelector(".output");
    matrix_emplee_name = JSON.parse(localStorage.getItem('matriz_empleados_nombre'));
    matrix_emplee_lastname=JSON.parse(localStorage.getItem('matriz_empleados_apellido'));
    matrix_emplee_age=JSON.parse(localStorage.getItem('matriz_empleados_edad'));
    matrix_emplee_sex=JSON.parse(localStorage.getItem('matriz_empleados_sexo'));
    matrix_emplee_job=JSON.parse(localStorage.getItem('matriz_empleados_trabajo'));
    matrix_emplee_study=JSON.parse(localStorage.getItem('matriz_empleados_estudios'));
    output.innerHTML = '';
     for (let j=0; j<Empleados; j++ ) {

        const data={
            nombre: matrix_emplee_name[j],
            apellido: matrix_emplee_lastname[j],
            edad: matrix_emplee_age[j],
            sexo: matrix_emplee_sex[j],
            puesto: matrix_emplee_job[j],
            estudios: matrix_emplee_study[j],
            numero: j+1,
        };
        const {nombre, apellido, edad, sexo, puesto, estudios, numero}=data;
                let newlist=document.createElement('div');
                newlist.classList.add('Empleados__CSS');
                newlist.innerHTML=` 
                <div class = "textformat">${nombre}</div>
                <div class = "textformat">${apellido}</div>
                <div class = "textformat">${edad}</div>
                <div class = "textformat">${sexo}</div>
                <div class = "textformat">${puesto}</div>
                <div class = "textformat"${estudios}</div>
                <div class = "textformat">${numero}</div>
                `
                output.appendChild(newlist);
        }
}



//Funcion que impide que se caregen datos de forma indefinida, la limita a la cantidad de empleados previamente cargados a sistema
function agregar (){
    var storedValue = localStorage.getItem("Numerodeempleados");
    Empleados=storedValue;
    console.log(Empleados)

    var storedValue = localStorage.getItem("cambios");
    change=parseInt(storedValue,10);


        if (i<Empleados||change==1){
            
            localStorage.setItem('cambios', JSON.stringify(change));
            Confirmation()    
            //agregados()
        }
        else{
            Swal.fire({
                icon: 'error',
                title: 'Lo sentimos',
                text: 'Ya ha registrado a todos los empleados solicitados'

              })

              
        }
}
//redireccion a modificador
function Modificar__Datos(){
    var storedValue = localStorage.getItem("Numerodeempleados");
    Empleados=storedValue;
    console.log(Empleados)
    if (Empleados==0 || Empleados==null){
        Swal.fire({
            icon: 'error',
            title: 'Lo sentimos',
            text: 'No puede modificar un empleado inexistente',
          })
    }
    else{
    window.location.href = "./modification.html";
    }
}

//Funcion para la edicion de datos 
function changesupdate(){
    var storedValue = localStorage.getItem("Numerodeempleados");
    Empleados=storedValue;
    data = localStorage.getItem('Datos_de_Empleados');
    console.log(data);
    data = JSON.parse(data);
    console.log(data);
    matrix_emplee_name=JSON.parse(localStorage.getItem('matriz_empleados_nombre'));
    i=matrix_emplee_name.length
    console.log(i)
    let comprobador=0;
    while ( comprobador==0){
            modificador=prompt('¿Que numero de empleado desea modificiar?');
            console.log(modificador)
            console.log(Empleados)
        
            if (modificador <= Empleados ) {
            
                modificador=modificador-1;
                matrix_emplee_name=JSON.parse(localStorage.getItem('matriz_empleados_nombre'));
                matrix_emplee_lastname=JSON.parse(localStorage.getItem('matriz_empleados_apellido'));
                matrix_emplee_age=JSON.parse(localStorage.getItem('matriz_empleados_edad'));
                matrix_emplee_sex=JSON.parse(localStorage.getItem('matriz_empleados_sexo'));
                matrix_emplee_job=JSON.parse(localStorage.getItem('matriz_empleados_trabajo'));
                matrix_emplee_study=JSON.parse(localStorage.getItem('matriz_empleados_estudios'));

                document.getElementById("NAME").value =
                document.getElementById("NAME").defaultValue = matrix_emplee_name[modificador];

                document.getElementById("LASTNAME").value =
                document.getElementById("LASTNAME").defaultValue = matrix_emplee_lastname[modificador];

                document.getElementById("AGE").value =
                document.getElementById("AGE").defaultValue = matrix_emplee_age[modificador];

                document.getElementById("SEX").value =
                document.getElementById("SEX").defaultValue = matrix_emplee_sex[modificador];

                document.getElementById("JOB").value =
                document.getElementById("JOB").defaultValue = matrix_emplee_job[modificador];

                document.getElementById("STUDIES").value =
                document.getElementById("STUDIES").defaultValue = matrix_emplee_study[modificador];

                change=1;
        
                localStorage.setItem('cambios', JSON.stringify(change));
                comprobador=1;
            }

        else{
            Swal.fire({
                icon: 'error',
                title: 'Lo sentimos',
                text: 'El empleado no se encuentra registrado',
            })
            }

    }
 
}



