require "application_system_test_case"

class RolesUsersTest < ApplicationSystemTestCase
  setup do
    @roles_user = roles_users(:one)
  end

  test "visiting the index" do
    visit roles_users_url
    assert_selector "h1", text: "Roles Users"
  end

  test "creating a Roles user" do
    visit roles_users_url
    click_on "New Roles User"

    fill_in "Deleted At", with: @roles_user.deleted_at
    fill_in "Role", with: @roles_user.role_id
    fill_in "User", with: @roles_user.user_id
    click_on "Create Roles user"

    assert_text "Roles user was successfully created"
    click_on "Back"
  end

  test "updating a Roles user" do
    visit roles_users_url
    click_on "Edit", match: :first

    fill_in "Deleted At", with: @roles_user.deleted_at
    fill_in "Role", with: @roles_user.role_id
    fill_in "User", with: @roles_user.user_id
    click_on "Update Roles user"

    assert_text "Roles user was successfully updated"
    click_on "Back"
  end

  test "destroying a Roles user" do
    visit roles_users_url
    page.accept_confirm do
      click_on "Destroy", match: :first
    end

    assert_text "Roles user was successfully destroyed"
  end
end
