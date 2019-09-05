import * as Yup from 'yup';

/**
 * Validation schema to update a meetup.
 */
export default Yup.object().shape({
  // min set to enforce that the string should not be empty
  title: Yup.string().min(1),
  description: Yup.string().min(1),
  localization: Yup.string().min(1),
  date: Yup.date(),
  image_id: Yup.number().min(1),
});
