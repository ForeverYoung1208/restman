class AddInterestToAccounts < ActiveRecord::Migration[5.2]
  def change
  	add_column :accounts, :interest, :string
  end
end
