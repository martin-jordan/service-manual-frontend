require 'test_helper'

class ContentItemPresenterTest < ActiveSupport::TestCase
  test "#points gets children from expanded_links or links during the migration period " \
    "where the they might exist in either" do
    children = {
      "children" => [
        {
          "title" => "1. Understand user needs"
        }
      ]
    }
    service_standard_payload = {
      "expanded_links" => children,
      "links" => children
    }
    points = ServiceManualServiceStandardPresenter.new(service_standard_payload).points

    assert_includes points, "title" => "1. Understand user needs"

    service_standard_payload = {
      "links" => children
    }
    points = ServiceManualServiceStandardPresenter.new(service_standard_payload).points

    assert_includes points, "title" => "1. Understand user needs"
  end

  test "#breadcrumbs contains a link to the service manual root" do
    content_item_hash = {
      "title" => "Digital Service Standard"
    }

    assert ServiceManualServiceStandardPresenter.new(content_item_hash).breadcrumbs,
      [
        { title: "Service manual", url: "/service-manual" },
        { title: "Digital Service Standard" },
      ]
  end
end
