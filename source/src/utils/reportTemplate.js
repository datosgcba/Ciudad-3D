import { jsPDF } from "jspdf"
 
export default async (sections, fileName) => {
  // Default export is a4 paper, portrait, using millimeters for units
  const doc = new jsPDF();
//  doc.addFont("Arimo-Regular.ttf", "Arimo", "normal");
//  doc.addFont("Arimo-Bold.ttf", "Arimo", "bold");
  console.log(doc.getFontList() )

  const fontName = 'helvetica'

  const marginLeft = 10
  const marginTop = 10

  let y = marginTop

  doc.setFont(fontName, 'bold')
  doc.setFontSize(18)
  doc.text("Reporte Urbanístico Plano Abierto 3D ", marginLeft, y)
  y+=10

  sections.forEach(({ title, dataList }) => {
    doc.setLineWidth(0.2)
    doc.line(marginLeft, y, 210 - marginLeft * 2, y)
    y+=15
    doc.setFont(fontName, 'bold')
    doc.setFontSize(13)
    doc.text(`${title}:`, marginLeft, y)
    y+=8
    dataList.forEach(({ name, value }) => {
      const margin = marginLeft + 15
      doc.setFont(fontName, 'bold')
      doc.setFontSize(11)
      const subtile = `-    ${name}: `
      doc.text(subtile, margin, y)
      const xValue = margin + doc.getTextWidth(subtile)
      doc.setFont(fontName, 'normal')
      doc.text(value, xValue, y)
      y+=8
    })
    y+=2
  })

  doc.save(fileName)
}