require 'test_helper'

class ServiceToolkitTest < ActionDispatch::IntegrationTest
  test 'the service toolkit can be visited' do
    setup_and_visit_example('service_manual_service_toolkit', 'service_manual_service_toolkit')

    assert page.has_title? "Service Toolkit"
  end
end
