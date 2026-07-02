import { useState } from "react";

import Box from "@mui/material/Box";

import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

export default function MainLayout({ children }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <Header onMenuToggle={() => setMobileOpen((prev) => !prev)} />

      <Box
        sx={{
          display: "flex",
          minHeight: "100vh",
        }}
      >
        <Sidebar
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
        />

        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            minHeight: "100vh",
            width: "100%",
            overflowX: "hidden",
          }}
        >
          <Box
            component="main"
            sx={{
              flex: 1,
              p: { xs: 2, sm: 3 },
              mt: { xs: 7, sm: 8 },
              bgcolor: "background.default",
              color: "text.primary",
              transition: "0.3s ease",
            }}
          >
            {children}
          </Box>

          <Footer />
        </Box>
      </Box>
    </>
  );
}