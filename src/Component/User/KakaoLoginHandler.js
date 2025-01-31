import React, { useContext, useEffect } from 'react';
import { API_BASE_URL, USER } from '../../util/host-config';
import AuthContext from '../../util/AuthContext';
import { useNavigate } from 'react-router-dom';

export const KakaoLoginHandler = () => {
  const { onLogin } = useContext(AuthContext);
  const redirection = useNavigate();

  console.log(
    '사용자가 동의화면을 통해 필수정보 동의 후 Kakao 서버에서 redirect를 진행!'
  );

  const REQUEST_URL = API_BASE_URL + USER;

  console.log(REQUEST_URL + '/kakaoLogin?code=');

  //URL에 쿼리 스트링으로 전달된 인가 코드를 얻어오는 방법.
  const code = new URL(window.location.href).searchParams.get('code');

  useEffect(() => {
    // 컴포넌트가 렌더링 될 때, 인가 코드를 백엔드로 전송하는 fetch 요청
    const kakaoLogin = async () => {
      const res = await fetch(REQUEST_URL + '/kakaoLogin?code=' + code);

      const { token, userName, email, role, userPay } = await res.json(); // 서버에서 온 json 읽기

      // Context API를 사용하여 로그인 상태를 업데이트 합니다.
      onLogin(token, userName, role, userPay);

      // 홈으로 리다이렉트
      redirection('/');
    };

    kakaoLogin();
  }, []);

  return;
  <div>KakaoLoginHandler</div>;
};

export default KakaoLoginHandler;
