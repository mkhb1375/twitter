import APIUtil from "./api_util";
import FollowToggle from "./follow_toggle";
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
        APIUtil.searchUsers(this.$input.val().toLowerCase())
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
            new FollowToggle($followToggle, {
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

export default UsersSearch;