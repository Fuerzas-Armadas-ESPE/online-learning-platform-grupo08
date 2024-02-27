import { Button } from "@mui/material";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Welcome to Online Learning Platform</h1>
      <p>Start your learning journey today!</p>
      <Button variant="contained" component={Link} to="/courses">
        Explore Courses
      </Button>
      <footer>
        <p>© 2024 Online Learning Platform. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
