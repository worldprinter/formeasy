import { AstExecutor } from './evaluator'
import { Lexer, Parser } from './ng_expression'

const parser = new Parser(new Lexer())

export function expression(expression: string, context: Record<string, any> = {}) {
    const astWithSource = parser.parseSimpleBinding(expression, 'InnerSource', 0)
    if (astWithSource.errors.length > 0) {
        for (const error of astWithSource.errors) {
            console.error(error)
        }
        throw new Error('Expression parsing error')
    }
    const ast = astWithSource.ast
    const astExecutor = new AstExecutor(context)
    return { result: astExecutor.execute(ast), context: astExecutor.context }
}
