require 'test_helper'

class AccTypesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @acc_type = acc_types(:one)
  end

  test "should get index" do
    get acc_types_url
    assert_response :success
  end

  test "should get new" do
    get new_acc_type_url
    assert_response :success
  end

  test "should create acc_type" do
    assert_difference('AccType.count') do
      post acc_types_url, params: { acc_type: { name_eng: @acc_type.name_eng, name_ukr: @acc_type.name_ukr } }
    end

    assert_redirected_to acc_type_url(AccType.last)
  end

  test "should show acc_type" do
    get acc_type_url(@acc_type)
    assert_response :success
  end

  test "should get edit" do
    get edit_acc_type_url(@acc_type)
    assert_response :success
  end

  test "should update acc_type" do
    patch acc_type_url(@acc_type), params: { acc_type: { name_eng: @acc_type.name_eng, name_ukr: @acc_type.name_ukr } }
    assert_redirected_to acc_type_url(@acc_type)
  end

  test "should destroy acc_type" do
    assert_difference('AccType.count', -1) do
      delete acc_type_url(@acc_type)
    end

    assert_redirected_to acc_types_url
  end
end
