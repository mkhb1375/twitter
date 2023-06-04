/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./frontend/api_util.js":
/*!******************************!*\
  !*** ./frontend/api_util.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });

const APIUtil = {
    followUser: id => {
       return $.ajax({
            url: `/users/${id}/follow`,
            method: 'POST',
            dataType: 'json',
            
        })
    },

    unfollowUser: id => {
       return $.ajax({
            url: `/users/${id}/follow`,
            method: 'DELETE',
            dataType: 'json',
            
        })
    },

    searchUsers: query=>{
       return $.ajax({
            url:'/users/search',
            method:'GET',
            dataType:'json',
            data: { query }
        })
    },

    createTweet: data=>{
        return $.ajax({
            url: '/tweets',
            method: 'POST',
            dataType:'json',
            data
        })
    },
    fetchTweet: data => (
        $.ajax({
            url: '/feed',
            method: 'GET',
            dataType: 'json',
            data
        })
    ),

 
    formatDate: date => {
        const dateTime = new Date(date);
        const formattedDateTime = dateTime.toLocaleString("en-US", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            hour12: false, 
        }).replace(/(\d+)\/(\d+)\/(\d+), (\d+):(\d+)/, "$3-$1-$2 $4:$5");
        return formattedDateTime;
    }

};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (APIUtil);

/***/ }),

/***/ "./frontend/follow_toggle.js":
/*!***********************************!*\
  !*** ./frontend/follow_toggle.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _api_util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./api_util */ "./frontend/api_util.js");


class FollowToggle {
    constructor(el, options) {
        this.$el = $(el);
        this.userId = this.$el.data('user-id') || options.userId;
        this.followState = (this.$el.data('initial-follow-state') ||
            options.followState);
        this.render();

        this.$el.on('click', this.handleClick.bind(this));
    }

    handleClick(event) {
        const followToggle = this;

        event.preventDefault();

        if (this.followState === 'followed') {
            this.followState = 'unfollowing';
            this.render();
            _api_util__WEBPACK_IMPORTED_MODULE_0__["default"].unfollowUser(this.userId).then(() => {
                followToggle.followState = 'unfollowed';
                followToggle.render();
            });
        } else if (this.followState === 'unfollowed') {
            this.followState = 'following';
            this.render();
            _api_util__WEBPACK_IMPORTED_MODULE_0__["default"].followUser(this.userId).then(() => {
                followToggle.followState = 'followed';
                followToggle.render();
            });
        }
    }

    render() {
        switch (this.followState) {
            case 'followed':
                this.$el.prop('disabled', false);
                this.$el.html('Unfollow!');
                break;
            case 'unfollowed':
                this.$el.prop('disabled', false);
                this.$el.html('Follow!');
                break;
            case 'following':
                this.$el.prop('disabled', true);
                this.$el.html('Following...');
                break;
            case 'unfollowing':
                this.$el.prop('disabled', true);
                this.$el.html('Unfollowing...');
                break;
        }
    }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (FollowToggle);

/***/ }),

/***/ "./frontend/follow_toggle2.js":
/*!************************************!*\
  !*** ./frontend/follow_toggle2.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _api_util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./api_util */ "./frontend/api_util.js");


class FollowToggle2 {
    constructor(el, options) {
        this.$el = $(el);
        this.userId = this.$el.data('user-id') || options.userId;
        this.followState = this.$el.data('follow-state') ? 'followed' : 'unfollowed'
        this.render();

        this.$el.on('click', this.handleClick.bind(this));
    }

    handleClick(event) {
        const FollowToggle2 = this;

        event.preventDefault();

        if (this.followState === 'followed') {
            this.followState = 'unfollowing';
            this.render();
            _api_util__WEBPACK_IMPORTED_MODULE_0__["default"].unfollowUser(this.userId).then(() => {
                FollowToggle2.followState = 'unfollowed';
                FollowToggle2.render();
            });
        } else if (this.followState === 'unfollowed') {
            this.followState = 'following';
            this.render();
            _api_util__WEBPACK_IMPORTED_MODULE_0__["default"].followUser(this.userId).then(() => {
                FollowToggle2.followState = 'followed';
                FollowToggle2.render();
            });
        }
    }

    render() {
        switch (this.followState) {
            case 'followed':
                this.$el.prop('disabled', false);
                this.$el.html('Unfollow!');
                break;
            case 'unfollowed':
                this.$el.prop('disabled', false);
                this.$el.html('Follow!');
                break;
            case 'following':
                this.$el.prop('disabled', true);
                this.$el.html('Following...');
                break;
            case 'unfollowing':
                this.$el.prop('disabled', true);
                this.$el.html('Unfollowing...');
                break;
        }
    }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (FollowToggle2);

/***/ }),

/***/ "./frontend/header.js":
/*!****************************!*\
  !*** ./frontend/header.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class Headerfix {

constructor(ele,body){
    this.$body = body;
    this.$ele = ele;
    this.$ul = this.$ele.find('ul');
    this.$image = this.$ele.find("image");
    this.$ele.on('click', this.$image , this.hamburger.bind(this));
    this.$body.on('click', this.close.bind(this));
}
hamburger(event){
    event.stopPropagation();

    if(this.$ul.hasClass("hidden")){
        this.$ul.removeClass("hidden")
    }
    else{
        this.$ul.addClass("hidden")
    }

    
}
close(event){

    if (!this.$ul.hasClass("hidden")) {
        this.$ul.addClass("hidden")
    }
}
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Headerfix);

/***/ }),

/***/ "./frontend/more.js":
/*!**************************!*\
  !*** ./frontend/more.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _api_util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./api_util */ "./frontend/api_util.js");

class More {
    constructor(doc) {
        this.$doc = $(doc);
        this.$moreButton = this.$doc.find('.more');
        this.$ul = this.$doc.find('.my_ul')
        this.lastCreatedAt = null;
        this.fechMore();
        this.$moreButton.on('click', this.fechMore.bind(this));
        this.moreTextCheck()


        this.startY = 0;
        this.threshold = 70; 

        this.$doc.on('touchstart', this.handleTouchStart.bind(this));
        this.$doc.on('touchmove', this.handleTouchMove.bind(this));
        this.debounceTimeout = null;
    }
    moreTextCheck(){
        if (this.$doc.width() > 1000 ){  this.$moreButton.html('More!')}
    }
    handleTouchStart(event) {

        this.startY = event.originalEvent.touches[0].clientY;
    }

    handleTouchMove(event) {
        if (!event.originalEvent.touches || event.originalEvent.touches.length === 0) {
            return;
        }

        if (event.originalEvent.touches.length > 1) {
           
            return;
        }


        const currentY = event.originalEvent.touches[0].clientY;

        const deltaY = currentY - this.startY;

        if (deltaY < -80){
            
            if (this.debounceTimeout) {
                clearTimeout(this.debounceTimeout);
            }

            
            this.debounceTimeout = setTimeout(() => {
                
                this.fechMore();
                
                this.debounceTimeout = null;
            }, 1000);
        }
        }
    
        fechMore(){
            const currentUrl = window.location.href;
            const parts = currentUrl.split("/");
            const lastPart = parts.pop();
            let dt
            if (currentUrl.includes("feed")) {
                dt = "feeed"
            } else {
               
                dt = lastPart
            }
            const data = {};
            data.temp = dt;
            if (More.lastCreatedAt) data.max_created_at = More.lastCreatedAt;

            _api_util__WEBPACK_IMPORTED_MODULE_0__["default"].fetchTweet(data).then(tweet => {

                if (tweet.length > 0) {
                    More.lastCreatedAt = tweet[tweet.length - 1].created_at;
                    console.log(More.lastCreatedAt)
                }
                if (tweet.length < 10) {
                    this.$moreButton.css('display', 'none');
                }

                for (let i = 0; i < tweet.length; i++) {
                    this.$ul.append(this.style(tweet[i]))
                }

            })
        };


        style(data){
            const currentUrl = window.location.href;
            let href
            if(currentUrl.includes("feed")){
                 href = "users/"
            }else{
                href = ""
            }
            const li = $('<li class="tweet">');
            const profile = $(`<div class="top-part" ><a class="profile" href="${href}${data.user.id}">${data.user.username}</a></div>`);
            const content = $(`<span class="content">${data.content}</span>`);
            const mentions = `<ul>${data.mentions.map((mention) =>
                (`<a class="mentions" href="${href}${mention.user.id}"> @${mention.user.username} </a>`))}</ul>`;
            const new_date = _api_util__WEBPACK_IMPORTED_MODULE_0__["default"].formatDate(data.created_at);
            const date = $(`<span class="date">${new_date}</span>`);
            profile.append(mentions);
            li.append(profile);
            li.append(content);
            li.append(date);
            li.css('opacity', 0).animate({ opacity: 1 }, 500);
            return li
        }
    }

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (More);

/***/ }),

/***/ "./frontend/side_pull.js":
/*!*******************************!*\
  !*** ./frontend/side_pull.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class SidePull {
    constructor(left, head, botton, form, body,doc) {
        // side
        this.$left = $(left);
        this.$head = $(head);
        this.$ul = this.$head.find('ul');
        this.$left.on('click', this.pull.bind(this));
        // bottom
        this.$body = $(body);
        this.$overlay = $(this.$body.find('.overlay'));
        this.$doc = $(doc);
        this.$botton = $(botton);
        this.$form = $(form);
        this.$botton.on('click', this.form.bind(this));
        this.$overlay.on('click', this.form.bind(this));
        
        
        // Mobile swipe gesture
        this.startX = 0;
        this.startY = 0;
        this.threshold = 70; 
        
        this.$doc.on('touchstart', this.handleTouchStart.bind(this));
        this.$doc.on('touchmove', this.handleTouchMove.bind(this));
    }

    handleTouchStart(event) {
        this.startX = event.originalEvent.touches[0].clientX;
        this.startY = event.originalEvent.touches[0].clientY;
    }

    handleTouchMove(event) {
        if (!event.originalEvent.touches || event.originalEvent.touches.length === 0) {
            return;
        }

        if (event.originalEvent.touches.length > 1) {
            
            return;
        }

        const currentX = event.originalEvent.touches[0].clientX;
        const currentY = event.originalEvent.touches[0].clientY;
        const deltaX = currentX - this.startX;
        const deltaY = currentY - this.startY;
        if(Math.abs(deltaY) < 30){
        if (deltaX > this.threshold) {
            
            this.$ul.removeClass('hidden');
        }
        if (deltaX < 0 && Math.abs(deltaX) > this.threshold){
            this.$ul.addClass('hidden');
        }
    }
        
        if (deltaY > 80 && this.$form.hasClass('on')) {
            this._removeForm();
        }
    }

    pull(event) {
        event.stopPropagation();
        if (this.$ul.hasClass('hidden')) {
            this.$ul.removeClass('hidden');
        }
    }

    form(event) {
        if (!this.$form.hasClass('on')) {
            this.$botton.html('<h1>Close</h1>');
            this.$botton.css('background1-color', 'rgb(1, 72, 172)');
            this.$overlay.css('bottom', -this.$body.height());
            this.$form.addClass('on');

            this.$overlay.addClass('on');
            this.$body.css('overflow', 'hidden');
        } else {
            this._removeForm();
        }
    }
    _removeForm(){
    this.$overlay.css('bottom', '0');
    this.$botton.css('background-color', 'rgb(1, 72, 172)');
    this.$botton.html('<h1>Post Tweet</h1>');
    this.$form.removeClass('on');
    this.$overlay.removeClass('on');
    this.$body.css('overflow', 'auto');
    }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SidePull);


/***/ }),

/***/ "./frontend/tweet_compose.js":
/*!***********************************!*\
  !*** ./frontend/tweet_compose.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _api_util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./api_util */ "./frontend/api_util.js");


class TweetCompose {
    constructor(el, doc ) {
        this.$el = $(el);
        this.$doc = $(doc);
        this.$ul = this.$doc.find('.my_ul');
        this.$mentions = this.$el.find(".mentions");
        this.$text = this.$el.find('.tweet-text-area');
        this.$select = this.$el.find('select');
                this.$el.on('submit', this.compose.bind(this));
        this.$el.find('.mention-select').on('click' , this.addMention.bind(this));
    }
    addMention(e) {
        // this.$el.find('.tweet-submit').css('margin' ,'100px auto')
            e.preventDefault();
        this.$el.find('.tweet-text-area').css('margin-bottom', '-50px ')  
        const userOptions = window.users.map(user => ({
            id: user.id,
            text: user.username
        }));

        const html = `
    <div>
      <label class="mention-label" for="mention-select">Add mentions</label>
      <select class="mention-select" multiple="multiple" style="width: 400px; font-size: 50px; margin: 50px auto;">
        ${userOptions.map(user => `<option value="${user.id}">${user.text}</option>`)}
      </select>
    </div>`;

        this.$mentions.append(html);

        
        const $select = $('.mention-select');
        $select.select2({
            tags: true,
            tokenSeparators: [',', ' '],
            closeOnSelect: false,
            templateSelection: formatSelection,
            templateResult: formatResult
        });

        function formatSelection(selection) {
            if (selection.element) {
                return `${selection.text}`;
            }
            return selection.text;
        }

        function formatResult(result) {
            if (result.loading) return result.text;
            return result.text;
        }

        
        $select.on('click', '.remove-item', function (e) {
            e.preventDefault();
            const $option = $(this).closest('.select2-selection__choice');
            const value = $option.attr('title');
            $option.remove();
            $select.find(`option[value='${value}']`).prop('selected', false);
            $select.trigger('change');
        });

        
        $select.on('select2:selecting', function (e) {
            const inputText = e.params.args.data.text;
            const matchingUser = window.users.find(user => user.username === inputText);
            if (!matchingUser) {
                e.preventDefault();
                $select.find('option[data-select2-tag]').remove(); 
            }
        });
    }



    clearinput() {
        this.$text.val('');

    }
    handlesuccess(tweet) {

        this.getUpdatedTweetList(tweet);
        this.clearinput();
        this.$el.find(':input').prop('disabled', false);
    }
    getUpdatedTweetList(data) {

        const li = $('<li class="tweet">');
        const profile = $(`<div class="top-part" ><a class="profile" href="users/${data.user.id}">${data.user.username}</a></div>`);
        const content = $(`<span class="content">${data.content}</span>`);
        const mentions = `<ul>${data.mentions.map((mention) =>
            (`<a class="mentions" href="users/${mention.user.id}"> @${mention.user.username} </a>`))}</ul>`;
        const new_date = _api_util__WEBPACK_IMPORTED_MODULE_0__["default"].formatDate(data.created_at);
        const date = $(`<span class="date">${new_date}</span>`);
        profile.append(mentions);
        li.append(profile);
        li.append(content);
        li.append(date);
        li.css('opacity', 0).animate({ opacity: 1 }, 500);

        this.$ul.prepend(li)


    }

    compose(event) {
        event.preventDefault();

      
        const mentionUsers = $('.mention-select').val();

        
        const data = this.$el.serializeJSON();
        data.tweet.mentioned_user_ids = mentionUsers;

        if (data.tweet.content.length > 0) {
            this.$el.find(':input').prop('disabled', true);
            _api_util__WEBPACK_IMPORTED_MODULE_0__["default"].createTweet(data).then(tweet => this.handlesuccess(tweet));
        }
    }

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TweetCompose);

/***/ }),

/***/ "./frontend/users_search.js":
/*!**********************************!*\
  !*** ./frontend/users_search.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _api_util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./api_util */ "./frontend/api_util.js");
/* harmony import */ var _follow_toggle__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./follow_toggle */ "./frontend/follow_toggle.js");


class UsersSearch {
    constructor(el) {
        this.$el = $(el);
        this.$input = this.$el.find('input[name=username]');
        this.$ul = this.$el.find('.users');

        this.$input.on('input', this.handleInput.bind(this));
    }

    handleInput(event) {
        if (this.$input.val() === '') {
            this.renderResults([]);
            return;
        }
        _api_util__WEBPACK_IMPORTED_MODULE_0__["default"].searchUsers(this.$input.val().toLowerCase())
            .then(users => this.renderResults(users));
    }

    renderResults(users) {
        this.$ul.empty();
        
       
            
        for (let i = 0; i < users.length; i++) {
            const user = users[i];
            
            let $a = $('<a></a>');
            $a.text(`@${user.username}`);
            $a.attr('href', `/users/${user.id}`);

            const $followToggle = $('<button></button>');
            new _follow_toggle__WEBPACK_IMPORTED_MODULE_1__["default"]($followToggle, {
                userId: user.id,
                followState: user.followed ? 'followed' : 'unfollowed'
            });

            const $li = $('<li></li>');
            
            $li.append($a);
            $li.append($followToggle);
            $li.addClass("fade-in")

            this.$ul.append($li);

            setTimeout(() => {
                $li.css('opacity', '1');
            }, 25 * i); 
            
        }
        
    }

    

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (UsersSearch);

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*****************************!*\
  !*** ./frontend/twitter.js ***!
  \*****************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _follow_toggle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./follow_toggle */ "./frontend/follow_toggle.js");
/* harmony import */ var _users_search__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./users_search */ "./frontend/users_search.js");
/* harmony import */ var _header__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./header */ "./frontend/header.js");
/* harmony import */ var _side_pull__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./side_pull */ "./frontend/side_pull.js");
/* harmony import */ var _tweet_compose__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./tweet_compose */ "./frontend/tweet_compose.js");
/* harmony import */ var _follow_toggle2__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./follow_toggle2 */ "./frontend/follow_toggle2.js");
/* harmony import */ var _more__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./more */ "./frontend/more.js");








$(() => {

    $('.follow-toggle').each((index,ele)=>{
        const thing = new _follow_toggle__WEBPACK_IMPORTED_MODULE_0__["default"](ele);
    })
    $('.users-search').each((index,ele)=>{
        const thing2 = new _users_search__WEBPACK_IMPORTED_MODULE_1__["default"](ele);
    })
    const thing3 = new _header__WEBPACK_IMPORTED_MODULE_2__["default"]($(".header-nav-mobile"), $(document)); 
    const thing4 = new _side_pull__WEBPACK_IMPORTED_MODULE_3__["default"]($(".side-pull"), $(".header-nav-mobile"), $('.post-button'), $('.new-form'), $('body'), $(document) );
    const thing5 = new _tweet_compose__WEBPACK_IMPORTED_MODULE_4__["default"]($(".tweet-compose"), $(document) );
    if ($('.follow-toggle2').length>0){
    const thing6 = new _follow_toggle2__WEBPACK_IMPORTED_MODULE_5__["default"]($('.follow-toggle2'));
    };
    const thing7 = new _more__WEBPACK_IMPORTED_MODULE_6__["default"]($(document));
})
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map