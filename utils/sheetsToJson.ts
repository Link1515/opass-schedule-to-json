import { parse } from 'csv-parse/sync'

type SheetRows = Record<string, string>[]

export async function sheetsToJson<const SheetNames extends readonly string[]>(spreadsheetId: string, sheetNames: SheetNames): Promise<Record<SheetNames[number], SheetRows>> {
  const entries: [SheetNames[number], SheetRows][] = await Promise.all(
    sheetNames.map(async sheetName => {
      const response = await fetch(`https://docs.google.com/spreadsheets/d/${spreadsheetId}/gviz/tq?tqx=out:csv&sheet=${encodeURIComponent(sheetName)}&headers=1`)
      if (!response.ok) {
        throw new Error(`Failed to fetch sheet "${sheetName}": ${response.status} ${response.statusText}`)
      }

      const csv = await response.text()
      const json = parse<Record<string, string>>(csv, {
        columns: true,
        bom: true,
        skip_empty_lines: true,
        trim: true,
      })
      return [sheetName, json]
    })
  )

  return Object.fromEntries(entries) as Record<SheetNames[number], SheetRows>
}
