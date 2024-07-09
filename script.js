const inputUsuario = document.getElementById("input-user");
const mensajeTitulo = document.getElementById("message-title");
const mensajeSubtitulo = document.getElementById("message-subtitle");
const imagenLateral = document.querySelector(".lateral-image");

function esMinusculaOCaracterPermitido(caracter) {
    return (caracter >= 'a' && caracter <= 'z') || caracter === '.' || caracter === ',';
}

function contieneCaracterEspecial(caracter) {
    const caracteresEspeciales = ['á', 'é', 'í', 'ó', 'ú', 'ü', 'ñ'];
    return caracteresEspeciales.includes(caracter);
}

function validarTexto(texto) {
    for (let i = 0; i < texto.length; i++) {
        if (!esMinusculaOCaracterPermitido(texto[i])) {
            mostrarError("El texto contiene caracteres no válidos (deben ser solo letras minúsculas, puntos o comas).");
            return false;
        }
    }

    for (let i = 0; i < texto.length; i++) {
        if (contieneCaracterEspecial(texto[i])) {
            mostrarError("El texto contiene caracteres especiales o acentos.");
            return false;
        }
    }

    return true;
}

function mostrarError(mensaje) {
    mensajeTitulo.style.display = "none"; // Ocultar el título
    mensajeSubtitulo.textContent = mensaje;
    imagenLateral.style.display = "block"; // Mostrar la imagen en caso de error
    mensajeSubtitulo.classList.remove('result-text'); // Eliminar clase de resultado en caso de error
    ocultarBotonCopiar(); // Ocultar el botón de copiar en caso de error
}

function mostrarResultado(texto) {
    mensajeTitulo.style.display = "none"; // Ocultar el título
    mensajeSubtitulo.textContent = texto;
    mensajeSubtitulo.classList.add('result-text'); // Añadir clase de resultado
    imagenLateral.style.display = "none"; // Ocultar la imagen cuando se muestra el resultado
    mostrarBotonCopiar(); // Mostrar el botón de copiar
}
function ajustarTamanioAside(reducido) {
    const aside = document.querySelector('.aside');
    if (reducido) {
        aside.classList.add('aside-reducido');
    } else {
        aside.classList.remove('aside-reducido');
    }
}

function encrypt() {
    let textoUsuario = inputUsuario.value;

    if (!validarTexto(textoUsuario)) {
        return;
    }

    const mapaEncriptacion = {
        'e': 'enter',
        'i': 'imes',
        'a': 'ai',
        'o': 'ober',
        'u': 'ufat'
    };

    let textoEncriptado = '';

    for (let letra of textoUsuario) {
        if (mapaEncriptacion[letra]) {
            textoEncriptado += mapaEncriptacion[letra];
        } else {
            textoEncriptado += letra;
        }
    }

    mostrarResultado(textoEncriptado);
    ajustarTamanioAside(true);
}

function decrypt() {
    let textoUsuario = inputUsuario.value;

    const mapaDesencriptacion = {
        'enter': 'e',
        'imes': 'i',
        'ai': 'a',
        'ober': 'o',
        'ufat': 'u'
    };

    let textoDesencriptado = textoUsuario;

    for (let clave in mapaDesencriptacion) {
        textoDesencriptado = textoDesencriptado.split(clave).join(mapaDesencriptacion[clave]);
    }

    mostrarResultado(textoDesencriptado);
    ajustarTamanioAside(true);
}

function mostrarBotonCopiar() {
    // Verificar si el botón ya existe
    let copyButton = document.getElementById("copy-button");
    if (!copyButton) {
        // Crear el botón de copiar
        copyButton = document.createElement("button");
        copyButton.id = "copy-button";
        copyButton.textContent = "Copiar";
        copyButton.onclick = copiarTexto;
        document.querySelector(".aside").appendChild(copyButton); 
    }
    copyButton.style.display = "block";
}

function ocultarBotonCopiar() {
    const copyButton = document.getElementById("copy-button");
    if (copyButton) {
        copyButton.style.display = "none";
    }
}

function copiarTexto() {
    const texto = mensajeSubtitulo.textContent;
    navigator.clipboard.writeText(texto).then(() => {
        alert("Texto copiado al portapapeles");
    }).catch(err => {
        console.error('Error al copiar el texto: ', err);
    });
}
