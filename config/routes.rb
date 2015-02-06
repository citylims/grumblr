Rails.application.routes.draw do

  root "grumbles#index"

  #serving our singlepage app andd resources
  resources :grumbles, :only => [:index]

  #serving json regarding grumbles
  namespace :api do
    resources :grumbles, :except => [:new, :edit]
  end

end
