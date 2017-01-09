require 'test_helper'

class ServiceToolkitTest < ActionDispatch::IntegrationTest
  test 'the service toolkit can be visited' do
    setup_and_visit_example('service_manual_service_toolkit', 'service_manual_service_toolkit')

    assert page.has_title? "Service Toolkit"
  end

  test 'the service toolkit does not include the new style feedback form' do
    setup_and_visit_example('service_manual_service_toolkit', 'service_manual_service_toolkit')

    refute page.has_css?('.improve-this-page'),
      'Improve this page component should not be present on the page'
  end
end
