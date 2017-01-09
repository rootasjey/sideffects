import { h, Component } from 'preact';
import { css } from 'glamor';

const puzzleIcon = require('file-loader!./puzzle.png');
const arrowpuzzleIcon = require('file-loader!./arrow.png');

export default class Projects extends Component {
  state = {
    projects: [],
    count: 0,
    containerExpended: false
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

  componentDidMount() {
    this.request({
      method: 'GET',
      url: 'https://api.github.com/users/rootasjey/repos',
      success: response => {
        let projects = JSON.parse(response);
        this.setState({projects: projects, count: projects.length});
      }
    })
  }

  getContainerStyle() {
  }

  scrollLeft() {
    for (let i = 0; i < 200; i++) {
      setTimeout(() => {this.projectsList.scrollLeft -= 2}, i)
    }
  }

  scrollRight() {
    for (let i = 0; i < 200; i++) {
      setTimeout(() => {this.projectsList.scrollLeft += 2}, i)
    }
  }

  toggleProject(project) {

  }

  render() {
    return (
      <div {...containerStyle} >
        <div {...titleStyle} >
          <h1>
            <a href='https://github.com/rootasjey?tab=repositories'>
              PROJECTS
            </a>
          </h1>
          <h1 {...countStyle} >{this.state.count}</h1>
          <img {...arrowLeftStyle} src={arrowpuzzleIcon} onClick={() => this.scrollLeft()} />
          <img {...arrowRightStyle} src={arrowpuzzleIcon} onClick={() => this.scrollRight()} />
        </div>
        

        <div {...listStyle} ref={(projectsList) => {this.projectsList = projectsList;}} >
          {/*Projects are coming from outer space...*/}
          {this.state.projects.map(project => {
              return (
                <div {...bubbleStyle} >
                  <div {...bubbleBackgroundStyle} ></div>
                  <div {...bubbleTextStyle} > {project.name} </div>
                  <img src={puzzleIcon} {...bubbleIconStyle} />
                </div>
              )
            })
          }
        </div>
      </div>
    );
  }
}

const containerStyle = css({
  padding: '10% 10%',
  textAlign: 'center',
  background: '#E7E7E7',
  position: 'relative',

  height: '300px',
  overflow: 'hidden',
  transition: '.5s',
  ' a': {
    color: 'inherit',
    textDecoration: 'none'
  }
});

const titleStyle = css({
  top: '-50px',
  position: 'relative'
});

const countStyle = css({
  marginTop: '-20px',
  marginBottom: '-20px',
  fontSize: '4em'
});

const arrowRightStyle = css({
  height: '40',
  width: '40',

  cursor: 'pointer',

  top: '55',
  marginLeft: '50px',
  position: 'absolute',
  transition: '.4s',
  ':hover': {
    transform: 'scale(0.8)'
  }
});

const arrowLeftStyle = css({
  height: '40',
  width: '40',

  cursor: 'pointer',

  top: '55',
  marginLeft: '-90px',
  position: 'absolute',
  transform: 'rotate(180deg)',
  transition: '.4s',
  ':hover': {
    transform: 'rotate(180deg) scale(0.8)'
  }
});

const listStyle = css({
  height: '100%',
  width: 'auto',

  overflowX: 'scroll',
  overflowY: 'hidden',
  whiteSpace: 'nowrap',

  paddingBottom: '100px'
});

const bubbleStyle = css({
  height: '240px',
  width: '240px',

  margin: '10px',
  paddingTop: '10px',
  position: 'relative',
  display: 'inline-block',
  overflow: 'hidden',

  cursor: 'pointer',
  background: 'transparent',
  transition: '.4s',

  ':hover': {
    ' div:first-child': {
        transform: 'scale(1.1)'
    }    
  }
});

const bubbleBackgroundStyle = css({
  height: '60%',
  width: '60%',
  borderRadius: '60%',
  margin: 'auto',
  backgroundColor: 'white',
  transition: 'cubic-bezier(0.82, 1.82, 0.56, 1.57) 0.2s'
});

const bubbleTextStyle = css({
  // top: '50px',
  color: 'rgba(4, 4, 3, 0.4)',
  fontSize: '1.3em',
  fontWeight: '900',
  textAlign: 'center',

  height: '40px',
  width: '100%',
  display: 'block',
  margin: '10px auto',
  position: 'relative'
});

const bubbleIconStyle = css({
  height: '40%',
  width: '40%',

  top: '12%',
  left: '30%',
  position: 'absolute'
});

const moreButtonStyle = css({
  height: '10px',
  width: '60px',

  cursor: 'pointer',
  padding: '20px',
  
  right: '0',
  bottom: '0',
  position: 'absolute',

  color: 'white',
  background: '#2C82C9',
  transition: '.4s',

  ':hover': {
      height: '15px'
  }
});