require 'test_helper'

class ServiceManualGuideTest < ActionDispatch::IntegrationTest
  test "shows the time it was published at" do
    travel_to("2015-10-10") do
      setup_and_visit_example('service_manual_guide', 'service_manual_guide')

      within('.metadata') do
        assert page.has_content?('about 16 hours ago')
      end
    end
  end

  test "service manual guide shows content owners" do
    setup_and_visit_example('service_manual_guide', 'service_manual_guide')

    within('.metadata') do
      assert page.has_link?('Agile delivery community')
    end
  end

  test "the breadcrumb contains the topic" do
    setup_and_visit_example('service_manual_guide', 'service_manual_guide')
    breadcrumbs = [
      {
        title: "Service manual",
        url: "/service-manual"
      },
      {
        title: "Agile",
        url: "/service-manual/agile"
      },
      {
        title: "Agile Delivery"
      }
    ]
    within shared_component_selector("breadcrumbs") do
      assert_equal breadcrumbs, JSON.parse(page.text).deep_symbolize_keys.fetch(:breadcrumbs)
    end
  end

  test "service manual guide does not show published by" do
    setup_and_visit_example('service_manual_guide', 'service_manual_guide_community')

    within('.metadata') do
      refute page.has_content?('Published by')
    end
  end

  test "displays the description for a point" do
    setup_and_visit_example('service_manual_guide', 'point_page')

    within('.page-header__summary') do
      assert page.has_content?('Research to develop a deep knowledge of who the service users are')
    end
  end

  test "does not display the description for a normal guide" do
    setup_and_visit_example('service_manual_guide', 'service_manual_guide')

    refute page.has_css?('.page-header__summary')
  end

  test "displays a link to give feedback" do
    setup_and_visit_example('service_manual_guide', 'service_manual_guide')

    assert page.has_link?('Give feedback about this page')
  end

  test 'displays the most recent change history for a guide' do
    setup_and_visit_example('service_manual_guide', 'with_change_history')

    within('.change-history') do
      assert page.has_content? 'This is our latest change'
      assert page.has_content? 'This is the reason for our latest change'
    end
  end

  test 'displays the change history for a guide' do
    setup_and_visit_example('service_manual_guide', 'with_change_history')

    within('.change-history__past') do
      assert page.has_content? 'This is another change'
      assert page.has_content? 'This is why we made this change and it has a second line of text'

      assert page.has_content? 'Guidance created'
    end
  end
end
