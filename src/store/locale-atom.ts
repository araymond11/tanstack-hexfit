import { atom } from 'jotai'

export type Locale = 'fr' | 'en'

export const localeAtom = atom<Locale>('fr')
