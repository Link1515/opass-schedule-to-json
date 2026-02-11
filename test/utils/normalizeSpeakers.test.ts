import { describe, expect, it } from 'bun:test'
import { normalizeSpeakers } from '~/utils/normalizeSpeakers'

describe('normalizeSpeakers()', () => {
  it('works', () => {
    const raw: Record<string, string>[] = [
      {},
      { name_zh: '講者 1', id: 'zh-1', name_en: 'Speaker 1', avatar: 'speaker_1.jpg', bio_zh: '講者 1 的簡介', bio_en: 'Speaker 1 bio' },
      { name_zh: '講者 2', id: 'zh-2', name_en: 'Speaker 2', avatar: 'speaker_2.jpg', bio_zh: '講者 2 的簡介', bio_en: 'Speaker 2 bio' },
    ]

    expect(normalizeSpeakers(raw)).toEqual([
      { id: 'zh-1', avatar: 'speaker_1.jpg', zh: { name: '講者 1', bio: '講者 1 的簡介' }, en: { name: 'Speaker 1', bio: 'Speaker 1 bio' } },
      { id: 'zh-2', avatar: 'speaker_2.jpg', zh: { name: '講者 2', bio: '講者 2 的簡介' }, en: { name: 'Speaker 2', bio: 'Speaker 2 bio' } },
    ])
  })

  it('skip first item', () => {
    const raw: Record<string, string>[] = [{}]
    expect(normalizeSpeakers(raw).length).toBe(0)
  })

  it('works with some empty fields', () => {
    const raw: Record<string, string>[] = [
      {},
      { name_zh: '講者 1', id: 'zh-1', name_en: '', avatar: 'speaker_1.jpg', bio_zh: '講者 1 的簡介', bio_en: '' },
      { name_zh: '', id: 'zh-2', name_en: 'Speaker 2', avatar: 'speaker_2.jpg', bio_zh: '', bio_en: 'Speaker 2 bio' },
    ]

    expect(normalizeSpeakers(raw)).toEqual([
      { id: 'zh-1', avatar: 'speaker_1.jpg', zh: { name: '講者 1', bio: '講者 1 的簡介' }, en: { name: '', bio: '' } },
      { id: 'zh-2', avatar: 'speaker_2.jpg', zh: { name: '', bio: '' }, en: { name: 'Speaker 2', bio: 'Speaker 2 bio' } },
    ])
  })

  it('works with some fields missing', () => {
    const raw: Record<string, string>[] = [
      {},
      { name_zh: '講者 1', id: 'zh-1', avatar: 'speaker_1.jpg', bio_zh: '講者 1 的簡介' },
      { id: 'zh-2', name_en: 'Speaker 2', avatar: 'speaker_2.jpg', bio_en: 'Speaker 2 bio' },
    ]

    expect(normalizeSpeakers(raw)).toEqual([
      { id: 'zh-1', avatar: 'speaker_1.jpg', zh: { name: '講者 1', bio: '講者 1 的簡介' }, en: { name: '', bio: '' } },
      { id: 'zh-2', avatar: 'speaker_2.jpg', zh: { name: '', bio: '' }, en: { name: 'Speaker 2', bio: 'Speaker 2 bio' } },
    ])
  })

  it('works with no input', () => {
    expect(normalizeSpeakers()).toEqual([])
  })
})
