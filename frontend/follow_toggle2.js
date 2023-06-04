import APIUtil from "./api_util";

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
            APIUtil.unfollowUser(this.userId).then(() => {
                FollowToggle2.followState = 'unfollowed';
                FollowToggle2.render();
            });
        } else if (this.followState === 'unfollowed') {
            this.followState = 'following';
            this.render();
            APIUtil.followUser(this.userId).then(() => {
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
export default FollowToggle2;