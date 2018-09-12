class MovementGroup < ApplicationRecord
	has_many :movenents
	enum direction: [:Income, :Outcome]

end
