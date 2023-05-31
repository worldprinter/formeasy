import {describe, expect, it} from 'vitest'

import type {Reaction} from '../types'
import {getDependenceWithExpression, getDependencies} from './reaction'
import {act, renderHook} from "@testing-library/react";
import {useForm} from "@worldprinter/formeasy";
import {zodResolver} from '@hookform/resolvers/zod'
import {z} from 'zod'

type Data = {
  name: string
  age: number
  realAge: number
}

const schema = z.object({
  name: z.string(),
  age: z.number(),
  realAge: z.number(),
})

const data: Reaction<Data> = {
  name: {
    display: 'true',
  },
  realAge: {
    value: 'age+1',
  },
}

describe('base use', () => {
  it('should work getDependence', () => {
    expect(getDependenceWithExpression('age+1')).toEqual({
      dependencies: ['age'],
      expression: 'age+1',
    })
    expect(getDependenceWithExpression('age+1+name')).toEqual({
      dependencies: ['age', 'name'],
      expression: 'age+1+name',
    })
  })

  it('should work getDependencies', () => {
    expect(getDependencies(data)).toEqual([
      {
        name: 'name',
        display: {
          dependencies: ['true'],
          expression: 'true',
        }
      },
      {
        name: "realAge",
        value: {
          dependencies: ['age'],
          expression: 'age+1',
        },
      },
    ])
  })

  it('should work with dependencies update', () => new Promise<void>(done => {
    const {result} = renderHook(() => useForm({
      resolver: zodResolver(schema),
      defaultValues: {
        name: 'test',
        age: 1,
        realAge: 1,
      },
      reaction: {
        realAge: {
          value: "age+1"
        },
        age: {
          value: "realAge+1"
        }
      }
    }))

    act(() => {
      result.current.setValue("age", 2)
      expect(result.current.getValues("realAge")).toBe(3)
      done()
    })
  }))

})
