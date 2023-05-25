import * as React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import AutoUnregister from '../routers/autoUnregister'
import Basic from '../routers/basic'
import BasicSchemaValidation from '../routers/basicSchemaValidation'
import ConditionalField from '../routers/conditionalField'
import Controller from '../routers/controller'
import CrossFrameForm from '../routers/crossFrameForm'
import CustomSchemaValidation from '../routers/customSchemaValidation'
import DefaultValues from '../routers/defaultValues'
import { DelayError } from '../routers/delayError'
import FormState from '../routers/formState'
import FormStateWithNestedFields from '../routers/formStateWithNestedFields'
import FormStateWithSchema from '../routers/formStateWithSchema'
import IsValid from '../routers/isValid'
import ManualRegisterForm from '../routers/manualRegisterForm'
import Reset from '../routers/reset'
import ReValidateMode from '../routers/reValidateMode'
import SetError from '../routers/setError'
import SetFocus from '../routers/setFocus'
import SetValue from '../routers/setValue'
import SetValueCustomRegister from '../routers/setValueCustomRegister'
import SetValueAsyncStrictMode from '../routers/setValueStrictMode'
import SetValueWithSchema from '../routers/setValueWithSchema'
import SetValueWithTrigger from '../routers/setValueWithTrigger'
import TriggerValidation from '../routers/triggerValidation'
import UseFieldArray from '../routers/useFieldArray'
import UseFieldArrayNested from '../routers/useFieldArrayNested'
import UseFieldArrayUnregister from '../routers/useFieldArrayUnregister'
import { UseFormState } from '../routers/useFormState'
import UseWatch from '../routers/useWatch'
import UseWatchUseFieldArrayNested from '../routers/useWatchUseFieldArrayNested'
import ValidateFieldCriteria from '../routers/validateFieldCriteria'
import Watch from '../routers/watch'
import WatchDefaultValues from '../routers/watchDefaultValues'
import WatchFieldArray from '../routers/watchUseFieldArray'
import WatchUseFieldArrayNested from '../routers/watchUseFieldArrayNested'
import Welcome from '../welcome'
import '../styles.css'
import FormComponent from '../routers/form'

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path='/basic/:mode'
                    element={<Basic />}
                />
                <Route
                    path='/validate-field-criteria'
                    element={<ValidateFieldCriteria />}
                />
                <Route
                    path='/controller/:mode'
                    element={<Controller />}
                />
                <Route
                    path='/re-validate-mode/:mode/:reValidateMode'
                    element={<ReValidateMode />}
                />
                <Route
                    path='/crossFrameForm'
                    element={<CrossFrameForm />}
                />
                <Route
                    path='/manual-register-form'
                    element={<ManualRegisterForm />}
                />
                <Route
                    path='/watch'
                    element={<Watch />}
                />
                <Route
                    path='/basic-schema-validation/:mode'
                    element={<BasicSchemaValidation />}
                />
                <Route
                    path='/setError'
                    element={<SetError />}
                />
                <Route
                    path='/delayError'
                    element={<DelayError />}
                />
                <Route
                    path='/setFocus'
                    element={<SetFocus />}
                />
                <Route
                    path='/setValueWithTrigger'
                    element={<SetValueWithTrigger />}
                />
                <Route
                    path='/conditionalField'
                    element={<ConditionalField />}
                />
                <Route
                    path='/UseFieldArray/:mode'
                    element={<UseFieldArray />}
                />
                <Route
                    path='/UseFieldArrayUnregister'
                    element={<UseFieldArrayUnregister />}
                />
                <Route
                    path='/reset'
                    element={<Reset />}
                />
                <Route
                    path='/setValue'
                    element={<SetValue />}
                />
                <Route
                    path='/setValueAsyncStrictMode'
                    element={<SetValueAsyncStrictMode />}
                />
                <Route
                    path='/setValueWithSchema'
                    element={<SetValueWithSchema />}
                />
                <Route
                    path='/SetValueCustomRegister'
                    element={<SetValueCustomRegister />}
                />
                <Route
                    path='/formState/:mode'
                    element={<FormState />}
                />
                <Route
                    path='/formStateWithNestedFields/:mode'
                    element={<FormStateWithNestedFields />}
                />
                <Route
                    path='/formStateWithSchema/:mode'
                    element={<FormStateWithSchema />}
                />
                <Route
                    path='/isValid/:mode/:defaultValues'
                    element={<IsValid />}
                />
                <Route
                    path='/default-values'
                    element={<DefaultValues />}
                />
                <Route
                    path='/trigger-validation'
                    element={<TriggerValidation />}
                />
                <Route
                    path='/watch-default-values'
                    element={<WatchDefaultValues />}
                />
                <Route
                    path='/watch-field-array/:mode'
                    element={<WatchFieldArray />}
                />
                <Route
                    path='/customSchemaValidation/:mode'
                    element={<CustomSchemaValidation />}
                />
                <Route
                    path='/autoUnregister'
                    element={<AutoUnregister />}
                />
                <Route
                    path='/useWatch'
                    element={<UseWatch />}
                />
                <Route
                    path='/useFormState'
                    element={<UseFormState />}
                />
                <Route
                    path='/useFieldArrayNested'
                    element={<UseFieldArrayNested />}
                />
                <Route
                    path='/watchUseFieldArrayNested'
                    element={<WatchUseFieldArrayNested />}
                />
                <Route
                    path='/useWatchUseFieldArrayNested'
                    element={<UseWatchUseFieldArrayNested />}
                />
                <Route
                    path='/test'
                    element={<Test />}
                />
                <Route
                    path='/'
                    element={<Welcome />}
                />
                <Route
                    path='/form'
                    element={<FormComponent />}
                />
            </Routes>
        </BrowserRouter>
    )
}

export default App
