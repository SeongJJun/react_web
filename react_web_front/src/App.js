import Footer from "./component/common/Footer";
import Header from "./component/common/Header";
import { Routes, Route } from "react-router-dom";
import Join from "./component/member/Join";
import Login from "./component/member/Login";
import { useState } from "react";
import MemberMain from "./component/member/MemberMain";

function App() {
  const [isLogin, setIsLogin] = useState(false);
  return (
    <div className="wrap">
      <Header isLogin={isLogin} setIsLogin={setIsLogin} />
      <div className="content">
        <Routes>
          <Route path="/join" element={<Join />} />
          <Route path="/login" element={<Login setIsLogin={setIsLogin} />} />
          <Route path="/member/*" element={<MemberMain />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
