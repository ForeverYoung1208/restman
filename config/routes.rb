# For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

Rails.application.routes.draw do
  resources :movements do
    get 'by_date/:date', to: 'movements#by_date', on: :collection, as: 'by_date'
  end

  resources :movement_groups
  resources :days do
    get 'find', to: "days#find", on: :collection
    get 'index-formatted', to: 'days#index_formatted', on: :collection
  end
  
  resources :roles_users
  resources :acc_types
  resources :companies
  resources :groups
  resources :currencies
  resources :banks
  resources :accounts do
    get 'on_date/:date_of_saldo', to: 'accounts#index', on: :collection, as: 'on_date'
  end
  resources :sessions
  resources :roles
  resources :users, only: [:index, :show]
  post 'users', to: "users#update_roles", as: "update_roles"


  get 'main', to: "main#show", as: 'main'
  get 'converter_oshchad', to: "converter_oshchad#converter", as: 'converter_oshchad'

  root :to => "sessions#new"


end
