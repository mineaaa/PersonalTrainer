import './App.css';
import { AppBar, Typography } from '@mui/material';
import { Link, Outlet, useLocation } from 'react-router-dom';

function App() {

  const location = useLocation();

  const isThisCalendarPage = location.pathname === '/calendar';
  return (
    <>
      <AppBar position="sticky" style={{ backgroundColor: isThisCalendarPage ? 'lightblue' : 'pink' }}>
        <Typography variant='h6'>
          Personal Trainer
        </Typography>
        <div className="App">
          <nav>
            <Link to={"/"}>Home</Link>
            <Link to={"/customer"}>Customer</Link>
            <Link to={"/training"}>Training</Link>
            <Link to={"/calendar"} >Calendar</Link>
            <Link to={"/chart"}>Chart</Link>
          </nav>
          <Outlet />
        </div>
      </AppBar>
    </>
  );
}

export default App;
