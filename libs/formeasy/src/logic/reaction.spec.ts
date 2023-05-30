import { describe, it } from 'vitest'

import type { Reaction } from '../types'
import { getDependenceWithExpression, getDependencies } from './reaction'

type Data = {
    name: string
    age: number
    realAge: number
}

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
            vars: ['age'],
            expression: 'age+1',
        })
        expect(getDependenceWithExpression('age+1+name')).toEqual({
            vars: ['age', 'name'],
            expression: 'age+1+name',
        })
    })

    it('should work getDependencies', () => {
        expect(getDependencies(data)).toEqual([
            {
                name: {
                    display: {
                        vars: ['true'],
                        expression: 'true',
                    },
                },
            },
            {
                realAge: {
                    value: {
                        vars: ['age'],
                        expression: 'age+1',
                    },
                },
            },
        ])
    })
})
