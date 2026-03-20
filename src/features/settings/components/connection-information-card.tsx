import { useState } from 'react'
import { Button, Card, CardContent, Divider } from '@mui/material'
import type { User } from '#/types/user'
import { ConnectionInformationEditView } from './connection-information-edit-view'
import { ConnectionInformationReadView } from './connection-information-read-view'

type Props = {
  user: User
}

export function ConnectionInformationCard({ user: initialUser }: Props) {
  const [user, setUser] = useState<User>(initialUser)
  const [isEditing, setIsEditing] = useState(false)

  const handleSave = (updated: Partial<User>) => {
    setUser((prev) => ({ ...prev, ...updated }))
    setIsEditing(false)
  }

  return (
    <Card>
      <div className="flex items-center justify-between px-6 py-4">
        <span className="text-base font-medium">Informations de connexion</span>
        {!isEditing && (
          <Button variant="contained" color="primary" onClick={() => setIsEditing(true)}>
            Modifier
          </Button>
        )}
      </div>

      <Divider />

      <CardContent className="px-6 py-4">
        {isEditing ? (
          <ConnectionInformationEditView
            user={user}
            onSave={handleSave}
            onCancel={() => setIsEditing(false)}
          />
        ) : (
          <ConnectionInformationReadView user={user} />
        )}
      </CardContent>
    </Card>
  )
}
