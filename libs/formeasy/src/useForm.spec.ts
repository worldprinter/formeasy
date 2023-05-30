import { zodResolver } from '@hookform/resolvers/zod'
import { act, renderHook } from '@testing-library/react'
import { describe } from 'vitest'
import { z } from 'zod'

import { useForm } from './useForm'

const schema = z.object({
    name: z.string().min(3).max(10),
    age: z.number().min(18).max(99),
})

describe('base use', () => {
    it('should work', () =>
        new Promise<void>((done) => {
            const { result } = renderHook(() =>
                useForm({
                    resolver: zodResolver(schema),
                    defaultValues: {
                        name: 'test',
                        age: 18,
                    },
                }),
            )

            act(() => {
                result.current.handleSubmit((data) => {
                    expect(data).toEqual({
                        name: 'test',
                        age: 18,
                    })
                    done()
                })()
            })
        }))
})

describe('transform', () => {
    it('happy path', () =>
        new Promise<void>((done) => {
            const { result } = renderHook(() =>
                useForm({
                    resolver: zodResolver(schema),
                    defaultValues: {
                        name: 'test',
                        age: 18,
                    },
                    transform: {
                        age: (value) => value + 1,
                    },
                }),
            )
            act(() => {
                result.current.handleSubmit((data) => {
                    expect(data).toEqual({
                        name: 'test',
                        age: 19,
                    })
                    done()
                })()
            })
        }))

    describe('should work with string transform', () => {
        it('should be value transform to string', () =>
            new Promise<void>((done) => {
                const { result } = renderHook(() =>
                    useForm({
                        resolver: zodResolver(schema),
                        defaultValues: {
                            name: 'test',
                            age: 18,
                        },
                        transform: {
                            age: 'string',
                        },
                    }),
                )

                act(() => {
                    result.current.handleSubmit((data) => {
                        expect(data).toEqual({
                            name: 'test',
                            age: '18',
                        })
                        done()
                    })()
                })
            }))
        it('should be value transform to number', () =>
            new Promise<void>((done) => {
                const { result } = renderHook(() =>
                    useForm({
                        resolver: zodResolver(schema),
                        defaultValues: {
                            name: '123',
                            age: 18,
                        },
                        transform: {
                            name: 'number',
                        },
                    }),
                )

                act(() => {
                    result.current.handleSubmit((data) => {
                        expect(data).toEqual({
                            name: 123,
                            age: 18,
                        })
                        done()
                    })()
                })
            }))
    })
})
