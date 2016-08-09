require 'test_helper'

class GovernmentNavigationTest < ActionDispatch::IntegrationTest
  test "includes government navigation" do
    setup_and_visit_example('service_manual_guide', 'service_manual_guide')

    assert page.has_css?(shared_component_selector("government_navigation"))
  end
end
