var fichasel, amarilla1, amarilla2, amarilla3, amarilla4, azul1, azul2,azul3,azul4, verde1, verde2, verde3,verde4,naranja1,naranja2, naranja3,naranja4;
var fichas,clin,borrar, queficha, quefichax, fich;

function setNoCacheHeaders() {
  document.querySelector('html').setAttribute('manifest', '');

  caches.delete('/');
}

setNoCacheHeaders();




fichasel = 0;
    


/*posiciones iniciales de cada ficha */ 

    /* amarillas 10,11,12 y 13
    verdes 30,31,32,
    naranjas 40,41,42,43
    azules 20,21,22,23
    */

const colores = ['amarillas', 'azules', 'verdes', 'naranjas'];
const positions = [10,11,12,13,20,21,22,23,30,31,32,33,40,41,42,43];

const posFichas = ["t-10","t-11","t-12","t-13","t-20","t-21","t-22","t-23","t-30","t-31","t-32","t-33","t-40","t-41","t-42","t-43"];



amarilla1 = "t-10";
amarilla2 = "t-11";
amarilla3 = "t-12";
amarilla4 = "t-13";

azul1 = "t-20";
azul2 = "t-21";
azul3 = "t-22";
azul4 = "t-23";

verde1 = "t-30";
verde2 = "t-31";
verde3 = "t-32";
verde4 = "t-33";

naranja1 = "t-40";
naranja2 = "t-41";
naranja3 = "t-42";
naranja4 = "t-43";


fichas = {
  amarillas: {
    posiciones: ["t-10", "t-11", "t-12", "t-13"],
    clases:["fichaamarilla", "fichaamarilla", "fichaamarilla", "fichaamarilla"],
    clave:[10,11,12,13],
  },

  azules: {
    posiciones: ["t-20", "t-21", "t-22", "t-23"], 
    clases:["fichaazul", "fichaazul", "fichaazul", "fichaazul"],
    clave:[20,21,22,23],
  },



  verdes: {
    posiciones: ["t-30", "t-31", "t-32", "t-33"],
    clases:["fichaverde", "fichaverde", "fichaverde", "fichaverde"],
    clave:[30,31,32,33],
  },

  naranjas: {
    posiciones: ["t-40", "t-41", "t-42", "t-43"],
    clases:["fichanaranja", "fichanaranja", "fichanaranja", "fichanaranja"],
    clave:[40,41,42,43],
  },


}



function codeare(cual, tag) {
    

//return('<a href="#">') ;
 
    
}

function codear(cual, tag) {
    // Crear una URL con los parámetros de consulta
    //var url = "codear.php?casilla=" + encodeURIComponent(cual) + "&tag=" + encodeURIComponent(tag);
    
    var url = "codear.php?casilla=130&tag=a";

    // Crear un objeto XMLHttpRequest
    var xhr = new XMLHttpRequest();

    // Configurar la solicitud
    xhr.open("GET", url, true);

    // Crear una variable para almacenar el resultado
    var resultado;

    // Manejar la respuesta de la solicitud
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            resultado = xhr.responseText;
        }
    };

    // Enviar la solicitud
    xhr.send();

    // Retornar el resultado
    return resultado;
}



function iniciarColor(color) {

  const { posiciones, clases } = fichas[color];

  for(let i=0; i<posiciones.length; i++) {

    let pos = posiciones[i];
    let clase = clases[i]; 

document.getElementById(pos).innerHTML = `
       <a href="javascript:funcion('${pos}')">
         <p></p>
         <div class="${clase}"></div>
       </a>
     `;
  }

}


//pone las fichas en su posici贸n inicial en el tablero


for(let color of colores) {

    iniciarColor(color);

}



//////////// verificadores


function colorficha(cual, traducido){
    if(cual == "t-10" || cual == "t-11" || cual == "t-12" || cual == "t-13"){
        if(traducido == 1){
            return "amarillas";
            }
            else{
                return "fichaamarilla";
            }
    }
    if(cual == "t-20" || cual == "t-21" || cual == "t-22" || cual == "t-23"){
        if(traducido == 1){
            return "azules";
            }
            else{
                return "fichaazul";
            }
    }
    if(cual == "t-30" || cual == "t-31"  || cual == "t-32" || cual == "t-33"){
        if(traducido == 1){
            return "verdes";
            }
            else{
                return "fichaverde";
            }
    }
    if(cual == "t-40" || cual == "t-41" || cual == "t-42" || cual == "t-43"){
          if(traducido == 1){
              return "verdes";
              }
              else{
                  return "fichanaranja";
              }
    }

}




function traductor(cual){
    if(cual == 'fichamarilla'){
        return "amarillas";
    }

    if(cual == 'fichaazul'){
        return "azules";
    }

    if(cual == 'fichanaranja'){
        return "naranjas";
    }

    if(cual == 'fichamarilla'){
        return "verdes";
    }
    
}



/*revisa si hay alguna ficha en la casilla especificada y devuelve la id de la ficha (como ficha) */
      
function hayficha(donde){

    /* amarillas 10,11,12 y 13
    verdes 30,31,32,
    naranjas 40,41,42,43
    azules 20,21,22,23
    */


    //let posicionesColor = fichas[color][posiciones]; 

    
    let index = 0;
    let subIndex = 0;
    let result = 0;
    
    for (let position of positions) {
        
        if (index == 4 || index == 8 || index == 12) {
            index = 0;
            subIndex++ ;
        }
    
        if(donde == fichas[colores[subIndex]]["posiciones"][index]){
            result = position;
        }
        
        index++ ;

        
    }
    
    return result;
}






function borraClases(desformateado){
    
            
    //desformateado = casilla.innerHTML ;
    desformateado = desformateado.replace('fichaamarilla','');
    desformateado = desformateado.replace('fichaazul','');
    desformateado = desformateado.replace('fichaverde','');
    desformateado = desformateado.replace('fichanaranja','');
    //desformateado = desformateado.replace('sficha');
    desformateado = desformateado.replace('sfichaamarilla','');
    desformateado = desformateado.replace('sfichaazul','');
    desformateado = desformateado.replace('sfichaverde','');
    desformateado = desformateado.replace('sfichanaranja','');
    //casillaSinFichaHtml = casillaSinFichaHtml.replace('<div class="subidon"><div class="brilla"></div></div>','');
    //casillaSinFichaHtml = casillaSinFichaHtml + 'hola ';
    desformateado = desformateado.replace('subidon','x');
    desformateado = desformateado.replace('brilla','x');
    return desformateado;
    
}








function cualficha(casilla) {
    

                           
            if(casilla == 10){
                return amarilla1;
            }
            if(casilla == 11){
                return amarilla2;
            }
            if(casilla == 12){
                return amarilla3;
            }
            if(casilla == 13){
                return amarilla4;
            }


            /* amarillas 10,11,12 y 13
            verdes 30,31,32,
            naranjas 40,41,42,43
            azules 20,21,22,23
            */


            if(casilla == 20){
                return azul1;
            }
            if(casilla == 21){
                return azul2;
            }
            if(casilla == 22){
                return azul3;
            }
            if(casilla == 23){
                return azul4;
            }
                

            if(casilla == 30){
                return verde1;
            }
            if(casilla == 31){
                return verde2;
            }
            if(casilla == 32){
                return  verde3;
            }
            if(casilla == 33){
                return verde4;
            }

            if(casilla == 40){
                return naranja1;
            }
            if(casilla == 41){
                return naranja2;
            }
            if(casilla == 42){
                return naranja3;
            }
            if(casilla == 43){
                return naranja4;
            }
    
     
}





function classficha(casilla) {
    
    
    if(casilla == 10){
                  //ficha = amarilla1;
                  return "fichaamarilla";
                }
                if(casilla == 11){
                  //ficha = amarilla2;
                  return "fichaamarilla";
                }
                if(casilla == 12){
                  //ficha = amarilla3;
                  return "fichaamarilla";
                }
                if(casilla == 13){
                  //ficha = amarilla4;
                  return "fichaamarilla";    
                }


                /* amarillas 10,11,12 y 13
          verdes 30,31,32,
          naranjas 40,41,42,43
          azules 20,21,22,23
        */


                if(casilla == 20){
                  return "fichaazul";
                }
                if(casilla == 21){
                  return "fichaazul";
                }
                if(casilla == 22){
                  return "fichaazul";
                }
                if(casilla == 23){
                  return "fichaazul";
                }
                

                if(casilla == 30){
                  return "fichaverde";
                }
                if(casilla == 31){
                  return "fichaverde";
                }
                if(casilla == 32){
                  return "fichaverde";
                }
                if(casilla == 33){
                  return "fichaverde";
                }

                if(casilla == 40){
                  return "fichanaranja";
                }
                if(casilla == 41){
                  return "fichanaranja";
                }
                if(casilla == 42){
                  return "fichanaranja";
                }
                if(casilla == 43){
                  return "fichanaranja";
                }
    
    
    
}





/////////////////////////



function guardarMovimiento(queficha, posicion, estaba){




    if(queficha == "t-10"){
        fichas["amarillas"]["posiciones"][0] = posicion;
    }
    if(queficha == "t-11"){
        fichas["amarillas"]["posiciones"][1] = posicion;
    }
    if(queficha == "t-12"){
        fichas["amarillas"]["posiciones"][2] = posicion;
    }
    if(queficha == "t-13"){
          fichas["amarillas"]["posiciones"][3] = posicion;
    }

    if(queficha == "t-20"){
          fichas["azules"]["posiciones"][0] = posicion;
    }
    if(queficha == "t-21"){
          fichas["azules"]["posiciones"][1] = posicion;
    }
    if(queficha == "t-22"){
          fichas["azules"]["posiciones"][2] = posicion;
    }
    if(queficha == "t-23"){
          fichas["azules"]["posiciones"][3] = posicion;
    }

    if(queficha == "t-30"){
        fichas["verdes"]["posiciones"][0] = posicion;
    }
    if(queficha == "t-31"){
        fichas["verdes"]["posiciones"][1] = posicion;
    }
    if(queficha == "t-32"){
        fichas["verdes"]["posiciones"][2] = posicion;
    }
    if(queficha == "t-33"){
        fichas["verdes"]["posiciones"][3] = posicion;
    }

    if(queficha == "t-40"){
          fichas["naranjas"]["posiciones"][0] = posicion;
    }
    if(queficha == "t-41"){
          fichas["naranjas"]["posiciones"][1] = posicion;
    }
    if(queficha == "t-42"){
          fichas["naranjas"]["posiciones"][2] = posicion;
    }
    if(queficha == "t-43"){
          fichas["naranjas"]["posiciones"][3] = posicion;
    }







           clin = document.getElementById(estaba).innerHTML ;
    
    borrar = clin.replace('sfichaamarilla','');
    borrar = clin.replace('sfichaazul','');
    borrar = clin.replace('sfichanaranja','');
    borrar = clin.replace('sfichaverde','');
    
    //document.getElementById(estaba).innerHTML = borrar; 










    // Crear una URL con los parámetros de consulta
    var url = "guardar_movimiento.php?queficha=" + encodeURIComponent(queficha) + "&posicion=" + encodeURIComponent(posicion);

    // Crear un objeto XMLHttpRequest
    var xhr = new XMLHttpRequest();

    // Configurar la solicitud
    xhr.open("GET", url, true);

    // Manejar la respuesta de la solicitud
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            console.log(xhr.responseText);
        }
    };

    // Enviar la solicitud
    xhr.send();










}





function huboficha(fich, posicion){
    
    
                  if(fich == "amarilla1"){
        fichas["amarillas"]["posiciones"][0] = posicion;
    }
    if(fich == "amarilla2"){
        fichas["amarillas"]["posiciones"][1] = posicion;
    }
    if(fich == "amarilla3"){
        fichas["amarillas"]["posiciones"][2] = posicion;
    }
    if(fich == "amarilla4"){
          fichas["amarillas"]["posiciones"][3] = posicion;
    }

    if(fich == "azul1"){
          fichas["azules"]["posiciones"][0] = posicion;
    }
    if(fich == "azul2"){
          fichas["azules"]["posiciones"][1] = posicion;
    }
    if(queficha == "azul3"){
          fichas["azules"]["posiciones"][2] = posicion;
    }
    if(fich == "azul4"){
          fichas["azules"]["posiciones"][3] = posicion;
    }

    if(fich == "verde1"){
        fichas["verdes"]["posiciones"][0] = posicion;
    }
    if(fich == "verde2"){
        fichas["verdes"]["posiciones"][1] = posicion;
    }
    if(fich == "verde3"){
        fichas["verdes"]["posiciones"][2] = posicion;
    }
    if(fich == "verde4"){
        fichas["verdes"]["posiciones"][3] = posicion;
    }

    if(fich == "naranja1"){
          fichas["naranjas"]["posiciones"][0] = posicion;
    }
    if(fich == "naranja2"){
          fichas["naranjas"]["posiciones"][1] = posicion;
    }
    if(fich == "naranja3"){
          fichas["naranjas"]["posiciones"][2] = posicion;
    }
    if(fich == "naranja4"){
          fichas["naranjas"]["posiciones"][3] = posicion;
    }

     
    
    
    
    
    
}




function regresar(queficha, parametro){
    
    quefichax = "t-"+queficha ;
    if (queficha == 10 || queficha == 11 || queficha == 12 || queficha == 13){
        
        fich = "fichaamarilla";
        
    }
    if (queficha == 20 || queficha == 21 || queficha == 22 || queficha == 23){
        
        fich = "fichaazul";
        
    }
    if (queficha == 10 || queficha == 11 || queficha == 12 || queficha == 13){
        
        fich = "fichaverde";
        
    }
    if (queficha == 10 || queficha == 11 || queficha == 12 || queficha == 13){
        
        fich = "fichanaranja";
        
    }
    
    
    alert('jum ---'+queficha.replace('t0','t-'));
    
    if(parametro == "ficha"){
        //return quefichax.replace('t0','t-');
        return queficha ;
    }
    
    else {
        return fich;
    }
    
    
}

