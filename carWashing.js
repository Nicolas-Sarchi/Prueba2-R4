function mostarSeccion(seccionId) {
    const secciones = ['inicio', 'clientes', 'servicios', 'compra', 'fidelizacion'];
    secciones.forEach((id) => {
        const seccion = document.getElementById(id);
        if (id === seccionId) {
            seccion.style.display = 'block';
        } else {
            seccion.style.display = 'none'; 
        }
    });
}


document.querySelector("a[href='#Inicio']").addEventListener("click", () => mostarSeccion("inicio"));
document.querySelector("a[href='#Clientes']").addEventListener("click", () => mostarSeccion("clientes"));
document.querySelector("a[href='#Servicios']").addEventListener("click", () => mostarSeccion("servicios"));
document.querySelector("a[href='#Compra']").addEventListener("click", () => mostarSeccion("compra"));
document.querySelector("a[href='#Fidelizacion']").addEventListener("click", () => mostarSeccion("fidelizacion"));


mostarSeccion("inicio");

// Gestión de clientes
// Para este módulo usted deberá desarrollar una interfaz de usuario que permita registrar, modificar, listar y eliminar clientes. este módulo deberá contener un buscador que le permita encontrar clientes ya sea por su nombre, apellidos o documento de identidad; la información que se debe manejar por cada cliente es la siguiente:
//     • Número de identificación
//     • Nombres
//     • Apellidos
//     • Placa Auto
//     • Tipo (Automóvil, Camioneta, Autobús, Camión de Carga)
//     • Correo electrónico
//     • Teléfono


const clientes = [];
const formClientes = document.getElementById('agregar-cliente'),
tablaClientes = document.getElementById('tabla-clientes');

let clienteEditando = null;
let contadorId = 1

function agregarCliente (event){
    event.preventDefault();

    const id = document.getElementById('id').value,
    nombre = document.getElementById('nombre').value,
    apellido = document.getElementById('apellido').value,
    placas = document.getElementById('placas').value,
    tipo = document.getElementById('tipo').value,
    email = document.getElementById('email').value,
    telefono = document.getElementById('telefono').value;
    const cliente = {
        id,
        nombre,
        apellido,
        placas,
        tipo,
        email,
        telefono
    }
    if (clienteEditando){
        editarCliente(cliente);
        clienteEditando = null;
    }
    else{
        clientes.push(cliente);
        
    }

   
    mostrarClientes();
    actualizarSelectCliente()
    actualizarListaPuntos()
    formClientes.reset()
}


function mostrarClientes (clientesAMostrar = clientes){
    tablaClientes.innerHTML = '';

    clientesAMostrar.forEach(cliente => {
        const nuevafila = document.createElement('tr');
        nuevafila.innerHTML = `
        <td>${cliente.id}</td>
        <td>${cliente.nombre}</td>
        <td>${cliente.apellido}</td>
        <td>${cliente.placas}</td>
        <td>${cliente.tipo}</td>
        <td>${cliente.email}</td>
        <td>${cliente.telefono}</td>
        <td><button class="btn btn-danger btn-eliminar" data-id = "${cliente.id}">Eliminar</button></td>
        <td><button class="btn btn-warning btn-editar" data-id ="${cliente.id}">Editar</button></td>
        `
        const btnEliminar = nuevafila.querySelector('.btn-eliminar');
        btnEliminar.addEventListener('click', function () {
            const clienteId = btnEliminar.dataset.id;
            borrarCliente(clienteId);
        });

        const btnEditar = nuevafila.querySelector('.btn-editar');
        btnEditar.addEventListener('click', function () {
            const clienteId = btnEditar.dataset.id;
            editarClienteForm(clienteId);
        });

        tablaClientes.appendChild(nuevafila);
    })
}

function borrarCliente(clienteId){
    const indice = clientes.findIndex(cliente => cliente.id === clienteId)
    if (indice !== -1){
        clientes.splice(indice, 1);
        mostrarClientes()
        actualizarSelectCliente()
        actualizarListaPuntos()
    }
}

function editarClienteForm(clienteId){
    const cliente = clientes.find(cliente => cliente.id === clienteId);

    if (cliente){
    id = document.getElementById('id').value = cliente.id;
    nombre = document.getElementById('nombre').value = cliente.nombre;
    apellido = document.getElementById('apellido').value =cliente.apellido;
    placas = document.getElementById('placas').value = cliente.placas;
    tipo = document.getElementById('tipo').value = cliente.tipo;
    email = document.getElementById('email').value = cliente.email;
    telefono = document.getElementById('telefono').value = cliente.telefono;

    clienteEditando = cliente;
    }
}

function editarCliente(clienteEditando){
    const indice = clientes.findIndex(cliente => cliente.id === clienteEditando.id);

    if(indice !== -1){
        clientes[indice] = clienteEditando;
    }

    mostrarClientes()
    actualizarSelectCliente()
    actualizarListaPuntos()
}


function buscarCliente (){
    const busqueda = document.getElementById('buscar').value.toLowerCase();
    
    const resultadoBusqueda = clientes.filter(cliente => {
        return cliente.id.toString().includes(busqueda) || cliente.nombre.toLowerCase().includes(busqueda)||cliente.apellido.toLowerCase().includes(busqueda);
    })

    const nocoincidencias = document.getElementById('noResults')
    if(resultadoBusqueda.length == 0){
        nocoincidencias.style.display = 'block'
    } else{
        nocoincidencias.style.display = 'none'

    }

    mostrarClientes(resultadoBusqueda)

}

formClientes.addEventListener('submit', agregarCliente);



// Gestión de Servicios
// Para este módulo usted deberá crear una interfaz de usuario que le permita crear y eliminar los servicios de spa para autos que se ofrecen. La información que se maneja para cada elemento es la siguiente:
//     • ID. ese campo puede ser generado automáticamente por el sistema.
//     • Nombre del servicio
//     • Valor Servicio
//     • Descripción
//     • Puntos para fidelización
function generarIdServicios(nombreServicio) {
    const idNombreServicio = nombreServicio.substring(0, 3).toUpperCase();
    
    return idNombreServicio;
}
const servicios = [];

const formServicios = document.getElementById("agregar-servicio"),
tablaServicios = document.getElementById('tabla-servicios');



function agregarServicio(event){
    event.preventDefault();
    const sNombre = document.getElementById('nombreServicio').value,
    valor = document.getElementById('valorServicio').value,
    descripcion = document.getElementById('descripcion').value,
    puntos = document.getElementById('puntos').value,
    id = generarIdServicios(sNombre);   

    const servicio = {
        id,
        sNombre,
        valor,
        descripcion,
        puntos
    }

    servicios.push(servicio);
    formServicios.reset()

    mostrarServicios()
    actualizarSelectServicio()
    alert("Servicio Agregado Exitosamente")
}

function mostrarServicios(){
    tablaServicios.innerHTML = '';
    servicios.forEach(servicio => {
        const nuevafila = document.createElement('tr');
        nuevafila.innerHTML = `
        <td>${servicio.sNombre}</td>
        <td>${servicio.valor}</td>
        <td>${servicio.descripcion}</td>
        <td>${servicio.puntos}</td>
        <td><button class="btn btn-outline-danger fw-bold btnEliminarServicio" data-id="${servicio.id}">ELIMINAR</button></td>
        `
        const btnEliminarservicio = nuevafila.querySelector('.btnEliminarServicio');
        btnEliminarservicio.addEventListener('click', function () {
            const servicioId = btnEliminarservicio.dataset.id;
            borrarServicio(servicioId);
        });
        tablaServicios.appendChild(nuevafila);
    })

}

function borrarServicio(servicioId){
    var indice = -1;
    for(var i = 0; i < servicios.length; i++){
        if (servicios[i].id === servicioId){
            indice = i;
            break;
        }
    }

    if(indice !== -1){
        servicios.splice(indice, 1);
        mostrarServicios()
        actualizarSelectServicio()
    }
}



formServicios.addEventListener("submit", agregarServicio);



function actualizarSelectCliente (){
    const selectCliente = document.getElementById('cliente-select');
    selectCliente.innerHTML = '';

    clientes.forEach(cliente => {
        const nuevaOpcion = document.createElement('option');
        nuevaOpcion.innerText = `${cliente.nombre} - ${cliente.apellido}`
        nuevaOpcion.value = cliente.id;

        selectCliente.appendChild(nuevaOpcion);
    })
}

function actualizarSelectServicio(){
    const selectServicio = document.getElementById('servicio-select');
    selectServicio.innerHTML = '';

    servicios.forEach(servicio => {
        const nuevaOpcion = document.createElement('option');
        nuevaOpcion.innerText = `${servicio.sNombre} $${servicio.valor}`
        nuevaOpcion.value = servicio.id;

        selectServicio.appendChild(nuevaOpcion);
    })
}

function resumenCompra (event){
    event.preventDefault()
    const clienteId = document.getElementById('cliente-select').value,
    servicioId = document.getElementById('servicio-select').value;

    const cliente = clientes.find(cliente => cliente.id === clienteId),
    servicio = servicios.find(servicio => servicio.id === servicioId);
    console.log(servicio)

    const valorServicio = parseFloat(servicio.valor),
    iva = valorServicio * 0.14,
    descuento = valorServicio * 0.06,
    puntos = parseInt(servicio.puntos);

    const resumenCliente = document.getElementById('resumenCliente'),
     resumenServicio = document.getElementById('resumenServicio'),
     resumenServicioValor = document.getElementById('resumenServicioValor'),
     resumenIva = document.getElementById('resumen-iva'),
     resumenDescuento = document.getElementById('resumenDescuento'),
     resumenPuntos = document.getElementById('resumenPuntos'), 
     resumenTotal = document.getElementById('total-compra');

     resumenCliente.innerText = `${cliente.nombre} ${cliente.apellido}`;
     resumenServicio.innerText = servicio.sNombre;
     resumenServicioValor.innerText = valorServicio;
     resumenIva.innerText= iva.toFixed(2);
     resumenDescuento.innerText = descuento.toFixed(2);
     resumenPuntos.innerText = puntos;
     resumenTotal.innerText = (valorServicio + iva) - descuento;


     cliente.puntos = cliente.puntos ? cliente.puntos + puntos : puntos;
     actualizarListaPuntos();
     

}

function actualizarListaPuntos(){
    const listaPuntos = document.getElementById('puntos-lista');
    listaPuntos.innerHTML = '';

    clientes.forEach(cliente => {
        const fila = document.createElement('tr');
        fila.innerHTML = `
        <td>${cliente.nombre} ${cliente.apellido}</td>
        <td>${cliente.puntos ? cliente.puntos : 0}</td>

        `
        listaPuntos.appendChild(fila);
    })
}

document.getElementById("compra-form").addEventListener('submit', resumenCompra)
