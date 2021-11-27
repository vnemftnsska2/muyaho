import React, { useRef } from 'react';
import styles from './login.module.css';
import { FaChartLine } from "react-icons/fa";

const Login = (props) => {
    const formRef = useRef();
    const idRef = useRef();
    const passwordRef = useRef();

    const onLoginSubmit = event => {
        const loginInfo = {
            id: idRef.current.value,
            password: passwordRef.current.value,
        };

        if (!loginInfo.id || !loginInfo.password) {
            return alert('로그인 정보를 확인해주세요 :)');
        }
    };

    return (
        <div className={styles.login}>
            <h1 className={styles.title}>
                <FaChartLine className={styles.FaChartLine} />무야호ㅋ
            </h1>
            <form
                className={styles.form}
                ref={formRef}
            >
                <input
                    type="text"
                    placeholder="아이디를 입력해주세요"
                    ref={idRef}
                />
                <input
                    type="password"
                    placeholder="비밀번호를 입력해주세요"
                    ref={passwordRef}
                />
                <button
                    type="button"
                    className={styles.button}
                    onClick={onLoginSubmit}
                >LOGIN</button>
            </form>
        </div>
    );
};

export default Login;