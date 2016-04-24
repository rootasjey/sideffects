// -----------------------------
// WEB SITE APP - JS FILE (jquery)
// -----------------------------
// by Jeremie Corpinot
// jeremiecorpinot@outlook.com
// -----------------------------


// GLOBAL VARIABLES
// ----------------
// Tell if the user is in admin mode
var _ADMIN = false;

var _app = {
	app: this,
	godmod: false,
	$grid: null,

	posts: [],
	projects: [],

	// Modal object
	modal: {
		parent: null,
		selector: null,
		closeIcon: null,

		tag: null,
		link: null,
		linkIcon: null,
		title: null,
		subtitle: null,
		content: null,
		picture: null,
		infos: null,
		textContent: null,

		init: function () {
			this.parent = _app;
			this.selector = document.getElementById('modal');
			this.closeIcon = document.querySelector("#modal .close");

			this.title = document.querySelector("#modal .title");
			this.subtitle = document.querySelector("#modal .subtitle");
			this.content = document.querySelector("#modal .content");
			this.textContent = document.querySelector("#modal .textContent");
			this.link = document.querySelector("#modal .link");
			this.linkIcon = document.querySelector("#modal .link-icon");
			this.picture = document.querySelector("#modal .picture");
			this.tag = document.querySelector("#modal .tag");
			this.infos = document.querySelector("#modal .infos");

			this.events();
		},

		events: function () {
			var that = this;
			this.closeIcon.addEventListener('click', function () {
				that.hide();
				that.parent.showGrid();
			});
		},

		show: function (data) {
			this.selector.className = "visible";

			$(this.selector).addClass('animated bounceInUp');

			if (data) {
				this.title.innerHTML 		= data.title;
				this.textContent.innerHTML 	= data.textContent;
				this.linkIcon.title 		= data.link;
				this.infos.innerHTML 		= data.infos ? data.infos : '';
				this.link.setAttribute("href", data.link);
				this.picture.setAttribute("src", data.miniature);
			}
		},

		hide: function () {
			$(this.selector).removeClass('animated bounceInUp');
			$(this.selector).addClass('animated bounceOutDown');

			var that = this;
			window.setTimeout(function () {
				that.selector.className = "hidden";
			}, 800);

		}
	},

	// Initialize objects
	init: function () {
		this.modal.init();
	},

	initGrid: function () {
		this.$grid = $('.grid').masonry({
		  itemSelector: '.grid-item',
		  columnWidth: 260
		});
	},

	// Returns a random integer between min (included) and max (excluded)
	// Using Math.round() will give you a non-uniform distribution!
	getRandomInt : function getRandomInt(min, max) {
	  return Math.floor(Math.random() * (max - min)) + min;
  	},
	// Return a random flat color
	getAFlatColor : function () {
	     var colors = ["#1abc9c", "#2ecc71", "#3498db", "#3498db", "#34495e",
	                   "#16a085", "#27ae60", "#2980b9", "#8e44ad", "#2c3e50",
	                   "#f1c40f", "#e67e22", "#e74c3c", "#ecf0f1", "#95a5a6",
		                 "#f39c12", "#d35400", "#c0392b", "#bdc3c7", "#7f8c8d", "#CA6924"];
		                //   credits to http://flatuicolors.com/

		var int = this.getRandomInt(0, colors.length);
		return colors[int];
	},


	// Return a DOM grid item
	buildGridItem: function (data) {
		var item = document.createElement('div');

		var itemBg = document.createElement('div');
		var itemTxt = document.createElement('div');

		item.appendChild(itemBg);
		item.appendChild(itemTxt);
		return item;
	},

	buildPostItem: function (data, index) {
		var item,
		 	itemBg,
			itemTxt,
			title,
			desc;

		item 	= document.createElement('div');
		itemBg 	= document.createElement('div');
		itemTxt = document.createElement('div');

		title 	= document.createElement('p');
		desc 	= document.createElement('p');
		// platform= document.createElement('p');

		// Classes
		item.setAttribute("data-id", index);
		item.className = 'grid-item large';
		itemBg.className = 'grid-item-bg';
		itemTxt.className = 'grid-item-txt white';
		title.className = 'grid-item-title';
		desc.className = 'grid-item-desc';

		// Assignations
		title.innerHTML 	= data.title;
		desc.innerHTML  	= data.preview.substr(0, 160) + "...";

		itemBg.style.background = "url(" + data.background + ")";
		itemBg.setAttribute("data-stellar-background-ratio", "0.5");

		// itemTxt appends
		itemTxt.appendChild(title);
		itemTxt.appendChild(desc);
		// itemTxt.appendChild(platform);

		// Appends and return
		item.appendChild(itemBg);
		item.appendChild(itemTxt);
		return item;
	},

	buildProjectItem: function (data, index) {
		var item,
		 	itemBg,
			itemTxt,
			itemIcon,
			title,
			desc,
			platform;

		item 	= document.createElement('div');
		itemBg 	= document.createElement('div');
		itemTxt = document.createElement('div');
		itemIcon= document.createElement('img');

		title 	= document.createElement('p');
		desc 	= document.createElement('p');
		platform= document.createElement('p');

		// Classes
		item.setAttribute("data-id", index);
		item.className = 'grid-item bubble';
		itemBg.className = 'grid-item-bg bubble';
		itemTxt.className = 'grid-item-txt bubble';
		itemIcon.className = 'grid-item-icon';

		// Assignations
		title.innerHTML 	= data.title;
		// desc.innerHTML  	= data.description.substr(0, 160) + "...";
		// platform.innerHTML 	= data.platform;

		itemBg.style.background = data.langcolor;
		itemIcon.src = data.icon;

		// itemTxt appends
		itemTxt.appendChild(title);
		itemTxt.appendChild(desc);
		itemTxt.appendChild(platform);

		// Appends and return
		item.appendChild(itemBg);
		item.appendChild(itemTxt);
		item.appendChild(itemIcon);
		return item;
	},

	hideGrid: function () {
		this.$grid[0].className += " hidden";
	},

	showGrid: function () {
		this.$grid[0].className = this.$grid[0].className.replace("hidden", "");
	}
};

// Run when the page is loaded
// --------------------------
window.onload = function () {
	defaultLoad();
};

// Load defaults functions
function defaultLoad() {
	_app.init();

	getBlogPosts();

	// _app.initGrid();

	getProjects();
	// getLessons();


	// Run parallax process
	$.stellar();
}
