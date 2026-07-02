import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        height: { xs: "auto", sm: 56 },

        px: { xs: 2, sm: 4 },
        py: { xs: 2, sm: 0 },

        borderTop: "1px solid",

        borderColor: "divider",

        bgcolor: "background.paper",

        display: "flex",

        justifyContent: "space-between",

        alignItems: { xs: "flex-start", sm: "center" },

        color: "text.secondary",

        fontSize: 13,

        flexWrap: "wrap",
        gap: 1,
      }}
    >
      <Typography variant="body2">
        © 2026 e-GRCP Platform
      </Typography>

      <Typography variant="body2">
        Enterprise Governance, Risk, Compliance & Procurement
      </Typography>

      <Typography variant="body2">
        Version 1.0
      </Typography>
    </Box>
  );
}