import React from "react";

import {
  Container,
  Typography,
  Button,
} from "@mui/material";

class ErrorBoundary extends React.Component {

  constructor(props) {

    super(props);

    this.state = {
      hasError: false,
    };

  }

  static getDerivedStateFromError() {

    return {
      hasError: true,
    };

  }

  componentDidCatch(error, errorInfo) {

    console.error(
      "Application Error:",
      error
    );

    console.error(errorInfo);

  }

  render() {

    if (this.state.hasError) {

      return (

        <Container
          sx={{
            mt: 10,
            textAlign: "center",
          }}
        >

          <Typography
            variant="h4"
            gutterBottom
          >
            Oops! Something went wrong.
          </Typography>

          <Typography
            sx={{
              mb: 3,
            }}
          >
            Please reload the application.
          </Typography>

          <Button
            variant="contained"
            onClick={() =>
              window.location.reload()
            }
          >
            Reload
          </Button>

        </Container>

      );

    }

    return this.props.children;

  }

}

export default ErrorBoundary;