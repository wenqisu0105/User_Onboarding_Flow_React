import { Button, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  button: {
    backgroundColor: "#3A8DFF",
    marginTop: "20px",
    marginBottom: "30px",
    color: "white",
  },
  disabledButton: {
    backgroundColor: "lightgray",
    color: "white",
    marginTop: "20px",
    marginBottom: "30px",
  },
});

const NavigationButtons = ({
  currentStep,
  stepsLength,
  handlePrevious,
  handleNextClick,
  handleFinish,
  areRequiredFieldsFilled,
}) => {
  const classes = useStyles();
  return (
    <Grid container justifyContent="space-between">
      <Grid item>
        {currentStep !== 0 && (
          <Button className={classes.button} onClick={handlePrevious}>
            Back
          </Button>
        )}
      </Grid>
      <Grid item>
        {currentStep < stepsLength - 1 && (
          <Button
            className={
              areRequiredFieldsFilled ? classes.button : classes.disabledButton
            }
            onClick={handleNextClick}
          >
            Next
          </Button>
        )}
        {currentStep === stepsLength - 1 && (
          <Button
            className={
              areRequiredFieldsFilled ? classes.button : classes.disabledButton
            }
            onClick={handleFinish}
          >
            Finish
          </Button>
        )}
      </Grid>
    </Grid>
  );
};

export default NavigationButtons;
