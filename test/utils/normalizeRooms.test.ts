import { describe, expect, it } from 'bun:test'
import { normalizeRooms } from '~/utils/normalizeRooms'

describe('normalizeRooms()', () => {
  it('works', () => {
    const raw: Record<string, string>[] = [
      { id: '1', name_zh: '視聽教室 1', name_en: 'Room 1', description_zh: '視聽教室 1 描述', description_en: 'Room 1' },
      { id: '2', name_zh: '視聽教室 2', name_en: 'Room 2', description_zh: '視聽教室 2 描述', description_en: 'Room 2' },
    ]

    expect(normalizeRooms(raw)).toEqual([
      { id: '1', zh: { name: '視聽教室 1', description: '視聽教室 1 描述' }, en: { name: 'Room 1', description: 'Room 1' } },
      { id: '2', zh: { name: '視聽教室 2', description: '視聽教室 2 描述' }, en: { name: 'Room 2', description: 'Room 2' } },
    ])
  })

  it('works with some empty fields', () => {
    const raw: Record<string, string>[] = [
      { id: '1', name_zh: '視聽教室 1', name_en: '', description_zh: '視聽教室 1 描述', description_en: '' },
      { id: '2', name_zh: '', name_en: 'Room 2', description_zh: '', description_en: 'Room 2' },
    ]

    expect(normalizeRooms(raw)).toEqual([
      { id: '1', zh: { name: '視聽教室 1', description: '視聽教室 1 描述' }, en: { name: '', description: '' } },
      { id: '2', zh: { name: '', description: '' }, en: { name: 'Room 2', description: 'Room 2' } },
    ])
  })

  it('works with some fields missing', () => {
    const raw: Record<string, string>[] = [
      { id: '1', name_zh: '視聽教室 1', description_zh: '視聽教室 1 描述' },
      { id: '2', name_en: 'Room 2', description_en: 'Room 2' },
    ]

    expect(normalizeRooms(raw)).toEqual([
      { id: '1', zh: { name: '視聽教室 1', description: '視聽教室 1 描述' }, en: { name: '', description: '' } },
      { id: '2', zh: { name: '', description: '' }, en: { name: 'Room 2', description: 'Room 2' } },
    ])
  })

  it('works with no input', () => {
    expect(normalizeRooms()).toEqual([])
  })
})
