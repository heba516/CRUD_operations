import * as yup from "yup";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import useUsers from "./users/useUsers";
import { userData } from "./users/services/userData";
import { toast } from "react-toastify";

export default function Register() {
  const navigate = useNavigate();

  const validationSchema = yup.object().shape({
    name: yup
      .string()
      .required("name is required")
      .min(3, "Must be more than 3"),

    job: yup.string().required("job is required"),
  });

  const { addUsers } = useUsers();
  const handleSubmit = async (values: userData) => {
    try {
      await addUsers(values);
      console.log("hello");
      toast.success("🦄Registeration compeleted");
      navigate("/allUsers");
    } catch (e) {
      toast.error("Failed to add user");
    }
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      job: "",
    },
    validationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <div>
      <div className="container p-5">
        <h1 className="text-center">Register</h1>
        <form className="w-50 m-auto" onSubmit={formik.handleSubmit}>
          <div className="form-group mb-4">
            <label htmlFor="exampleInputname1">name address</label>
            <input
              type="text"
              className="form-control"
              id="exampleInputname1"
              name="name"
              aria-describedby="nameHelp"
              placeholder="Enter name"
              value={formik.values.name}
              onChange={formik.handleChange}
            />
            {formik.touched.name && formik.errors.name && (
              <div className="error text-danger">{formik.errors.name}</div>
            )}
          </div>
          <div className="form-group mb-4">
            <label htmlFor="exampleInputjob1">job</label>
            <input
              type="job"
              className="form-control"
              id="exampleInputjob1"
              name="job"
              placeholder="job"
              value={formik.values.job}
              onChange={formik.handleChange}
            />
            {formik.touched.job && formik.errors.job && (
              <div className="error text-danger">{formik.errors.job}</div>
            )}
          </div>
          <button type="submit" className="btn btn-primary m-auto">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
