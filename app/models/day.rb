class Day < ApplicationRecord
	has_many :movements

	validates :date, presence: true
end
