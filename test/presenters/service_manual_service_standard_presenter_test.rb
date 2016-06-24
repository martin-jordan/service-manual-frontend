require 'test_helper'

class ContentItemPresenterTest < ActiveSupport::TestCase
  test "#points gets points from the details" do
    example = GovukContentSchemaTestHelpers::Examples.new.get(
      'service_manual_service_standard',
      'service_manual_service_standard'
    )

    points = ServiceManualServiceStandardPresenter.new(JSON.parse(example)).points

    assert points.any? { |point_hash| point_hash["title"] == "1. Understand user needs" }
    assert points.any? { |point_hash| point_hash["title"] == "2. Do ongoing user research" }
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
