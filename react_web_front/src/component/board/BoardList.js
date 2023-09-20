import axios from "axios";
import { useEffect, useState } from "react";
import Pagination from "../common/Pagination";
import { Button1 } from "../util/Buttons";
import { useNavigate } from "react-router-dom";

const BoardList = (props) => {
  const isLogin = props.isLogin;
  const [boardList, setBoardList] = useState([]);
  const [reqPage, setReqPage] = useState(1);
  const [pageInfo, setPageInfo] = useState({});
  useEffect(() => {
    axios
      .get("/board/list" + reqPage)
      .then((res) => {
        console.log(res.data);
        setBoardList(res.data.boardList);
        setPageInfo(res.data.pi);
      })
      .catch((res) => {
        console.log(res.response.status);
      });
  }, [reqPage]);
  const navigate = useNavigate();
  const write = () => {
    navigate("write");
  };
  return (
    <div>
      {isLogin ? (
        <div className="board-write-btn">
          <Button1 text="글쓰기" clickEvent={write} />
        </div>
      ) : (
        ""
      )}
      <div className="board-list-wrap">
        {boardList.map((board, index) => {
          return <BoardItem key={"board" + index} board={board} />;
        })}
      </div>
      <div className="board-page">
        <Pagination
          reqPage={reqPage}
          setReqPage={setReqPage}
          pageInfo={pageInfo}
        />
      </div>
    </div>
  );
};
const BoardItem = (props) => {
  const board = props.board;
  return (
    <div className="board-item">
      <div className="board-item-img">
        {board.boardImg === null ? <img src="/image/default.png" /> : ""}
      </div>
      <div className="board-item-info">
        <div className="board-item-title">{board.boardTitle}</div>
        <div className="board-item-writer">{board.memberId}</div>
        <div className="board-item-date">{board.boardDate}</div>
      </div>
    </div>
  );
};
export default BoardList;
