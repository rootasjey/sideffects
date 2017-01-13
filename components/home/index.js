import { h, Component } from 'preact';
import { css } from 'glamor';

import Projects from './projects';
import Footer from './footer';

export default class Home extends Component {
  state = {
    imgUrl: '',
    quoteContent: '',
    quoteAuthor: '',
    quoteRef: '',
    tweetLink: ''
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
          quoteRef: quote.ref,
          tweetLink: 'https://twitter.com/intent/tweet?text=' + 
                      quote.content + ' - de ' + quote.author + ' - ' + quote.ref + 
                      '&hashtags=citation,quote'
        });
      }
    });
  }

  shareTweet() {
    let url = 'https://twitter.com/intent/tweet?text=' + 
                      this.state.quoteContent + ' - de ' + 
                      this.state.quoteAuthor + ' - ' + 
                      this.state.quoteRef + 
                      '&hashtags=citation,quote';
    window.open(url)
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

                <div {...quoteIconStyle} >
                  <span {...css(twitterIcon, iconStyle)}
                    onClick={() => this.shareTweet()} >
                    
                  </span>
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

const quoteIconStyle = css({
  textAlign: 'right'
});

const iconStyle = css({
	width: '30px',
	height: '30px',
	margin: '20px',
	display: 'inline-block',
	backgroundSize: '100%',

	cursor: 'pointer',
	transition: '.2s',
	':hover': {
			transform: 'scale(1.2)'
	}
});

const twitterIcon = css({
	background: "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2ZXJzaW9uPSIxLjAiIHg9IjBweCIgeT0iMHB4IiB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIHZpZXdCb3g9IjAgMCA1MCA1MCIgZmlsbD0iI2VjZjBmMSIgPiAgICA8cGF0aCBkPSJNIDUwLjA2MSAxMC40MzggYyAtMS44NDYgMC44MTggLTMuODI2IDEuMzY5IC01LjkwOCAxLjYyIGMgMi4xMjUgLTEuMjczIDMuNzU3IC0zLjI5IDQuNTIzIC01LjY4OCBjIC0xLjk4NiAxLjE3NyAtNC4xOSAyLjAzMyAtNi41MzEgMi40OTMgYyAtMS44NzQgLTIgLTQuNTQ3IC0zLjI0NyAtNy41MDQgLTMuMjQ3IGMgLTUuNjggMCAtMTAuMjg0IDQuNjA0IC0xMC4yODQgMTAuMjgyIGMgMCAwLjgwNSAwLjA5MiAxLjU4OSAwLjI2OSAyLjM0MyBDIDE2LjA4IDE3LjgxMiA4LjUwMiAxMy43MTggMy40MjkgNy40OTcgYyAtMC44ODUgMS41MjIgLTEuMzkxIDMuMjg5IC0xLjM5MSA1LjE3MiBjIDAgMy41NjcgMS44MTIgNi43MTMgNC41NzQgOC41NiBjIC0xLjY4OCAtMC4wNTQgLTMuMjcxIC0wLjUxNyAtNC42NTcgLTEuMjg4IGMgMCAwLjA0NCAwIDAuMDg2IDAgMC4xMzEgYyAwIDQuOTg0IDMuNTQ0IDkuMTM0IDguMjQ1IDEwLjA4NCBjIC0wLjg2IDAuMjM2IC0xLjc2OSAwLjM2IC0yLjcwNyAwLjM2IGMgLTAuNjY0IDAgLTEuMzA5IC0wLjA2NCAtMS45MzggLTAuMTg2IGMgMS4zMTMgNC4wODEgNS4xMDggNy4wNiA5LjYwNyA3LjE0MyBjIC0zLjUxNyAyLjc1NyAtNy45NTEgNC4zOTkgLTEyLjc3IDQuMzk5IGMgLTAuODMzIDAgLTEuNjQ5IC0wLjA0OCAtMi40NTIgLTAuMTQ0IGMgNC41NDggMi45MTkgOS45NTYgNC42MTkgMTUuNzYyIDQuNjE5IGMgMTguOTE1IDAgMjkuMjYgLTE1LjY2OCAyOS4yNiAtMjkuMjUyIGMgMCAtMC40NDggLTAuMDExIC0wLjg5NCAtMC4wMyAtMS4zMzIgQyA0Ni45NCAxNC4zMTMgNDguNjg0IDEyLjUgNTAuMDYxIDEwLjQzOCBaIiAvPjwvc3ZnPg==') 50% 50% no-repeat"
});