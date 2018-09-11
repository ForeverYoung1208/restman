require 'test_helper'

class MovementGroupsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @movement_group = movement_groups(:one)
  end

  test "should get index" do
    get movement_groups_url
    assert_response :success
  end

  test "should get new" do
    get new_movement_group_url
    assert_response :success
  end

  test "should create movement_group" do
    assert_difference('MovementGroup.count') do
      post movement_groups_url, params: { movement_group: { description: @movement_group.description, name: @movement_group.name, type: @movement_group.type } }
    end

    assert_redirected_to movement_group_url(MovementGroup.last)
  end

  test "should show movement_group" do
    get movement_group_url(@movement_group)
    assert_response :success
  end

  test "should get edit" do
    get edit_movement_group_url(@movement_group)
    assert_response :success
  end

  test "should update movement_group" do
    patch movement_group_url(@movement_group), params: { movement_group: { description: @movement_group.description, name: @movement_group.name, type: @movement_group.type } }
    assert_redirected_to movement_group_url(@movement_group)
  end

  test "should destroy movement_group" do
    assert_difference('MovementGroup.count', -1) do
      delete movement_group_url(@movement_group)
    end

    assert_redirected_to movement_groups_url
  end
end
