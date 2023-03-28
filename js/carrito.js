const muestraCarrito = () =>{
    modalContainer.innerHTML = ""
    modalContainer.style.display = "flex"
    const modalCarrito = document.createElement('div')
    modalCarrito.className = 'modal-headercarro'
    modalCarrito.innerHTML = `<h1 class = "modal-headercarro-title">Carrito</h1>`
    modalContainer.append(modalCarrito)

    let modalbtn = document.createElement('h1')
    modalbtn.innerText = 'X'
    modalbtn.className = 'modal-headercarro-btn'

    modalbtn.addEventListener('click',() =>{
        modalContainer.style.display = "none"
    })
    modalCarrito.append(modalbtn)

    carrito.forEach((servicio) =>{
        let carritoContenido = document.createElement('div')
        carritoContenido.className = 'carrito-content'
        carritoContenido.innerHTML = `<img src="${servicio.img}">
                                    <h3>${servicio.nombre} </h3> 
                                    <p>$${servicio.precio}</p>
                                    <span class="restar">-</span>
                                    <p>Cantidad:${servicio.cantidad}</p>
                                    <span class="sumar">+</span>
                                    <p>Total: ${servicio.cantidad * servicio.precio}</p>`;

        modalContainer.append(carritoContenido)

        let restar = carritoContenido.querySelector('.restar')
        restar.addEventListener("click", () => {
            if(servicio.cantidad !== 1){
                servicio.cantidad--;
            }
            guardarEnLocal()
            muestraCarrito()
        })

        let sumar = carritoContenido.querySelector('.sumar')
        sumar.addEventListener("click", () => {
                servicio.cantidad++;
                guardarEnLocal()
                muestraCarrito()
        })

        let eliminar = document.createElement('span')
        eliminar.innerText = '❌'
        eliminar.className = 'delete-servicio'
        carritoContenido.append(eliminar)
        eliminar.addEventListener('click',eliminarServicio)
    })

    const total = carrito.reduce((acc, el) => acc + el.precio * el.cantidad , 0)
    const totalCompra = document.createElement('div')
    totalCompra.className = 'total-content'
    totalCompra.innerHTML = `Total a pagar: ${total}`
    modalContainer.appendChild(totalCompra)
}

verCarro.addEventListener('click',muestraCarrito)

const eliminarServicio = () =>{
    const encontrarID = carrito.find((element) => element.id)

    carrito = carrito.filter((carritoID) => {
        return carritoID !== encontrarID
    })
    carritoContador()
    guardarEnLocal()
    muestraCarrito()
}


const carritoContador = () =>{
    cantidadCarrito.style.display = "block"

    const carritoLength = carrito.length

    localStorage.setItem("carritoLength", JSON.stringify(carritoLength))

    cantidadCarrito.innerText = JSON.parse(localStorage.getItem("carritoLength"))
}
carritoContador()
