import Footer from "./component/common/Footer";
import Header from "./component/common/Header";
import { Routes, Route } from "react-router-dom";
import Join from "./component/member/Join";
import Login from "./component/member/Login";
import { useEffect, useState } from "react";
import MemberMain from "./component/member/MemberMain";

function App() {
  const [isLogin, setIsLogin] = useState(true);
  //useEffect hooks : 초기 state값을 초최에 수정해서 사용하는 경우
  //                  re-render가 무한반복이 일어나는데 이걸 해결하기 뤼한 hooks
  //    window.onload = function() {}를 대체해주는 hooks
  // useEffect(function,[]) : 최초에 function이 한번 실행
  //useEffect내부 함수의 값을 변경하려면 두번째매개변수(배열)에 변경조건을 입력
  useEffect(() => {
    const token = window.localStorage.getItem("token");
    if (token === null) {
      setIsLogin(false);
    } else {
      setIsLogin(true);
    }
  }, []);

  return (
    <div className="wrap">
      <Header isLogin={isLogin} setIsLogin={setIsLogin} />
      <div className="content">
        <Routes>
          <Route path="/join" element={<Join />} />
          <Route path="/login" element={<Login setIsLogin={setIsLogin} />} />
          <Route
            path="/member/*"
            element={<MemberMain setIsLogin={setIsLogin} isLogin={isLogin} />}
          />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
