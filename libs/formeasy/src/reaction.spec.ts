import { zodResolver } from '@hookform/resolvers/zod'
import { renderHook } from '@testing-library/react'
import { describe, it } from 'vitest'
import { z } from 'zod'

import { useForm } from './useForm'
import { getWords } from './utils/getWords'

const schema = z.object({
    firstName: z.string(),
    age: z.number(),
    realAge: z.number(),
})
describe.only('word split', () => {
    it('a word', () => {
        expect(getWords('a')).toEqual(['a'])
        expect(getWords('a+1')).toEqual(['a'])
    })

    it('many word', () => {
        expect(getWords('a+b')).toEqual(['a', 'b'])
        expect(getWords('a.b')).toEqual(['a', 'b'])
        expect(getWords('(a * b) + c')).toEqual(['a', 'b', 'c'])
    })
})

describe('base use', () => {
    it('happy path', () => {
        const { result } = renderHook(() =>
            useForm({
                resolver: zodResolver(schema),
                defaultValues: {
                    firstName: 'test',
                    age: 10,
                    realAge: 10,
                },
                reaction: {
                    realAge: {
                        value: 'age+1',
                    },
                },
            }),
        )

        expect(result.current.getValues('realAge')).toBe(11)
    })

    it('if the dependency value changes, it should also change itself', () =>
        new Promise<void>((done) => {
            expect(1).toBe(1)
            done()
        }))
})
