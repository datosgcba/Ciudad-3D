/* eslint-disable */
import React from 'react'

export const largeScreenSteps = [
  {
    selector: ".makeStyles-logo-5",
    content: () => (
        <div>
          <p>
            Este mapa es una herramienta online para saber qué se puede construir en determinadas parcelas de la Ciudad.
          </p>
        </div>
      )
    },
    {
      selector: ".MuiCardActionArea-root:nth-child(1)",
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
      selector: ".MuiCardActionArea-root:nth-child(2)",
      content: () => (
        <div>
          <p>
          Acá vas a poder obtener información de diferentes Capas como son Plano Base, Franja Edificable, Edificios Catalogados y Lotes con Afectaciones.
          </p>
        </div>
      )
    },
    {
      selector: ".MuiCardActionArea-root:nth-child(3)",
      content: () => (
        <div>
          <p>
          Acá vas a poder explorar utilizando diferentes filtros como Altura Código Urbanístico, Área Especial Individualizada, Mixtura de Uso y Barrios.
          </p>
        </div>
      )
    },
    {
      selector: ".MuiCardActionArea-root:nth-child(4)",
      content: () => (
        <div>
          <p>
            Acá vas a poder enviarnos los comentarios que desees y contactarte con nosotros
          </p>
        </div>
      )
    },
    {
      selector: ".search-input-holder",
      content: () => (
        <div>
          <p>
            Acá vas a poder buscar por Dirección o Lugar y ubicarlo en el Mapa
          </p>
        </div>
      )
    },
    {
      selector: ".makeStyles-minimapLayer-14",
      content: () => (
        <div>
          <p>
            Acá vas a poder cambiar a Modo Oscuro el Mapa
          </p>
        </div>
      )
    }
];