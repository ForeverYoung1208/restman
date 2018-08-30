class ApplicationController < ActionController::Base
  include Auth	
  protect_from_forgery with: :exception
  before_action :get_current_user
  

end
