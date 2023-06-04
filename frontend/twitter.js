import FollowToggle from './follow_toggle';
import UsersSearch from './users_search';
import Headerfix from './header';
import SidePull from './side_pull';
import TweetCompose from './tweet_compose';
import FollowToggle2 from './follow_toggle2';
import More from './more';

    

$(() => {

    $('.follow-toggle').each((index,ele)=>{
        const thing = new FollowToggle(ele);
    })
    $('.users-search').each((index,ele)=>{
        const thing2 = new UsersSearch(ele);
    })
    const thing3 = new Headerfix($(".header-nav-mobile"), $(document)); 
    const thing4 = new SidePull($(".side-pull"), $(".header-nav-mobile"), $('.post-button'), $('.new-form'), $('body'), $(document) );
    const thing5 = new TweetCompose($(".tweet-compose"), $(document) );
    if ($('.follow-toggle2').length>0){
    const thing6 = new FollowToggle2($('.follow-toggle2'));
    };
    const thing7 = new More($(document));
})