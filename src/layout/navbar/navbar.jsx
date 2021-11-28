import React from 'react';
import styles from './navbar.module.css';
import { FaChartLine, FaChartPie } from "react-icons/fa";
import { AiOutlineDashboard } from "react-icons/ai";
import { BsFillPersonFill, BsPencilSquare, BsEmojiSmile } from "react-icons/bs";
import { FaRegListAlt } from "react-icons/fa";

const Navbar = (props) => {
    return (
        <nav className={styles.nav}>
            <div className={styles.title}>
                <FaChartLine className={styles.icon} /> 무야호
            </div>
            <ul className={styles.ul}>
                <li>
                    <AiOutlineDashboard className={styles.icon} />DASHBOARD
                </li>
                <li>
                    <BsFillPersonFill className={styles.icon} />MY INFO
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
                    <FaRegListAlt className={styles.icon} />READING
                </li>
                <li>
                    <FaChartPie className={styles.icon} />REPORT
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;