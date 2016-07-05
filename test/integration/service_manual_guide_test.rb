require 'test_helper'

class ServiceManualGuideTest < ActionDispatch::IntegrationTest
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

  test "displays a summary if present" do
    setup_and_visit_example('service_manual_guide', 'point_page')

    within('.page-header__summary') do
      assert page.has_content?('Research to develop a deep knowledge of who the service users are')
    end
  end

  test "the lede is not visible unless there is a summary" do
    setup_and_visit_example('service_manual_guide', 'service_manual_guide')

    refute page.has_css?('.lede')
  end
end
