require "application_system_test_case"

class MovementGroupsTest < ApplicationSystemTestCase
  setup do
    @movement_group = movement_groups(:one)
  end

  test "visiting the index" do
    visit movement_groups_url
    assert_selector "h1", text: "Movement Groups"
  end

  test "creating a Movement group" do
    visit movement_groups_url
    click_on "New Movement Group"

    fill_in "Description", with: @movement_group.description
    fill_in "Name", with: @movement_group.name
    fill_in "Type", with: @movement_group.type
    click_on "Create Movement group"

    assert_text "Movement group was successfully created"
    click_on "Back"
  end

  test "updating a Movement group" do
    visit movement_groups_url
    click_on "Edit", match: :first

    fill_in "Description", with: @movement_group.description
    fill_in "Name", with: @movement_group.name
    fill_in "Type", with: @movement_group.type
    click_on "Update Movement group"

    assert_text "Movement group was successfully updated"
    click_on "Back"
  end

  test "destroying a Movement group" do
    visit movement_groups_url
    page.accept_confirm do
      click_on "Destroy", match: :first
    end

    assert_text "Movement group was successfully destroyed"
  end
end
