class WelcomeController < ActionController::Base
  def start
    render "layouts/index", status: 200
  end

  def login
    username = params[:username]
    puts username
  end

  def page
    render "layouts/page", status: 200
  end

  # def fav
  #   render text: "hi", status: 200
  # end
end
