//////////////////////////////////////////////////////////////////////
/*realiza todo el proceso del movimiento de una ficha */

var kasilla, soltar, fichasel, hayficha, ficha, cualficha, hayficha, claseFicha, classficha, estaba;
var estabaHtml, casillaHtml, comio, cambiame, cambiar, comeraHtml;
var borrando, borraClases, reemplazadote, reemplazado, regresarHtml, casaComida, colorficha, guardarMovimiento;
var casillaSinFichaHtmlA, casillaSinFichaHtmlB, $;

function codear(texto) {
    console.log(texto);
    return texto;
}

async function solicitarCasilla(casilla, tipo) {
    // Agregar la 't' inicial y el '0' si es necesario para formar el formato de casilla esperado
    kasilla = (casilla < 100) ? 't0' + casilla : 't' + casilla;
    casilla = casilla.replace(/t/g, '');

    try {
        // Realizar la solicitud GET a la API
        const response = await fetch(`http://localhost/juego/poleana_api.php?casilla=${casilla}`);

        // Verificar si la solicitud fue exitosa (código de estado 200)
        if (response.ok) {
            // Extraer los datos JSON de la respuesta
            const data = await response.json();

            // Verificar si la casilla existe en la base de datos
            if (data.exists) {
                // Verificar si se desea obtener el valor de apertura o cierre
                if (tipo === "apertura") {
                    return data.apertura;
                } else if (tipo === "cierre") {
                    return data.cierre;
                } else {
                    throw new Error('El parámetro "tipo" debe ser "apertura" o "cierre"');
                }
            } else {
                throw new Error('La casilla especificada no existe en la base de datos');
            }
        } else {
            // Manejar errores si la solicitud no fue exitosa
            throw new Error('Error al obtener la casilla de la base de datos');
        }
    } catch (error) {
        // Manejar errores de red u otros errores
        console.error('Error:', error.message);
        return null; // Devolver null si hay un error
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function funcion(casilla) {
    console.log('checa si está seleccionada la ficha');
    console.log('***********');
    console.log('***********');

    soltar = casilla;

    /*alterna entre tomar ficha y soltarla */
    if (fichasel < 1) {
        // Si no hay ficha seleccionada y la casilla clicada tiene una ficha
        if (hayficha(casilla) > 0) {
            ficha = cualficha(hayficha(casilla));
            claseFicha = classficha(hayficha(casilla));

            estaba = casilla;
            estabaHtml = document.getElementById(estaba).innerHTML;
            casillaHtml = document.getElementById(casilla).innerHTML;
            document.getElementById(casilla).innerHTML = casillaHtml.replace("ficha", "brilla ficha");

            fichasel = 1;
        }
    } else {
        comio = 0;
        // Si hay una ficha seleccionada y la casilla clicada tiene una ficha
        if (hayficha(casilla) > 0) {
            comio = 1;

            let sound = new Audio('bye.mp3');
            sound.play();

            cambiame = document.getElementById(casilla).innerHTML;
            cambiar = document.getElementById(casilla).innerHTML;
            cambiar = cambiar.replace('<a>', '<a><div class="xxx">');
            cambiar = cambiar.replace('</a>', '</a></div><div class="contienev"><h1><font color="white"><p><img src="rayo.gif"></h1></p></font></div>');

            document.getElementById(casilla).innerHTML = cambiar;

            setTimeout(function () {
                document.getElementById(casilla).innerHTML = cambiame;
            }, 2000); // 3000 milisegundos = 3 segundos

            await sleep(2000);

            comeraHtml = document.getElementById(casilla).innerHTML;
            borrando = borraClases(comeraHtml);
            reemplazadote = borrando.replace('</a>', '<div class="subidon"><div class="' + claseFicha + '"></div></div></a>');
            reemplazadote = reemplazadote.replace('<div class="x"><div class=""></div></div>', '');

            document.getElementById(estaba).innerHTML = estabaHtml;
            document.getElementById(casilla).innerHTML = reemplazadote;

            casaComida = 't-' + hayficha(casilla);
            regresarHtml = document.getElementById(casaComida).innerHTML;
            regresarHtml = regresarHtml.replace('<div class="x "></div>', '');
            document.getElementById(casaComida).innerHTML = regresarHtml.replace('</a>', '<div class="' + colorficha(casaComida) + '"></div></a>');

            document.getElementById(soltar).innerHTML = reemplazadote;

            guardarMovimiento(ficha, soltar, estaba);
            guardarMovimiento(casaComida, casaComida, estaba);

            casillaHtml = "";
            fichasel = 0;
        } else {
            // Si hay una ficha seleccionada y la casilla clicada está vacía

            //casillaSinFichaHtml = borraClases(document.getElementById(soltar).innerHTML);
            casillaSinFichaHtmlA = await solicitarCasilla(soltar, 'apertura');
            casillaSinFichaHtmlB = await solicitarCasilla(soltar, 'cierre');

            console.log('-----estaba:' + estaba);
            console.log('-----casilla:' + estaba);
            console.log('-----soltar:' + soltar);
            console.log('-----apertura:' + casillaSinFichaHtmlA);
            
            reemplazado = casillaSinFichaHtmlA + '<div class="fichaamarilla"></div>' + casillaSinFichaHtmlB;
            document.getElementById(soltar).innerHTML = reemplazado;

            /*
            casillaSinFichaHtml = borraClases(document.getElementById(soltar).innerHTML);
            casillaSinFichaHtmlA = await solicitarCasilla(soltar, 'apertura');
            casillaSinFichaHtmlB = await solicitarCasilla(soltar, 'cierre');

            document.getElementById(soltar).innerHTML = casillaSinFichaHtmlA + casillaSinFichaHtmlB;
            reemplazado = casillaSinFichaHtmlA + '<div class="fichaamarilla"></div>' + casillaSinFichaHtmlB;
            document.getElementById(soltar).innerHTML = reemplazado;
            document.getElementById(estaba).innerHTML = casillaSinFichaHtmlA + casillaSinFichaHtmlB;
            guardarMovimiento(ficha, soltar, estaba);

            */
            fichasel = 0;
        }
    }
}


/*///////////////////////
/* Adjusting the size */
/*/////////////////////*/

$(document).ready(function () {
    var width = document.getElementById('hijo').offsetWidth;
    var height = document.getElementById('hijo').offsetHeight;
    var windowWidth = $(document).outerWidth();
    var windowHeight = $(document).outerHeight();
    var r = 1;
    r = Math.min(windowHeight / width, windowWidth / height);

    $('#hijo').css({
        '-webkit-transform': 'scale(' + r + ')',
        '-moz-transform': 'scale(' + r + ')',
        '-ms-transform': 'scale(' + r + ')',
        '-o-transform': 'scale(' + r + ')',
        'transform': 'scale(' + r + ')'
    });
});

/***************************
/* Positioning the coins */
/*///////////////////////*/
