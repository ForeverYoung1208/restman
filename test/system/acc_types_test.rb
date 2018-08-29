require "application_system_test_case"

class AccTypesTest < ApplicationSystemTestCase
  setup do
    @acc_type = acc_types(:one)
  end

  test "visiting the index" do
    visit acc_types_url
    assert_selector "h1", text: "Acc Types"
  end

  test "creating a Acc type" do
    visit acc_types_url
    click_on "New Acc Type"

    fill_in "Name Eng", with: @acc_type.name_eng
    fill_in "Name Ukr", with: @acc_type.name_ukr
    click_on "Create Acc type"

    assert_text "Acc type was successfully created"
    click_on "Back"
  end

  test "updating a Acc type" do
    visit acc_types_url
    click_on "Edit", match: :first

    fill_in "Name Eng", with: @acc_type.name_eng
    fill_in "Name Ukr", with: @acc_type.name_ukr
    click_on "Update Acc type"

    assert_text "Acc type was successfully updated"
    click_on "Back"
  end

  test "destroying a Acc type" do
    visit acc_types_url
    page.accept_confirm do
      click_on "Destroy", match: :first
    end

    assert_text "Acc type was successfully destroyed"
  end
end
