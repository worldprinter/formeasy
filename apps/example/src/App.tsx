import React from 'react'

import { Field, FormikProvider, Logic, useFormik } from '@worldprinter/formeasy'

function Test(props: Record<string, unknown>) {
    console.log(props)
    return <div>123</div>
}

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
                        expTrue={{ a: 1 }}
                        // expFalse={{ a: 2 }}
                    >
                        <Test
                            a='3'
                            b='4'
                        />
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
