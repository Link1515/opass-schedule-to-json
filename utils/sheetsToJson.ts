import { GoogleSpreadsheet } from 'google-spreadsheet'

interface Config {
  apiKey: string
  spreadsheetId: string
}

export async function sheetsToJson({ apiKey, spreadsheetId }: Config) {
  const doc = new GoogleSpreadsheet(spreadsheetId, { apiKey })
  await doc.loadInfo()

  const entries: [string, Record<string, string>[]][] = await Promise.all(
    doc.sheetsByIndex.map(async sheet => {
      const rows = await sheet.getRows()

      const data = rows.map(row => {
        const obj = row.toObject()
        for (const key of Object.keys(obj)) {
          if (obj[key] === undefined) obj[key] = ''
        }
        return obj
      })

      return [sheet.title, data]
    })
  )

  return Object.fromEntries(entries)
}
