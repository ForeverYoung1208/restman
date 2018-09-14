class User < ApplicationRecord
  
  db_config = YAML.load( ERB.new( File.read('config/database.yml')).result )
  establish_connection( db_config['users_'+ Rails.env.downcase] )

  before_destroy { |record| raise "ReadOnlyRecord" }

  has_and_belongs_to_many :roles
  has_many :movements, class_name: :Movement, foreign_key: :last_editor_id

  
  attr_accessor :password



  def self.authenticate(name, password)
   	user = find_by_name(name)
   	if user && user.password_hash == BCrypt::Engine.hash_secret(password, user.password_salt)
   		user
   	else
   		nil
   	end
  end

  def ip_check(remote_ip)
    #Turn off ip check in icontract
    #     !self.is_ip_controlled || self.ip_address == remote_ip || ::SUPERUSERS.include?(self.name)
    true
  end


  def readonly?
    true
  end

  def encrypt_password
		if password.present?
			self.password_salt = BCrypt::Engine.generate_salt
			self.password_hash = BCrypt::Engine.hash_secret(password, password_salt)
		end
  end

  def allowed_users_ids
    if self.is_admin
      res = User.all.pluck(:id) 
    else
      res = [self.id]
    end
    res
  end

  def is_admin
    # self.roles.active.pluck(:id).include?( ::ADMIN_ROLE_ID )
    self.roles.active.where(id: ::ADMIN_ROLE_ID).count >= 1
  end

  def self.all_with_any_role
    uids = RolesUser.all.pluck(:user_id)

    self.where(id: uids)

  end

#================
  def can_view_movements?
    true
  end
  
  def can_view_movement_groups?
    true
  end
  
  def can_view_days?
    true
  end
  def can_view_companies?
    true
  end
  def can_view_groups?
    true
  end    
  def can_view_banks?
    true
  end    
  def can_view_users?
    true
  end  
  def can_view_roles?
    true
  end    
  def can_view_accounts?
    true
  end    
  def can_view_acc_types?
    true
  end

  def can_view_currencies?
    true
  end

  def can_edit_users?
    true
  end  

  def can_update_roles?
    true

    # is_admin
  end  


end
