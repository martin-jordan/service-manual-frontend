require 'test_helper'

class ServiceManualServiceStandardTest < ActionDispatch::IntegrationTest
  test "service standard page has a title" do
    setup_and_visit_example('service_manual_service_standard', 'service_manual_service_standard')

    assert page.has_content?("Digital Service Standard"), "No title found"
  end
end
