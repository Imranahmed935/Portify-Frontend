/* eslint-disable @typescript-eslint/no-explicit-any */


export const truncateContent = (text: string) => {
    const words = text.split(" ");
    return words.length > 5 ? words.slice(0, 5).join(" ") + "..." : text;
  };


export const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };



export const handleDelete = async (id: number, token: string) => {
  try {
    const res = await fetch(`http://localhost:5000/api/v1/project/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      const errorData = await res.json();
      console.error("Delete failed:", errorData);
      return { success: false, message: "Failed to delete project" };
    }

    const data = await res.json();
    console.log("Deleted successfully:", data);
    return { success: true, data };
  } catch (error) {
    console.error("Error deleting project:", error);
    return { success: false, message: "Something went wrong" };
  }
};


export const handleUpdate = async (id: number, token: string, data: any) => {
  try {
    const res = await fetch(`http://localhost:5000/api/v1/project/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      throw new Error(`Failed to update project: ${res.status}`);
    }

    const result = await res.json();
    console.log("✅ Project updated successfully:", result);
    return result;
  } catch (error) {
    console.error("❌ Error updating project:", error);
  }
};

