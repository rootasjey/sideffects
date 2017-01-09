import { h, Component } from 'preact';
import { css } from 'glamor';

export default class Footer extends Component {
	goToTwitter() {
		window.location.assign('https://www.twitter.com/jeremiecorpinot');
	}

	goToMedium() {
			window.location.assign('https://medium.com/@jeremiecorpinot');
	}

	goToInstagram() {
			window.location.assign('https://www.instagram.com/jeremiejoachim/');
	}

	render() {
		return(
			<div {...footerStyle}>
				<div {...iconContainerStyle} >
					<div {...css(twitterIcon, iconStyle)} 
							onClick={() => this.goToTwitter()}></div>
					<div {...css(mediumIcon, iconStyle)} 
							onClick={() => this.goToMedium()}></div>
					<div {...css(instagramIcon, iconStyle)} 
							onClick={(vt) => this.goToInstagram()}></div>
				</div>
			</div>
		);
	}
}

const footerStyle = css({
	height: '200px',
	background: '#282830',
	color: 'white'
});

const iconContainerStyle = css({
	width: '300px',
	margin: 'auto',
	top: '50px',
	position: 'relative'
});

const iconStyle = css({
	width: '56px',
	height: '56px',
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

const mediumIcon = css({
	background: "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2ZXJzaW9uPSIxLjAiIHg9IjBweCIgeT0iMHB4IiB2aWV3Qm94PSIwIDAgNTAgNTAiIGZpbGw9IiNlY2YwZjEiID4gICAgPHBhdGggZD0iTSAxOCA0MS41NzggQyAxOCA0Mi40NjkgMTcuNTI1IDQzIDE2Ljg0OCA0MyBjIC0wLjI0IDAgLTAuNTA2IC0wLjA2NyAtMC43ODYgLTAuMjA4IEwgNS4xNjMgMzcuMjczIEMgNC41MjMgMzYuOTQ5IDQgMzYuMDkxIDQgMzUuMzY3IFYgOC4zMTEgYyAwIC0wLjcxMyAwLjM4IC0xLjEzNyAwLjkyMiAtMS4xMzcgYyAwLjE5MyAwIDAuNDA2IDAuMDU0IDAuNjI5IDAuMTY3IGwgMC4zODIgMC4xOTMgYyAwLjAwMiAwLjAwMSAwLjAwMyAwLjAwMSAwLjAwNSAwLjAwMiBsIDEyLjAxIDYuMDgxIGMgMC4wMjIgMC4wMTEgMC4wMzYgMC4wMzEgMC4wNTIgMC4wNDggViA0MS41NzggWiBNIDMwLjU4NyA4Ljg4MSBsIDAuNzMyIC0xLjIwNCBDIDMxLjU4MSA3LjI0NyAzMi4wNjQgNyAzMi41NDkgNyBjIDAuMTE2IDAgMC4yMzEgMC4wMTcgMC4zNDQgMC4wNDYgYyAwLjA4NyAwLjAyIDAuMTc3IDAuMDUxIDAuMjcgMC4wOTggbCAxMi42NyA2LjQxNSBjIDAuMDAxIDAuMDAxIDAuMDAxIDAuMDAyIDAuMDAyIDAuMDAyIGwgMC4wMTIgMC4wMDYgYyAwLjAwOCAwLjAwNCAwLjAwOSAwLjAxNCAwLjAxNiAwLjAyIGMgMC4wNjQgMC4wNDggMC4wOSAwLjEzNCAwLjA0NyAwLjIwNSBMIDMzLjI5MyAzNC41NTcgbCAtMS4yODggMi4xMiBsIC04LjM1OSAtMTYuMzcxIEwgMzAuNTg3IDguODgxIFogTSAyMCAzMC42MDcgViAxNy41NjQgbCA4Ljk4MiAxNy41OTIgbCAtOC4wNzkgLTQuMDkxIEwgMjAgMzAuNjA3IFogTSA0NiA0MS41NzggYyAwIDAuODM4IC0wLjQ5NyAxLjMxNCAtMS4yMjggMS4zMTQgYyAtMC4zMjcgMCAtMC43MDEgLTAuMDk1IC0xLjA5OCAtMC4yOTYgbCAtMS44MDYgLTAuOTE1IHYgMCBsIC04LjA3OCAtNC4wOTEgTCA0NiAxNy40OTUgViA0MS41NzggWiIgLz48L3N2Zz4=') 50% 50% no-repeat"
});

const instagramIcon = css({
	background: "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2ZXJzaW9uPSIxLjAiIHg9IjBweCIgeT0iMHB4IiB2aWV3Qm94PSIwIDAgNTAgNTAiIGZpbGw9IiNlY2YwZjEiID4gICAgPHBhdGggZD0iTSAxNSAyIEMgNy44MzIgMiAyIDcuODMyIDIgMTUgTCAyIDM1IEMgMiA0Mi4xNjggNy44MzIgNDggMTUgNDggTCAzNSA0OCBDIDQyLjE2OCA0OCA0OCA0Mi4xNjggNDggMzUgTCA0OCAxNSBDIDQ4IDcuODMyIDQyLjE2OCAyIDM1IDIgTCAxNSAyIFogTSAzOCAxMCBDIDM5LjEwNSAxMCA0MCAxMC44OTUgNDAgMTIgQyA0MCAxMy4xMDUgMzkuMTA1IDE0IDM4IDE0IEMgMzYuODk1IDE0IDM2IDEzLjEwNSAzNiAxMiBDIDM2IDEwLjg5NSAzNi44OTUgMTAgMzggMTAgWiBNIDI1IDEzIEMgMzEuNjE3IDEzIDM3IDE4LjM4MyAzNyAyNSBDIDM3IDMxLjYxNyAzMS42MTcgMzcgMjUgMzcgQyAxOC4zODMgMzcgMTMgMzEuNjE3IDEzIDI1IEMgMTMgMTguMzgzIDE4LjM4MyAxMyAyNSAxMyBaIE0gMjUgMTUgQyAxOS40ODYgMTUgMTUgMTkuNDg2IDE1IDI1IEMgMTUgMzAuNTE0IDE5LjQ4NiAzNSAyNSAzNSBDIDMwLjUxNCAzNSAzNSAzMC41MTQgMzUgMjUgQyAzNSAxOS40ODYgMzAuNTE0IDE1IDI1IDE1IFoiIC8+PC9zdmc+') 50% 50% no-repeat"
});