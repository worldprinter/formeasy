import { omit } from 'lodash'
import React from 'react'

import { expression } from '../expression'
import type { FieldAttributes } from '../formik'
import { useField, useFormikContext } from '../formik'

export type LogicFieldProps<T> = {
  exp?: string
  expTrue?: Partial<T>
  expFalse?: Partial<T>
} & FieldAttributes<T>

export const Logic = React.memo(function LogicField<T>(props: React.PropsWithChildren<LogicFieldProps<T>>) {
  const hookProps = React.useMemo(() => {
    // eslint-disable-next-line
    // @ts-ignore
    return omit(props, ['exp', 'expTrue', 'expFalse', 'children']) as FieldAttributes<T>
  }, [props])
  const { exp, expTrue, expFalse } = props

  const form = useFormikContext()
  const [field, meta, helper] = useField(hookProps)
  const [logicProps, setLogicProps] = React.useState<FieldAttributes<T>>(hookProps as FieldAttributes<T>)

  React.useEffect(() => {
    if(!exp || !exp.trim().length){
      setLogicProps({...hookProps} as FieldAttributes<T>)
      return
    }

    const { result } = expression(exp, {
      field,
      meta,
      helper,
      form,
    })

    if (result) {
      setLogicProps({ ...hookProps, ...(expTrue || {}) } as FieldAttributes<T>)
    } else {
      setLogicProps({ ...hookProps, ...(expFalse || {}) } as FieldAttributes<T>)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [exp, expFalse, expTrue, form, hookProps])

  return React.cloneElement(
    // eslint-disable-next-line
    props.children as React.ReactElement<any>,
    logicProps,
  )
})
