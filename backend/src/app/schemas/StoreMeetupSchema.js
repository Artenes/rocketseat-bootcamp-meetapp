import * as Yup from 'yup';

/**
 * Validation schema to create a meetup.
 */
export default Yup.object().shape({
  title: Yup.string().required(),
  description: Yup.string().required(),
  localization: Yup.string().required(),
  date: Yup.date().required(),
  image_id: Yup.number().required(),
});
