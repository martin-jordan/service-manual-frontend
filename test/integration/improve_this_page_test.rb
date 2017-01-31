require 'test_helper'

class ImproveThisPageTest < ActionDispatch::IntegrationTest
  test "asks the user if the page is useful without javascript enabled" do
    setup_and_visit_example('service_manual_guide', 'service_manual_guide')

    within('.improve-this-page') do
      assert page.has_link?('Yes', href: '/contact/govuk')
      assert page.has_link?('No', href: '/contact/govuk')
    end
  end

  test "asks the user if there is anything wrong with the page without javascript enabled" do
    setup_and_visit_example('service_manual_guide', 'service_manual_guide')

    within('.improve-this-page') do
      assert page.has_link?('Is there anything wrong with this page?', href: '/contact/govuk')
    end
  end
end
