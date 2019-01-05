class MovementsController < ApplicationController
  before_action :set_movement, only: [:show, :edit, :update, :destroy]

  # GET /movements
  # GET /movements.json
  def index

    respond_to do |format|    
      format.html do
        @days = Day.all
        # Movement.permitted_for_user(@current_user).pluck(day)

      end
      format.json do
      end

    end

  end


  # GET /movements/by_date/2018-10-13
  # GET /movements/by_date/2018-10-13.json
  
  def by_date
    respond_to do |format|    
      format.html {}
      format.json do
        day = Day.where(date: params[:date]).first 
        # @movements = Movement.permitted_for_user(@current_user).where(day_id: day_id)
          @movements = Movement.where(day_id: day.id) if day

      end
    end
    
  end


  # GET /movements/1
  # GET /movements/1.json
  def show

  end

  # GET /movements/new
  def new
    @movement = Movement.new
  end

  # GET /movements/1/edit
  def edit
  end

  # POST /movements
  # POST /movements.json
  def create # create/update
    movement_params[:id]>=1 ? @movement = Movement.find(movement_params[:id]) : @movement = Movement.new
    @movement.last_editor_id = @current_user.id

    debugger

    respond_to do |format|
      if @movement.update(movement_params)
        format.html { redirect_to @movement, notice: 'Movement was successfully created.' }
        format.json { render :show, status: :created, location: @movement }
      else
        format.html { render :new }
        format.json { render json: @movement.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /movements/1
  # PATCH/PUT /movements/1.json
  def update # not used
    respond_to do |format|
      if @movement.update(movement_params)
        format.html { redirect_to @movement, notice: 'Movement was successfully updated.' }
        format.json { render :show, status: :ok, location: @movement }
      else
        format.html { render :edit }
        format.json { render json: @movement.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /movements/1
  # DELETE /movements/1.json
  def destroy
    @movement.destroy
    respond_to do |format|
      format.html { redirect_to movements_url, notice: 'Movement was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_movement
      @movement = Movement.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def movement_params
      params.require(:movement).permit(:id, :value, :direction, :group_id, :comment, :account_id, :last_editor_id, :day_id, :deleted_at, :log, :date)
    end
end
