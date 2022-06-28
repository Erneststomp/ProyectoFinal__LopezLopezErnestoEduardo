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
var primero;

//inicio del programa 
//acceso mediante contraseña

var btnIniciar = document.getElementById("BtnIniciar");
if (btnIniciar != null) {
    document.getElementById("BtnIniciar").addEventListener("click", Iniciar);
}

function Iniciar (){
    const userdata={
        username__1: document.getElementById("USERNAME").value,
        password__1: document.getElementById("PASSWORDS").value,
    };
    username__1=[userdata.username__1];
    password__1=[userdata.password__1];


    if (username__1=="Admin" && password__1=="Admin"){
        proof_index=1;
        localStorage.setItem("proof__index",proof_index);
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

    var storedValue = localStorage.getItem("proof__index");
    proof_index=storedValue;
    if (proof_index==0 || proof_index==null){
        Swal.fire({
            icon: 'error',
            title: 'Inicie sesion',
          }).then(function() {
            primero=0;
            localStorage.setItem('primero',primero)
            window.location.href = "../index.html";
        });
    }
}

//funcion que dirige al historial de empleados, verifica que se haya registrado algun empleado 
var btnRegistros = document.getElementById("BtnRegistros");
if (btnRegistros != null) {
    btnRegistros = document.getElementById("BtnRegistros").addEventListener("click", ir_a_registros);
}
function ir_a_registros (){
    var storedValue003 = localStorage.getItem("Numerodeempleadosnuevos");
    Empleados__1=parseInt(storedValue003,10);
   
    lecturadeempleados()
    lecturadei()

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
var btnSalir = document.getElementById("BtnSalir");
if (btnSalir != null) {
    btnSalir = document.getElementById("BtnSalir").addEventListener("click", Cerrar);
}

function Cerrar (){
    window.location.href = "../index.html";
}
//Registro del numero de epleados a cargar
var btnAgregar = document.getElementById("BtnAgregar");
if (btnAgregar != null) {
    document.getElementById("BtnAgregar").addEventListener("click", ir_a_agregar);
}
function ir_a_agregar (){
    Swal.fire({
        text: '¿Cuantos empleados quiere registrar?',
        input: 'number'
      }).then(function(result) {
        if (result.value) {
        
          const  Empleados__1= result.value
          localStorage.setItem("Numerodeempleadosnuevos",Empleados__1);
          lecturadeempleados()
          var totalempelados=0;
          totalempelados = Number(Empleados__1)+Number(Empleados);
          localStorage.setItem("totalempelados",totalempelados);
          
          if(Empleados__1>0){
              proof_number=1;
              contador=0;
              localStorage.setItem("contador",contador);
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

    LecturadeDatos()
    lecturadei()
    validacioninicial()
    leermodificador ()

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
                localStorage.setItem("contador",contador);
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
                localStorage.setItem("i",i);
            }


            var storedValue002 = localStorage.getItem("totalempelados");
            totalempelados=parseInt(storedValue002,10);
            
            if(i==totalempelados){
                ir_a_registros ()
            }
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
            if (matrix_emplee_name[j]!=''){
                const {nombre, apellido, edad, sexo, puesto, estudios, numero}=data;
                        let newlist=document.createElement('div');
                        newlist.classList.add('Empleados__CSS');
                        newlist.innerHTML=` 
                        <div class = "textcontainer">
                            <div class = "textformat">Nombre: ${nombre}</div>
                            <div class = "textformat">Apellidos: ${apellido}</div>
                            <div class = "textformat">Edad: ${edad}</div>
                            <div class = "textformat">Genero: ${sexo}</div>
                            <div class = "textformat">Puesto de Trabajo: ${puesto}</div>
                            <div class = "textformat">Formacion Academica: ${estudios}</div>
                            <div class = "textformat">Numero de Empleado: ${numero}</div>
                        </div>

                        `
                        output.appendChild(newlist);
            }
        }
}

//Funcion que impide que se caregen datos de forma indefinida, la limita a la cantidad de empleados previamente cargados a sistema
var btnAgregar2 = document.getElementById("BtnAgregar2");
if (btnAgregar2 != null) {
    btnAgregar2 = document.getElementById("BtnAgregar2").addEventListener("click", agregar);
}
function agregar (){  

    console.log(document.getElementById("STUDIES").value)
    if (document.getElementById("NAME").value!=""&&document.getElementById("LASTNAME").value!=""&&document.getElementById("AGE").value!=""&&document.getElementById("JOB").value!=""&&document.getElementById("STUDIES").value!=""){
      
        lecturadeempleados()
        var storedValue3 = localStorage.getItem("Numerodeempleadosnuevos");
        Empleados__1=parseInt(storedValue3,10);

        var storedValue11 = localStorage.getItem("contador");
        contador=parseInt(storedValue11,10); 

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
    }else{
        Swal.fire({
            icon: 'error',
            title: 'Lo sentimos',
            text: 'Ingrese los campos obligatorios'
        })
    }
}

//redireccion a modificador

var btnModificar = document.getElementById("BtnModificar");
if (btnModificar != null) {
    document.getElementById("BtnModificar").addEventListener("click",Modificar__Datos);
}
function Modificar__Datos(){
    lecturadeempleados()
    
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
    LecturadeDatos()
    data = localStorage.getItem('Datos_de_Empleados');
    data = JSON.parse(data);
    matrix_emplee_name=JSON.parse(localStorage.getItem('matriz_empleados_nombre'));
    i=matrix_emplee_name.length;
    change=-1;
    localStorage.setItem('cambios', JSON.stringify(change));
        Swal.fire({
            text: '¿Que numero de empleado desea modificiar?',
            input: 'number'
          }).then(function(result) {
 
            if (result.isConfirmed) {
                let  modificador= result.value
                if(modificador==undefined||modificador==null||modificador==NaN||modificador==''){modificador=-1;}
                if (modificador <= Empleados && modificador>=0 && matrix_emplee_name[modificador]!='') {
                    modificador=modificador-1;
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
    Empleados++;
    if(change==1){ Empleados=Empleados-1;}
    localStorage.setItem('Numerodeempleados',Empleados)
}
function EliminarDatos() {

    localStorage.setItem('matriz_empleados_nombre', JSON.stringify(matrix_emplee_name));
    localStorage.setItem('matriz_empleados_apellido', JSON.stringify(matrix_emplee_lastname));
    localStorage.setItem('matriz_empleados_edad', JSON.stringify(matrix_emplee_age));
    localStorage.setItem('matriz_empleados_sexo', JSON.stringify(matrix_emplee_sex));
    localStorage.setItem('matriz_empleados_trabajo', JSON.stringify(matrix_emplee_job));
    localStorage.setItem('matriz_empleados_estudios', JSON.stringify(matrix_emplee_study));
    localStorage.setItem('Numerodeempleados',Empleados)
    location.reload();
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
        i=0;}
    else{
        i=parseInt(storedValue,10);}
}

function lecturadeempleados(){
    var storedValue2 = localStorage.getItem("Numerodeempleados");
    if (storedValue2=='NaN' || storedValue2==null || storedValue2==undefined || storedValue2==NaN || storedValue2=='null'){
        Empleados=0;
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

var btnRegresar = document.getElementById("BtnRegresar");
if (btnRegresar != null) {
    document.getElementById("BtnRegresar").addEventListener("click", Volver);
}

function Volver(){
    window.history.back();
}

var btnRegresar1 = document.getElementById("BtnRegresar1");
if (btnRegresar1 != null) {
    document.getElementById("BtnRegresar1").addEventListener("click", Volver1);
}
function Volver1(){
    window.location.href = "./seleccion.html";
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


function primercarga(){
    if(primero==0){
    primero=primero+1;
    localStorage.setItem('primero',primero)}
}
var btnEliminar = document.getElementById("BtnEliminar");
if (btnEliminar != null) {
    document.getElementById("BtnEliminar").addEventListener("click", ir_a_eliminar);
}
function ir_a_eliminar(){
    lecturadeempleados()
   if(Empleados!=0){
        Swal.fire({
            text: '¿Que numero de empleado desea Eliminar?',
            input: 'number'
        }).then(function(result) {
        
        if (result.isConfirmed) {
            let  eliminador= result.value
            eliminador=eliminador-1;
             LecturadeDatos()
            console.log( matrix_emplee_name[eliminador])
            if (eliminador < Empleados && eliminador>=0 && eliminador>1) {
                if (matrix_emplee_name[eliminador]!=''){
                    Swal.fire({
                        title: 'Seguro que desea eliminar al empleado?',
                        text: "Empleado: " +  matrix_emplee_name[eliminador] + ' ' + matrix_emplee_lastname[eliminador] + ' Puesto: '+ matrix_emplee_job[eliminador],
                        showDenyButton: true,
                        confirmButtonText: 'Eliminar',
                        denyButtonText: `Cancelar`,
                    }).then((result) => {
                        if (result.isConfirmed) {
                            matrix_emplee_name[eliminador]='';
                            matrix_emplee_lastname[eliminador]='';
                            matrix_emplee_age[eliminador]='';
                            matrix_emplee_sex[eliminador]='';
                            matrix_emplee_job[eliminador]='';
                            matrix_emplee_study[eliminador]='';
                            EliminarDatos()
                        } else if (result.isDenied) {
                        Swal.fire('No se elimino al empleado', eliminador, 'info')
                        }
                    })}
                    else{
                        Swal.fire({
                            icon: 'error',
                            title: 'Lo sentimos',
                            text: 'El empleado no se encuentra registrado o ya ha sido dado de baja',
                        }).then((result) => {
                            if (result.isConfirmed) {
                                location.reload();
                            }
                        })

                    }
            }
            else if(eliminador ==1 || eliminador==0){
                Swal.fire({
                    icon: 'error',
                    title: 'Lo sentimos',
                    text: 'No puede eliminar a este empleado',
                })

            } 
        else{
            Swal.fire({
                icon: 'error',
                title: 'Lo sentimos',
                text: 'El empleado no se encuentra registrado',
            }).then((result) => {
                if (result.isConfirmed) {
                    location.reload();
                }
            })
            }
        } 
      })
    }else{
        Swal.fire({
            icon: 'error',
            title: 'Lo sentimos',
            text: 'No hay empleados que eliminar',
        }).then((result) => {
            if (result.isConfirmed) {
            }
        })
    }

}


// carga de datos de json con fetch()
function cargardatosiniciales(){
    var storedValue001 = localStorage.getItem("primero");
    primero=parseInt(storedValue001,10);
    Empleados=0;
    i=0;
    fetch('http://127.0.0.1:5500/JS/default.json') 
    .then(respuesta => respuesta.json())
    .then(usuarios => {
        usuarios.forEach(usuarios =>
            {
                data={
                            nombre: usuarios.name,
                            apellido: usuarios.lastName,
                            edad: usuarios.age,
                            sexo: usuarios.gender,
                            puesto: usuarios.job,
                            estudios: usuarios.studies,
                            numero: usuarios.numero
                            }
                            const {nombre, apellido, edad, sexo, puesto, estudios}=data;
                            matrix_emplee_name[usuarios.numero-1]=nombre;
                                matrix_emplee_lastname[usuarios.numero-1]=apellido;
                                matrix_emplee_age[usuarios.numero-1]=edad;
                                matrix_emplee_sex[usuarios.numero-1]=sexo;
                                matrix_emplee_job[usuarios.numero-1]=puesto;
                                matrix_emplee_study[usuarios.numero-1]=estudios;
                        localStorage.setItem('Datos_de_Empleados', JSON.stringify(data))
                        
                        if(primero==0||primero=='0'){
                            
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
                            }
            })
            primercarga()}
    )
    
}
