import React, { useEffect, useState } from "react";
import { Grid, Box } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import Field from "./Fields";
import NavigationButtons from "./NavigationButtons";

const useStyles = makeStyles({
  root: {
    backgroundColor: "#F7F9FD",
    width: "600px",
    marginTop: "20px",
    margin: "0 auto",
    padding: "0 20px",
  },
  errorMessage: {
    height: "20px",
    color: "#FF3A3A",
  },
});

const Onboarding = () => {
  const history = useHistory();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({});
  const [steps, setSteps] = useState([]);
  const [error, setError] = useState("");
  const classes = useStyles();

  const handleNextClick = () => {
    if (areRequiredFieldsFilled()) {
      setError("");
      setCurrentStep(currentStep + 1);
    } else {
      setError("Please fill out all required fields before proceeding.");
    }
  };

  const handlePrevious = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleFinish = () => {
    if (areRequiredFieldsFilled()) {
      setError("");
      history.push("/home");
    } else {
      setError("Please fill out all required fields before proceeding.");
    }
  };

  const areRequiredFieldsFilled = () => {
    const currentStepFields = steps[currentStep];
    return (
      currentStepFields &&
      currentStepFields.every((field) => {
        return (
          !field.required ||
          (field.required &&
            formData[field.name] != null &&
            formData[field.name] !== "")
        );
      })
    );
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  useEffect(() => {
    axios
      .get("/api/onboarding")
      .then((response) => {
        setSteps(response.data.steps);
      })
      .catch((error) => {
        console.error("Couldn't fetch data from backend", error);
      });
  }, []);

  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      className={classes.root}
    >
      {steps[currentStep]?.map((field) => (
        <Field
          key={field.name}
          field={field}
          handleInputChange={handleInputChange}
          formData={formData}
        />
      ))}
      <div className={classes.errorMessage}>{error}</div>
      <Box>
        <NavigationButtons
          currentStep={currentStep}
          stepsLength={steps.length}
          handlePrevious={handlePrevious}
          handleNextClick={handleNextClick}
          handleFinish={handleFinish}
          areRequiredFieldsFilled={areRequiredFieldsFilled()}
        />
      </Box>
    </Grid>
  );
};

export default Onboarding;
