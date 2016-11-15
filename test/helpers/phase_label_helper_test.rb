require 'test_helper'

class PhaseLabelHelperTest < ActionView::TestCase
  test "#surveymonkey_url includes a custom variable" do
    stub(:request, ActionController::TestRequest.new('PATH_INFO' => '/service-manual/agile')) do
      assert_equal "https://www.surveymonkey.co.uk/r/servicemanualsurvey?c=/service-manual/agile", surveymonkey_url
    end
  end

  test "#surveymonkey_url does not include a custom variable if the request path is nil" do
    stub(:request, ActionController::TestRequest.new) do
      assert_equal "https://www.surveymonkey.co.uk/r/servicemanualsurvey", surveymonkey_url
    end
  end
end
