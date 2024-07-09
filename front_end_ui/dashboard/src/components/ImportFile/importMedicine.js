import axios from "axios";
import Swal from "sweetalert2";

const imporMedicineFile = async (fetchData) => {
  const fileInput = document.createElement("input");
  fileInput.type = "file";
  fileInput.accept = ".xlsx, .xls";
  fileInput.onchange = (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);

    axios
      .post("http://localhost:8080/api/excel/importMedicine", formData)
      .then((response) => {
        // Xử lý phản hồi từ backend nếu cần
        console.log(response.data);
        Swal.fire({
          icon: "success",
          title: "Nice!",
          text: "Import successful!",
        });
        fetchData();
      })
      .catch((error) => {
        // Xử lý lỗi nếu có
        console.error(error);
        Swal.fire({
          icon: "error",
          title: "error!",
          text: "Import error!",
        });
      });
  };
  fileInput.click();
};

export default imporMedicineFile;
