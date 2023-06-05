import React from 'react'

import {Field, FormikProvider, useFormik} from '../../../libs/formeasy/src'
import {Logic} from './components/Logic'

function Test(props: Record<string, unknown>) {
  // console.log(props)
  return <div>123</div>
}

window.__DEV__ = true

function App() {
  const formik = useFormik({
    initialValues: {
      firstName: 'xn',
      lastName: '',
      email: '',
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2))
    },
    watch: {
      lastName: (value, formValue) => {
        formValue.firstName = value + 'xxx'
        // formValue.firstName =  value + 'xxx'
      },
    },
  })

  React.useEffect(() => {
    console.log('values: ', formik.values)
  }, [formik.values])

  return (
    <div>
      <div>123</div>
      <FormikProvider value={formik}>
        <form onSubmit={formik.handleSubmit}>
          <Logic
            name={'email'}
            exp={'form.values.lastName.length > 5'}
            expTrue={{k: 1}}
            expFalse={{k: 2}}
          >
            <Test/>
          </Logic>
          <Field
            type='text'
            name='lastName'
            placeholder='lastName'
          />
        </form>
      </FormikProvider>
      <button
        onClick={() =>
          formik.setValues({
            ...formik.values,
            firstName: '123',
            lastName: '123',
            email: '123',
          })
        }
      >
        test
      </button>
      'firstName' {formik.values.firstName}
    </div>
  )
}

export default App
