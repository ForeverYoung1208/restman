Rails.application.config.content_security_policy do |p|
  p.default_src :self, :https
  p.script_src :self, :https, :unsafe_eval
  p.connect_src :self, 'ws://localhost:3035', 'localhost:3000', 'localhost:3035',
  											'ws://192.168.0.252:3035', '192.168.0.252:3000', '192.168.0.252:3035',
  										 'ws://192.168.99.51:3035', '192.168.99.51:3000','192.168.99.51:3035'
  p.img_src :self, :https, :data
  p.font_src :self, :https
  p.base_uri :self, :https
  p.style_src :self, :https, :unsafe_inline
  p.form_action :self, :https
end