import {
  Box,
  Typography,
  Button,
} from "@mui/material";

export default function ErrorState({

  title = "Something went wrong",

  message = "Please try again later.",

  onRetry,

}) {

  return (

    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        py: 6,
      }}
    >

      <Typography
        variant="h5"
        gutterBottom
      >
        {title}
      </Typography>

      <Typography
        color="text.secondary"
        sx={{ mb: 3 }}
      >
        {message}
      </Typography>

      {onRetry && (

        <Button
          variant="contained"
          onClick={onRetry}
        >
          Retry
        </Button>

      )}

    </Box>

  );

}