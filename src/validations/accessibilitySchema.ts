// Validations for the Accessibility/508 process
import * as Yup from 'yup';

const accessibilitySchema = {
  requestForm: Yup.object().shape({
    // Don't need to validate businessOwner name or component
    intakeId: Yup.string().required(
      'Select the project this request belongs to'
    ),
    requestName: Yup.string().required('Enter a name for this request')
  })
};

export default accessibilitySchema;
