import React from 'react';
import styles from './navbar.module.css';
import { FaChartLine, FaChartPie } from "react-icons/fa";
import { AiOutlineDashboard, AiFillSetting } from "react-icons/ai";
import { BsFillPersonFill, BsPencilSquare, BsEmojiSmile, BsMinecartLoaded } from "react-icons/bs";
import { FaRegListAlt } from "react-icons/fa";
import { Link } from 'react-router-dom';

const Navbar = (props) => {
    return (
        <nav className={styles.nav}>
            <div className={styles.title}>
                <FaChartLine className={styles.icon} /> 무야호
            </div>
            <ul className={styles.ul}>
                <li>
                    <Link to="dashboard" className={styles.link}>
                        <AiOutlineDashboard className={styles.icon} />DASHBOARD
                    </Link>
                </li>
                <li>
                    <Link to="myInfo" className={styles.link}>
                        <BsFillPersonFill className={styles.icon} />MY INFO
                    </Link>
                </li>
                <li>
                    <BsMinecartLoaded className={styles.icon} />MY LIST
                </li>
                <li>
                    <FaRegListAlt className={styles.icon} />READING
                </li>
                <li>
                    <BsPencilSquare className={styles.icon} />ANALYSIS
                </li>
                <li>
                    <BsEmojiSmile className={styles.icon} />FREE TALK
                </li>
                <li>
                    <FaChartPie className={styles.icon} />REPORT
                </li>
                <li>
                    <AiFillSetting className={styles.icon} />SETTING
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;