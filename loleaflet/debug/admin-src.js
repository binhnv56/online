
/* eslint-disable */
/// Available types: info, warning, danger, link, success, primary. Works with bulma.css.
// Every "set" function returns the instance. So you can do this:
// (new DlgYesNo).Title('some title').Text('some text').YesButtonText('yes').NoButtonText('no').YesFunction(function () {/* */}).NoFunction(function() {/** */});
// "Yes" and "No" buttons call callback function, close the modal and destroy the modal.
var DlgYesNo = /** @class */ (function () {
    function DlgYesNo() {
        this._instance = this;
        DlgYesNo._instanceCount++;
        this._modalID = DlgYesNo._instanceCount;
        this.initialize();
    }
    DlgYesNo.prototype.initialize = function () {
        var html = this.getModalHTML();
        var element = document.createElement('div');
        element.innerHTML = html;
        document.getElementsByTagName('body')[0].appendChild(element);
        this.initializeBackgroundClick();
        this.initializeCrossButton();
        this.initializeYesButton();
        this.initializeNoButton();
    };
    DlgYesNo.prototype.initializeCrossButton = function () {
        var element = document.getElementById('modal-' + String(this._modalID));
        document.getElementById('modal-cross-button-' + String(this._modalID)).onclick = function () {
            element.classList.remove('is-active');
            element.parentNode.removeChild(element);
        };
    };
    DlgYesNo.prototype.initializeBackgroundClick = function () {
        var element = document.getElementById('modal-' + String(this._modalID));
        document.getElementById('modal-background-' + String(this._modalID)).onclick = function () {
            element.classList.remove('is-active');
            element.parentNode.removeChild(element);
        };
    };
    DlgYesNo.prototype.initializeYesButton = function () {
        var element = document.getElementById('modal-' + String(this._modalID));
        document.getElementById('modal-yes-button-' + String(this._modalID)).onclick = function () {
            element.classList.remove('is-active');
            element.parentNode.removeChild(element);
        };
    };
    DlgYesNo.prototype.initializeNoButton = function () {
        var element = document.getElementById('modal-' + String(this._modalID));
        document.getElementById('modal-no-button-' + String(this._modalID)).onclick = function () {
            element.classList.remove('is-active');
            element.parentNode.removeChild(element);
        };
    };
    DlgYesNo.prototype.getModalHTML = function () {
        var html = ' \
<div class="modal" id="modal-__created_id__"> \
    <div class="modal-background" id="modal-background-__created_id__"></div> \
    <div class="modal-card"> \
        <header class="modal-card-head" id="modal-head-__created_id__"> \
            <p class="modal-card-title" id="modal-title-__created_id__">Yes / No Modal Template</p> \
            <button class="delete" id="modal-cross-button-__created_id__"></button> \
        </header> \
        <section class="modal-card-body" id="modal-body-__created_id__">Yes / No Modal Body</section> \
        <footer class="modal-card-foot is-fullwidth" id="modal-foot-__created_id__"> \
            <button type="button" class="button is-pulled-left" id="modal-no-button-__created_id__" style="min-width:120px;">Cancel</button> \
            <button type="button" class="button is-pulled-right" id="modal-yes-button-__created_id__" style="min-width:120px;">OK</button> \
        </footer> \
    </div> \
</div>';
        html = html.split('__created_id__').join(String(this._modalID));
        return html;
    };
    DlgYesNo.prototype.yesButtonText = function (text) {
        var button = document.getElementById('modal-yes-button-' + String(this._modalID));
        button.innerText = text;
        return this._instance;
    };
    DlgYesNo.prototype.noButtonText = function (text) {
        var button = document.getElementById('modal-no-button-' + String(this._modalID));
        button.innerText = text;
        return this._instance;
    };
    DlgYesNo.prototype.title = function (text) {
        var p = document.getElementById('modal-title-' + String(this._modalID));
        p.innerText = text;
        return this._instance;
    };
    DlgYesNo.prototype.text = function (text) {
        var d = document.getElementById('modal-body-' + String(this._modalID));
        d.innerText = text;
        return this._instance;
    };
    DlgYesNo.prototype.type = function (type) {
        var header = document.getElementById('modal-head-' + String(this._modalID));
        header.className = 'modal-card-head has-background-' + type;
        return this._instance;
    };
    DlgYesNo.prototype.yesFunction = function (f) {
        var element = document.getElementById('modal-' + String(this._modalID));
        document.getElementById('modal-yes-button-' + String(this._modalID)).onclick = function (e) {
            f(e);
            element.classList.remove('is-active');
            element.parentNode.removeChild(element);
        };
        return this._instance;
    };
    DlgYesNo.prototype.noFunction = function (f) {
        var element = document.getElementById('modal-' + String(this._modalID));
        document.getElementById('modal-no-button-' + String(this._modalID)).onclick = function (e) {
            f(e);
            element.classList.remove('is-active');
            element.parentNode.removeChild(element);
        };
        return this._instance;
    };
    DlgYesNo.prototype.open = function () {
        document.getElementById('modal-' + String(this._modalID)).classList.add('is-active');
    };
    DlgYesNo._instanceCount = 0;
    return DlgYesNo;
}());

/* -*- js-indent-level: 8 -*- */
/*
	Base.js, version 1.1a
	Copyright 2006-2010, Dean Edwards
	License: http://www.opensource.org/licenses/mit-license.php
*/

var Base = function() {
	// dummy
};

Base.extend = function(_instance, _static) { // subclass
	var extend = Base.prototype.extend;

	// build the prototype
	Base._prototyping = true;
	var proto = new this;
	extend.call(proto, _instance);
	proto.base = function() {
		// call this method from any other method to invoke that method's ancestor
	};
	delete Base._prototyping;

	// create the wrapper for the constructor function
	//var constructor = proto.constructor.valueOf(); //-dean
	var constructor = proto.constructor;
	var klass = proto.constructor = function() {
		if (!Base._prototyping) {
			if (this._constructing || this.constructor == klass) { // instantiation
				this._constructing = true;
				constructor.apply(this, arguments);
				delete this._constructing;
			} else if (arguments[0] != null) { // casting
				return (arguments[0].extend || extend).call(arguments[0], proto);
			}
		}
	};

	// build the class interface
	klass.ancestor = this;
	klass.extend = this.extend;
	klass.forEach = this.forEach;
	klass.implement = this.implement;
	klass.prototype = proto;
	klass.toString = this.toString;
	klass.valueOf = function(type) {
		//return (type == "object") ? klass : constructor; //-dean
		return (type == 'object') ? klass : constructor.valueOf();
	};
	extend.call(klass, _static);
	// class initialisation
	if (typeof klass.init == 'function') klass.init();
	return klass;
};

Base.prototype = {
	extend: function(source, value) {
		if (arguments.length > 1) { // extending with a name/value pair
			var ancestor = this[source];
			if (ancestor && (typeof value == 'function') && // overriding a method?
				// the valueOf() comparison is to avoid circular references
				(!ancestor.valueOf || ancestor.valueOf() != value.valueOf()) &&
				/\bbase\b/.test(value)) {
				// get the underlying method
				var method = value.valueOf();
				// override
				value = function() {
					var previous = this.base || Base.prototype.base;
					this.base = ancestor;
					var returnValue = method.apply(this, arguments);
					this.base = previous;
					return returnValue;
				};
				// point to the underlying method
				value.valueOf = function(type) {
					return (type == 'object') ? value : method;
				};
				value.toString = Base.toString;
			}
			this[source] = value;
		} else if (source) { // extending with an object literal
			var extend = Base.prototype.extend;
			// if this object has a customised extend method then use it
			if (!Base._prototyping && typeof this != 'function') {
				extend = this.extend || extend;
			}
			var proto = {toSource: null};
			// do the "toString" and other methods manually
			var hidden = ['constructor', 'toString', 'valueOf'];
			// if we are prototyping then include the constructor
			var i = Base._prototyping ? 0 : 1;
			while ((key = hidden[i++])) {
				if (source[key] != proto[key]) {
					extend.call(this, key, source[key]);

				}
			}
			// copy each of the source object's properties to this object
			for (var key in source) {
				if (!proto[key]) extend.call(this, key, source[key]);
			}
		}
		return this;
	}
};

// initialise
Base = Base.extend({
	constructor: function() {
		this.extend(arguments[0]);
	}
}, {
	ancestor: Object,
	version: '1.1',

	forEach: function(object, block, context) {
		for (var key in object) {
			if (this.prototype[key] === undefined) {
				block.call(context, object[key], key, object);
			}
		}
	},

	implement: function() {
		for (var i = 0; i < arguments.length; i++) {
			if (typeof arguments[i] == 'function') {
				// if it's a function, call it
				arguments[i](this.prototype);
			} else {
				// add the interface using the extend method
				this.prototype.extend(arguments[i]);
			}
		}
		return this;
	},

	toString: function() {
		return String(this.valueOf());
	}
});


/* -*- js-indent-level: 8 -*- */
/* Export variable Admin */

var Admin = {};
module.exports = Admin;

/* -*- js-indent-level: 8 -*- */
/*
	Abstract class
*/

/* global _ Util vex Base */

// polyfill startsWith for IE11
if (typeof String.prototype.startsWith !== 'function') {
	String.prototype.startsWith = function (str) {
		return this.slice(0, str.length) === str;
	};
}

var AdminSocketBase = Base.extend({
	socket: null,

	constructor: function(host) {
		// because i am abstract
		if (this.constructor === AdminSocketBase) {
			throw new Error('Cannot instantiate abstract class');
		}

		// We do not allow such child class to instantiate websocket that do not implement
		// onSocketMessage and onSocketOpen.
		if (typeof this.onSocketMessage === 'function' && typeof this.onSocketOpen === 'function') {
			this.socket = new WebSocket(host);
			this.socket.onopen = this.onSocketOpen.bind(this);
			this.socket.onclose = this.onSocketClose.bind(this);
			this.socket.onmessage = this.onSocketMessage.bind(this);
			this.socket.onerror = this.onSocketError.bind(this);
			this.socket.binaryType = 'arraybuffer';
		}
	},

	onSocketOpen: function() {
		// Authenticate
		var cookie = Util.getCookie('jwt');
		this.socket.send('auth ' + cookie);
	},

	onSocketMessage: function() {
		/* Implemented by child */
	},

	onSocketClose: function() {
		this.socket.onerror = function() {};
		this.socket.onclose = function() {};
		this.socket.onmessage = function() {};
		this.socket.close();
	},

	onSocketError: function() {
		vex.dialog.alert(_('Connection error'));
	}
});

/* -*- js-indent-level: 8 -*- */
/*
	Utility class
*/
/* global Base _ */
/* eslint no-unused-vars:0 */
var Util = Base.extend({
	constructor: null

}, { // class interface

	humanizeMem: function (kbytes) {
		var unit = 1000;
		var units = [_('kB'), _('MB'), _('GB'), _('TB'), _('PB'), _('EB'), _('ZB'), _('YB'), _('BB')];
		for (var i = 0; Math.abs(kbytes) >= unit && i < units.length; i++) {
			kbytes /= unit;
		}

		return kbytes.toFixed(1) + ' ' + units[i];
	},

	humanizeSecs: function(secs) {
		var mins = 0;
		var hrs = 0;
		var res = '';

		secs = parseInt(secs);
		if (isNaN(secs)) {
			return res;
		}

		if (secs >= 60) {
			mins = Math.floor(secs / 60);
			secs = secs - mins * 60;
		}
		if (mins >= 60) {
			hrs = Math.floor(mins / 60);
			mins = mins - hrs * 60;
		}

		if (hrs) {
			if (mins < 10) {
				res = hrs + ':0' + mins + _(' hrs');
			} else {
				res = hrs + ':' + mins + _(' hrs');
			}
		} else if (mins) {
			if (secs < 10) {
				res = mins + ':0' + secs + _(' mins');
			} else {
				res = mins + ':' + secs + _(' mins');
			}
		} else if (secs) {
			res = secs + _(' s');
		} else {
			res = '';
		}

		return res;
	},

	getCookie: function(name) {
		var cookies = document.cookie.split(';');
		for (var i = 0; i < cookies.length; i++) {
			var cookie = cookies[i].trim();
			if (cookie.indexOf(name) === 0) {
				return cookie;
			}
		}

		return '';
	}
});

/* -*- js-indent-level: 8 -*- */
/*
	Socket to be intialized on opening the overview page in Admin console
*/
/* global DlgYesNo _ vex $ Util AdminSocketBase Admin */


function getCollapsibleClass(id) {
	var container = document.getElementById(id);
	var label = container.children[0];
	var checkBox = container.children[1];
	var list = container.children[2];
	return {
		'addItem': function(itemId, text) {
			var listItem = document.createElement('li');
			listItem.id = itemId;
			listItem.innerText = text;
			list.appendChild(listItem);
		},
		'toggle': function() {
			checkBox.checked = !checkBox.checked;
		},
		'expand': function() {
			checkBox.checked = true;
		},
		'collapse': function() {
			checkBox.checked = false;
		},
		'setText': function(text) {
			label.innerText = text;
		},
		'getText': function() {
			return label.innerText;
		},
		'checkbox': checkBox,
		'label': label,
		'list': list
	};
}

// Creates collapsable section with its elements. Requires mcollapsable CSS class. Once created, collapsable element runs without javascript.
function createCollapsable(parentNode, id, text) {
	var div  = document.createElement('div'); // One div to hold them all.
	div.id = id;
	// Let's make some magic with CSS.
	// This is our checkbox, but it looks like a label.
	var checkBox = document.createElement('input');
	checkBox.type = 'checkbox';
	checkBox.className = 'title is-4 mcollapsable'; // Class names come from Bulma.css (except for mcollapsable). We use that library for Admin console.
	checkBox.checked = false;
	checkBox.style.visibility = 'hidden';
	checkBox.id = id + 'check';

	var label = document.createElement('label');
	label.innerText = text;
	label.className = 'field-label is-5';
	label.setAttribute('for', id + 'check');
	label.style.cursor = 'pointer';
	label.style.textDecoration = 'underline';

	var list = document.createElement('ul');

	div.appendChild(label);
	div.appendChild(checkBox);
	div.appendChild(list);

	parentNode.appendChild(div);
	return getCollapsibleClass(id);
}

// This function takes the list of the users viewing a specific document. Creates an HTML element holding the list.
function createDocumentUserListElement(cell, doc) {
	var collapsable = createCollapsable(cell, 'ucontainer' + doc['pid'], String(doc['views'].length) + _(' user(s).'));
	for (var i = 0; i < doc['views'].length; i++) {
		collapsable.addItem('user' + doc['views'][i]['sessionid'], doc['views'][i]['userName']);
	}
}

function upsertDocsTable(doc, sName, socket) {
	var add = false;
	var row = document.getElementById('doc' + doc['pid']);
	if (row === undefined || row === null) {
		row = document.createElement('tr');
		row.id = 'doc' + doc['pid'];
		document.getElementById('doclist').appendChild(row);
		add = true;
	}

	var sessionCloseCell = document.createElement('td'); // This cell will open "Do you want to kill this session?" dialog.
	sessionCloseCell.innerText = '✖';
	sessionCloseCell.title = _('Kill session.');
	sessionCloseCell.className = 'has-text-centered';
	sessionCloseCell.style.cursor = 'pointer';
	if (add === true) { row.appendChild(sessionCloseCell); } else { row.cells[0] = sessionCloseCell; }
	sessionCloseCell.onclick = function() {
		var dialog = (new DlgYesNo())
		.title(_('Confirmation'))
		.text(_('Are you sure you want to terminate this session?'))
		.yesButtonText(_('OK'))
		.noButtonText(_('Cancel'))
		.type('warning')
		.yesFunction(function() {
			socket.send('kill ' + doc['pid']);
		});
		dialog.open();
	};

	if (add === true) {
		var userInfoCell = document.createElement('td');
		userInfoCell.className = 'has-text-left';
		if (add === true) { row.appendChild(userInfoCell); } else { row.cells[1] = userInfoCell; }
		createDocumentUserListElement(userInfoCell, doc);
	}
	else {
		var collapsable = getCollapsibleClass('ucontainer' + doc['pid']);
		collapsable.addItem('user' + doc['views'][0]['sessionid'], doc['views'][0]['userName']);
		collapsable.setText(String(parseInt(collapsable.getText().split(' ')[0]) + 1) + _(' user(s).'));
	}

	var pidCell = document.createElement('td');
	pidCell.innerText = doc['pid'];
	if (add === true) { row.appendChild(pidCell); } else { row.cells[0] = pidCell; }
	pidCell.className = 'has-text-centered';

	var nameCell = document.createElement('td');
	nameCell.innerText = sName;
	if (add === true) { row.appendChild(nameCell); } else { row.cells[0] = nameCell; }
	nameCell.className = 'has-text-left';

	var memoryCell = document.createElement('td');
	memoryCell.id = 'docmem' + doc['pid'];
	memoryCell.innerText = Util.humanizeMem(parseInt(doc['memory']));
	if (add === true) { row.appendChild(memoryCell); } else { row.cells[0] = memoryCell; }
	memoryCell.className = 'has-text-centered';

	var eTimeCell = document.createElement('td');
	eTimeCell.innerText = Util.humanizeSecs(doc['elapsedTime']);
	if (add === true) { row.appendChild(eTimeCell); } else { row.cells[0] = eTimeCell; }
	eTimeCell.className = 'has-text-centered';

	var idleCell = document.createElement('td');
	idleCell.id = 'docidle' + doc['pid'];
	idleCell.innerText = Util.humanizeSecs(doc['idleTime']);
	if (add === true) { row.appendChild(idleCell); } else { row.cells[0] = idleCell; }
	idleCell.className = 'has-text-centered';

	var isModifiedCell = document.createElement('td');
	isModifiedCell.id = 'mod' + doc['pid'];
	isModifiedCell.innerText = doc['modified'];
	if (add === true) { row.appendChild(isModifiedCell); } else { row.cells[0] = isModifiedCell; }
	isModifiedCell.className = 'has-text-centered';

	// TODO: Is activeViews always the same with viewer count? We will hide this for now. If they are not same, this will be added to Users column like: 1/2 active/user(s).
	if (add === true) {
		var viewsCell = document.createElement('td');
		viewsCell.id = 'docview' + doc['pid'];
		viewsCell.innerText = doc['activeViews'];
		//row.appendChild(viewsCell);
	}
	else {
		//document.getElementById('docview' + doc['pid']).innerText = String(parseInt(document.getElementById('docview' + doc['pid'])) + 1);
	}
}

function upsertUsersTable(docPid, sName, userList) {
	for (var i = 0; i < userList.length; i++) {
		var encodedUId = encodeURI(userList[i]['userId']);
		var row = document.getElementById('usr' + encodedUId);
		var collapsable;
		if (row === undefined || row === null) {
			row = document.createElement('tr');
			row.id = 'usr' + encodedUId;
			document.getElementById('userlist').appendChild(row);

			var userNameCell = document.createElement('td');
			userNameCell.innerText = userList[i]['userName'];
			row.appendChild(userNameCell);

			var docInfoCell = document.createElement('td');
			row.appendChild(docInfoCell);
			collapsable = createCollapsable(docInfoCell, 'docListContainer_' + encodedUId, '1' + ' document(s) open.');
			collapsable.addItem(userList[i]['sessionid'] + '_' + docPid, sName);
		}
		else {
			collapsable = getCollapsibleClass('docListContainer_' + encodedUId);
			collapsable.setText(String(parseInt(collapsable.getText()) + 1) + _(' document(s) open.'));
			collapsable.addItem(userList[i]['sessionid'] + '_' + docPid, sName);
		}
	}
}

var AdminSocketOverview = AdminSocketBase.extend({
	constructor: function(host) {
		this.base(host);
	},

	_basicStatsIntervalId: 0,

	_docElapsedTimeIntervalId: 0,

	_getBasicStats: function() {
		this.socket.send('mem_consumed');
		this.socket.send('active_docs_count');
		this.socket.send('active_users_count');
		this.socket.send('sent_bytes');
		this.socket.send('recv_bytes');
		this.socket.send('uptime');
	},

	onSocketOpen: function() {
		// Base class' onSocketOpen handles authentication
		this.base.call(this);

		this.socket.send('documents');
		this.socket.send('subscribe adddoc rmdoc resetidle propchange modifications');

		this._getBasicStats();
		var socketOverview = this;
		this._basicStatsIntervalId =
		setInterval(function() {
			return socketOverview._getBasicStats();
		}, 5000);

		this._docElapsedTimeIntervalId =
		setInterval(function() {
			$('td.elapsed_time').each(function() {
				var newSecs = parseInt($(this).val()) + 1;
				$(this).val(newSecs);
				$(this).html(Util.humanizeSecs(newSecs));
			});
			$('td.idle_time').each(function() {
				var newSecs = parseInt($(this).val()) + 1;
				$(this).val(newSecs);
				$(this).html(Util.humanizeSecs(newSecs));
			});
		}, 1000);

		// Dialog uses <a href='#' - which triggers popstate
		vex.defaultOptions.closeAllOnPopState = false;
	},

	onSocketMessage: function(e) {
		var textMsg;
		if (typeof e.data === 'string') {
			textMsg = e.data;
		}
		else {
			textMsg = '';
		}

		var $doc, $a;
		var nTotalViews;
		var docProps, sPid, sName;
		if (textMsg.startsWith('documents')) {
			var jsonStart = textMsg.indexOf('{');
			var docList = JSON.parse(textMsg.substr(jsonStart).trim())['documents'];

			for (var i = 0; i < docList.length; i++) {
				sName = decodeURI(docList[i]['fileName']);
				upsertUsersTable(docList[i]['pid'], sName, docList[i]['views']);
				upsertDocsTable(docList[i], sName, this.socket);
			}
		}
		else if (textMsg.startsWith('resetidle')) {
			textMsg = textMsg.substring('resetidle'.length);
			sPid = textMsg.trim().split(' ')[0];
			document.getElementById('docidle' + sPid).innerText = Util.humanizeSecs(0);
		}
		else if (textMsg.startsWith('adddoc')) {
			textMsg = textMsg.substring('adddoc'.length);
			docProps = textMsg.trim().split(' ');
			docProps = {
				'pid': docProps[0],
				'sName': docProps[1],
				'sessionid': docProps[2],
				'userName': decodeURI(docProps[3]),
				'encodedUId': encodeURI(docProps[4]),
				'userId': docProps[4],
				'memory': docProps[5],
				'elapsedTime': '0',
				'idleTime': '0',
				'modified': 'No',
				'views': [{ 'sessionid': docProps[2], 'userName': decodeURI(docProps[3]) }]
			};

			upsertDocsTable(docProps, docProps['sName'], this.socket);
			upsertUsersTable(docProps['pid'], docProps['sName'], [docProps]);
			document.getElementById('active_docs_count').innerText = String(parseInt(document.getElementById('active_docs_count').innerText) + 1);
			document.getElementById('active_users_count').innerText = String(parseInt(document.getElementById('active_users_count')) + 1);
		}
		else if (textMsg.startsWith('mem_consumed') ||
			textMsg.startsWith('active_docs_count') ||
			textMsg.startsWith('active_users_count') ||
			textMsg.startsWith('sent_bytes') ||
			textMsg.startsWith('recv_bytes') ||
			textMsg.startsWith('uptime'))
		{
			textMsg = textMsg.split(' ');
			var sCommand = textMsg[0];
			var nData = parseInt(textMsg[1]);

			if (sCommand === 'mem_consumed' ||
			    sCommand === 'sent_bytes' ||
			    sCommand === 'recv_bytes') {
				nData = Util.humanizeMem(nData);
			}
			else if (sCommand === 'uptime') {
				nData = Util.humanizeSecs(nData);
			}
			$(document.getElementById(sCommand)).text(nData);
		}
		else if (textMsg.startsWith('rmdoc')) {
			textMsg = textMsg.substring('rmdoc'.length);
			docProps = textMsg.trim().split(' ');
			sPid = docProps[0];
			var sessionid = docProps[1];

			var doc = document.getElementById('doc' + sPid);
			if (doc !== undefined && doc !== null) {
				var $user = $(document.getElementById('user' + sessionid));
				$user.remove();
				var collapsable = getCollapsibleClass('ucontainer' + sPid);
				var viewerCount = parseInt(collapsable.getText().split(' ')[0]) - 1;
				if (viewerCount === 0) {
					document.getElementById('docview').deleteRow(doc.rowIndex);
				}
				else {
					collapsable.setText(String(viewerCount) + _(' user(s).'));
				}
				$a = $(document.getElementById('active_users_count'));
				nTotalViews = parseInt($a.text());
				$a.text(nTotalViews - 1);
			}

			var docEntry = document.getElementById(sessionid + '_' + sPid);
			if (docEntry !== null) {
				var docCount = docEntry.parentNode.children.length;
				var userDocListCell = docEntry.parentNode.parentNode.parentNode;
				if (docCount === 1) {
					document.getElementById('userview').deleteRow(userDocListCell.parentNode.rowIndex);
				}
				else {
					docEntry = null;
					userDocListCell.children[0].innerText = String(parseInt(userDocListCell.children[0].innerText) - 1);
				}
			}
		}
		else if (textMsg.startsWith('propchange')) {
			textMsg = textMsg.substring('propchange'.length);
			docProps = textMsg.trim().split(' ');
			sPid = docProps[0];
			var sProp = docProps[1];
			var sValue = docProps[2];

			$doc = $('#doc' + sPid);
			if ($doc.length !== 0) {
				if (sProp == 'mem') {
					var $mem = $('#docmem' + sPid);
					$mem.text(Util.humanizeMem(parseInt(sValue)));
				}
			}
		}
		else if (textMsg.startsWith('modifications')) {
			textMsg = textMsg.substring('modifications'.length);
			docProps = textMsg.trim().split(' ');
			sPid = docProps[0];
			var value = docProps[1];

			var $mod = $(document.getElementById('mod' + sPid));
			$mod.text(value);
		}
		else if (e.data == 'InvalidAuthToken' || e.data == 'NotAuthenticated') {
			var msg;
			if (window.location.protocol === 'http:')
			{
				// Browsers refuse to overwrite the jwt cookie in this case.
				msg =  _('Failed to set jwt authentication cookie over insecure connection');
			}
			else
			{
				msg =  _('Failed to authenticate this session over protocol %0');
				msg = msg.replace('%0', window.location.protocol);
			}
			vex.dialog.alert({ message: msg });
		}
	},

	onSocketClose: function() {
		clearInterval(this._basicStatsIntervalId);
		clearInterval(this._docElapsedTimeIntervalId);
	}
});

Admin.Overview = function(host) {
	return new AdminSocketOverview(host);
};

/* -*- js-indent-level: 8 -*- */
/*
	Socket to be intialized on opening the analytics page in Admin console
	containing various graphs to show to the user on specified interval
*/

/* global _ d3 Util AdminSocketBase $ Admin */
var AdminSocketAnalytics = AdminSocketBase.extend({
	constructor: function(host) {
		this.base(host);
	},

	_memStatsData: [],
	_cpuStatsData: [],
	_sentStatsData: [],
	_recvStatsData: [],

	_memStatsSize: 0,
	_memStatsInterval: 0,

	_cpuStatsSize: 0,
	_cpuStatsInterval: 0,

	_netStatsSize: 0,
	_netStatsInterval: 0,

	_initStatsData: function(option, size, interval, reset) {
		var actualData;

		if (reset) {
			actualData = [];
		}

		var offset = actualData.length * interval;
		for (var i = 0; i < size; i++) {
			actualData.unshift({time: -(offset), value: 0});
			offset += interval;
		}

		if (option === 'mem')
			this._memStatsData = actualData;
		else if (option === 'cpu')
			this._cpuStatsData = actualData;
		else if (option === 'sent')
			this._sentStatsData = actualData;
		else if (option === 'recv')
			this._recvStatsData = actualData;
	},

	onSocketOpen: function() {
		// Base class' onSocketOpen handles authentication
		this.base.call(this);

		this.socket.send('subscribe mem_stats cpu_stats sent_activity recv_activity settings');
		this.socket.send('settings');
		this.socket.send('sent_activity');
		this.socket.send('recv_activity');
		this.socket.send('mem_stats');
		this.socket.send('cpu_stats');
	},

	_d3MemXAxis: null,
	_d3MemYAxis: null,
	_d3MemLine: null,
	_xMemScale: null,
	_yMemScale: null,

	_d3CpuXAxis: null,
	_d3CpuYAxis: null,
	_d3CpuLine: null,
	_xCpuScale: null,
	_yCpuScale: null,

	_d3NetXAxis: null,
	_d3NetYAxis: null,
	_d3NetSentLine: null,
	_d3NetRecvLine: null,
	_xNetScale: null,
	_yNetScale: null,

	_graphWidth: 1000,
	_graphHeight: 500,
	_graphMargins: {
		top: 20,
		right: 20,
		bottom: 20,
		left: 100
	},

	_setUpAxis: function(option) {
		var data, xScale, yScale, d3XAxis, d3Line;

		if (option === 'mem')
			data = this._memStatsData;
		else if (option === 'cpu')
			data = this._cpuStatsData;
		else if (option === 'net')
			data = this._sentStatsData.concat(this._recvStatsData);

		xScale = d3.scaleLinear().range([this._graphMargins.left, this._graphWidth - this._graphMargins.right]).domain([d3.min(data, function(d) {
			return d.time;
		}), d3.max(data, function(d) {
			return d.time;
		})]);


		yScale = d3.scaleLinear().range([this._graphHeight - this._graphMargins.bottom, this._graphMargins.top]).domain([d3.min(data, function(d) {
			return d.value;
		}), d3.max(data, function(d) {
			return d.value;
		})]);

		d3XAxis = d3.axisBottom(xScale)
			.tickFormat(function(d) {
				d = Math.abs(d / 1000);
				var sUnit = 0;
				var i = 0;
				var units = ['s', 'min', 'hr'];
				for (i  = 0; i < units.length && Math.abs(d) >= 60; i++) {
					sUnit = parseInt(d % 60);
					d = parseInt(d / 60);
				}
				if (i !== 0 && sUnit !== 0) {
					return d + units[i][0] + ' ' + sUnit + units[i-1][0];
				}
				else
					return d + units[i];
			});

		d3Line = d3.line()
			.x(function(d) {
				return xScale(d.time);
			})
			.y(function(d) {
				return yScale(d.value);
			})
			.curve(d3.curveMonotoneX);

		if (option === 'mem') {
			this._xMemScale = xScale;
			this._yMemScale = yScale;
			this._d3MemXAxis = d3XAxis;
			this._d3MemYAxis = d3.axisLeft(this._yMemScale)
				.tickFormat(function (d) {
					return Util.humanizeMem(d);
				});
			this._d3MemLine = d3Line;
		}
		else if (option === 'cpu') {
			this._xCpuScale = xScale;
			this._yCpuScale = yScale;
			this._d3CpuXAxis = d3XAxis;
			this._d3CpuYAxis = d3.axisLeft(this._yCpuScale)
				.tickFormat(function (d) {
					return d + '%';
				});
			this._d3CpuLine = d3Line;
		}
		else if (option === 'net') {
			this._xNetScale = xScale;
			this._yNetScale = yScale;
			this._d3NetXAxis = d3XAxis;
			this._d3NetYAxis = d3.axisLeft(this._yNetScale)
				.tickFormat(function (d) {
					return Util.humanizeMem(d/1000) + '/sec';
				});
			this._d3NetSentLine = d3Line;
			this._d3NetRecvLine = d3Line;

		}
	},

	_createGraph: function(option) {
		var vis, xAxis, yAxis, line, data;

		if (option === 'mem') {
			vis = d3.select('#MemVisualisation');
			this._setUpAxis('mem');
			xAxis = this._d3MemXAxis;
			yAxis = this._d3MemYAxis;
			line = this._d3MemLine;
			data = this._memStatsData;
		}
		else if (option === 'cpu') {
			vis = d3.select('#CpuVisualisation');
			this._setUpAxis('cpu');
			xAxis = this._d3CpuXAxis;
			yAxis = this._d3CpuYAxis;
			line = this._d3CpuLine;
			data = this._cpuStatsData;
		}
		else if (option === 'net') {
			vis = d3.select('#NetVisualisation');
			this._setUpAxis('net');
			xAxis = this._d3NetXAxis;
			yAxis = this._d3NetYAxis;

			var legend = vis.append('g')
				.attr('x', this._graphWidth - 70)
				.attr('y', 50)
				.style('font-size', '17px');

			var legendData = [
				{
					text: _('Received'),
					color: 'green'
				},
				{
					text: _('Sent'),
					color: 'red'
				}
			];
			var legendSpacing = 20;

			for (var i = legendData.length - 1; i >= 0; i--) {

				legend.append('text')
					.attr('x', this._graphWidth - 70)
					.attr('y', 80 + i * legendSpacing)
					.text(legendData[i].text);
				legend.append('rect')
					.attr('x', this._graphWidth - 90)
					.attr('y', 67 + i * legendSpacing)
					.attr('width', 15)
					.attr('height', 15)
					.style('fill', legendData[i].color)
					.style('stroke', 'black');
			}
		}

		vis.append('svg:g')
		.attr('class', 'x-axis axis')
		.attr('transform', 'translate(0,' + (this._graphHeight - this._graphMargins.bottom) + ')')
		.call(xAxis);

		vis.append('svg:g')
		.attr('class', 'y-axis axis')
		.attr('transform', 'translate(' + this._graphMargins.left + ',0)')
		.call(yAxis);

		if (option === 'cpu' || option === 'mem') {

			vis.append('svg:path')
				.attr('d', line(data))
				.attr('class', 'line')
				.attr('stroke', 'blue')
				.attr('stroke-width', 1)
				.attr('fill', 'none');
		}
		else if (option === 'net') {

			vis.append('svg:path')
				.attr('d', this._d3NetSentLine(this._sentStatsData))
				.attr('class', 'lineSent')
				.attr('stroke', 'red')
				.attr('stroke-width', 1)
				.attr('fill', 'none');

			vis.append('svg:path')
				.attr('d', this._d3NetRecvLine(this._recvStatsData))
				.attr('class', 'lineRecv')
				.attr('stroke', 'green')
				.attr('stroke-width', 1)
				.attr('fill', 'none');
		}

	},

	_addNewData: function(oldData, newData, option) {
		var size, graphName, line, elemSize;
		elemSize = this._graphWidth - this._graphMargins['left'] - this._graphMargins['right'];

		if (option === 'mem') {
			size = this._memStatsSize;
			graphName = '#MemVisualisation';
			line = 'line';
		}
		else if (option === 'cpu') {
			size = this._cpuStatsSize;
			graphName = '#CpuVisualisation';
			line = 'line';
		}
		else if (option === 'sent' || option === 'recv')
			size = this._netStatsSize;

		if (graphName === '#MemVisualisation' || graphName === '#CpuVisualisation' ||
				graphName === '#NetVisualisation') {
			d3.select(graphName)
			.select('.' + line)
			.attr('transform', 'translate(' + elemSize/size + ')')
			.transition()
			.attr('transform', 'translate(' + 0 + ')');
		}

		// make a space for new data
		for (var i = oldData.length - 1; i > 0; i--) {
			oldData[i].time = oldData[i - 1].time;
		}

		// push new data at time '0'
		oldData.push({time: 0, value: parseInt(newData)});

		// remove extra items
		if (oldData.length > size) {
			oldData.shift();
		}
	},

	_updateMemGraph: function() {
		var svg = d3.select('#MemVisualisation');

		this._setUpAxis('mem');

		svg.select('.line')
		.attr('d', this._d3MemLine(this._memStatsData));

		svg.select('.x-axis')
		.call(this._d3MemXAxis);

		svg.transition()
		.duration(500)
		.select('.y-axis')
		.call(this._d3MemYAxis);
	},

	_updateCpuGraph: function() {
		var svg = d3.select('#CpuVisualisation');

		this._setUpAxis('cpu');

		svg.select('.line')
		.attr('d', this._d3CpuLine(this._cpuStatsData));

		svg.select('.x-axis')
		.call(this._d3CpuXAxis);

		svg.transition()
		.select('.y-axis')
		.duration(500)
		.call(this._d3CpuYAxis);
	},

	_updateNetGraph: function() {
		var svg = d3.select('#NetVisualisation');

		this._setUpAxis('net');

		svg.select('.lineSent')
		.attr('d', this._d3NetSentLine(this._sentStatsData));
		svg.select('.lineRecv')
		.attr('d', this._d3NetRecvLine(this._recvStatsData));

		svg.select('.x-axis')
		.call(this._d3NetXAxis);

		svg.transition()
		.select('.y-axis')
		.duration(500)
		.call(this._d3NetYAxis);
	},

	onSocketMessage: function(e) {
		var textMsg;
		if (typeof e.data === 'string') {
			textMsg = e.data;
		}
		else {
			textMsg = '';
		}

		if (textMsg.startsWith('settings')) {
			textMsg = textMsg.substring('settings '.length);
			textMsg = textMsg.split(' ');

			var memStatsSize, memStatsInterval, cpuStatsSize, cpuStatsInterval;
			var i, j, data;
			memStatsSize = this._memStatsSize;
			memStatsInterval = this._memStatsInterval;
			cpuStatsSize = this._cpuStatsSize;
			cpuStatsInterval = this._cpuStatsInterval;
			for (i = 0; i < textMsg.length; i++) {
				var setting = textMsg[i].split('=');
				if (setting[0] === 'mem_stats_size') {
					memStatsSize = parseInt(setting[1]);
				}
				else if (setting[0] === 'mem_stats_interval') {
					memStatsInterval = parseInt(setting[1]);
				}
				else if (setting[0] === 'cpu_stats_size') {
					cpuStatsSize = parseInt(setting[1]);
				}
				else if (setting[0] === 'cpu_stats_interval') {
					cpuStatsInterval = parseInt(setting[1]);
				}
				else if (setting[0] === 'net_stats_size') {
					this._netStatsSize = parseInt(setting[1]);
				}
				else if (setting[0] === 'net_stats_interval') {
					this._netStatsInterval = parseInt(setting[1]);
				}
			}

			// Fix the axes according to changed data
			if (memStatsInterval !== this._memStatsInterval) {
				// We can possibly reuse the data with a bit of work
				this._initStatsData('mem', memStatsSize, memStatsInterval, true);
			}
			else if (memStatsSize > this._memStatsSize) {
				this._initStatsData('mem', memStatsSize - this._memStatsSize, memStatsInterval, false);
			}
			else {
				// just strip the extra items
				for (i = 0; i < this._memStatsSize - memStatsSize; i++) {
					this._memStatsData.shift();
				}
			}

			this._memStatsSize = memStatsSize;
			this._memStatsInterval = memStatsInterval;

			// Similar Logic as above for CPU stats
			if (cpuStatsInterval !== this._cpuStatsInterval) {
				this._initStatsData('cpu', cpuStatsSize, cpuStatsInterval, true);
			}
			else if (cpuStatsSize > this._cpuStatsSize) {
				this._initStatsData('cpu', cpuStatsSize - this._cpuStatsSize, cpuStatsInterval, false);
			}
			else {
				for (i = 0; i < this._cpuStatsSize - cpuStatsSize; i++) {
					this._cpuStatsData.shift();
				}
			}

			this._cpuStatsSize = cpuStatsSize;
			this._cpuStatsInterval = cpuStatsInterval;

			this._initStatsData('sent', this._netStatsSize, this._netStatsInterval, true);
			this._initStatsData('recv', this._netStatsSize, this._netStatsInterval, true);

		}
		else if (textMsg.startsWith('mem_stats')) {
			textMsg = textMsg.split(' ')[1];
			if (textMsg.endsWith(',')) {
				// This is the result of query, not notification
				data = textMsg.substring(0, textMsg.length - 1).split(',');
				for (i = this._memStatsData.length - 1, j = data.length - 1; i >= 0 && j >= 0; i--, j--) {
					this._memStatsData[i].value = parseInt(data[j]);
				}

				this._createGraph('mem');
			}
			else {
				// this is a notification data; append to _memStatsData
				data = textMsg.trim();
				this._addNewData(this._memStatsData, data, 'mem');
				this._updateMemGraph();
			}
		}
		else if (textMsg.startsWith('cpu_stats')) {
			textMsg = textMsg.split(' ')[1];
			if (textMsg.endsWith(',')) {
				// This is the result of query, not notification
				data = textMsg.substring(0, textMsg.length - 1).split(',');

				for (i = this._cpuStatsData.length - 1, j = data.length - 1; i >= 0 && j >= 0; i--, j--) {
					this._cpuStatsData[i].value = parseInt(data[j]);
				}

				this._createGraph('cpu');
			}
			else {
				// this is a notification data; append to _cpuStatsData
				data = textMsg.trim();
				this._addNewData(this._cpuStatsData, data, 'cpu');
				this._updateCpuGraph();
			}
		}
		else if (textMsg.startsWith('sent_activity')) {
			textMsg = textMsg.split(' ')[1];
			if (textMsg.endsWith(',')) {
				// This is the result of query, not notification
				data = textMsg.substring(0, textMsg.length - 1).split(',');

				for (i = this._sentStatsData.length - 1, j = data.length - 1; i >= 0 && j >= 0; i--, j--) {
					this._sentStatsData[i].value = parseInt(data[j]);
				}

				if ($('#NetVisualisation').html() === '')
					this._createGraph('net');
			}
			else {
				// this is a notification data; append to _sentStatsData
				data = textMsg.trim();
				this._addNewData(this._sentStatsData, parseInt(data), 'sent');
				this._updateNetGraph();
			}
		}
		else if (textMsg.startsWith('recv_activity')) {
			textMsg = textMsg.split(' ')[1];
			if (textMsg.endsWith(',')) {
				// This is the result of query, not notification
				data = textMsg.substring(0, textMsg.length - 1).split(',');

				for (i = this._recvStatsData.length - 1, j = data.length - 1; i >= 0 && j >= 0; i--, j--) {
					this._recvStatsData[i].value = parseInt(data[j]);
				}

				if ($('#NetVisualisation').html() === '')
					this._createGraph('net');
			}
			else {
				// this is a notification data; append to _recvStatsData
				data = textMsg.trim();
				this._addNewData(this._recvStatsData, parseInt(data), 'recv');
				this._updateNetGraph();
			}
		}
	},

	onSocketClose: function() {
		clearInterval(this._basicStatsIntervalId);
	}
});

Admin.Analytics = function(host) {
	return new AdminSocketAnalytics(host);
};

/* -*- js-indent-level: 8 -*- */
/*
	Socket to be intialized on opening the settings page in Admin console
*/
/* global DlgYesNo $ AdminSocketBase Admin _ */
var AdminSocketSettings = AdminSocketBase.extend({
	constructor: function(host) {
		this.base(host);
		this._init();
	},

	_init: function() {
		var socketSettings = this.socket;
		$(document).ready(function() {
			$('#admin_settings').on('submit', function(e) {
				e.preventDefault();
				var memStatsSize = $('#mem_stats_size').val();
				var memStatsInterval = $('#mem_stats_interval').val();
				var cpuStatsSize = $('#cpu_stats_size').val();
				var cpuStatsInterval = $('#cpu_stats_interval').val();
				var command = 'set';
				command += ' mem_stats_size=' + memStatsSize;
				command += ' mem_stats_interval=' + memStatsInterval;
				command += ' cpu_stats_size=' + cpuStatsSize;
				command += ' cpu_stats_interval=' + cpuStatsInterval;
				command += ' limit_virt_mem_mb=' + $('#limit_virt_mem_mb').val();
				command += ' limit_stack_mem_kb=' + $('#limit_stack_mem_kb').val();
				command += ' limit_file_size_mb=' + $('#limit_file_size_mb').val();
				socketSettings.send(command);
			});

			document.getElementById('btnShutdown').onclick = function() {
				var dialog = (new DlgYesNo())
				.title(_('Confirmation'))
				.text(_('Are you sure you want to shut down the server?'))
				.yesButtonText(_('OK'))
				.noButtonText(_('Cancel'))
				.type('warning')
				.yesFunction(function() {
					socketSettings.send('shutdown maintenance');
				});
				dialog.open();
			};
		});
	},

	onSocketOpen: function() {
		// Base class' onSocketOpen handles authentication
		this.base.call(this);
		this.socket.send('subscribe settings');
		this.socket.send('settings');
		this.socket.send('version');
	},

	onSocketMessage: function(e) {
		var textMsg;
		if (typeof e.data === 'string') {
			textMsg = e.data;
		}
		else {
			textMsg = '';
		}

		if (textMsg.startsWith('settings')) {
			textMsg = textMsg.substring('settings '.length);
			var settings = textMsg.split(' ');
			for (var i = 0; i < settings.length; i++) {
				var setting = settings[i].split('=');
				var settingKey = setting[0];
				var settingVal = setting[1];
				var elem = document.getElementById(settingKey);
				if (elem) {
					elem.value = settingVal;
				}
			}
		}
		else if (textMsg.startsWith('loolserver ')) {
			// This must be the first message, unless we reconnect.
			var loolwsdVersionObj = JSON.parse(textMsg.substring(textMsg.indexOf('{')));
			var h = loolwsdVersionObj.Hash;
			if (parseInt(h,16).toString(16) === h.toLowerCase().replace(/^0+/, '')) {
				h = '<a target="_blank" href="https://hub.libreoffice.org/git-online/' + h + '">' + h + '</a>';
				$('#loolwsd-version').html(loolwsdVersionObj.Version + ' (git hash: ' + h + ')');
			}
			else {
				$('#loolwsd-version').text(loolwsdVersionObj.Version);
			}
		}
		else if (textMsg.startsWith('lokitversion ')) {
			var lokitVersionObj = JSON.parse(textMsg.substring(textMsg.indexOf('{')));
			h = lokitVersionObj.BuildId.substring(0, 7);
			if (parseInt(h,16).toString(16) === h.toLowerCase().replace(/^0+/, '')) {
				h = '<a target="_blank" href="https://hub.libreoffice.org/git-core/' + h + '">' + h + '</a>';
			}
			$('#lokit-version').html(lokitVersionObj.ProductName + ' ' +
			                         lokitVersionObj.ProductVersion + lokitVersionObj.ProductExtension.replace('.10.','-') +
			                         ' (git hash: ' + h + ')');
		}
	},

	onSocketClose: function() {
		clearInterval(this._basicStatsIntervalId);
	}
});

Admin.Settings = function(host) {
	return new AdminSocketSettings(host);
};

/* -*- js-indent-level: 8 -*- */
/*
	Socket to be intialized on opening the history page in Admin console
*/
/* global Admin $ AdminSocketBase */
var AdminSocketHistory = AdminSocketBase.extend({
	constructor: function(host) {
		this.base(host);
	},

	refreshHistory: function() {
		this.socket.send('history');
	},

	onSocketOpen: function() {
		// Base class' onSocketOpen handles authentication
		this.base.call(this);

		var socketHistory = this;
		$('#refreshHistory').on('click', function () {
			return socketHistory.refreshHistory();
		});
		this.refreshHistory();
	},

	onSocketMessage: function(e) {
		//if (e.data == 'InvalidAuthToken' || e.data == 'NotAuthenticated') {
		//	this.base.call(this);
		//	this.refreshHistory();
		//} else {
		var jsonObj;
		try {
			jsonObj = JSON.parse(e.data);
			var doc = jsonObj['History']['documents'];
			var exdoc = jsonObj['History']['expiredDocuments'];
			$('#json-doc').find('textarea').html(JSON.stringify(doc));
			$('#json-ex-doc').find('textarea').html(JSON.stringify(exdoc));
		} catch (e) {
			$('document').alert(e.message);
		}
	},

	onSocketClose: function() {

	}
});

Admin.History = function(host) {
	return new AdminSocketHistory(host);
};

/* -*- js-indent-level: 8 -*- */
/*
	Socket to be intialized on opening the log page in Admin console
*/
/* global Admin $ AdminSocketBase */
var AdminSocketLog = AdminSocketBase.extend({
	constructor: function(host) {
		this.base(host);
		// There is a "$" is never used error. Let's get rid of this. This is vanilla script and has not more lines than the one with JQuery.
		$('#form-channel-list').id;
	},

	refreshLog: function() {
		this.socket.send('log_lines');
	},

	pullChannelList: function() {
		this.socket.send('channel_list');
	},

	sendChannelListLogLevels: function(e) {
		e.stopPropagation();

		// We change the colour of the button when we send the data and change it back when the task is done (in function applyChannelList). But it is happening too fast.
		document.getElementById('update-log-levels').classList.add('is-warning');
		document.getElementById('update-log-levels').classList.remove('is-info');

		// Get the form.
		var form = document.getElementById('form-channel-list');

		// Get channel select elements.
		var selectList = form.querySelectorAll('select');

		// Prepare the statement.
		var textToSend = 'update-log-levels';
		for (var i = 0; i < selectList.length; i++) {
			textToSend += ' ' + selectList[i].getAttribute('name').replace('channel-', '') + '=' + selectList[i].value;
		}

		this.socket.send(textToSend);
		document.getElementById('channel-list-modal').classList.remove('is-active');
	},

	onSocketOpen: function() {
		// Base class' onSocketOpen handles authentication
		this.base.call(this);

		document.getElementById('refresh-log').onclick = this.refreshLog.bind(this);
		document.getElementById('update-log-levels').onclick = this.sendChannelListLogLevels.bind(this);

		this.pullChannelList();
		this.refreshLog();
	},

	applyChannelList: function(channelListStr) {
		var channelListArr = channelListStr.split(' '); // Every item holds: channel name + = + log level.

		// Here we have the log channel list and their respective log levels.
		// We will create items for them. User will be able to set the log level for each channel.
		var channelForm = document.getElementById('form-channel-list');
		channelForm.innerHTML = ''; // Clear and refill it.
		var optionList = Array('none', 'fatal', 'critical', 'error', 'warning', 'notice', 'information', 'debug', 'trace');
		var innerHTML = ''; // Of select elements.
		for (var i = 0; i < optionList.length; i++) {
			innerHTML += '<option value="' + optionList[i] + '">' + optionList[i] + '</option>';
		}

		for (i = 0; i < channelListArr.length; i++) {
			if (channelListArr[i].split('=').length === 2) {
				var channelName = channelListArr[i].split('=')[0];
				var channelLogLevel = channelListArr[i].split('=')[1];

				var newDiv = document.createElement('div');
				newDiv.className = 'content';

				var newLabel = document.createElement('label');
				newLabel.className = 'label is-normal';
				newLabel.setAttribute('for', 'channel-' + channelName);
				newLabel.innerText = channelName;

				var newSubDivision = document.createElement('div');
				newSubDivision.className = 'select';

				var newSelectElement = document.createElement('select');
				newSelectElement.name = 'channel-' + channelName;
				newSelectElement.id = 'channel-' + channelName;
				newSelectElement.innerHTML = innerHTML;
				newSelectElement.value = channelLogLevel;
				newSelectElement.style.width = '160px';
				newSelectElement.className = 'form-control';

				channelForm.appendChild(newDiv);
				newDiv.appendChild(newLabel);
				newDiv.appendChild(newSubDivision);
				newSubDivision.appendChild(newSelectElement);
			}
		}

		document.getElementById('update-log-levels').classList.remove('is-warning');
		document.getElementById('update-log-levels').classList.add('is-info');
	},

	onSocketMessage: function(e) {
		if (e.data.startsWith('log_lines')) {
			var result = e.data;
			result = result.substring(10, result.length);
			document.getElementById('log-lines').value = result;
		}
		else if (e.data.startsWith('channel_list')) {
			var channelListStr = e.data.substring(13, e.data.length);
			this.applyChannelList(channelListStr);
		}
	},

	onSocketClose: function() {

	}
});

Admin.Log = function(host) {
	return new AdminSocketLog(host);
};
