/* eslint-disable */
import React from 'react'

export const largeScreenSteps = [
  {
    selector: ".logo",
    content: () => (
        <div>
          <p>
            Este mapa es una herramienta online para saber qué se puede construir en determinadas parcelas de la Ciudad.
          </p>
        </div>
      )
    },
    {
      selector: ".informacion",
      content: () => (
        <div>
          <p>
            Acá vas a poder obtener información con respecto a la parcela seleccionada, ya sean Datos Básicos, o en cuanto a Edificabilidad,
            Usos, Afectaciones, Obras e Inspecciones.
          </p>
        </div>
      )
    },
    {
      selector: ".capas",
      content: () => (
        <div>
          <p>
          Acá vas a poder obtener información de diferentes Capas como son Plano Base, Franja Edificable, Edificios Catalogados y Lotes con Afectaciones.
          </p>
        </div>
      )
    },
    {
      selector: ".explorar",
      content: () => (
        <div>
          <p>
          Acá vas a poder explorar utilizando diferentes filtros como Altura Código Urbanístico, Área Especial Individualizada, Mixtura de Uso y Barrios.
          </p>
        </div>
      )
    },
    {
      selector: ".ayudanosAMejorar",
      content: () => (
        <div>
          <p>
            Acá vas a poder enviarnos los comentarios que desees y contactarte con nosotros
          </p>
        </div>
      )
    }
];