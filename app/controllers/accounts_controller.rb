class AccountsController < ApplicationController
  before_action :set_account, only: [:show, :edit, :update, :destroy]

  # GET /accounts
  # GET /accounts.json
  
  ##  only permitted for current user
  def index
    # @accounts = Account.all.order(:company_id)
    @accounts = Account.permitted_for_user(@current_user).order(:company_id)

    @date_of_saldo = params[:date_of_saldo]
  end

  # GET /accounts/1
  # GET /accounts/1.json
  def show
  end

  # GET /accounts/new
  def new
    @account = Account.new
  end

  # GET /accounts/1/edit
  def edit
  end

  # POST /accounts
  # POST /accounts.json
  def create
    @account = Account.new(account_params)
    respond_to do |format|
      if @account.save
        format.html { redirect_to accounts_url, notice: 'Account was successfully created.' }
        format.json { render :show, status: :created, location: @account }
      else
        format.html { render :new }
        format.json { render json: @account.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /accounts/1
  # PATCH/PUT /accounts/1.json
  def update
    respond_to do |format|
      if @account.update(account_params)
        format.html { redirect_to accounts_url, notice: 'Account was successfully updated.' }
        format.json { render :show, status: :ok, location: @account }
      else
        format.html { render :edit }
        format.json { render json: @account.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /accounts/1
  # DELETE /accounts/1.json
  def destroy
    @account.lt_destroy
    respond_to do |format|
      format.html { redirect_to accounts_url, notice: 'Account was successfully lt_destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_account
      @account = Account.find(params[:id])
      @account.term ? @account.term = @account.term.strftime("%d.%m.%Y") : nil
    end


    # Never trust parameters from the scary internet, only allow the white list through.
    def account_params
      params.require(:account).permit(:number, :bank_id, :currency_id, :saldo_begin_year, 
        :company_id, :term, :acc_type_id, :is_default, :interest)
    end

end
