import type { FieldValues } from './fields'

type Expression = string

export type ReactionValue = {
  display?: Expression
  value?: Expression
}


export type Reaction<Field extends FieldValues> = {
  [Key in keyof Field]?: ReactionValue
}
