import { Route, Routes } from "react-router-dom";
import "./board.css";
import BoardList from "./BoardList";
import BoardWrite from "./BoardWrite";
import BoardView from "./BoardView";

const BoardMain = (props) => {
  const isLogin = props.isLogin;
  const seIsLogin = props.setIsLogin;
  return (
    <div className="board-all-wrap">
      <div className="board-title">BOARD</div>
      <Routes>
        <Route path="/view" element={<BoardView isLogin={isLogin} />} />
        <Route path="write" element={<BoardWrite />} />
        {/* path="*"은 모든 Route들 중 제일 아래에 위치 */}
        <Route path="*" element={<BoardList isLogin={isLogin} />} />
      </Routes>
    </div>
  );
};

export default BoardMain;
