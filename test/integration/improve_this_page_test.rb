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

  test "asks the user for feedback if there is something wrong with the page" do
    using_javascript_driver do
      setup_and_visit_example('service_manual_guide', 'service_manual_guide')

      assert feedback_form_is_hidden

      within('.improve-this-page') do
        page.click_link 'No'
      end

      refute feedback_form_is_hidden
    end
  end

  # Because the CSS for .js-hidden is hosted outside of this app, we test for the presence
  # of the class rather than rely on PhantomJS to know whether the element is visible
  # or not.
  def feedback_form_is_hidden
    page.find('.js-feedback-form')[:class].include?('js-hidden')
  end
end
