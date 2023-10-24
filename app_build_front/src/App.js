import { useEffect, useState } from "react";
import {
  Link,
  Route,
  Routes,
  useNavigate,
  useLocation,
} from "react-router-dom";
import axios from "axios";
function App() {
  return (
    <div className="App">
      <h1>어플리케이션 베포 테스트</h1>
      <hr />
      <ul>
        <li>
          <Link to={"/selectAll"}>전체회원 조회</Link>
        </li>
        <li>
          <Link to={"/join"}>회원등록</Link>
        </li>
      </ul>
      <hr />
      <Routes>
        <Route path="/selectAll" element={<UserList />} />
        <Route path="/selectOne" element={<UserView />} />
        <Route path="/join" element={<JoinUser />} />
      </Routes>
    </div>
  );
}
const UserList = () => {
  const [userList, setUserList] = useState([]);
  useEffect(() => {
    axios.get(process.env.REACT_APP_DB_HOST + "/user/list").then((res) => {
      setUserList(res.data);
    });
  }, []);
  return (
    <div className="user-tbl">
      <table>
        <thead>
          <tr>
            <th>회원번호</th>
            <th>이름</th>
            <th>나이</th>
            <th>주소</th>
          </tr>
        </thead>
        <tbody>
          {userList.map((user, index) => {
            return <UserItem user={user} key={"user" + index} />;
          })}
        </tbody>
      </table>
    </div>
  );
};
const UserItem = (props) => {
  const user = props.user;
  const navigate = useNavigate();
  const userView = () => {
    navigate("/selectOne", { state: { userNo: user.userNo } });
  };
  return (
    <tr onClick={userView}>
      <td>{user.userNo}</td>
      <td>{user.userName}</td>
      <td>{user.userAge}</td>
      <td>{user.userAddr}</td>
    </tr>
  );
};

const UserView = () => {
  const location = useLocation();
  const userNo = location.state.userNo;
  const [user, setUser] = useState({});
  useEffect(() => {
    axios
      .get(process.env.REACT_APP_DB_HOST + "/user/one/" + userNo)
      .then((res) => {
        setUser(res.data);
      });
  }, []);
  return (
    <ul>
      <li>회원번호 : {user.userNo} </li>
      <li>회원이름 : {user.userName} </li>
      <li>회원나이 : {user.userAge} </li>
      <li>회원주소 : {user.userAddr} </li>
    </ul>
  );
};
const JoinUser = () => {
  const [userName, setUserName] = useState("");
  const [userAge, setUserAge] = useState("");
  const [userAddr, setUserAddr] = useState("");
  const navigate = useNavigate();
  const join = () => {
    const data = { userName, userAge, userAddr };
    axios
      .post(process.env.REACT_APP_DB_HOST + "/user/join", data)
      .then((res) => {
        if (res.data === 1) {
          navigate("/selectAll");
        }
      });
  };

  return (
    <div className="join-wrap">
      <table className="join-tbl">
        <tbody>
          <tr>
            <th>
              <label htmlFor="userName">이름</label>
            </th>
            <td>
              <Input
                data={userName}
                setData={setUserName}
                type="text"
                content="userName"
              />
            </td>
          </tr>
          <tr>
            <th>
              <label htmlFor="userAge">나이</label>
            </th>
            <td>
              <Input
                data={userAge}
                setData={setUserAge}
                type="text"
                content="userAge"
              />
            </td>
          </tr>
          <tr>
            <th>
              <label htmlFor="userAddr">주소</label>
            </th>
            <td>
              <Input
                data={userAddr}
                setData={setUserAddr}
                type="text"
                content="userAddr"
              />
            </td>
          </tr>
          <tr>
            <th colSpan={2}>
              <button onClick={join}>회원등록</button>
            </th>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

const Input = (props) => {
  const data = props.data;
  const setData = props.setData;
  const type = props.type;
  const content = props.content;
  const changeValue = (e) => {
    const inputValue = e.currentTarget.value;
    setData(inputValue);
  };
  return <input type={type} value={data} id={content} onChange={changeValue} />;
};

export default App;
