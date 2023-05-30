import type { FieldValues } from './fields'

type Expression = string

export type Reaction<Field extends FieldValues> = {
    [Key in keyof Field]?: {
        display?: Expression
        value?: Expression
    }
}
