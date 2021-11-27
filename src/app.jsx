import styles from './app.module.css';
import Login from './components/login/login';

const App = () => {
  return (
    <div className={styles.app}>
      <Login />
    </div>
  );
}

export default App;
