'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { I18nextProvider as ReactI18nextProvider, initReactI18next } from 'react-i18next'
import i18next from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

// Import translations
import enTranslations from '@/locales/en.json'
import hiTranslations from '@/locales/hi.json'
import orTranslations from '@/locales/or.json'

const I18nextContext = createContext()

export function I18nextProvider({ children }) {
  const [isInitialized, setIsInitialized] = useState(false)
  const [i18nInstance, setI18nInstance] = useState(null)

  useEffect(() => {
    const initializeI18n = async () => {
      if (!i18next.isInitialized) {
        const instance = i18next
          .use(LanguageDetector)
          .use(initReactI18next)
        
        await instance.init({
          debug: false,
          fallbackLng: 'en',
          interpolation: {
            escapeValue: false,
          },
          resources: {
            en: {
              translation: enTranslations,
            },
            hi: {
              translation: hiTranslations,
            },
            or: {
              translation: orTranslations,
            },
          },
          detection: {
            order: ['localStorage', 'navigator', 'htmlTag'],
            caches: ['localStorage'],
          },
        })
        
        setI18nInstance(instance)
      } else {
        setI18nInstance(i18next)
      }
      setIsInitialized(true)
    }

    initializeI18n()
  }, [])

  if (!isInitialized || !i18nInstance) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  }

  return (
    <ReactI18nextProvider i18n={i18nInstance}>
      <I18nextContext.Provider value={i18nInstance}>
        {children}
      </I18nextContext.Provider>
    </ReactI18nextProvider>
  )
}

export const useI18next = () => {
  const context = useContext(I18nextContext)
  if (!context) {
    throw new Error('useI18next must be used within an I18nextProvider')
  }
  return context
}