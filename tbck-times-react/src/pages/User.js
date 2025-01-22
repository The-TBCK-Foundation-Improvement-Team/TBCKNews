import { Container, Typography, TextField, Button, Box } from "@mui/material";
import "../css/User.css";

function User() {
  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        padding: 4,
      }}
    >
      <Typography variant="h4" textAlign="center" gutterBottom>
        User Profile
      </Typography>
      <Box
        sx={{
          width: "100%",
          boxShadow: 3,
          borderRadius: 2,
          padding: 3,
          backgroundColor: "background.paper",
        }}
      >
        <form>
          <TextField
            label="First Name"
            variant="outlined"
            fullWidth
            margin="normal"
            defaultValue="John"
          />
          <TextField
            label="Last Name"
            variant="outlined"
            fullWidth
            margin="normal"
            defaultValue="Doe"
          />
          <TextField
            label="Email"
            type="email"
            variant="outlined"
            fullWidth
            margin="normal"
            defaultValue="johndoe@example.com"
          />
          <TextField
            label="Phone Number"
            type="tel"
            variant="outlined"
            fullWidth
            margin="normal"
            defaultValue="(123) 456-7890"
          />
          <TextField
            label="Address"
            variant="outlined"
            fullWidth
            margin="normal"
            defaultValue="123 Main St, Anytown, USA"
          />
          <Box sx={{ display: "flex", justifyContent: "space-between", marginTop: 3 }}>
            <Button variant="contained" color="primary">
              Save Changes
            </Button>
            <Button variant="outlined" color="secondary">
              Cancel
            </Button>
          </Box>
        </form>
      </Box>
    </Container>
  );
}

export default User;
