import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "./components/Header/header";
import HomeScreen from "./screens/HomeScreen/homeScreen";
import DashboardScreen from "./screens/DashboardScreen/dashboardScreen";
function App() {
  return (
    <Router>
      <head>
        <link
          rel='stylesheet'
          href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.2/css/all.min.css'
          integrity='sha512-HK5fgLBL+xu6dm/Ii3z4xhlSUyZgTT9tuc/hSrtw6uzJOvgRr2a9jyxxT1ely+B+xFAmJKVSTbpM/CuL7qxO8w=='
          crossOrigin='anonymous'
        />
      </head>
      <Header />
      <div className='screen-container'>
        <Route path='/' component={HomeScreen} exact></Route>
        <Route path='/dashboard' component={DashboardScreen}></Route>
      </div>
    </Router>
  );
}

export default App;
