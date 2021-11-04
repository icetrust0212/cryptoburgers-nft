//@ts-ignore
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import MintPage from './pages/Mint';
import Home from './pages/Home';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import styled from 'styled-components';

const App = () => {

  const handleNotification = (type, title, msg) => {
    let duration = 3000;
    switch (type) {
      case 'info':
        NotificationManager.info(msg, title, duration);
        break;
      case 'success':
        NotificationManager.success(msg, title, duration);
        break;
      case 'warning':
        NotificationManager.warning(msg, title, duration);
        break;
      case 'error':
        NotificationManager.error(msg, title, duration);
        break;
      default:
        break;
    };
  };

  return (

    <>
      <div className="App">
        <Container>
          <Switch>
            <Route path="/" exact={true}>
              <Home handleNotification={handleNotification}/>
            </Route>
            <Route path="/mint">
              <MintPage handleNotification={handleNotification}/>
            </Route>
          </Switch>
        </Container>
      </div>
      <NotificationContainer />
    </>
  );
}

export default App;

const Container = styled.div`

`