let agarrados = 0;

      function agitarDados(){
          
            //setdisplays();

          if(agarrados < 1){

          document.getElementById('dado1').innerHTML = '<img src="mario.gif">';
         document.getElementById('dado2').innerHTML = '<img src="mario.gif" class="chiko">';
         document.getElementById('botondados').innerHTML = document.getElementById('botondados').innerHTML.replace('Agitar','Soltar') ;

            agarrados = 1;
          }
          else {
            document.getElementById('botondados').innerHTML = document.getElementById('botondados').innerHTML.replace('Soltar','Agitar') ;

            document.getElementById('dado1').innerHTML = "<img src='dados/"+aleatorio(1,6)+".png'>";

            document.getElementById('dado2').innerHTML = "<img src='dados/"+aleatorio(1,6)+".png'>";

            agarrados = 0;


            let corretiempo = 120;

            
            let intervalo = setInterval(mostrarTimer, 1000);
            }
      }



function mostrar(corretiempo) {
 
     if (corretiempo.toString().length == 1) {
         let digito1 = 0;
         let digito2 = 0;
         let digito3 = corretiempo.toString().substring(0,1);
     }
     
     if (corretiempo.toString().length == 2) {
         let digito1 = 0;
         let digito2 = corretiempo.toString().substring(0,1);
         let digito3 = corretiempo.toString().substring(1,2);
     }
     
     if (corretiempo.toString().length == 3) {
         let digito1 = corretiempo.toString().substring(0,1);
         let digito2 = corretiempo.toString().substring(1,2);
         let digito3 = corretiempo.toString().substring(2,3);
         
     }
     
     
     //alert('digito1 - '+digito1);
    let digito2;    
    let digito3;
        if (digito3 === 0) {
            
            let claze1 = "display-container display-size-12 display-no-0";
        }
        
        else {
            let claze1 =    "display-container display-size-12 display-no-"+digito3; 
        }
        
        if ( digito2 === 0) {
            
            let claze2 = "display-container display-size-12 display-no-0";
        }
        else {
            let claze2 = "display-container display-size-12 display-no-"+digito2;
        }
        
        let digito1 ;
        if (digito1 === 0) {
            
            let claze3 = "display-container display-size-12 display-no-0";
        }
        
        else {
            let claze3 = "display-container display-size-12 display-no-"+digito1;
        }
    
        let elemento;
        let claze1, claze2, claze3;
            
            elemento = document.getElementById("display-3");
                      elemento.className = claze1;
                      
            elemento = document.getElementById("display-12");
                      elemento.className = claze2;
                      
            elemento = document.getElementById("display-1");
                      elemento.className = claze3;
            
            

            
               
}
              
      
function mostrarTimer() {
    let corretiempo;

  mostrar(corretiempo);

  corretiempo--;

  if(corretiempo === 0) {
    let intervalo;
    clearInterval(intervalo);
  }

}        


        function aleatorio(inferior, superior) {
    var numPosibilidades = superior - inferior;
    var aleatorio = Math.random() * (numPosibilidades + 1);
    aleatorio = Math.floor(aleatorio);
    return inferior + aleatorio;
}



