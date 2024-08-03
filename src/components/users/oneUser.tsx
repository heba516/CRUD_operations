import { UserRoundPen, UserRoundX } from "lucide-react";
import * as yup from "yup";
import useUsers from "./useUsers";
import { userData } from "./services/userData";
import "./index.scss";
import { toast } from "react-toastify";
import { useFormik } from "formik";

interface UserProps {
  user: userData;
  onDelete: (id: string) => void;
}

export default function OneUser({ user, onDelete }: UserProps) {
  const { editUser } = useUsers();

  const handleDelete = async (id: string) => {
    try {
      await onDelete(id);
      toast.success("🦄 User deleted");
    } catch (e) {
      toast.error("Failed to delete user");
    }
  };

  const validationSchema = yup.object().shape({
    name: yup
      .string()
      .required("Name is required")
      .min(3, "Must be more than 3 characters"),
    job: yup.string().required("Job is required"),
  });

  const formik = useFormik({
    initialValues: {
      name: user.name,
      job: user.job,
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        await editUser(`${user.id}`, values);
        toast.success("🦄 User edited");
      } catch (e) {
        toast.error("Failed to edit user");
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div key={user.id} className="d-flex align-items-center m-4">
        <div className="me-2">
          <input
            className="me-3"
            type="text"
            value={formik.values.name}
            name="name"
            id={"name" + user.id}
            onChange={formik.handleChange}
          />
          <input
            type="text"
            value={formik.values.job}
            name="job"
            id={"job" + user.id}
            onChange={formik.handleChange}
          />
        </div>
        <UserRoundX
          className="mx-2 text-danger"
          onClick={() => handleDelete(`${user.id}`)}
        />
        <button type="submit">
          <UserRoundPen className="text-warning" />
        </button>
      </div>
    </form>
  );
}
