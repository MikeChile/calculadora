// Declaración de variables
let numero1 = "";
let operador = "";
let displayValue = "";

// Función para manejar los botones
function presionarBoton(valor) {
    switch (valor) {
        case 'C':
            // Limpiar variables y display
            displayValue = "";
            numero1 = "";
            operador = "";
            document.getElementById("display").value = "";
            break;
        case '+':
        case '-':
        case '*':
        case '/':
            // Establecer operador y actualizar display
            if (displayValue !== "") {
                numero1 = displayValue;
                operador = valor;
                displayValue += operador;
            }
            console.log('Operador es: ' + operador);
            break;
        default:
            // Agregar número al display
            displayValue += valor;
            console.log('Número es: ' + displayValue);
            document.getElementById("display").value = displayValue;
            break;
    }
}

// Función para realizar la operación
function realizarOperacion() {
    if (numero1 !== "" && operador !== "" && displayValue !== "") {
        let numero2 = displayValue.slice(numero1.length + 1);
        let resultado = 0;
        switch (operador) {
            case '+':
                resultado = parseFloat(numero1) + parseFloat(numero2);
                break;
            case '-':
                resultado = parseFloat(numero1) - parseFloat(numero2);
                break;
            case '*':
                resultado = parseFloat(numero1) * parseFloat(numero2);
                break;
            case '/':
                resultado = parseFloat(numero1) / parseFloat(numero2);
                break;
        }

        // Guardar operación y resultado en localStorage
let operaciones = JSON.parse(localStorage.getItem("operaciones")) || [];
let operacion = numero1 + " " + operador + " " + numero2;
operaciones.push({
    operacion: operacion,
    resultado: resultado
});
localStorage.setItem("operaciones", JSON.stringify(operaciones));

        // Actualizar numero1 con el resultado
        numero1 = resultado.toString();
        operador = "";
        displayValue = numero1;

       

        // Mostrar registros actualizados
        mostrarRegistros();

        console.log(resultado);
        document.getElementById("display").value = displayValue;
    }
}

function mostrarRegistros() {
    let operaciones = JSON.parse(localStorage.getItem("operaciones")) || [];
    let tabla = document.getElementById("historial-table");
    tabla.innerHTML = "";
    for (let i = operaciones.length - 1; i >= 0; i--) {
        let operacion = operaciones[i];
        let fila = tabla.insertRow();
        let celdaOperacion = fila.insertCell();
        let celdaResultado = fila.insertCell();
        celdaOperacion.textContent = operacion.operacion;
        celdaResultado.textContent = operacion.resultado;
    }
}

document.getElementById("borrar-historial").addEventListener("click", function() {
    localStorage.removeItem("operaciones");
    mostrarRegistros();
});

// Llamar a la función cuando la página se cargue
window.addEventListener("load", mostrarRegistros);