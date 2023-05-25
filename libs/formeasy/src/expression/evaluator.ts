/* eslint-disable @typescript-eslint/no-unused-vars */
import { createConsola, type ConsolaInstance } from 'consola'
import { get, last, map, reduce, result, set } from 'lodash'

import type {
    AST,
    AstVisitor,
    ASTWithSource,
    Binary,
    BindingPipe,
    Call,
    Chain,
    Conditional,
    ImplicitReceiver,
    Interpolation,
    KeyedRead,
    KeyedWrite,
    LiteralArray,
    LiteralMap,
    LiteralPrimitive,
    NonNullAssert,
    PrefixNot,
    PropertyRead,
    PropertyWrite,
    SafeCall,
    SafeKeyedRead,
    SafePropertyRead,
    ThisReceiver,
    Unary,
} from './ng_expression'

export class AstExecutor implements AstVisitor {
    context: any
    isDebugger: boolean
    logger: ConsolaInstance

    constructor(context: any, debug = false) {
        this.context = context
        this.isDebugger = debug
        this.logger = createConsola({ level: debug ? 5 : 0 })
    }

    execute(ast: AST): any {
        this.logger.debug('execute', ast)
        return ast.visit(this)
    }

    visitBinary(ast: Binary, context?: any): any {
        const left = ast.left.visit(this)
        const right = ast.right.visit(this)

        this.logger.debug('visitBinary', ast.operation, left, right)

        switch (ast.operation) {
            case '+':
                return left + right
            case '-':
                return left - right
            case '*':
                return left * right
            case '/':
                return left / right
            case '%':
                return left % right
            case '&&':
                return left && right
            case '||':
                return left || right
            case '==':
                return left == right
            case '!=':
                return left != right
            case '===':
                return left === right
            case '!==':
                return left !== right
            case '<':
                return left < right
            case '>':
                return left > right
            case '<=':
                return left <= right
            case '>=':
                return left >= right
            default:
                throw new Error(`Unsupported operation: ${ast.operation}`)
        }
    }

    visitChain(ast: Chain, context: any): any {
        this.logger.debug('visitChain', ast)

        return last(ast.expressions.map((expr) => expr.visit(this)))
    }

    visitConditional(ast: Conditional, context: any): any {
        const condition = ast.condition.visit(this)
        const conditionAst = result(ast, condition ? 'trueExp' : 'falseExp') as AST

        this.logger.debug('visitConditional', condition, conditionAst)

        return conditionAst.visit(this)
    }

    visitInterpolation(ast: Interpolation, context: any): any {
        const values = ast.expressions.map((expr) => expr.visit(this))

        this.logger.debug('visitInterpolation', ast.strings, values)

        return reduce(ast.strings, (acc, str, idx) => acc + str + (values[idx] || ''), '')
    }

    visitLiteralArray(ast: LiteralArray, context: any): any {
        this.logger.debug('visitLiteralArray', ast)
        return map(ast.expressions, (expr) => expr.visit(this))
    }

    visitLiteralMap(ast: LiteralMap, context: any): any {
        this.logger.debug('visitLiteralMap', ast)

        return reduce(
            ast.keys,
            (obj, key, idx) => {
                set(obj, key.key, ast.values[idx].visit(this))
                return obj
            },
            {},
        )
    }

    visitPipe(ast: BindingPipe, context: any): any {
        const pipe = get(this.context, ast.name)
        const args = map(ast.args, (arg) => arg.visit(this))

        this.logger.debug('visitPipe', ast, pipe, args)

        return pipe.transform(ast.exp.visit(this), ...args)
    }

    visitPropertyRead(ast: PropertyRead, context: any): any {
        const receiver = ast.receiver.visit(this)

        this.logger.debug('visitPropertyRead', ast, receiver)

        return get(receiver, ast.name)
    }

    visitKeyedRead(ast: KeyedRead, context: any): any {
        const receiver = ast.receiver.visit(this)
        const key = ast.key.visit(this)

        this.logger.debug('visitKeyedRead', ast, receiver, key)

        return get(receiver, key)
    }

    visitKeyedWrite(ast: KeyedWrite, context: any): any {
        const receiver = ast.receiver.visit(this)
        const key = ast.key.visit(this)
        const value = ast.value.visit(this)
        set(receiver, key, value)

        this.logger.debug('visitKeyedWrite', ast, receiver, key, value)

        return value
    }

    visitPropertyWrite(ast: PropertyWrite, context: any): any {
        const receiver = ast.receiver.visit(this)
        const value = ast.value.visit(this)
        set(receiver, ast.name, value)

        this.logger.debug('visitPropertyWrite', ast, receiver, value)

        return value
    }

    visitSafeKeyedRead(ast: SafeKeyedRead, context: any): any {
        const receiver = ast.receiver.visit(this)
        if (receiver == null) {
            this.logger.debug('visitSafeKeyedRead', ast, receiver)

            return null
        }
        const key = ast.key.visit(this)

        this.logger.debug('visitSafeKeyedRead', ast, receiver, key)

        return get(receiver, key)
    }

    visitSafePropertyRead(ast: SafePropertyRead, context: any): any {
        const receiver = ast.receiver.visit(this)
        if (receiver == null) {
            this.logger.debug('visitSafePropertyRead', ast, receiver)

            return null
        }

        this.logger.debug('visitSafePropertyRead', ast, receiver)

        return get(receiver, ast.name)
    }

    visitImplicitReceiver(ast: ImplicitReceiver, context: any): any {
        this.logger.debug('visitImplicitReceiver', ast)
        return this.context
    }

    visitLiteralPrimitive(ast: LiteralPrimitive, context: any): any {
        this.logger.debug('visitLiteralPrimitive', ast)
        return ast.value
    }

    visitASTWithSource(ast: ASTWithSource, context: any): any {
        this.logger.debug('visitASTWithSource', ast)
        return ast.visit(this)
    }

    visitCall(ast: Call, context: any): any {
        const receiver = ast.receiver.visit(this)
        const args = ast.args.map((arg) => arg.visit(this))

        this.logger.debug('visitCall', ast, receiver, args)

        return receiver.apply(receiver, args)
    }

    visitNonNullAssert(ast: NonNullAssert, context: any): any {
        const value = ast.expression.visit(this)
        if (value === null || value === undefined) {
            throw new Error('Non-null assertion failed')
        }

        this.logger.debug('visitNonNullAssert', ast, value)

        return value
    }

    visitPrefixNot(ast: PrefixNot, context: any): any {
        this.logger.debug('visitPrefixNot', ast)

        return !ast.expression.visit(this)
    }

    visitSafeCall(ast: SafeCall, context: any): any {
        const receiver = ast.receiver.visit(this)
        if (receiver == null) {
            return null
        }
        const args = ast.args.map((arg) => arg.visit(this))

        this.logger.debug('visitSafeCall', ast, receiver, args)

        return receiver.apply(receiver, args)
    }

    visitThisReceiver(ast: ThisReceiver, context: any): any {
        this.logger.debug('visitThisReceiver', ast)

        return this.context
    }

    visitUnary(ast: Unary, context: any): any {
        const value = ast.expr.visit(this)

        this.logger.debug('visitUnary', ast, value)

        switch (ast.operator) {
            case '+':
                return +value
            case '-':
                return -value
            default:
                throw new Error(`Unsupported unary operator: ${ast.operator}`)
        }
    }
}
