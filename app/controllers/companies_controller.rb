class CompaniesController < ApplicationController
  before_action :set_company, only: [:show, :edit, :update, :destroy]
  before_action :set_groups

  # GET /companies
  # GET /companies.json
  def index
    @companies = Company.permitted_for_user(@current_user)
  end

  # GET /companies/1
  # GET /companies/1.json
  def show
  end

  # GET /companies/new
  def new
    @company = Company.new
  end

  # GET /companies/1/edit
  def edit
  end

  # POST /companies
  # POST /companies.json
  def create
    @company = Company.new(company_params)
    respond_to do |format|
      if @company.save

        r = create_access_role( company_params[:key_role] )

        format.html { redirect_to companies_url, notice: "Company was successfully created, Role #{r.name} updated"}
        format.json { render :show, status: :created, location: @company }
      else
        format.html { render :new }
        format.json { render json: @company.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /companies/1
  # PATCH/PUT /companies/1.json
  def update
    respond_to do |format|
      if @company.update(company_params)
        
        r = create_access_role( company_params[:key_role] )

        format.html { redirect_to companies_url, notice: "Company was successfully updated, Role #{r.name} updated" }
        format.json { render :show, status: :ok, location: @company }
      else
        format.html { render :edit }
        format.json { render json: @company.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /companies/1
  # DELETE /companies/1.json
  # def destroy
    # @company.destroy
    # respond_to do |format|
    #   format.html { redirect_to companies_url, notice: 'Company was successfully destroyed.' }
    #   format.json { head :no_content }
    # end
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
    
    def set_company
      @company = Company.permitted_for_user(@current_user).find(params[:id])
    end

    def set_groups
      @groups = Group.permitted_for_user(@current_user)
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def company_params
      params.require(:company).permit(:code_name, :group_id, :key_role)
    end



end
