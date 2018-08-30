class UsersController < ApplicationController
  before_action ->{ 
    redirect_to(root_path, notice: "Немає прав") unless @current_user.can_access_users? 
  }, except: [:update_roles]


  def index
  	@users = User.all

    respond_to do |format|
    	format.html do
		  	@roles = Role.all
    	end
    	format.json do
    		render json: @users.map{ |u| {id: u.id, email: u.email, name: u.name, roles: u.roles.active.map{|r| r.id} } }, staus: :ok
    	end

    end  	
  end

  def show
  	@user = User.find( params[:id] )
  end

  def update_roles



    if @current_user.can_edit_users?
      all_roles = {}
      params["_json"].each do |u|
        u[:roles].each do |r|
          all_roles[r] ||= []
          all_roles[r] << u[:id]
        end
      end

      RolesUser.update_all( deleted_at: DateTime.now)
      all_roles.each do |role_id, users_ids|
        role = Role.find(role_id)
        role.bind_to_users!(users_ids)
      end

      render json: :none, staus: :ok
    else
      render json: :none, staus: :error
    end

  end

end
