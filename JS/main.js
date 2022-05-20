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
var change;
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
        window.location.href = "./HTML/empleados.html";
}

else{
    alert('Lo sentimos, el usuario y contraseña no coinciden');
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
    window.location.href = "./register.html";
}


//Ingreso de datos a partir de formulario HTML
function agregados (){
            var output=document.querySelector(".output");
            console.log(Empleados);
            const data={
                nombre: document.getElementById("NAME").value,
                apellido: document.getElementById("LASTNAME").value,
                edad: document.getElementById("AGE").value,
                sexo: document.getElementById("SEX").value,
                puesto: document.getElementById("JOB").value,
                estudios: document.getElementById("STUDIES").value,
                numero: i+1
            };
            console.log(data);
            localStorage.setItem('Datos_de_Empleados', JSON.stringify(data));

            //imprime los datos en pantalla
                let newlist=document.createElement('div');
                newlist.classList.add('Empleados__CSS');
                newlist.innerHTML=`
                <div>${data.nombre}</div>
                <div>${data.apellido}</div>
                <div>${data.edad}</div>
                <div>${data.sexo}</div>
                <div>${data.puesto}</div>
                <div>${data.estudios}</div>
                <div>${data.numero}</div>
                `
                output.appendChild(newlist);
    //Limpieza de datos en el formulario
                let input=document.querySelectorAll('input');
                input.forEach(input => {
                    input.value = '';
                });
                i=i+1;
}

//Funcion que impide que se caregen datos de forma indefinida, la limita a la cantidad de empleados previamente cargados a sistema
function agregar (){
    var storedValue = localStorage.getItem("Numerodeempleados");
    Empleados=storedValue;
    console.log(Empleados)
        if (i<Empleados){
                agregados()
        }
        else{
            alert('ya no puede registrar a mas empleados');
        }
}


//Funcion para la edicion de datos DE MOMENTO NO HACE NADA!!!
function Modificar__Datos(){
    data = localStorage.getItem('Datos_de_Empleados');
    console.log(data);
    data = JSON.parse(data);
    console.log(data);
    modificador=prompt('¿Que numero de empleado buscas modificiar? (de momento solo se guarda un empleado en memoria por tanto solo se modifica el 1 o en caso de que guarde muchos, solo se modificara el ultimo)');
    modificador=1;
    change=prompt('Digite el dato que desea modificar: 1) Nombre 2) Apellido 3) Edad 4) Sexo 5)Educacion 6)Puesto');
    
    
}

