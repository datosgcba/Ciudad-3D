import React from 'react'
import MenuBookIcon from '@material-ui/icons/MenuBook'
import AssignmentOutlinedIcon from '@material-ui/icons/AssignmentOutlined'

const icons = [
  {
    id: 'information',
    path: (
      <svg id="info" xmlns="http://www.w3.org/2000/svg" fill="currentColor" stroke="currentColor" width="28" height="28" viewBox="0 0 28 28">
        <g id="Grupo_45" data-name="Grupo 45">
          <path id="Trazado_13" data-name="Trazado 13" d="M23.9,4.1A14,14,0,0,0,4.1,23.9,14,14,0,0,0,23.9,4.1ZM14,3.828a3.008,3.008,0,1,1-3.008,3.008A3.011,3.011,0,0,1,14,3.828Zm3.828,19.141H10.172V21.328h1.641v-8.2H10.172V11.484h6.016v9.844h1.641Z" />
        </g>
      </svg>
    )
  },
  {
    id: 'layerGroups',
    path: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" width="35.333" height="32.266" viewBox="0 0 35.333 32.266">
        <g id="Grupo_50" data-name="Grupo 50" transform="translate(-567.5 -127.979)">
          <circle id="Elipse_3" data-name="Elipse 3" cx="1.458" cy="1.458" r="1.458" transform="translate(583.708 134.708)" fill="#d9d9d9" />
          <path id="Trazado_16" data-name="Trazado 16" d="M590.75,142.594l-.742-.364a12.77,12.77,0,0,0,2.659-7.179c0-5.45-5.092-7.009-7.831-7.072-2.692.063-7.784,1.622-7.784,7.072a9.669,9.669,0,0,0,.363,2.54l-9.915,4.957v17.7l11.512-4.671,11.81,4.491,12.011-4.276V137.774Zm-5.917-12.615c.239.006,5.834.22,5.834,5.072,0,4.347-4.215,8.487-5.827,9.91-1.6-1.422-5.788-5.552-5.788-9.91C579.052,130.2,584.647,129.985,584.833,129.979Zm-7,23.915-8.333,3.381v-13.49l8.333-4.167ZM590,157.613l-10.167-3.866V142.429a25.059,25.059,0,0,0,4.391,4.629l.613.481.616-.479a25.166,25.166,0,0,0,3.3-3.219l1.25.613Zm10.833-3.235L592,157.523V144.249l8.833-3.523Z" />
        </g>
      </svg>
    )
  },
  {
    id: 'explorer',
    path: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" width="29.33" height="29.33" viewBox="0 0 29.33 29.33">
        <g id="Grupo_49" data-name="Grupo 49" transform="translate(-638.167 -130.25)">
          <circle id="Elipse_2" data-name="Elipse 2" cx="1.458" cy="1.458" r="1.458" transform="translate(651.374 143.606)" fill="#d9d9d9" />
          <g id="Grupo_46" data-name="Grupo 46" transform="translate(638.167 130.25)"><path id="Trazado_14" data-name="Trazado 14" d="M652.832,159.58A14.665,14.665,0,1,1,667.5,144.915,14.681,14.681,0,0,1,652.832,159.58Zm0-27.516a12.851,12.851,0,1,0,12.851,12.851A12.865,12.865,0,0,0,652.832,132.064Z" transform="translate(-638.167 -130.25)" /></g>
          <g id="Grupo_47" data-name="Grupo 47" transform="translate(644.613 136.984)"><path id="Trazado_15" data-name="Trazado 15" d="M647.083,154.5a1,1,0,0,1-.94-1.34l3.917-10.833a1,1,0,0,1,.645-.616l10.25-3.167a1,1,0,0,1,1.252,1.245l-3.167,10.5a1,1,0,0,1-.654.664l-11,3.5A.987.987,0,0,1,647.083,154.5Zm4.688-11.025-3.058,8.457,8.564-2.725,2.473-8.2Z" transform="translate(-646.083 -138.5)" /></g>
        </g>
      </svg>
    )
  },
  {
    id: 'report',
    path: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" width="35" viewBox="0 0 29.33 29.33">
        <AssignmentOutlinedIcon />
      </svg>
    )
  },
  {
    id: 'normative',
    path: (
      <svg id="info" xmlns="http://www.w3.org/2000/svg" fill="currentColor" stroke="currentColor" width="38" height="38" viewBox="0 0 28 28">
        <MenuBookIcon />
      </svg>
    )
  },
  {
    id: 'tutorial',
    path: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="30.547"
        viewBox="0 0 469.038 469.038"
      >
        <g>
          <path d="M465.023,4.079c-3.9-3.9-9.9-5-14.9-2.8l-442,193.7c-4.7,2.1-7.8,6.6-8.1,11.7s2.4,9.9,6.8,12.4l154.1,87.4l91.5,155.7
c2.4,4.1,6.9,6.7,11.6,6.7c0.3,0,0.5,0,0.8,0c5.1-0.3,9.5-3.4,11.6-8.1l191.5-441.8C470.123,13.879,469.023,7.979,465.023,4.079z
M394.723,54.979l-226.2,224.7l-124.9-70.8L394.723,54.979z M262.223,425.579l-74.5-126.9l227.5-226L262.223,425.579z"
          />
        </g>
      </svg>

    )
  },
  {
    id: 'contact',
    path: (
      <svg xmlns="http://www.w3.org/2000/svg" stroke="currentColor" width="19.547" height="20.787" viewBox="0 0 19.547 20.787">
        <g id="Grupo_48" data-name="Grupo 48" transform="translate(-51.076 -679.996)">
          <line id="Línea_4" data-name="Línea 4" x1="9.202" transform="translate(56.248 686.855)" fill="none" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="1.688" />
          <line id="Línea_5" data-name="Línea 5" x1="9.202" transform="translate(56.248 690.654)" fill="none" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="1.688" />
          <path id="Trazado_12" data-name="Trazado 12" d="M51.919,699.94l5.791-4.186H69.779V680.84H51.919Z" fill="none" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="1.688" />
        </g>
      </svg>
    )
  },
  {
    id: 'iconoResidencia',
    path: (
      <svg xmlns="http://www.w3.org/2000/svg" stroke="currentColor" width="28" height="28" viewBox="0 -5 36 36">
        <path d="M63.5,210.469H42.8a2.8,2.8,0,0,1-2.8-2.8V192.937a.974.974,0,1,1,1.948,0v14.732a.853.853,0,0,0,.852.852H63.5a.853.853,0,0,0,.852-.852V192.937a.974.974,0,1,1,1.948,0v14.732A2.8,2.8,0,0,1,63.5,210.469Z" transform="translate(-37.565 -181.253)" />
        <path d="M30.193,31.11a.971.971,0,0,1-.689-.285L17.391,18.712a2.559,2.559,0,0,0-3.616,0L1.663,30.825A.974.974,0,1,1,.286,29.447L12.4,17.334a4.51,4.51,0,0,1,6.37,0L30.882,29.447a.974.974,0,0,1-.689,1.663Z" transform="translate(0 -16.017)" />
        <path d="M184.766,300.645h-7.792a.974.974,0,0,1-.974-.974v-8.644a3.047,3.047,0,0,1,3.044-3.044H182.7a3.047,3.047,0,0,1,3.044,3.044v8.644A.974.974,0,0,1,184.766,300.645Zm-6.818-1.948h5.844v-7.67a1.1,1.1,0,0,0-1.1-1.1h-3.652a1.1,1.1,0,0,0-1.1,1.1Z" transform="translate(-165.286 -271.428)" />
      </svg>
    )
  },
  {
    id: 'iconoComercio',
    path: (
      <svg xmlns="http://www.w3.org/2000/svg" stroke="currentColor" width="28" height="28" viewBox="-5 -5 36 36">
        <path d="M63.343,171.828H42.782A2.785,2.785,0,0,1,40,169.046l.484-17.115a.968.968,0,0,1,1.935,0l-.484,17.115a.848.848,0,0,0,.847.847H63.343a.848.848,0,0,0,.847-.847l-.484-17.115a.968.968,0,0,1,1.935,0l.484,17.115A2.785,2.785,0,0,1,63.343,171.828Z" transform="translate(-40 -142.617)" />
        <path d="M43.266,109.963H62.859a2.785,2.785,0,0,1,2.782,2.782l.484,17.115a.968.968,0,1,1-1.935,0l-.484-17.115a.848.848,0,0,0-.847-.847H43.266a.848.848,0,0,0-.847.847l-.484,17.115a.968.968,0,1,1-1.935,0l.484-17.115A2.785,2.785,0,0,1,43.266,109.963Z" transform="translate(-40 -104.097)" />
        <path d="M184.708,20.759h-7.741a.968.968,0,0,1-.968-.968v-3.81a3.027,3.027,0,0,1,3.024-3.024h3.628a3.027,3.027,0,0,1,3.024,3.024v3.81A.968.968,0,0,1,184.708,20.759Zm-6.773-1.935h5.806V15.982a1.09,1.09,0,0,0-1.089-1.089h-3.628a1.09,1.09,0,0,0-1.089,1.089Z" transform="translate(-167.775 -12.958)" />
      </svg>
    )
  },
  {
    id: 'iconoServicio',
    path: (
      <svg xmlns="http://www.w3.org/2000/svg" stroke="currentColor" width="28" height="28" viewBox="-5 -5 36 36">
        <path d="M15.167,30.333a15.165,15.165,0,1,1,11.6-5.391,15.326,15.326,0,0,1-1.79,1.794,15.171,15.171,0,0,1-9.807,3.6Zm0-28.438A13.272,13.272,0,0,0,5.019,23.719,13.426,13.426,0,0,0,6.586,25.29a13.272,13.272,0,0,0,17.162,0,13.425,13.425,0,0,0,1.568-1.571A13.272,13.272,0,0,0,15.167,1.9Z" />
        <path d="M165.688,75.375a5.688,5.688,0,1,1,5.688-5.687A5.694,5.694,0,0,1,165.688,75.375Zm0-9.479a3.792,3.792,0,1,0,3.792,3.792A3.8,3.8,0,0,0,165.688,65.9Z" transform="translate(-150.521 -60.208)" />
        <path d="M99.622,237.691a.949.949,0,0,1-.92-1.179,8.539,8.539,0,0,0-8.15-10.615H90.3a8.539,8.539,0,0,0-8.15,10.615.948.948,0,0,1-1.839.462A10.43,10.43,0,0,1,90.279,224h.3a10.435,10.435,0,0,1,9.966,12.973A.948.948,0,0,1,99.622,237.691Z" transform="translate(-75.26 -210.729)" />
      </svg>
    )
  },
  {
    id: 'iconoDepositos',
    path: (
      <svg xmlns="http://www.w3.org/2000/svg" stroke="currentColor" width="28" height="28" viewBox="-5 -5 36 36">
        <path d="M91.872,90.66H90.66V72.483a1.211,1.211,0,0,0-.54-1.008L79.214,64.2a1.212,1.212,0,0,0-1.344,0L66.963,71.474a1.212,1.212,0,0,0-.539,1.008V90.66H65.212a1.212,1.212,0,0,0,0,2.424h26.66a1.212,1.212,0,0,0,0-2.424Zm-15.375,0h-2.8V88.236h2.8Zm0-4.847h-2.8V83.389h2.8Zm0-4.847h-2.8V78.542h2.8Zm2.424,2.394h2.921v2.423H78.92Zm0,7.3V88.206h2.921V90.66Zm9.316,0H84.189V82.185a1.174,1.174,0,0,0-1.174-1.174H78.92V77.33a1.212,1.212,0,0,0-1.212-1.212H72.483a1.212,1.212,0,0,0-1.212,1.212V90.66H68.847V73.131l9.694-6.463,9.694,6.463Z" transform="translate(-64 -64)" />
      </svg>
    )
  }
]

export default icons
