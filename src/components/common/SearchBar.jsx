import TextField from "@mui/material/TextField";

export default function SearchBar({

  label = "Search",

  value,

  onChange,

  placeholder = "",

  fullWidth = true,

  sx = {},

}) {

  return (

    <TextField

      label={label}

      placeholder={placeholder}

      value={value}

      onChange={onChange}

      fullWidth={fullWidth}

      sx={sx}

    />

  );

}