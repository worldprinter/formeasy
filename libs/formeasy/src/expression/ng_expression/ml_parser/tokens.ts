/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import type { ParseSourceSpan } from '../parse_util'

export const enum TokenType {
    TAG_OPEN_START,
    TAG_OPEN_END,
    TAG_OPEN_END_VOID,
    TAG_CLOSE,
    INCOMPLETE_TAG_OPEN,
    TEXT,
    ESCAPABLE_RAW_TEXT,
    RAW_TEXT,
    INTERPOLATION,
    ENCODED_ENTITY,
    COMMENT_START,
    COMMENT_END,
    CDATA_START,
    CDATA_END,
    ATTR_NAME,
    ATTR_QUOTE,
    ATTR_VALUE_TEXT,
    ATTR_VALUE_INTERPOLATION,
    DOC_TYPE,
    EXPANSION_FORM_START,
    EXPANSION_CASE_VALUE,
    EXPANSION_CASE_EXP_START,
    EXPANSION_CASE_EXP_END,
    EXPANSION_FORM_END,
    EOF,
}

export type Token =
    | TagOpenStartToken
    | TagOpenEndToken
    | TagOpenEndVoidToken
    | TagCloseToken
    | IncompleteTagOpenToken
    | TextToken
    | InterpolationToken
    | EncodedEntityToken
    | CommentStartToken
    | CommentEndToken
    | CdataStartToken
    | CdataEndToken
    | AttributeNameToken
    | AttributeQuoteToken
    | AttributeValueTextToken
    | AttributeValueInterpolationToken
    | DocTypeToken
    | ExpansionFormStartToken
    | ExpansionCaseValueToken
    | ExpansionCaseExpressionStartToken
    | ExpansionCaseExpressionEndToken
    | ExpansionFormEndToken
    | EndOfFileToken

export type InterpolatedTextToken = TextToken | InterpolationToken | EncodedEntityToken

export type InterpolatedAttributeToken = AttributeValueTextToken | AttributeValueInterpolationToken | EncodedEntityToken

export type TokenBase = {
    type: TokenType
    parts: string[]
    sourceSpan: ParseSourceSpan
}

export type TagOpenStartToken = {
    type: TokenType.TAG_OPEN_START
    parts: [prefix: string, name: string]
} & TokenBase

export type TagOpenEndToken = {
    type: TokenType.TAG_OPEN_END
    parts: []
} & TokenBase

export type TagOpenEndVoidToken = {
    type: TokenType.TAG_OPEN_END_VOID
    parts: []
} & TokenBase

export type TagCloseToken = {
    type: TokenType.TAG_CLOSE
    parts: [prefix: string, name: string]
} & TokenBase

export type IncompleteTagOpenToken = {
    type: TokenType.INCOMPLETE_TAG_OPEN
    parts: [prefix: string, name: string]
} & TokenBase

export type TextToken = {
    type: TokenType.TEXT | TokenType.ESCAPABLE_RAW_TEXT | TokenType.RAW_TEXT
    parts: [text: string]
} & TokenBase

export type InterpolationToken = {
    type: TokenType.INTERPOLATION
    parts: [startMarker: string, expression: string, endMarker: string] | [startMarker: string, expression: string]
} & TokenBase

export type EncodedEntityToken = {
    type: TokenType.ENCODED_ENTITY
    parts: [decoded: string, encoded: string]
} & TokenBase

export type CommentStartToken = {
    type: TokenType.COMMENT_START
    parts: []
} & TokenBase

export type CommentEndToken = {
    type: TokenType.COMMENT_END
    parts: []
} & TokenBase

export type CdataStartToken = {
    type: TokenType.CDATA_START
    parts: []
} & TokenBase

export type CdataEndToken = {
    type: TokenType.CDATA_END
    parts: []
} & TokenBase

export type AttributeNameToken = {
    type: TokenType.ATTR_NAME
    parts: [prefix: string, name: string]
} & TokenBase

export type AttributeQuoteToken = {
    type: TokenType.ATTR_QUOTE
    parts: [quote: "'" | '"']
} & TokenBase

export type AttributeValueTextToken = {
    type: TokenType.ATTR_VALUE_TEXT
    parts: [value: string]
} & TokenBase

export type AttributeValueInterpolationToken = {
    type: TokenType.ATTR_VALUE_INTERPOLATION
    parts: [startMarker: string, expression: string, endMarker: string] | [startMarker: string, expression: string]
} & TokenBase

export type DocTypeToken = {
    type: TokenType.DOC_TYPE
    parts: [content: string]
} & TokenBase

export type ExpansionFormStartToken = {
    type: TokenType.EXPANSION_FORM_START
    parts: []
} & TokenBase

export type ExpansionCaseValueToken = {
    type: TokenType.EXPANSION_CASE_VALUE
    parts: [value: string]
} & TokenBase

export type ExpansionCaseExpressionStartToken = {
    type: TokenType.EXPANSION_CASE_EXP_START
    parts: []
} & TokenBase

export type ExpansionCaseExpressionEndToken = {
    type: TokenType.EXPANSION_CASE_EXP_END
    parts: []
} & TokenBase

export type ExpansionFormEndToken = {
    type: TokenType.EXPANSION_FORM_END
    parts: []
} & TokenBase

export type EndOfFileToken = {
    type: TokenType.EOF
    parts: []
} & TokenBase
