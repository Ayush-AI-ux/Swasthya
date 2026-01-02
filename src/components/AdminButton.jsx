import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function AdminButton({ onClick }) {
  const { user } = useContext(AuthContext);

  if (user?.role !== "admin") return null;

  return (
    <button
      onClick={onClick}
      className="fixed top-4 right-4 bg-red-600 text-white px-4 py-2 rounded"
    >
      + Add Disease
    </button>
  );
}
