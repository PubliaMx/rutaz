import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import './calculadora.css';

const Calculadora = () => {
  const [torneosCompletos, setTorneosCompletos] = useState(1);
  const [apuestaPromedio, setApuestaPromedio] = useState(100);
  const [gananciasAnuncios, setGananciasAnuncios] = useState(0.10);
  const [resultados, setResultados] = useState({
    gananciasTorneos: 0,
    ingresosJuegos: 0,
    ingresosAnuncios: 0,
    ingresosTotales: 0,
    ingresosDespuesImpuestos: 0,
    rendimientoPuntoPorcentual: 0,
    rendimientosMensuales: 0,
  });

  const handleTorneosCompletosChange = (e) => {
    const value = parseFloat(e.target.value);
    setTorneosCompletos(value);
    calcularResultados(value, apuestaPromedio, gananciasAnuncios);
  };

  const handleApuestaPromedioChange = (e) => {
    const value = parseFloat(e.target.value);
    setApuestaPromedio(value);
    calcularResultados(torneosCompletos, value, gananciasAnuncios);
  };

  const handleGananciasAnunciosChange = (e) => {
    const value = parseFloat(e.target.value);
    setGananciasAnuncios(value);
    calcularResultados(torneosCompletos, apuestaPromedio, value);
  };

  const calcularResultados = (torneos, apuesta, ganancias) => {
    const gananciasTorneos = (24 * torneos);
    const ingresosJuegos = (apuesta * 30 * 0.20);
    const ingresosAnuncios = (ganancias * 30);
    const ingresosTotales = (parseFloat(gananciasTorneos) + parseFloat(ingresosJuegos) + parseFloat(ingresosAnuncios));
    const ingresosDespuesImpuestos = (ingresosTotales * 0.67);
    const rendimientoPuntoPorcentual = (ingresosDespuesImpuestos / 100);
    const rendimientosMensuales = ((rendimientoPuntoPorcentual / 5000) * 100);

    setResultados({
      gananciasTorneos,
      ingresosJuegos,
      ingresosAnuncios,
      ingresosTotales,
      ingresosDespuesImpuestos,
      rendimientoPuntoPorcentual,
      rendimientosMensuales,
    });
  };
  return (
    <div className="calculadora">
      <h2>Torneos</h2>
      <Form.Group>
        <Form.Label>Número de Jugadores por torneo:</Form.Label>
        <Form.Control type="text" value="24" readOnly />
      </Form.Group>
      <Form.Group>
        <Form.Label>Número de torneos completos por semana:</Form.Label>
        <Form.Control
          type="number"
          step="0.25"
          min="0"
          value={torneosCompletos}
          onChange={handleTorneosCompletosChange}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Por Mes:</Form.Label>
        <Form.Control type="text" value={(torneosCompletos * 4.2)} readOnly />
      </Form.Group>
      <Form.Group>
        <Form.Label>Inscripción al torneo:</Form.Label>
        <Form.Control type="number" step="50" min="0" value={apuestaPromedio} onChange={handleApuestaPromedioChange} />
      </Form.Group>
      <Form.Group>
        <Form.Label>Ganancia por Torneos por Mes:</Form.Label>
        <Form.Control type="text" value={resultados.gananciasTorneos} readOnly />
      </Form.Group>
  
      <div className="espacio-vertical" />
  
      <h2>Juegos entre usuarios</h2>
      <Form.Group>
        <Form.Label>Número promedio de jugadores diario:</Form.Label>
        <Form.Control type="number" step="10" min="100" value={apuestaPromedio} onChange={handleApuestaPromedioChange} />
      </Form.Group>
      <Form.Group>
        <Form.Label>Apuesta Promedio:</Form.Label>
        <Form.Control type="number" step="50" min="0" value={apuestaPromedio} onChange={handleApuestaPromedioChange} />
      </Form.Group>
      <Form.Group>
        <Form.Label>Ingresos Mensuales de Juegos por Apuesta:</Form.Label>
        <Form.Control type="text" value={resultados.ingresosJuegos} readOnly />
      </Form.Group>
  
      <div className="espacio-vertical" />
  
      <h2>Juegos Gratuitos a cambio de visualizar Anuncios</h2>
      <Form.Group>
        <Form.Label>Promedio de Ganancias por Anuncio:</Form.Label>
        <Form.Control type="number" step="0.01" min="0" value={gananciasAnuncios} onChange={handleGananciasAnunciosChange} />
      </Form.Group>
      <Form.Group>
        <Form.Label>Ganancias por Anuncios por Mes:</Form.Label>
        <Form.Control type="text" value={resultados.ingresosAnuncios} readOnly />
      </Form.Group>
  
      <div className="espacio-vertical" />
  
      <div className="resultado">
        <h2>Resultados Fijos</h2>
        <h3>Ingresos Totales:</h3>
        <p>{resultados.ingresosTotales}</p>
        <h3>Ingresos Después de Impuestos:</h3>
        <p>{resultados.ingresosDespuesImpuestos}</p>
        <h3>Rendimiento Punto Porcentual:</h3>
        <p>{resultados.rendimientoPuntoPorcentual}</p>
        <h3>Rendimientos Mensuales:</h3>
        <p>{resultados.rendimientosMensuales}</p>
      </div>
    </div>
  );
  };

export default Calculadora;
