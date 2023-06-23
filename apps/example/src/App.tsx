import { set } from 'lodash'
import React from 'react'

import { Field, FormikProvider, Logic, useFormik } from '@worldprinter/formeasy'

function Test(props: Record<string, unknown>) {
  console.log(props)
  return <div>123</div>
}

function Select({data,value}:any){
  return (
    <select>
      {
        data.map((i:any)=>{
          return (
            <option selected={value === i.value}  value={i.value}>
              {i.label}
            </option>
          )
        })
      }
    </select>
  )
}

// window.__DEV__ = true
set(window, '__DEV__', true)

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
            // name={'email'}
            // exp={'form.values.lastName.length > 5'}
            // expTrue={
            //   {
            //     data:[
            //       {
            //         label:3,
            //         value:3
            //       },
            //       {
            //         label:4,
            //         value:4
            //       }
            //     ]
            //   }
            // }
            // expFalse={{ a: 2 }}
          >
            <Select data={[
              {
                label:1,
                value:1
              },
              {
                label:2,
                value:2
              }
            ]}/>
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
