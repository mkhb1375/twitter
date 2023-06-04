import APIUtil from './api_util'
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

            APIUtil.fetchTweet(data).then(tweet => {

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
            const new_date = APIUtil.formatDate(data.created_at);
            const date = $(`<span class="date">${new_date}</span>`);
            profile.append(mentions);
            li.append(profile);
            li.append(content);
            li.append(date);
            li.css('opacity', 0).animate({ opacity: 1 }, 500);
            return li
        }
    }

export default More;