/* eslint-disable @typescript-eslint/no-explicit-any,eqeqeq */
import {
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
} from './parser/ast';
import _ from 'lodash';

export class AstExecutor implements AstVisitor {
  context: any;

  constructor(context: any) {
    this.context = context;
  }

  execute(ast: AST): any {
    return ast.visit(this);
  }

  visitBinary(ast: Binary, context?: any): any {
    const left = ast.left.visit(this);
    const right = ast.right.visit(this);

    switch (ast.operation) {
      case '+':
        return left + right;
      case '-':
        return left - right;
      case '*':
        return left * right;
      case '/':
        return left / right;
      case '%':
        return left % right;
      case '&&':
        return left && right;
      case '||':
        return left || right;
      case '==':
        return left == right;
      case '!=':
        return left != right;
      case '===':
        return left === right;
      case '!==':
        return left !== right;
      case '<':
        return left < right;
      case '>':
        return left > right;
      case '<=':
        return left <= right;
      case '>=':
        return left >= right;
      default:
        throw new Error(`Unsupported operation: ${ast.operation}`);
    }
  }

  visitChain(ast: Chain, context: any): any {
    return _.last(ast.expressions.map((expr) => expr.visit(this)));
  }

  visitConditional(ast: Conditional, context: any): any {
    const condition = ast.condition.visit(this);
    const conditionAst = _.result(
      ast,
      condition ? 'trueExp' : 'falseExp'
    ) as AST;
    return conditionAst.visit(this);
  }

  visitInterpolation(ast: Interpolation, context: any): any {
    const values = ast.expressions.map((expr) => expr.visit(this));
    return _.reduce(
      ast.strings,
      (acc, str, idx) => acc + str + (values[idx] || ''),
      ''
    );
  }

  visitLiteralArray(ast: LiteralArray, context: any): any {
    return _.map(ast.expressions, (expr) => expr.visit(this));
  }

  visitLiteralMap(ast: LiteralMap, context: any): any {
    return _.reduce(
      ast.keys,
      (obj, key, idx) => {
        _.set(obj, key.key, ast.values[idx].visit(this));
        return obj;
      },
      {}
    );
  }

  visitPipe(ast: BindingPipe, context: any): any {
    const pipeName = ast.name;
    const pipe = _.get(this.context, pipeName);
    const args = _.map(ast.args, (arg) => arg.visit(this));
    return pipe.transform(ast.exp.visit(this), ...args);
  }

  visitPropertyRead(ast: PropertyRead, context: any): any {
    const receiver = ast.receiver.visit(this);
    return _.get(receiver, ast.name);
  }

  visitKeyedRead(ast: KeyedRead, context: any): any {
    const receiver = ast.receiver.visit(this);
    const key = ast.key.visit(this);
    return _.get(receiver, key);
  }

  visitKeyedWrite(ast: KeyedWrite, context: any): any {
    const receiver = ast.receiver.visit(this);
    const key = ast.key.visit(this);
    const value = ast.value.visit(this);
    _.set(receiver, key, value);
    return value;
  }

  visitPropertyWrite(ast: PropertyWrite, context: any): any {
    const receiver = ast.receiver.visit(this);
    const value = ast.value.visit(this);
    _.set(receiver, ast.name, value);
    return value;
  }

  visitSafeKeyedRead(ast: SafeKeyedRead, context: any): any {
    const receiver = ast.receiver.visit(this);
    if (receiver == null) {
      return null;
    }
    const key = ast.key.visit(this);
    return _.get(receiver, key);
  }

  visitSafePropertyRead(ast: SafePropertyRead, context: any): any {
    const receiver = ast.receiver.visit(this);
    if (receiver == null) {
      return null;
    }
    return _.get(receiver, ast.name);
  }

  visitImplicitReceiver(ast: ImplicitReceiver, context: any): any {
    return this.context;
  }

  visitLiteralPrimitive(ast: LiteralPrimitive, context: any): any {
    return ast.value;
  }

  visitASTWithSource(ast: ASTWithSource, context: any): any {
    return ast.visit(this);
  }

  visitCall(ast: Call, context: any): any {
    const receiver = ast.receiver.visit(this);
    const args = ast.args.map((arg) => arg.visit(this));
    return receiver.apply(receiver, args);
  }

  visitNonNullAssert(ast: NonNullAssert, context: any): any {
    const value = ast.expression.visit(this);
    if (value === null || value === undefined) {
      throw new Error('Non-null assertion failed');
    }
    return value;
  }

  visitPrefixNot(ast: PrefixNot, context: any): any {
    return !ast.expression.visit(this);
  }

  visitSafeCall(ast: SafeCall, context: any): any {
    const receiver = ast.receiver.visit(this);
    if (receiver == null) {
      return null;
    }
    const args = ast.args.map((arg) => arg.visit(this));
    return receiver.apply(receiver, args);
  }

  visitThisReceiver(ast: ThisReceiver, context: any): any {
    return this.context;
  }

  visitUnary(ast: Unary, context: any): any {
    const value = ast.expr.visit(this);
    switch (ast.operator) {
      case '+':
        return +value;
      case '-':
        return -value;
      default:
        throw new Error(`Unsupported unary operator: ${ast.operator}`);
    }
  }
}
