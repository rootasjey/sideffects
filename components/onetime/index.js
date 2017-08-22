import { h, Component } from 'preact';
import { css } from 'glamor';

export default class Onetime extends Component {
  state = {

  }

  request(arg) {
    let req = new XMLHttpRequest();
    req.open(arg.method || 'GET', arg.url, true);
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
    console.log('mounted!');
    this.watch();
  }

  watch() {
    let url = 'http://prod.websivik.keolis.com/sivik/rest/SiriWSLite24/stop-monitoring.json?LineRef=004_DEVILLAIRS:Line::24:LOC&MinimumStopVisitsPerLineVia=2&MonitoringRef=STIF:StopArea:SP:52243:&PreviewInterval=120&RequestorRef=WEBIVTR_PHEBUS&StopVisitTypes=departures'
    this.request({
      url: url,
      success: (resp, req) => {
        console.log(resp);
      },
      failure: (resp, req) => {

      }
    })
  }

  render() {
    return (
      <div>
        <h1>Onetime</h1>
      </div>
    );
  }
}