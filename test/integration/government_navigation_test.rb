require 'test_helper'

class GovernmentNavigationTest < ActionDispatch::IntegrationTest
  test "includes government navigation" do
    example_body = get_content_example_by_format_and_name('service_manual_guide', 'basic_with_related_discussions')
    base_path = JSON.parse(example_body).fetch("base_path")
    content_store_has_item(base_path, example_body)

    visit base_path

    assert page.has_css?(shared_component_selector("government_navigation"))
  end
end
