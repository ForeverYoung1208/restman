require "application_system_test_case"

class MovementsTest < ApplicationSystemTestCase
  setup do
    @movement = movements(:one)
  end

  test "visiting the index" do
    visit movements_url
    assert_selector "h1", text: "Movements"
  end

  test "creating a Movement" do
    visit movements_url
    click_on "New Movement"

    fill_in "Account", with: @movement.account_id
    fill_in "Comment", with: @movement.comment
    fill_in "Day", with: @movement.day_id
    fill_in "Deleted At", with: @movement.deleted_at
    fill_in "Direction", with: @movement.direction
    fill_in "Last Editor", with: @movement.last_editor_id
    fill_in "Log", with: @movement.log
    fill_in "Movement Group", with: @movement.movement_group_id
    fill_in "Value", with: @movement.value
    click_on "Create Movement"

    assert_text "Movement was successfully created"
    click_on "Back"
  end

  test "updating a Movement" do
    visit movements_url
    click_on "Edit", match: :first

    fill_in "Account", with: @movement.account_id
    fill_in "Comment", with: @movement.comment
    fill_in "Day", with: @movement.day_id
    fill_in "Deleted At", with: @movement.deleted_at
    fill_in "Direction", with: @movement.direction
    fill_in "Last Editor", with: @movement.last_editor_id
    fill_in "Log", with: @movement.log
    fill_in "Movement Group", with: @movement.movement_group_id
    fill_in "Value", with: @movement.value
    click_on "Update Movement"

    assert_text "Movement was successfully updated"
    click_on "Back"
  end

  test "destroying a Movement" do
    visit movements_url
    page.accept_confirm do
      click_on "Destroy", match: :first
    end

    assert_text "Movement was successfully destroyed"
  end
end
