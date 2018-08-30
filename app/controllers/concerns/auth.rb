module Auth
	extend ActiveSupport::Concern

	def get_current_user
		if session[:current_user_id]
			@current_user = User.find( session[:current_user_id] )
		else
			# @current_user = User.first
			logger.debug ">>>>>>>>> redirect_to #{new_session_path}"
			redirect_to new_session_path
		end
			
	end

end