const pantalla = document.getElementById('pantalla');
const resultado = document.getElementById('resultado');
const btnPagar = document.getElementById('btn-pagar');
const btnReset = document.getElementById('btn-reset');
const divFaltante = document.getElementById('faltante');

let idProducto;
let faltante = 0;
let pagoNumber = 0;
let totalApagar = 0;

const productos = [{
  id: '1',
  nombre: 'Gaseosa Cola Pepsi en Lata 354 ml',
  precio: 900,
  cantidad: 0,
},
{
  id: '2',
  nombre: 'Gaseosa 7up en Lata 354 ml',
  precio: 500,
  cantidad: 0,
},
{
  id: '3',
  nombre: 'Gaseosa Mirinda en Lata 354 ml',
  precio: 500,
  cantidad: 0,
},
{
  id: '4',
  nombre: 'Gaseosa Paso de los Toros en Lata 269 ml',
  precio: 600,
  cantidad: 0,
},
]
const pagoExacto = (cantidad, elemento) => {
  elemento.innerHTML = `<h2>Gracias por su compra 🛒!!!</h2>
    <h3>Retire ${cantidad > 1 ? 'sus productos' : 'su producto'} de la maquina expendedora 📢</h3>
    `
}
const faltaPago = (elemento, faltante) => {
  elemento.innerHTML = `<h2>Ingrese mas dinero para terminar su compra 💰</h2>
    <h2>Falta 💲${faltante}</h2>
    `
}
const sobraPago = (elemento, vuelto, cantidad) => {
  elemento.innerHTML = `<h2>Gracias por su compra 🛒!!!</h2>
    <h3>Retire ${cantidad > 1 ? 'sus productos' : 'su producto'} de la maquina expendedora 📢</h3>
    <h3>Su vuelto es de 💲${vuelto < 0 ? vuelto * -1 : vuelto}</h3>
    `
}

const verificarPago = (cantidad, pago, precio) => {
  pagoNumber += Number(pago);
  totalApagar = Number(precio) * Number(cantidad);
  console.log(totalApagar);
  if (pagoNumber == totalApagar) {
    pagoExacto(cantidad, resultado);
    btnPagar.classList.add('oculto');
    divFaltante.classList.add('oculto');
    btnReset.classList.remove('oculto');
    pagoNumber = 0;
  } else if (pagoNumber < totalApagar) {
    console.log(pagoNumber);
    faltaPago(divFaltante, (totalApagar - pagoNumber));
    divFaltante.classList.remove('oculto');
  } else if (pagoNumber > totalApagar) {
    let vuelto = totalApagar - pagoNumber;
    sobraPago(resultado, vuelto);
    btnPagar.classList.add('oculto');
    divFaltante.classList.add('oculto');
    btnReset.classList.remove('oculto');
    pagoNumber = 0;
  }
}

pantalla.addEventListener('click', (e) => {
  btnPagar.classList.remove('oculto');
  resultado.classList.remove('oculto');
  for (let i = 0; i < productos.length; i++) {
    if (e.target.id == productos[i].id) {
      idProducto = i;
      resultado.innerHTML = `<h3>Producto: ${productos[i].nombre}</h3>
            <h3>Precio:💲 ${productos[i].precio}</h3>
            <label for="cantidad">Cantidad</label>
            <select name="cantidad" id="cantidad" class="select-cantidad">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
            </select>
            <label for="pago">Pago</label>
            <select name="pago" id="pago" class="select-pago">
                <option value="50">$50</option>
                <option value="100">$100</option>
                <option value="200">$200</option>
                <option value="500">$500</option>
                <option value="1000">$1.000</option>
                <option value="2000">$2.000</option>
                <option value="10000">$10.000</option>
            </select>
           `
    }
    const cantidad = document.getElementById('cantidad');
    const pago = document.getElementById('pago');
    if (cantidad && pago) {
      btnPagar.addEventListener('click', (e) => {
        console.log(pago.value);
        verificarPago(cantidad.value, pago.value, productos[idProducto].precio);
      })
      btnReset.addEventListener('click', () => {
        btnReset.classList.add('oculto');
        console.log(pago.value);
        pago.value = '';
        console.log(pago.value);
        location.reload();
      })
    }
  }

})

