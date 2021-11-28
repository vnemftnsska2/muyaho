import React, { useRef } from 'react';
import styles from './login.module.css';
import { useNavigate, } from 'react-router-dom';
import { FaChartLine } from "react-icons/fa";

const Login = () => {
    const formRef = useRef();
    const idRef = useRef();
    const passwordRef = useRef();
    const navigate = useNavigate();

    const onKeyDown = event => {
        if (event.keyCode === 13) {
            onLoginSubmit();
        }
    };

    const onLoginSubmit = event => {
        const loginInfo = {
            id: idRef.current.value,
            password: passwordRef.current.value,
        };

        if (loginInfo.id === 'admin' && loginInfo.password === '') {
            return navigate('/dashboard');
        }
        alert('로그인 정보를 확인해주세요!');
    };

    return (
        <div className={styles.container}>
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
                        className={styles.input}
                        placeholder="아이디를 입력해주세요"
                        ref={idRef}
                        onKeyDown={onKeyDown}
                    />
                    <input
                        type="password"
                        className={styles.input}
                        placeholder="비밀번호를 입력해주세요"
                        ref={passwordRef}
                        onKeyDown={onKeyDown}
                    />
                    <button
                        type="button"
                        className={styles.button}
                        onClick={onLoginSubmit}
                    >LOGIN</button>
                </form>
            </div>
        </div>
    );
};

export default Login;