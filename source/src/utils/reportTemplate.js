import { jsPDF } from 'jspdf'

export default async (sections, fileName) => {
  // eslint-disable-next-line new-cap
  const doc = new jsPDF()

  const fontName = 'helvetica'

  const marginLeft = 10
  const marginTop = 10

  let y = marginTop

  doc.setFont(fontName, 'bold')
  doc.setFontSize(18)
  doc.text('Reporte Urbanístico Plano Abierto 3D ', marginLeft, y)
  y += 10

  sections.forEach(({ title, dataList }) => {
    doc.setLineWidth(0.2)
    doc.line(marginLeft, y, 210 - marginLeft * 2, y)
    y += 15
    doc.setFont(fontName, 'bold')
    doc.setFontSize(13)
    doc.text(`${title}:`, marginLeft, y)
    y += 8
    dataList.forEach(({ name, value }) => {
      const margin = marginLeft + 15
      doc.setFont(fontName, 'bold')
      doc.setFontSize(11)
      const subtile = `-    ${name}: `
      doc.text(subtile, margin, y)
      const xValue = margin + doc.getTextWidth(subtile)
      doc.setFont(fontName, 'normal')
      doc.text(value, xValue, y)
      y += 5
    })
  })

  doc.setLineWidth(0.2)
  doc.line(marginLeft, y, 210 - marginLeft * 2, y)
  y += 15
  doc.setFont(fontName, 'bold')
  doc.setFontSize(11)
  doc.text('AVISO LEGAL', marginLeft, y)
  y += 5
  doc.setFont(fontName, 'italic')
  doc.text('"Esta información no sustituye las normas legales vigentes ni constituye una copia fiel de los datos en poder', marginLeft, y)
  y += 5
  doc.text('del Gobierno de la Ciudad de Buenos Aires. Es responsabilidad del usuario confirmar mediante la vía', marginLeft, y)
  y += 5
  doc.text('administrativa pertinente la información provista en este sitio previo a alguna toma de decisión o acción.', marginLeft, y)
  y += 5
  doc.text('La información provista por esta página web es orientativa y no vinculante, al momento de realizar un trámite', marginLeft, y)
  y += 5
  doc.text('ante Gobierno de la Ciudad de Buenos Aires."', marginLeft, y)

  doc.save(fileName)
}
