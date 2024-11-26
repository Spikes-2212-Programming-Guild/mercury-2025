Rails.application.routes.draw do
  get "/", to: "welcome#start"
  # post "/submit", to: "welcome#login"
  get "/page", to: "welcome#page"
  post "/submit", to: "scouter#create"
  # get "/favicon.ico", to: "welcome#fav"
end
