import React from 'react';
import styles from './navbar.module.css';
import { FaChartLine, FaChartPie } from "react-icons/fa";
import { AiOutlineDashboard, AiFillSetting } from "react-icons/ai";
import { BsFillPersonFill, BsPencilSquare, BsEmojiSmile, BsMinecartLoaded } from "react-icons/bs";
import { FaRegListAlt } from "react-icons/fa";
import { Link } from 'react-router-dom';

const Navbar = (props) => {
    const clickMenu = event => {
        const target = event.target;
        if (target.tagName === 'LI') {
            target.children[0].click();
        }
    };

    return (
        <nav className={styles.nav} onClick={clickMenu}>
            <div className={styles.title}>
                <FaChartLine className={styles.icon} /> 무야호
            </div>
            <ul className={styles.ul}>
                <li className={`${styles.li} ${styles.action}`}>
                    <Link to="dashboard" className={styles.link}>
                        <AiOutlineDashboard className={styles.icon} />DASHBOARD
                    </Link>
                </li>
                <li className={styles.li}>
                    <Link to="myInfo" className={styles.link}>
                        <BsFillPersonFill className={styles.icon} />MY INFO
                    </Link>
                </li>
                <li className={styles.li}>
                    <Link to="myList" className={styles.link}>
                        <BsMinecartLoaded className={styles.icon} />MY LIST
                    </Link>
                </li>
                <li className={styles.li}>
                    <Link to="reading" className={styles.link}>
                        <FaRegListAlt className={styles.icon} />READING
                    </Link>
                </li>
                <li className={styles.li}>
                    <Link to="analysis" className={styles.link}>
                        <BsPencilSquare className={styles.icon} />ANALYSIS
                    </Link>
                </li>
                <li className={styles.li}>
                    <Link to="freeTalk" className={styles.link}>
                        <BsEmojiSmile className={styles.icon} />FREE TALK
                    </Link>
                </li>
                <li className={styles.li}>
                    <Link to="report" className={styles.link}>
                        <FaChartPie className={styles.icon} />REPORT
                    </Link>
                </li>
                <li className={styles.li}>
                    <Link to="setting" className={styles.link}>
                        <AiFillSetting className={styles.icon} />SETTING
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;