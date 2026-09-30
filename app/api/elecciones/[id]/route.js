import { NextResponse } from "next/server";

const elecciones = [
  {
    id: 1,
    titulo: "Elección Centro de Estudiantes de Informática 2026",
    descripcion:
      "Elección para escoger la nueva directiva del Centro de Estudiantes de Informática.",
    fechaInicio: "2026-10-10",
    fechaFin: "2026-10-11",
    estado: "activa",

    listas: [
      {
        id: 1,
        nombre: "Lista Conecta",
        descripcion:
          "Lista enfocada en mejorar la comunicación y participación estudiantil.",

        integrantes: [
          {
            nombre: "...",
            cargo: "Presidenta",
          },
          {
            nombre: "...",
            cargo: "Vicepresidente",
          },
        ],

        propuestas: [
          "Mejorar los espacios de estudio",
          "Crear tutorías entre estudiantes",
          "Realizar actividades académicas y recreativas",
        ],
      },

      {
        id: 2,
        nombre: "Lista Futuro",
        descripcion:
          "Lista enfocada en bienestar estudiantil y apoyo académico.",

        integrantes: [
          {
            nombre: "...",
            cargo: "Presidente",
          },
          {
            nombre: "...",
            cargo: "Vicepresidente",
          },
        ],

        propuestas: [
          "Crear un banco de apuntes",
          "Organizar charlas con profesionales",
          "Mejorar la comunicación con los estudiantes",
        ],
      },
    ],
  },
];

export async function GET(request, context) {
  const { id } = await context.params;

  const idEleccion = Number(id);

  if (isNaN(idEleccion)) {
    return NextResponse.json(
      {
        mensaje: "El ID debe ser un número",
      },
      {
        status: 400,
      }
    );
  }

  const eleccion = elecciones.find(
    (eleccion) => eleccion.id === idEleccion
  );

  if (!eleccion) {
    return NextResponse.json(
      {
        mensaje: "Elección no encontrada",
      },
      {
        status: 404,
      }
    );
  }

  return NextResponse.json(eleccion, {
    status: 200,
  });
}