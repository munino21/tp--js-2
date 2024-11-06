const productos = [
    { id: 1, nombre: "Producto 1", precio: 100 },
    { id: 2, nombre: "Producto 2", precio: 200 },
    { id: 3, nombre: "Producto 3", precio: 300 }
];

const productosSection = document.getElementById("productos");
const carritoLista = document.getElementById("lista-carrito");

function mostrarProductos() {
    productos.forEach(producto => {
        const div = document.createElement("div");
        div.innerHTML = `
            <h3>${producto.nombre}</h3>
            <p>Precio: $${producto.precio}</p>
            <button onclick="agregarAlCarrito(${producto.id})">Agregar al carrito</button>
        `;
        productosSection.appendChild(div);
    });
}

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

function agregarAlCarrito(id) {
    const producto = productos.find(prod => prod.id === id);
    const productoEnCarrito = carrito.find(item => item.id === id);

    if (productoEnCarrito) {
        // Si el producto ya está en el carrito, incrementa la cantidad
        productoEnCarrito.cantidad++;
    } else {
        // Si no está, agrégalo con cantidad 1
        carrito.push({ ...producto, cantidad: 1 });
    }

    mostrarCarrito();
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

function eliminarDelCarrito(id) {
    carrito = carrito.filter(producto => producto.id !== id);
    mostrarCarrito();
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

function mostrarCarrito() {
    carritoLista.innerHTML = "";
    carrito.forEach(producto => {
        const li = document.createElement("li");
        li.innerHTML = `
            ${producto.nombre} - $${producto.precio} x ${producto.cantidad}
            <button onclick="eliminarDelCarrito(${producto.id})">Eliminar</button>
        `;
        carritoLista.appendChild(li);
    });
}

mostrarProductos();
mostrarCarrito();
