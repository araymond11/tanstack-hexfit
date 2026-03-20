import { createFileRoute } from '@tanstack/react-router'
import { useAtom } from 'jotai'
import { localeAtom } from '#/store/locale-atom'
import { ConnectionInformationCard } from '#/features/settings/components/connection-information-card'
import { useGetUserQuery, userQueryOptions } from '#/features/settings/hooks/use-get-user-query'

export const Route = createFileRoute('/settings')({
  loader: ({ context: { queryClient } }) => queryClient.ensureQueryData(userQueryOptions),
  component: SettingsPage,
})

function SettingsPage() {
  const { data: user, error } = useGetUserQuery()
  const [locale, setLocale] = useAtom(localeAtom)

  const toggleLanguage = () => setLocale((prev) => (prev === 'fr' ? 'en' : 'fr'))

  return (
    <div className="flex flex-col items-center">
      {/* Page header */}
      <div className="mb-8 flex w-full max-w-6xl items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold">Paramètres</h1>
          <p className="mt-1 text-gray-500">Gérez vos informations personnelles et préférences.</p>
        </div>
        <button
          onClick={toggleLanguage}
          title="Changer de langue"
          className="rounded border border-current px-4 py-2 text-sm font-medium"
        >
          {locale === 'fr' ? '🇬🇧 English' : '🇫🇷 Français'}
        </button>
      </div>

      {/* Cards column */}
      <div className="flex w-full max-w-3xl flex-col gap-6">
        {error && (
          <p className="text-red-500">
            {error instanceof Error ? error.message : 'Erreur'}
          </p>
        )}
        {user && <ConnectionInformationCard user={user} />}
      </div>
    </div>
  )
}
