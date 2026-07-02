import React from "react";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

function KPICard({
  title,
  value,
}) {

  const blueColor = "#1976d2";

  return (

    <Card
      elevation={3}
      sx={{
        bgcolor: "background.paper",
        color: "text.primary",
        borderLeft: "5px solid",
        borderColor: blueColor,
        borderRadius: 3,
        transition: "0.3s",

        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: 6,
        },
      }}
    >

      <CardContent>

        <Typography
          variant="body2"
          color="text.secondary"
          gutterBottom
        >
          {title}
        </Typography>

        <Typography
          variant="h4"
          fontWeight={700}
          color="text.primary"
        >
          {value}
        </Typography>

      </CardContent>

    </Card>

  );

}

export default React.memo(KPICard);