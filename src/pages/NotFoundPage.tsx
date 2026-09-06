import { Link } from "react-router";
import styles from "../App.module.css";

function NotFoundPage() {
  return (
    <div className={styles.notFound}>
      <h1>404</h1>
      <p>
        Whoops!
        <br />
        We couldn't find that page.
      </p>
      <Link className={styles.notFoundLink} to="/">
        Back to Home
      </Link>
    </div>
  );
}

export default NotFoundPage;
