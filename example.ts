import fs from 'fs/promises'
import { scheduleToJson } from './index'

const schedule = await scheduleToJson({
  apiKey: '<your-api-key>',
  spreadsheetId: '<your-spreadsheet-id>',
})

fs.writeFile('./schedule.json', JSON.stringify(schedule, null, 2))
