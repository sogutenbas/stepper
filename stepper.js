const addCarbonFootInfo = async (event) => {
  event.preventDefault();
  const carbonFootInfo = {
    electricityHousehold: Number(event.target.electricityHousehold.value),
    isHasCar: event.target.isHasCar.checked,
    fuelType: event.target.fuelType.value,
    travelledKilometers: Number(event.target.travelledKilometers.value),
    flightCount: Number(event.target.flightCount.value),
    flightDistance: Number(event.target.flightDistance.value),
    coalConsumption: Number(event.target.coalConsumption.value),
    woodConsumption: Number(event.target.woodConsumption.value),
    meatConsumption: Number(event.target.meatConsumption.value),
    waterConsumption: Number(event.target.waterConsumption.value),
    publicTransportDistance: Number(event.target.publicTransportDistance.value),
    plantBasedPercentage: Number(event.target.plantBasedPercentage.value),
    recycling: Number(event.target.recycling.value),
    clothesFrequency: event.target.clothesFrequency.value,
    createdDate: Date.now(),
  };
  let currentUser = JSON.parse(localStorage.getItem('user'));
  currentUser.carbonFootInfos.push(carbonFootInfo);

  console.log('currentUser', currentUser);

  await fetch(`http://localhost:3000/users/${currentUser.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ...currentUser,
    }),
  });

  localStorage.setItem('user', JSON.stringify(currentUser));

  window.location.href = '../result.html';
};

/**
 * Define a function to navigate betweens form steps.
 * It accepts one parameter. That is - step number.
 */
const navigateToFormStep = (stepNumber) => {
  /**
   * Hide all form steps.
   */
  document.querySelectorAll('.form-step').forEach((formStepElement) => {
    formStepElement.classList.add('d-none');
  });
  /**
   * Mark all form steps as unfinished.
   */
  document.querySelectorAll('.form-stepper-list').forEach((formStepHeader) => {
    formStepHeader.classList.add('form-stepper-unfinished');
    formStepHeader.classList.remove('form-stepper-active', 'form-stepper-completed');
  });
  /**
   * Show the current form step (as passed to the function).
   */
  document.querySelector('#step-' + stepNumber).classList.remove('d-none');
  /**
   * Select the form step circle (progress bar).
   */
  const formStepCircle = document.querySelector('li[step="' + stepNumber + '"]');
  /**
   * Mark the current form step as active.
   */
  formStepCircle.classList.remove('form-stepper-unfinished', 'form-stepper-completed');
  formStepCircle.classList.add('form-stepper-active');
  /**
   * Loop through each form step circles.
   * This loop will continue up to the current step number.
   * Example: If the current step is 3,
   * then the loop will perform operations for step 1 and 2.
   */
  for (let index = 0; index < stepNumber; index++) {
    /**
     * Select the form step circle (progress bar).
     */
    const formStepCircle = document.querySelector('li[step="' + index + '"]');
    /**
     * Check if the element exist. If yes, then proceed.
     */
    if (formStepCircle) {
      /**
       * Mark the form step as completed.
       */
      formStepCircle.classList.remove('form-stepper-unfinished', 'form-stepper-active');
      formStepCircle.classList.add('form-stepper-completed');
    }
  }
};
/**
 * Select all form navigation buttons, and loop through them.
 */
document.querySelectorAll('.btn-navigate-form-step').forEach((formNavigationBtn) => {
  /**
   * Add a click event listener to the button.
   */
  formNavigationBtn.addEventListener('click', () => {
    /**
     * Get the value of the step.
     */
    const stepNumber = parseInt(formNavigationBtn.getAttribute('step_number'));
    /**
     * Call the function to navigate to the target form step.
     */
    navigateToFormStep(stepNumber);
  });
});
