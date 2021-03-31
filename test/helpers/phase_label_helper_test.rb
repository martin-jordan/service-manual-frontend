require "test_helper"

class PhaseLabelHelperTest < ActionView::TestCase
  test "#survey_url includes a custom variable" do
    stub(:request, ActionDispatch::TestRequest.create("PATH_INFO" => "/service-manual/agile")) do
      assert_equal "https://www.gov.uk/service-manual/communities/contact-the-service-manual-and-service-standard-team?c=/service-manual/agile", survey_url
    end
  end

  test "#survey_url does not include a custom variable if the request path is nil" do
    stub(:request, ActionDispatch::TestRequest.create("PATH_INFO" => nil)) do
      assert_equal "https://www.gov.uk/service-manual/communities/contact-the-service-manual-and-service-standard-team", survey_url
    end
  end
end
