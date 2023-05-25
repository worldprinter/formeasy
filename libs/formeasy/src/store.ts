import { get } from 'lodash'
import { createStore } from 'zustand'

export type Store = {
    data: Record<string, any>
}

export type GlobalStore = {
    forms: Record<string, Store>
    get: (id: string) => Store
    set: (id: string, data: Record<string, any>) => void
}

export const globalStore = createStore<GlobalStore>((set, getState) => ({
    forms: {},
    get: (id) => {
        return get(getState().forms, id)
    },
    set: (id, data) => {
        set((state) => ({
            forms: {
                ...state.forms,
                [id]: {
                    data,
                },
            },
        }))
    },
}))
