import toast from "react-hot-toast";
import Swal from "sweetalert2";
import axios from "axios";

export const handleDelete = async (route, refetch, setLoading) => {
  const shouldDelete = await Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  });
  // console.log(shouldDelete)

  if (shouldDelete.isConfirmed) {
    setLoading(true);
    const { data } = await axios.delete(
      `${import.meta.env.VITE_apiurl}/${route}`
    );
    // console.log(data);
    if (data.data.isDeleted === true) {
      setLoading(false);
      refetch();
      toast.success("Deleted Successfully");
      Swal.fire({
        title: "Deleted!",
        text: "Item has been deleted.",
        icon: "success",
      });
    }
  }
};
