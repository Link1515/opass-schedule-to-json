import { describe, expect, it } from 'bun:test'
import { normalizeTags } from '~/utils/normalizeTags'

describe('normalizeTags()', () => {
  it('works', () => {
    const raw: Record<string, string>[] = [
      { id: '1', name_zh: '標籤 1', name_en: 'tag 1', description_zh: '標籤 1 說明', description_en: 'tag 1 description' },
      { id: '2', name_zh: '標籤 2', name_en: 'tag 2', description_zh: '標籤 2 說明', description_en: 'tag 2 description' },
    ]

    expect(normalizeTags(raw)).toEqual([
      { id: '1', zh: { name: '標籤 1', description: '標籤 1 說明' }, en: { name: 'tag 1', description: 'tag 1 description' } },
      { id: '2', zh: { name: '標籤 2', description: '標籤 2 說明' }, en: { name: 'tag 2', description: 'tag 2 description' } },
    ])
  })

  it('works with some empty fields', () => {
    const raw: Record<string, string>[] = [
      { id: '1', name_zh: '視聽教室 1', name_en: '', description_zh: '視聽教室 1 描述', description_en: '' },
      { id: '2', name_zh: '', name_en: 'Room 2', description_zh: '', description_en: 'Room 2' },
    ]

    expect(normalizeTags(raw)).toEqual([
      { id: '1', zh: { name: '視聽教室 1', description: '視聽教室 1 描述' }, en: { name: '', description: '' } },
      { id: '2', zh: { name: '', description: '' }, en: { name: 'Room 2', description: 'Room 2' } },
    ])
  })

  it('works with some fields missing', () => {
    const raw: Record<string, string>[] = [
      { id: '1', name_zh: '視聽教室 1', description_zh: '視聽教室 1 描述' },
      { id: '2', name_en: 'Room 2', description_en: 'Room 2' },
    ]

    expect(normalizeTags(raw)).toEqual([
      { id: '1', zh: { name: '視聽教室 1', description: '視聽教室 1 描述' }, en: { name: '', description: '' } },
      { id: '2', zh: { name: '', description: '' }, en: { name: 'Room 2', description: 'Room 2' } },
    ])
  })

  it('works with no input', () => {
    expect(normalizeTags()).toEqual([])
  })
})
