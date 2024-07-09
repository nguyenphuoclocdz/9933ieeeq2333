import { useState, useEffect } from "react";
import getRequest from "components/API_Get";

function TimelineData() {
  const [timelineData, setTimelineData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      getRequest("/api/examination", (response) => {
        console.log("hello toi day ")
        if (response.status === "success") {
          const newData = response.data.map((item) => ({
            color: "success", // Đặt màu tùy ý
            icon: "notifications", // Icon tùy ý
            title: item.title,
            dateTime: item.updateTime, // Sử dụng thời gian cập nhật hoặc tạo mới từ dữ liệu
            description: item.description,
            medicalExaminationId: item.medicalExaminationId,
            doctorId: item.doctorId,
            elderlyId: item.elderlyId
          })).sort((a, b) => b.medicalExaminationId - a.medicalExaminationId);
          setTimelineData(newData);
        } else {
        }
      });
    } catch (error) {
    }
  };
  return timelineData;
}

export default TimelineData;
