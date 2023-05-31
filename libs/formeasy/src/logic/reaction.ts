// import { expression } from '../expression'
import type { FieldValues, Reaction, ReactionValue } from '../types'
import { get, set } from '../utils'
import { getWords } from '../utils/getWords'

export type DependenceValue = {
  name: string
} & {
    [Key in keyof ReactionValue]?: ReactionDependence
  }

export type ReactionDependence = {
  dependencies: string[]
  expression: string
}


type Dependencies = Array<DependenceValue>

export const getDependencies = <T extends FieldValues>(recation: Reaction<T>): Dependencies => {
  const keys = Object.keys(recation) as Array<keyof T>
  const dependencies: Dependencies = []
  for (const key of keys) {
    const reactionValue = recation[key]
    const result = {} as never as DependenceValue
    if (reactionValue) {
      result.name = key as string
      const keys = Object.keys(reactionValue)
      keys.forEach((key) => {
        const itemValue = get(reactionValue, key)
        if (itemValue) {
          set(result, key, getDependenceWithExpression(itemValue))
        }
      })
    }

    dependencies.push(result)
  }
  return dependencies
}

export const getDependenceWithExpression = (expression: string): ReactionDependence => {
  return {
    dependencies: getWords(expression),
    expression: expression,
  }
}
