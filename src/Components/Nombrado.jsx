import React from 'react';
import useIsNamed from '../Hooks/isNamed';

function Nombrado() {
  const isNamed = useIsNamed();

  return (
    <div>
      <button>{isNamed ? 'Cierto' : 'Falso'}</button>
    </div>
  );
}

export default Nombrado;
