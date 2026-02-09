import { GoogleSpreadsheet } from 'google-spreadsheet'

interface Config {
  apiKey: string
  spreadsheetId: string
}

export async function sheetsToJson({ apiKey, spreadsheetId }: Config) {
  const doc = new GoogleSpreadsheet(spreadsheetId, { apiKey })
  await doc.loadInfo()

  const json: Record<string, Record<string, string>[]> = {}
  for (const sheet of doc.sheetsByIndex) {
    const rows = await sheet.getRows()
    json[sheet.title] = rows.map(row => {
      const obj = row.toObject()
      for (const key of Object.keys(obj)) {
        if (obj[key] === undefined) obj[key] = ''
      }
      return obj
    })
  }

  return json
}
