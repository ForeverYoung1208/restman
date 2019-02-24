class ApplicationController < ActionController::Base
  include Auth	
  protect_from_forgery with: :exception
  before_action :get_current_user


  def destroy
    respond_to do |format|
      format.html { redirect_to root_url, notice: 'Not implemented yet' }
      format.json { head :no_content }
    end
  end  

end
