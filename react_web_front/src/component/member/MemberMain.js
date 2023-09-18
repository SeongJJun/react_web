import axios from "axios";
import "./memberMain.css";

const MemberMain = () => {
  const token = window.localStorage.getItem("token");
  axios
    .get("/member/mypage", {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
    .then((res) => {
      console.log(res.data);
    })
    .catch((res) => {
      console.log(res.data);
    });
  return (
    <div>
      <div>마이페이지</div>
    </div>
  );
};

export default MemberMain;
