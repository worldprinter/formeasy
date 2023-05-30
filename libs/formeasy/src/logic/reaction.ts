// import { expression } from '../expression'
import type { FieldValues, Reaction } from '../types'
import { get, set } from '../utils'
import { getWords } from '../utils/getWords'

type DependenceValue = {
    vars: string[]
    expression: string
}

type Dependence<T extends FieldValues, Key extends keyof T> = Record<
    Key,
    {
        [K in keyof Reaction<T>[K]]?: DependenceValue
    }
>
type Dependencies<T extends FieldValues> = Array<Dependence<T, keyof T>>

export const getDependencies = <T extends FieldValues>(recation: Reaction<T>): Dependencies<T> => {
    const keys = Object.keys(recation) as Array<keyof T>
    const dependencies: Dependencies<T> = []
    for (const key of keys) {
        const value = recation[key]
        const result = {} as never as DependenceValue
        if (value) {
            const keys = Object.keys(value)
            keys.forEach((key) => {
                const itemValue = get(value, key)
                if (itemValue) {
                    set(result, key, getDependenceWithExpression(itemValue))
                }
            })
        }

        dependencies.push({
            [key]: result,
        } as never as Dependence<T, keyof T>)
    }
    return dependencies
}

export const getDependenceWithExpression = (expression: string): DependenceValue => {
    return {
        vars: getWords(expression),
        expression: expression,
    }
}
