"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [eleccion, setEleccion] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/elecciones/1")
      .then((respuesta) => {
        if (!respuesta.ok) {
          throw new Error("No se pudo obtener la elección");
        }

        return respuesta.json();
      })
      .then((datos) => {
        setEleccion(datos);
      })
      .catch((error) => {
        setError(error.message);
      });
  }, []);

  if (error) {
    return <h2>{error}</h2>;
  }

  if (!eleccion) {
    return <h2>Cargando elección...</h2>;
  }

  return (
    <main>
      <h1>{eleccion.titulo}</h1>

      <p>{eleccion.descripcion}</p>

      <p>
        <strong>Fecha de inicio:</strong> {eleccion.fechaInicio}
      </p>

      <p>
        <strong>Fecha de término:</strong> {eleccion.fechaFin}
      </p>

      <p>
        <strong>Estado:</strong> {eleccion.estado}
      </p>

      <h2>Listas</h2>

      {eleccion.listas.map((lista) => (
        <div key={lista.id}>
          <h3>{lista.nombre}</h3>

          <p>{lista.descripcion}</p>

          <h4>Integrantes</h4>

          <ul>
            {lista.integrantes.map((integrante, index) => (
              <li key={index}>
                {integrante.nombre} - {integrante.cargo}
              </li>
            ))}
          </ul>

          <h4>Propuestas</h4>

          <ul>
            {lista.propuestas.map((propuesta, index) => (
              <li key={index}>{propuesta}</li>
            ))}
          </ul>

          <hr />
        </div>
      ))}
    </main>
  );
}