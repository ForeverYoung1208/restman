require 'test_helper'

class RolesUsersControllerTest < ActionDispatch::IntegrationTest
  setup do
    @roles_user = roles_users(:one)
  end

  test "should get index" do
    get roles_users_url
    assert_response :success
  end

  test "should get new" do
    get new_roles_user_url
    assert_response :success
  end

  test "should create roles_user" do
    assert_difference('RolesUser.count') do
      post roles_users_url, params: { roles_user: { deleted_at: @roles_user.deleted_at, role_id: @roles_user.role_id, user_id: @roles_user.user_id } }
    end

    assert_redirected_to roles_user_url(RolesUser.last)
  end

  test "should show roles_user" do
    get roles_user_url(@roles_user)
    assert_response :success
  end

  test "should get edit" do
    get edit_roles_user_url(@roles_user)
    assert_response :success
  end

  test "should update roles_user" do
    patch roles_user_url(@roles_user), params: { roles_user: { deleted_at: @roles_user.deleted_at, role_id: @roles_user.role_id, user_id: @roles_user.user_id } }
    assert_redirected_to roles_user_url(@roles_user)
  end

  test "should destroy roles_user" do
    assert_difference('RolesUser.count', -1) do
      delete roles_user_url(@roles_user)
    end

    assert_redirected_to roles_users_url
  end
end
