import React, { useEffect } from 'react'

import { Field, FormikConfig, FormikProvider, FormikValues, useFormik } from '../../../libs/formeasy/src'
import { Logic } from './components/Logic'

function Test(props: Record<string, unknown>) {
    // console.log(props)
    return <div>123</div>
}

window.__DEV__ = true
function useWatchFormik<Values extends FormikValues = FormikValues>(props: FormikConfig<Values> & { watch: boolean }) {
    const formik = useFormik(props)
    const [watch, setWatch] = React.useState(props.watch)

    useEffect(() => {
        if (watch) {
            console.log(1)
        }
    }, [watch, formik.setValues])
    return {
        ...formik,
        setWatch,
    }
}

function App() {
    const formik = useWatchFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
        },
        onSubmit: (values) => {
            alert(JSON.stringify(values, null, 2))
        },
        watch: true,
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
                        expTrue={{ k: 1 }}
                        expFalse={{ k: 2 }}
                    >
                        <Test />
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
        </div>
    )
}

export default App
