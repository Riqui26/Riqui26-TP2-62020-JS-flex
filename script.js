let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

// Elementos del DOM
const listaProductos = document.querySelector('.lista-productos');
const listaCarrito = document.querySelector('.lista-carrito');
const botonVaciarCarrito = document.querySelector('.vaciar-carrito');

//  mostrar productos disponibles
function mostrarProductos() {
    listaProductos.innerHTML = '';
    productosDisponibles.forEach((producto) => {
        const li = document.createElement('li');

        const detallesDiv = document.createElement('div');
        detallesDiv.classList.add('producto-detalles');

        const nombreSpan = document.createElement('span');
        nombreSpan.textContent = producto.nombre;
        detallesDiv.appendChild(nombreSpan);

        const precioSpan = document.createElement('span');
        precioSpan.classList.add('producto-precio');
        precioSpan.textContent = `$${producto.precio}`;
        detallesDiv.appendChild(precioSpan);

        const categoriaSpan = document.createElement('span');
        categoriaSpan.classList.add('producto-categoria');
        categoriaSpan.textContent = `(${producto.categoria})`;
        detallesDiv.appendChild(categoriaSpan);

        const stockSpan = document.createElement('span');
        stockSpan.classList.add('producto-stock');
        stockSpan.textContent = `Stock: ${producto.stock}`;
        detallesDiv.appendChild(stockSpan);

        li.appendChild(detallesDiv);

        // Boton agregar al carrito
        const botonAgregar = document.createElement('button');
        botonAgregar.textContent = 'Agregar al carrito';
        botonAgregar.addEventListener('click', () => agregarProducto(producto.id));
        li.appendChild(botonAgregar);

        listaProductos.appendChild(li);
    });
}

// mostrar carrito de compras
function mostrarCarrito() {
    listaCarrito.innerHTML = '';
    carrito.forEach((producto, index) => {
        const li = document.createElement('li');

        const detallesDiv = document.createElement('div');
        detallesDiv.classList.add('producto-detalles');

        const nombreSpan = document.createElement('span');
        nombreSpan.textContent = producto.nombre;
        detallesDiv.appendChild(nombreSpan);

        const precioSpan = document.createElement('span');
        precioSpan.classList.add('producto-precio');
        precioSpan.textContent = `$${producto.precio}`;
        detallesDiv.appendChild(precioSpan);

        li.appendChild(detallesDiv);

        const botonQuitar = document.createElement('button');
        botonQuitar.textContent = 'Quitar';
        botonQuitar.addEventListener('click', () => quitarProducto(index));
        li.appendChild(botonQuitar);

        listaCarrito.appendChild(li);
    });
}

// agregar producto al carrito
function agregarProducto(id) {
    const producto = productosDisponibles.find(prod => prod.id === id);
    if (producto && producto.stock > 0) {
        carrito.push(producto);
        producto.stock--;
        actualizarCarrito();
    } else {
        alert('Producto sin stock disponible');
    }
}

// quitar producto del carrito
function quitarProducto(index) {
    const producto = carrito[index];
    carrito.splice(index, 1);
    const productoOriginal = productosDisponibles.find(prod => prod.id === producto.id);
    if (productoOriginal) {
        productoOriginal.stock++;
    }
    actualizarCarrito();
}

// actualizar carrito en el DOM y localStorage
function actualizarCarrito() {
    mostrarCarrito();
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

// Evento vaciar carrito
botonVaciarCarrito.addEventListener('click', () => {
    carrito.forEach(producto => {
        const productoOriginal = productosDisponibles.find(prod => prod.id === producto.id);
        if (productoOriginal) {
            productoOriginal.stock++;
        }
    });
    carrito = [];
    actualizarCarrito();
});

// Mostrar productos y carrito
mostrarProductos();
mostrarCarrito();
