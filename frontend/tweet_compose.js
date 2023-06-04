import APIUtil from "./api_util";

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
        const new_date = APIUtil.formatDate(data.created_at);
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
            APIUtil.createTweet(data).then(tweet => this.handlesuccess(tweet));
        }
    }

}

export default TweetCompose