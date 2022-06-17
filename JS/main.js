// inicializacion de variables
let nombre;
let apellido;
let edad;
let sexo;
let educacion;
let puesto;
var i=0;
let username__1;
let password__1;
var Empleados__1;
var modificador;
var save_changes=0;
var change='';
var contador=0;
let matrix_emplee=[];
let matrix_emplee_name=[];
let matrix_emplee_lastname=[];
let matrix_emplee_age=[];
let matrix_emplee_sex=[];
let matrix_emplee_job=[];
let matrix_emplee_study=[];
let proof_index=0;
let proof_number=0;
let initialdata=0;
var primero=0;

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
        localStorage.setItem("proof__index",proof_index);
        console.log(proof_index)
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

function comprobation__index(){
    console.log(proof_index)
    var storedValue = localStorage.getItem("proof__index");
    proof_index=storedValue;
    if (proof_index==0 || proof_index==null){
        Swal.fire({
            icon: 'error',
            title: 'Inicie sesion',
          }).then(function() {
            window.location.href = "../index.html";
        });
    }
}

//funcion que dirige al historial de empleados, verifica que se haya registrado algun empleado 
function ir_a_registros (){
    var storedValue = localStorage.getItem("Numerodeempleadosnuevos");
    Empleados__1=parseInt(storedValue,10);
   
    lecturadeempleados()
    lecturadei()
    console.log(Empleados)
    
    console.log(Empleados__1)
    if(i==Empleados|| Empleados==0 || Empleados==null || Empleados==NaN|| Empleados==undefined || Empleados=='NaN'|| Empleados=='undefined'){
        localStorage.setItem("Numerodeempleados",Empleados);
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
              Empleados__1=i;
              localStorage.setItem("Numerodeempleados",Empleados__1);
              window.location.href = "./registros.html";
              
            } else if (result.isDenied) {
              Swal.fire('Continue el registro', '', 'info')
            }
          })
    }
}
//redireccion a pagina de inicio se sesion
function Cerrar (){
    window.location.href = "../index.html";
}
//Registro del numero de epleados a cargar
function ir_a_agregar (){
    Swal.fire({
        text: '¿Cuantos empleados quiere registrar?',
        input: 'number'
      }).then(function(result) {
        if (result.value) {
          const  Empleados__1= result.value
          localStorage.setItem("Numerodeempleadosnuevos",Empleados__1);
          if(Empleados__1>0){
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
    });
}

//Ingreso de datos a partir de formulario HTML
function agregados (){
    console.log(change)
    LecturadeDatos()
    lecturadei()
    validacioninicial()
    leermodificador ()
    console.log(modificador)
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

            console.log(i);
            console.log(modificador)
            if(change == 1) {
                matrix_emplee_name[modificador]=nombre;
                matrix_emplee_lastname[modificador]=apellido;
                matrix_emplee_age[modificador]=edad;
                matrix_emplee_sex[modificador]=sexo;
                matrix_emplee_job[modificador]=puesto;
                matrix_emplee_study[modificador]=estudios;
                i=i-1;
                modificador=-1;
                localStorage.setItem('modificador',modificador)
            }
            else{
                matrix_emplee_name[i]=nombre;
                matrix_emplee_lastname[i]=apellido;
                matrix_emplee_age[i]=edad;
                matrix_emplee_sex[i]=sexo;
                matrix_emplee_job[i]=puesto;
                matrix_emplee_study[i]=estudios;
                contador++
            }
                 
            GuardarDatos()
            if (change==1){
                change=0;
                localStorage.setItem('cambios', JSON.stringify(change));
                ir_a_registros ()
            }else{
            //Limpieza de datos en el formulario
                let input=document.querySelectorAll('input');
                input.forEach(input => {
                    input.value = '';
                });
                i++;
                localStorage.setItem("i",i);}
}

// Confirmacion de datos
function Confirmation() {
    console.log(change)
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

    leermodificador()
    if (modificador>=0 || change==1){
        
        Swal.fire({
            title: 'Desea guardar los datos del empleado?',
            text: "Empleado: " + nombre + ' ' + apellido + " Edad: " + edad + ' Sexo:  ' + sexo + ' Puesto: '+ puesto+ ' Estuidos: '+ estudios,
            showDenyButton: true,
            confirmButtonText: 'Guardar',
            denyButtonText: `Corregir`,
        }).then((result) => {
            if (result.isConfirmed) {
    
            agregados()
            
            } else if (result.isDenied) {
            Swal.fire('Modifique los Datos', '', 'info')
            }
        })
    }else if (change==-1){
        location.reload();
    }else{
        Swal.fire({
            title: 'Desea guardar los datos del empleado?',
            text: "Empleado: " + nombre + ' ' + apellido + " Edad: " + edad + ' Sexo:  ' + sexo + ' Puesto: '+ puesto+ ' Estuidos: '+ estudios,
            showDenyButton: true,
            confirmButtonText: 'Guardar',
            denyButtonText: `Corregir`,
        }).then((result) => {
            if (result.isConfirmed) {
            agregados()
            } else if (result.isDenied) {
            Swal.fire('Modifique los Datos', '', 'info')
            }
        })
    }
}

//Funcion encargada de imprimir los datos en pantalla
function printscreen (){
    lecturadeempleados()

    if (Empleados==0 || Empleados==null){
        Swal.fire({
            title: 'Aun no ha registrado ningun empleado',
          })
    }

    var output=document.querySelector(".output");
    LecturadeDatos()
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
                <div class = "textformat">${estudios}</div>
                <div class = "textformat">${numero}</div>
                `
                output.appendChild(newlist);
        }
}

//Funcion que impide que se caregen datos de forma indefinida, la limita a la cantidad de empleados previamente cargados a sistema
function agregar (){    
    lecturadeempleados()
    var storedValue3 = localStorage.getItem("Numerodeempleadosnuevos");
    Empleados__1=parseInt(storedValue3,10);

    var storedValue4 = localStorage.getItem("cambios");
    change=parseInt(storedValue4,10);
    localStorage.setItem("Numerodeempleados",Empleados);
    lecturadei()

        if (contador<Empleados__1||change==1){
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
    lecturadeempleados()
    console.log(Empleados)
    if (Empleados==0 || Empleados==null || Empleados==NaN|| Empleados==undefined){
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
    lecturadeempleados()
    data = localStorage.getItem('Datos_de_Empleados');
    console.log(data);
    data = JSON.parse(data);
    console.log(data);
    matrix_emplee_name=JSON.parse(localStorage.getItem('matriz_empleados_nombre'));
    i=matrix_emplee_name.length;
    console.log(i)
    change=-1;
    localStorage.setItem('cambios', JSON.stringify(change));
        Swal.fire({
            text: '¿Que numero de empleado desea modificiar?',
            input: 'number'
          }).then(function(result) {
 
            if (result.isConfirmed) {
                let  modificador= result.value
                console.log(modificador)
                if(modificador==undefined||modificador==null||modificador==NaN||modificador==''){modificador=-1;}
                if (modificador <= Empleados && modificador>=0) {
                    console.log(modificador)
                    modificador=modificador-1;
                    console.log(modificador)
                    localStorage.setItem('modificador',modificador)
                    LecturadeDatos()
    
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
                } 
            else{
                Swal.fire({
                    icon: 'error',
                    title: 'Lo sentimos',
                    text: 'El empleado no se encuentra registrado, intente otro',
                }).then((result) => {
                    if (result.isConfirmed) {
                        location.reload();
                    }
                })
                }
            } 
          })
}


function GuardarDatos() {

    localStorage.setItem('matriz_empleados_nombre', JSON.stringify(matrix_emplee_name));
    localStorage.setItem('matriz_empleados_apellido', JSON.stringify(matrix_emplee_lastname));
    localStorage.setItem('matriz_empleados_edad', JSON.stringify(matrix_emplee_age));
    localStorage.setItem('matriz_empleados_sexo', JSON.stringify(matrix_emplee_sex));
    localStorage.setItem('matriz_empleados_trabajo', JSON.stringify(matrix_emplee_job));
    localStorage.setItem('matriz_empleados_estudios', JSON.stringify(matrix_emplee_study));
    console.log(Empleados)
    Empleados++;
    if(change==1){ Empleados=Empleados-1;}
    console.log(Empleados)
    localStorage.setItem('Numerodeempleados',Empleados)
}

function LecturadeDatos(){
    matrix_emplee_name=JSON.parse(localStorage.getItem('matriz_empleados_nombre'));
    matrix_emplee_lastname=JSON.parse(localStorage.getItem('matriz_empleados_apellido'));
    matrix_emplee_age=JSON.parse(localStorage.getItem('matriz_empleados_edad'));
    matrix_emplee_sex=JSON.parse(localStorage.getItem('matriz_empleados_sexo'));
    matrix_emplee_job=JSON.parse(localStorage.getItem('matriz_empleados_trabajo'));
    matrix_emplee_study=JSON.parse(localStorage.getItem('matriz_empleados_estudios'));
}

function lecturadei(){
    var storedValue = localStorage.getItem("i");
    if (storedValue=='NaN' || storedValue==null || storedValue==undefined){
        i=0;
        console.log(i)}
    else{
        i=parseInt(storedValue,10);}
}

function lecturadeempleados(){
    var storedValue2 = localStorage.getItem("Numerodeempleados");
    if (storedValue2=='NaN' || storedValue2==null || storedValue2==undefined || storedValue2==NaN || storedValue2=='null'){
        Empleados=0;
        console.log(Empleados)
    }
    else{
        Empleados=parseInt(storedValue2,10);
    }
}

function validacioninicial(){
    if (matrix_emplee_name==null||matrix_emplee_name==NaN||matrix_emplee_name==undefined){
        matrix_emplee_name=[];
    }
    if (matrix_emplee_lastname==null||matrix_emplee_lastname==NaN||matrix_emplee_lastname==undefined){
        matrix_emplee_lastname=[];
    }
    if (matrix_emplee_age==null||matrix_emplee_age==NaN||matrix_emplee_age==undefined){
        matrix_emplee_age=[];
    }
    if (matrix_emplee_job==null||matrix_emplee_job==NaN||matrix_emplee_job==undefined){
        matrix_emplee_job=[];
    }
    if (matrix_emplee_sex==null||matrix_emplee_sex==NaN||matrix_emplee_sex==undefined){
        matrix_emplee_sex=[];
    }
    if (matrix_emplee_study==null||matrix_emplee_study==NaN||matrix_emplee_study==undefined){
        matrix_emplee_study=[];
    }
}
function Volver(){
    window.history.back();
}

function leermodificador (){
    var storedValue10 = localStorage.getItem("modificador");
    if (storedValue10=='NaN' || storedValue10==null || storedValue10==undefined || storedValue10==NaN || storedValue10=='null'){
        modificador=-1;
    }
    else{
        modificador=parseInt(storedValue10,10);
    }
}



function iniciacion(){
    change=0;
    localStorage.setItem('cambios', JSON.stringify(change));
}


// carga de datos de json con fetch()
function cargardatosiniciales(){
    Empleados=0;
    i=0;
    fetch('http://127.0.0.1:5500/JS/default.json')
    .then(respuesta => respuesta.json())
    .then(usuarios => { console.log(usuarios)
        usuarios.forEach(usuarios =>
            {
                console.log(initialdata)
                data={
                            nombre: usuarios.name,
                            apellido: usuarios.lastName,
                            edad: usuarios.age,
                            sexo: usuarios.gender,
                            puesto: usuarios.job,
                            estudios: usuarios.studies,
                            numero: usuarios.numero
                            },
                            console.log(data)
                            const {nombre, apellido, edad, sexo, puesto, estudios}=data;
                            matrix_emplee_name[usuarios.numero-1]=nombre;
                                matrix_emplee_lastname[usuarios.numero-1]=apellido;
                                matrix_emplee_age[usuarios.numero-1]=edad;
                                matrix_emplee_sex[usuarios.numero-1]=sexo;
                                matrix_emplee_job[usuarios.numero-1]=puesto;
                                matrix_emplee_study[usuarios.numero-1]=estudios;
                        localStorage.setItem('Datos_de_Empleados', JSON.stringify(data))
                        GuardarDatos2()
            })
        }
    )
}

function GuardarDatos2() {
    if(primero==0){
    localStorage.setItem('matriz_empleados_nombre', JSON.stringify(matrix_emplee_name));
    localStorage.setItem('matriz_empleados_apellido', JSON.stringify(matrix_emplee_lastname));
    localStorage.setItem('matriz_empleados_edad', JSON.stringify(matrix_emplee_age));
    localStorage.setItem('matriz_empleados_sexo', JSON.stringify(matrix_emplee_sex));
    localStorage.setItem('matriz_empleados_trabajo', JSON.stringify(matrix_emplee_job));
    localStorage.setItem('matriz_empleados_estudios', JSON.stringify(matrix_emplee_study));
    Empleados++
    localStorage.setItem('Numerodeempleados',Empleados)
    i++;
    localStorage.setItem("i",i);
}}
function primercarga(){
    console.log('primero')
    console.log(primero)
    primero=primero+1;
    console.log(primero)
}