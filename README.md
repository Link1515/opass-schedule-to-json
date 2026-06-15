# opass-schedule-to-json

### Install

```
npm i opass-schedule-to-json
```

### Example

```typescript
import { scheduleToJson } from 'opass-schedule-to-json'

const schedule = await scheduleToJson({
  spreadsheetId: '<your-spreadsheet-id>',
  avatarBaseUrl: 'https://example.com/',
  defaultAvatar: 'https://example.com/defaultAvatar.jpg',
})
```
