import './App.css';
import { AppBar, Typography } from '@mui/material';
import { Link, Outlet } from 'react-router-dom';

function App() {
  return (
    <>
      <AppBar position="sticky">
        <Typography variant='h6'>
          Personal Trainer
        </Typography>
        <div className="App">
          <nav>
            <Link to={"/"}>Home</Link>
            <Link to={"/customer"}>Customer</Link>
            <Link to={"/training"}>Training</Link>
          </nav>
          <Outlet />
        </div>
      </AppBar>
    </>
  );
}

export default App;
