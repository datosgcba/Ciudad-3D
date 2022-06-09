import { jsPDF } from 'jspdf'

export default async (sections, fileName) => {
  // eslint-disable-next-line new-cap
  const doc = new jsPDF()

  const imgLogo = 'data:image/jpeg;base64,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'
  const fontName = 'helvetica'

  const marginLeft = 10
  const marginTop = 10
  const PAGE_HEIGHT = 250
  const PAGE_WIDTH = 200

  let y = marginTop

  const addHeader = () => {
    doc.addImage(imgLogo, 'JPEG', 6, 4.5, 20, 20)
    doc.setFont(fontName, 'bold')
    doc.setFontSize(15)
    doc.text('Certificado Urbanístico - Ciudad 3D ', 33, 17)
    y += 15
    doc.setDrawColor(254, 211, 4) // color de linea
    doc.setLineWidth(0.6) // grosor de la linea
    doc.line(6, 25, 202, 25)
    y += 8
  }

  const inlineText = ({
    text, maxLine = PAGE_WIDTH, newlineX = null, initialX = marginLeft, lineHeight = 5
  }) => {
    let x = initialX
    const nextlineX = newlineX || initialX
    const splitText = text.split(' ')

    const writeWord = (word) => {
      const widthWord = doc.getTextWidth(word)
      if (x + widthWord <= maxLine) {
        doc.text(word, x, y)
        x += widthWord + 1
      } else {
        x = nextlineX
        y += lineHeight
        doc.text(word, x, y)
        x += widthWord + 1
      }
      return { x, y }
    }
    splitText.forEach((wordWithSpecials) => {
      wordWithSpecials.split('\n').forEach((word, idx) => {
        if (idx > 0) {
          y += lineHeight
          x = nextlineX
        }
        ({ x, y } = writeWord(word))
      })
    })
    return x
  }

  const addPageIfNeeded = () => {
    if (y < PAGE_HEIGHT) {
      return
    }

    doc.addPage()
    y = marginTop

    addHeader()
  }

  addHeader()

  doc.setFont(fontName, 'bold')
  doc.setFontSize(11)
  doc.text('AVISO LEGAL', marginLeft, y)
  y += 5
  doc.setFont(fontName, 'italic')

  const firstMessage = '"Esta información no sustituye las normas legales vigentes ni constituye una copia fiel de los datos en poder del Gobierno de la Ciudad de Buenos Aires. Es responsabilidad del usuario confirmar mediante la vía administrativa pertinente la información provista en este sitio previo a alguna toma de decisión o acción.'
  inlineText({ text: firstMessage })
  y += 5
  const seccodMessage = 'La información provista por esta página web es orientativa y no vinculante, al momento de realizar un trámite ante Gobierno de la Ciudad de Buenos Aires."'
  inlineText({ text: seccodMessage })
  y += 10

  const note = 'Nota: La Ley 6099/18 Código Urbanístico fue modificada por Ley 6361/20, por tal motivo deberán ser consultadas ambas leyes para la correcta identificación de los artículos que han sido sustituidos y/o incorporados en la modificación.'
  inlineText({ text: note })
  y += 5

  sections.forEach(({ title, dataList }) => {
    y += 8
    addPageIfNeeded()

    const dataAvailable = dataList
      .filter(({ value }) => value !== null)
    if (dataAvailable.length) {
      doc.setFont(fontName, 'bold')
      doc.setFontSize(12)
      doc.text(title, marginLeft, y)
      doc.setDrawColor(0, 0, 0) // color de linea
      doc.setLineWidth(0.2) // grosor de la linea
      const textWidth = doc.getTextWidth(title)
      doc.line(marginLeft, y + 1, marginLeft + textWidth, y + 1)
      y += 8

      dataAvailable.forEach(({
        name, value, linkText, type
      }) => {
        addPageIfNeeded()
        const margin = marginLeft + 5 // corre los subtile
        doc.setFont(fontName, 'bold')
        doc.setFontSize(10)
        const subtile = name ? `.    ${name}: ` : ''
        let xValue = inlineText({ text: subtile, initialX: margin })
        const newlineX = xValue
        doc.setFont(fontName, 'normal')
        const values = Array.isArray(value)
          ? value
            .map((valueAux) => (typeof valueAux === 'string'
              ? { titleReport: valueAux, textReport: '' }
              : valueAux))
          : [{ titleReport: linkText || '', textReport: value, type }]
        values.forEach(({ titleReport, textReport, type: typeData }) => {
          switch (typeData) {
            case 'IMAGE':
              if (textReport) {
                doc.addImage(textReport, 'JPEG', PAGE_WIDTH / 2 + marginLeft - 75, y + 2, 150, 90)
                y += 90 // le da espacio entre las lineas a los subtile
              }
              break
            case 'LINK':
              // eslint-disable-next-line no-case-declarations
              const widthUnderline = doc.getTextWidth(titleReport)
              if (xValue + widthUnderline > PAGE_WIDTH) {
                xValue = newlineX
                y += 5
              }
              doc.textWithLink(titleReport, xValue, y, { url: textReport })
              doc.setDrawColor(0, 0, 0) // color de linea
              doc.setLineWidth(0.2) // grosor de la linea
              doc.line(xValue, y + 1, xValue + widthUnderline, y + 1)
              xValue += widthUnderline + 1
              break
            default:
              xValue = inlineText({ text: titleReport, newlineX, initialX: xValue })
              xValue = inlineText({ text: textReport, newlineX, initialX: xValue + 1 })
              break
          }
        })
        xValue = newlineX
        y += 9 // le da espacio entre las lineas a los subtile
      })
    }
  })

  doc.save(fileName)
}
