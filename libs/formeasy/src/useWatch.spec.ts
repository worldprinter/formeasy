import { zodResolver } from '@hookform/resolvers/zod'
import { act, renderHook } from '@testing-library/react'
import { setTimeout } from 'timers'
import { describe, it } from 'vitest'
import { z } from 'zod'

import { useForm } from './useForm'
import { useWatch } from './useWatch'

const schema = z.object({
    firstName: z.string().min(3).max(10),
})

describe('base use', () => {
    it('should work', () =>
        new Promise<void>((done) => {
            const {
                result: {
                    current: { control, setValue },
                },
            } = renderHook(() =>
                useForm({
                    resolver: zodResolver(schema),
                    defaultValues: {
                        firstName: 'test',
                    },
                }),
            )

            const { result } = renderHook(() =>
                useWatch({
                    control,
                    name: 'firstName',
                }),
            )

            act(() => {
                setValue('firstName', 'test2')
                setTimeout(() => {
                    expect(result.current).toBe('test2')
                    done()
                })
            })
        }))
})
