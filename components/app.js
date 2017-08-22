import { h, Component } from 'preact';
import { Router } from 'preact-router';
import { css } from 'glamor';

import Home from './home';
import Onetime from './onetime';

export default class App extends Component {
  handleRoute = e => {
    this.currentUrl = e.url;
  };

  render() {
    return (
      <div class='app' style={style}>
          <Router onChange={this.handleRoute}>
            <Home path='/' />
            <Onetime path='/onetime' />
          </Router>
      </div>
    )
  }
}

const style = css({
  height: '100%',
  width: '100%'
});