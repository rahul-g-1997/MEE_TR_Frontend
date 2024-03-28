import { Container, Grid } from "@mui/material";
import { Signin } from "../../components/index";

export default function Home() {
  return (
    <Container maxWidth="md" sx={{ marginTop: 3 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          
        </Grid>
        <Grid item xs={12} md={6}>
          <Signin />
        </Grid>
      </Grid>
    </Container>
  );
}
