class MovementGroupsController < ApplicationController
  before_action :set_movement_group, only: [:show, :edit, :update, :destroy]

  # GET /movement_groups
  # GET /movement_groups.json
  def index
    @movement_groups = MovementGroup.all
  end

  # GET /movement_groups/1
  # GET /movement_groups/1.json
  def show
  end

  # GET /movement_groups/new
  def new
    @movement_group = MovementGroup.new
  end

  # GET /movement_groups/1/edit
  def edit
  end

  # POST /movement_groups
  # POST /movement_groups.json
  def create
    @movement_group = MovementGroup.new(movement_group_params)

    respond_to do |format|
      if @movement_group.save
        format.html { redirect_to movement_groups_url, notice: 'Movement group was successfully created.' }
        format.json { render :show, status: :created, location: @movement_group }
      else
        format.html { render :new }
        format.json { render json: @movement_group.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /movement_groups/1
  # PATCH/PUT /movement_groups/1.json
  def update
    respond_to do |format|
      if @movement_group.update(movement_group_params)
        format.html { redirect_to movement_groups_url, notice: 'Movement group was successfully updated.' }
        format.json { render :show, status: :ok, location: @movement_group }
      else
        format.html { render :edit }
        format.json { render json: @movement_group.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /movement_groups/1
  # DELETE /movement_groups/1.json
  # def destroy
  #   @movement_group.destroy
  #   respond_to do |format|
  #     format.html { redirect_to movement_groups_url, notice: 'Movement group was successfully destroyed.' }
  #     format.json { head :no_content }
  #   end
  # end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_movement_group
      @movement_group = MovementGroup.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def movement_group_params
      params.require(:movement_group).permit(:type, :name, :description)
    end
end
