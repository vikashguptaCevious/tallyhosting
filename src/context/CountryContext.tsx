import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import countriesData from '../data/countries.json'

export type CountryId = 'india' | 'saudi-arabia' | 'other'
export type ContentKey = 'india' | 'saudiArabia'

type CountryOption = (typeof countriesData.options)[number]
type CountryContent = (typeof countriesData.content)[ContentKey]

type CountryContextValue = {
  countryId: CountryId
  setCountryId: (id: CountryId) => void
  options: CountryOption[]
  selectedOption: CountryOption
  content: CountryContent
}

const STORAGE_KEY = 'tallyhosting-country'

function detectDefaultCountry(): CountryId {
  try {
    const saved = localStorage.getItem(STORAGE_KEY) as CountryId | null
    if (saved && countriesData.options.some((o) => o.id === saved)) {
      return saved
    }
  } catch {
    /* ignore */
  }

  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone
    if (tz === 'Asia/Riyadh' || tz === 'Asia/Jeddah') {
      return 'saudi-arabia'
    }
  } catch {
    /* ignore */
  }

  return countriesData.defaultCountryId as CountryId
}

const CountryContext = createContext<CountryContextValue | null>(null)

export function CountryProvider({ children }: { children: ReactNode }) {
  const [countryId, setCountryIdState] = useState<CountryId>(detectDefaultCountry)

  useEffect(() => {
    document.documentElement.dataset.country = countryId
    return () => {
      delete document.documentElement.dataset.country
    }
  }, [countryId])

  const setCountryId = useCallback((id: CountryId) => {
    setCountryIdState(id)
    try {
      localStorage.setItem(STORAGE_KEY, id)
    } catch {
      /* ignore */
    }
  }, [])

  const value = useMemo(() => {
    const selectedOption =
      countriesData.options.find((o) => o.id === countryId) ?? countriesData.options[0]
    const contentKey = selectedOption.contentKey as ContentKey
    const content = countriesData.content[contentKey]

    return {
      countryId,
      setCountryId,
      options: countriesData.options as CountryOption[],
      selectedOption,
      content,
    }
  }, [countryId, setCountryId])

  return <CountryContext.Provider value={value}>{children}</CountryContext.Provider>
}

export function useCountry() {
  const ctx = useContext(CountryContext)
  if (!ctx) {
    throw new Error('useCountry must be used within CountryProvider')
  }
  return ctx
}
