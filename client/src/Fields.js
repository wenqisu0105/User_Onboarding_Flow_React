import { TextField, FormControlLabel, Switch } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  field: {
    marginBottom: "40px",
    marginTop: "40px",
  },
  label: {
    "&.MuiInputLabel-shrink": {
      transform: "translate(0, -23px) scale(0.75)",
    },
  },
});

const Field = ({ field, handleInputChange, formData }) => {
  const classes = useStyles();

  switch (field.type) {
    case "text":
    case "multiline-text":
      return (
        <TextField
          InputLabelProps={{ className: classes.label }}
          key={field.name}
          label={field.label}
          type={field.type === "multiline-text" ? "text" : field.type}
          name={field.name}
          multiline={field.type === "multiline-text"}
          required={field.required}
          onChange={handleInputChange}
          value={formData[field.name] || ""}
          className={classes.field}
        />
      );
    case "yes-no":
      return (
        <FormControlLabel
          key={field.name}
          control={
            <Switch
              name={field.name}
              onChange={handleInputChange}
              checked={formData[field.name] || false}
              style={{ color: formData[field.name] ? "#3A8DFF" : undefined }}
            />
          }
          className={classes.field}
          label={field.label}
        />
      );
    default:
      return null;
  }
};

export default Field;
