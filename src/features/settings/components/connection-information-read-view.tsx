import { Box, Stack, Typography } from '@mui/material'
import PersonOutlineIcon from '@mui/icons-material/PersonOutline'
import MailOutlineIcon from '@mui/icons-material/MailOutline'
import type { User } from '#/types/user'

type Props = {
  user: User
}

export function ConnectionInformationReadView({ user }: Props) {
  return (
    <Stack spacing={2}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <PersonOutlineIcon sx={{ color: 'text.secondary' }} />
        <Box>
          <Typography variant="body2" color="text.secondary">
            Nom complet
          </Typography>
          <Typography variant="body1" sx={{ fontWeight: 700 }}>
            {user.firstname} {user.lastname}
          </Typography>
        </Box>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <MailOutlineIcon sx={{ color: 'text.secondary' }} />
        <Box>
          <Typography variant="body2" color="text.secondary">
            Adresse courriel
          </Typography>
          <Typography variant="body1" sx={{ fontWeight: 700 }}>
            {user.email}
          </Typography>
        </Box>
      </Box>
    </Stack>
  )
}
