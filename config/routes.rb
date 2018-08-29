Rails.application.routes.draw do
  resources :acc_types
  resources :companies
  resources :groups
  resources :currencies
  resources :banks
  resources :accounts
  root to: "accounts#index"
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
