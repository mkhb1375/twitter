class UsersController < ApplicationController
  before_action :require_not_logged_in!, only: [:create, :new]
  before_action :require_logged_in!, only: [:show , :search]

  def create


    
    # sign up the user
    @user = User.new(username: user_params[:username].downcase, password: user_params[:password])
    if @user.save
      # redirect them to the new user's show page
      log_in!(@user)
      redirect_to feed_url
    else
      # input didn't pass validation; re-render sign up form.
      render :new
    end
  end

  def new
    # present form for signup
    @user = User.new # dummy user object
    render :new
  end

  def show
    if current_user.nil?
      # let them log in
      redirect_to new_session_url
      return
    end

    @user = User.includes(tweets: :mentioned_users).find(params[:id])
    # respond_to do |format|
       render :show 
    #   format.json { render json:  @user }
    # end
   
  end

  def search
    if params[:query].present?
      @users = User.where('username ~ ?', params[:query])
    else
      @users = User.none
    end

    respond_to do |format|
      format.html { render :search }
      format.json { render :search }
    end

  end

  protected
  def user_params
    self.params.require(:user).permit(:username, :password)
  end
end
