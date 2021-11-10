import React from 'react'

// eslint-disable-next-line import/prefer-default-export
export const largeScreenSteps = [
  {
    selector: '',
    content: () => (
      <div>
        <p>
          <b>
            AVISO LEGAL: Este sitio web tiene como objetivo brindar información
            urbanística con carácter orientativo, a los efectos de facilitar la
            comprensión del Nuevo Código Urbanístico. Esta información no
            sustituye las normas legales vigentes ni constituye una copia fiel
            de los datos en poder del Gobierno de la Ciudad de Buenos Aires. Es
            responsabilidad del usuario confirmar mediante la vía administrativa
            pertinente la información provista en este sitio previo a alguna
            toma de decisión o acción. La información provista por esta página
            web es orientativa y no vinculante, al momento de realizar un
            trámite ante Gobierno de la Ciudad de Buenos Aires.
          </b>
        </p>
      </div>
    )
  },
  {
    selector: '.makeStyles-logo-5',
    content: () => (
      <div>
        <p>
          Este mapa es una herramienta online para saber qué se puede construir
          en determinadas parcelas de la Ciudad.
        </p>
      </div>
    )
  },
  {
    selector: '.MuiCardActionArea-root:nth-child(1)',
    content: () => (
      <div>
        <p>
          Acá vas a poder obtener información con respecto a la parcela
          seleccionada, ya sean Datos Básicos, o en cuanto a Edificabilidad,
          Usos, Afectaciones, Obras e Inspecciones.
        </p>
      </div>
    )
  },
  {
    selector: '.MuiCardActionArea-root:nth-child(2)',
    content: () => (
      <div>
        <p>
          Acá vas a poder obtener información de diferentes Capas como son Plano
          Base, Franja Edificable, Edificios Catalogados y Lotes con
          Afectaciones.
        </p>
      </div>
    )
  },
  {
    selector: '.MuiCardActionArea-root:nth-child(3)',
    content: () => (
      <div>
        <p>
          Acá vas a poder explorar utilizando diferentes filtros como Altura
          Código Urbanístico, Área Especial Individualizada, Mixtura de Uso y
          Barrios.
        </p>
      </div>
    )
  },
  {
    selector: '.MuiCardActionArea-root:nth-child(4)',
    content: () => (
      <div>
        <p>
          Acá vas a poder descargar un reporte con datos básicos de la parcela
          en PDF.
        </p>
      </div>
    )
  },
  {
    selector: '.MuiCardActionArea-root:nth-child(6)',
    content: () => (
      <div>
        <p>
          Acá vas a poder enviarnos los comentarios que desees y contactarte con
          nosotros.
        </p>
      </div>
    )
  },
  {
    selector: '.makeStyles-topMenu-13',
    content: () => (
      <div>
        <p>
          Acá vas a poder buscar por Dirección o Lugar y ubicarlo en el Mapa.
        </p>
      </div>
    )
  },
  {
    selector: '.mapboxgl-ctrl-zoom-in',
    content: () => (
      <div>
        <p>Acá vas a poder hacer zoom en el mapa.</p>
      </div>
    )
  },
  {
    selector: '.mapboxgl-ctrl-compass',
    content: () => (
      <div>
        <p>Acá vas a poder orientar el norte en el mapa.</p>
      </div>
    )
  },
  {
    selector: '.mapboxgl-ctrl-group button:nth-last-child(1)',
    content: () => (
      <div>
        <p>Acá vas a poder medir en el mapa.</p>
      </div>
    )
  },
  {
    selector: '.makeStyles-minimapLayer-15',
    content: () => (
      <div>
        <p>Acá vas a poder cambiar a Modo Claro el Mapa.</p>
      </div>
    )
  }
]
