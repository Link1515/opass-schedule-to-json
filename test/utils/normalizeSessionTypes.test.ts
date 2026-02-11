import { describe, expect, it } from 'bun:test'
import { normalizeSessionTypes } from '~/utils/normalizeSessionTypes'

describe('normalizeSessionTypes()', () => {
  it('works', () => {
    const raw: Record<string, string>[] = [
      { id: '1', name_zh: '活動 1', name_en: 'Event 1', description_zh: '活動 1 說明', description_en: 'Event 1 description' },
      { id: '2', name_zh: '活動 2', name_en: 'Event 2', description_zh: '活動 2 說明', description_en: 'Event 2 description' },
    ]

    expect(normalizeSessionTypes(raw)).toEqual([
      { id: '1', zh: { name: '活動 1', description: '活動 1 說明' }, en: { name: 'Event 1', description: 'Event 1 description' } },
      { id: '2', zh: { name: '活動 2', description: '活動 2 說明' }, en: { name: 'Event 2', description: 'Event 2 description' } },
    ])
  })

  it('works with some empty fields', () => {
    const raw: Record<string, string>[] = [
      { id: '1', name_zh: '活動 1', name_en: '', description_zh: '活動 1 說明', description_en: '' },
      { id: '2', name_zh: '', name_en: 'Event 2', description_zh: '', description_en: 'Event 2 description' },
    ]

    expect(normalizeSessionTypes(raw)).toEqual([
      { id: '1', zh: { name: '活動 1', description: '活動 1 說明' }, en: { name: '', description: '' } },
      { id: '2', zh: { name: '', description: '' }, en: { name: 'Event 2', description: 'Event 2 description' } },
    ])
  })

  it('works with some fields missing', () => {
    const raw: Record<string, string>[] = [
      { id: '1', name_zh: '活動 1', description_zh: '活動 1 說明' },
      { id: '2', name_en: 'Event 2', description_en: 'Event 2 description' },
    ]

    expect(normalizeSessionTypes(raw)).toEqual([
      { id: '1', zh: { name: '活動 1', description: '活動 1 說明' }, en: { name: '', description: '' } },
      { id: '2', zh: { name: '', description: '' }, en: { name: 'Event 2', description: 'Event 2 description' } },
    ])
  })

  it('works with no input', () => {
    expect(normalizeSessionTypes()).toEqual([])
  })
})
