import { h, Component } from 'preact';
import { css } from 'glamor';

import Projects from './projects';
import Footer from './footer';

export default class Home extends Component {
  state = {
    imgUrl: '',
    quoteContent: '',
    quoteAuthor: '',
    quoteRef: ''
  }

  getHeroStyle() {
    return css({
      width: '100%',
      position: 'relative',
      background: 
        'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(' + this.state.imgUrl + ')',
      backgroundSize: 'cover',
      height: '100vh'
    });
  }

  request(arg) {
    let req = new XMLHttpRequest();
    req.open(arg.method, arg.url, true);
    req.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    req.onreadystatechange = function () {
      if (req.readyState === 4) {
        if (req.status === 200) {
          arg.success(req.response, req);
          return;
        }

        console.error('The request failed');
        arg.failure(req.response, req);
      }
    }.bind(this);
    req.send(JSON.stringify(arg.data));
  }

  componentWillMount() {
    this.request({
      method: 'GET', 
      url: '/unsplash/random',
      success: (response) => {
        let picture = JSON.parse(response);
        this.setState({imgUrl: picture.urls.regular});
      }
    });

    this.request({
      method: 'GET', 
      url: '/quotes/random',
      success: (response) => {
        let quote = JSON.parse(response);
        this.setState({
          quoteContent: quote.content, 
          quoteAuthor: quote.author, 
          quoteRef: quote.ref});
      }
    });
  }

  render() {
    return(
      <div>
        {/*Hero Section*/}
        <div {...this.getHeroStyle()} >
          <div {...textBlockStyle} >
            <div {...heroTitleStyle}> <h1>s/deffects</h1> </div>

            <div {...quoteStyle} >
                <p> {this.state.quoteContent} </p>

                <div {...quoteRef} >
                  <p> {this.state.quoteAuthor} </p>
                  <p> {this.state.quoteRef} </p>
                </div>
            </div>
          </div>
        </div>

        <Projects />
        <Footer />
      </div>
    )
  }
};

const textBlockStyle = css({
  top: '50%',
  left: '50%',
  position: 'absolute',
  textAlign: 'center',
  transform: 'translate(-50%, -50%)',
});

const heroTitleStyle = css({
  cursor: 'pointer',

  color: 'white',
  fontSize: '2em',
  transition: '.5s',
  ':hover': {
    fontSize: '2.1em'
  }
});

const quoteStyle = css({
  color: 'white',
  fontSize: '1.2em',
  fontStyle: 'italic',
  textAlign: 'center'
});

const quoteRef = css({
  fontSize: '0.8em',
  textAlign: 'right',
  
  ' p': {
    margin: '0'
  }
});