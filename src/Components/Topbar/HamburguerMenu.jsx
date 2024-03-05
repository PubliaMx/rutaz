import React, { useEffect, useRef  } from "react";
import parse from "html-react-parser";

import './HamburguerMenu.css';


const Topbar = () => {
  useEffect(() => {
    const icons = document.querySelectorAll('.icon');
    icons.forEach(icon => {
      icon.addEventListener('click', (event) => {
        icon.classList.toggle("open");
      });
    });
  });
    const Codigo = `<code><div class='wrapper'>
<h1>Poleana.Mx</h1>
<div class="icon nav-icon-1">
 
</div>



</code>`;

return <div>{parse(Codigo)}</div>;

    
}

export  default Topbar;

