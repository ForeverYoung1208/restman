class MovementGroup < ApplicationRecord
	has_many :movenents
  enum direction: {Income: 0, Outcome: 1}

end
