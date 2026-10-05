document.addEventListener("DOMContentLoaded", () => {
  const frases = [
    "Cada pizza es una oportunidad para disfrutar, compartir y crear momentos inolvidables alrededor de la mesa.",
    "Ingredientes seleccionados día a día para brindarte una experiencia llena de sabor, tradición y calidad.",
    "El secreto está en la pasión por los detalles, horneando cada masa con el toque exacto que te encanta."
  ];

  let indiceFrase = 0;
  let indiceCaracter = 0;
  let estaBorrando = false;
  
  const velocidadEscribir = 50;  // Tiempo entre cada letra al escribir (ms)
  const velocidadBorrar = 25;    // Tiempo entre cada letra al borrar (ms)
  const pausaEntreFrases = 3000; // Tiempo que se queda la frase completa (ms)

  const elementoTexto = document.getElementById("frase-dinamica");

  function mecanoEfecto() {
    if (!elementoTexto) return;

    const fraseActual = frases[indiceFrase];

    if (estaBorrando) {
      // Quita la última letra
      elementoTexto.textContent = fraseActual.substring(0, indiceCaracter - 1);
      indiceCaracter--;
    } else {
      // Agrega la siguiente letra
      elementoTexto.textContent = fraseActual.substring(0, indiceCaracter + 1);
      indiceCaracter++;
    }

    let tiempoProximoPaso = estaBorrando ? velocidadBorrar : velocidadEscribir;

    // Si terminó de escribir la frase completa
    if (!estaBorrando && indiceCaracter === fraseActual.length) {
      tiempoProximoPaso = pausaEntreFrases; // Espera antes de empezar a borrar
      estaBorrando = true;
    } 
    // Si terminó de borrar la frase completa
    else if (estaBorrando && indiceCaracter === 0) {
      estaBorrando = false;
      indiceFrase = (indiceFrase + 1) % frases.length; // Pasa a la siguiente frase
      tiempoProximoPaso = 500; // Pausa breve antes de escribir la nueva
    }

    setTimeout(mecanoEfecto, tiempoProximoPaso);
  }

  // Inicia la animación
  mecanoEfecto();
});