class GroupsController < ApplicationController
  before_action :set_group, only: [:show, :edit, :update, :destroy]

  # GET /groups
  # GET /groups.json
  def index
    @groups = Group.permitted_for_user(@current_user)
  end

  # GET /groups/1
  # GET /groups/1.json
  def show
  end

  # GET /groups/new
  def new
    @group = Group.new
  end

  # GET /groups/1/edit
  def edit
  end

  # POST /groups
  # POST /groups.json
  def create
    @group = Group.new(group_params)

    respond_to do |format|
      if @group.save
        r = create_access_role( group_params[:key_role] )        
        format.html { redirect_to groups_url, notice: "Group was successfully created, Role #{r.name} updated"}
        format.json { render :show, status: :created, location: @group }
      else
        format.html { render :new }
        format.json { render json: @group.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /groups/1
  # PATCH/PUT /groups/1.json
  def update
    respond_to do |format|
      if @group.update(group_params)
        r = create_access_role( group_params[:key_role] )   
        format.html { redirect_to groups_url, notice: "Group was successfully updated, Role #{r.name} updated"}
        format.json { render :show, status: :ok, location: @group }
      else
        format.html { render :edit }
        format.json { render json: @group.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /groups/1
  # DELETE /groups/1.json
  # def destroy
  #   @group.destroy
  #   respond_to do |format|
  #     format.html { redirect_to groups_url, notice: 'Group was successfully destroyed.' }
  #     format.json { head :no_content }
  #   end
  # end

  private

    def create_access_role( key_role )
      Role.where(name: key_role).first_or_create(
        {
          name: key_role,
          is_deleted: false
        }
      )
    end

    # Use callbacks to share common setup or constraints between actions.
    def set_group
      @group = Group.permitted_for_user(@current_user).find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def group_params
      params.require(:group).permit(:code_name_ukr, :code_name_eng, :key_role)
    end
end
