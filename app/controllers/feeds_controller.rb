class FeedsController < ApplicationController
  before_action :require_logged_in!

  LIMIT = 10

  def show
     if request.fullpath.include?("feeed")
      @feed_tweets =
        current_user
          .feed_tweets(LIMIT, params[:max_created_at])
          .includes(:user, :mentions, mentions: [:user])
    else
      @feed_tweets =
        current_user
          .feed_tweets_2(LIMIT, params[:max_created_at] ,params[:temp])
          .includes(:user, :mentions, mentions: [:user])
    end

    respond_to do |format|
      format.html { render :show }
      format.json { render :show }
    end
  end
end
