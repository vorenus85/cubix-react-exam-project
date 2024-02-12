import { Typography, Card, CardContent, Stack, Avatar } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
export default function UserInfoCard({ name }) {
  return (
    <Card>
      <CardContent>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
        >
          <Stack>
            <Typography variant="h4">{name}</Typography>
          </Stack>
          <Stack justifyContent="flex-end" direction="row">
            <Avatar>
              <PersonIcon />
            </Avatar>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}
