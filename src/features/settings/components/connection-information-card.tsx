import { useState } from 'react'
import { Box, Button, Card, CardContent, Divider, Typography } from '@mui/material'
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
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          px: 3,
          py: 2,
        }}
      >
        <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
          Informations de connexion
        </Typography>
        {!isEditing && (
          <Button variant="contained" color="primary" onClick={() => setIsEditing(true)}>
            Modifier
          </Button>
        )}
      </Box>

      <Divider />

      <CardContent sx={{ px: 3, py: 2 }}>
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
