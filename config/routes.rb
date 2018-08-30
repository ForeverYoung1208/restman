# For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

Rails.application.routes.draw do
  resources :acc_types
  resources :companies
  resources :groups
  resources :currencies
  resources :banks
  resources :accounts

  resources :sessions
  resources :roles
  resources :users, only: [:index, :show]
  post 'users', to: "users#update_roles", as: "update_roles"


  get 'main', to: "main#show", as: 'main'

  root :to => "sessions#new"


end
