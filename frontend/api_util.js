
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

export default APIUtil;