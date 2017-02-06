require 'test_helper'

class PhaseLabelTest < ActionDispatch::IntegrationTest
  test "Beta phase label is displayed for a Service Manual Guide in phase 'beta'" do
    guide_sample = JSON.parse(GovukContentSchemaTestHelpers::Examples.new.get('service_manual_guide', 'service_manual_guide'))
    guide_sample["phase"] = "beta"
    content_store_has_item("/service-manual/agile", guide_sample.to_json)

    visit "/service-manual/agile"

    assert_has_phase_label "beta"
  end

  test "renders custom message for service manual guide pages" do
    guide_sample = JSON.parse(GovukContentSchemaTestHelpers::Examples.new.get('service_manual_guide', 'service_manual_guide'))
    phase = 'beta'
    guide_sample["phase"] = phase
    content_store_has_item("/service-manual/agile", guide_sample.to_json)

    visit "/service-manual/agile"
    assert_has_phase_label phase
    expected_phase_message = %{This is new guidance. Complete our quick 5-question survey to <a href="https://www.surveymonkey.co.uk/r/servicemanualsurvey?c=/service-manual/agile">help us improve it</a>.}
    assert_has_phase_label_message phase, expected_phase_message
  end

  test "Alpha phase label is displayed for a Case Study in phase 'alpha'" do
    case_study = JSON.parse(GovukContentSchemaTestHelpers::Examples.new.get('service_manual_guide', 'service_manual_guide'))
    case_study["phase"] = "alpha"
    content_store_has_item("/government/case-studies/get-britain-building-carlisle-park", case_study.to_json)

    visit "/government/case-studies/get-britain-building-carlisle-park"

    assert_has_phase_label "alpha"
  end

  test "No phase label is displayed for a Content item without a phase field" do
    content_item = content_store_has_schema_example('service_manual_guide', 'service_manual_guide')
    content_item.delete("phase")
    content_store_has_item("/government/case-studies/get-britain-building-carlisle-park", content_item.to_json)

    visit "/government/case-studies/get-britain-building-carlisle-park"

    assert page.has_no_css?("[data-template='govuk_component-alpha_label']")
    assert page.has_no_css?("[data-template='govuk_component-beta_label']")
  end

  def assert_has_phase_label(phase)
    assert page.has_css?("[data-template='govuk_component-#{phase}_label']"),
      "Expected the page to have an '#{phase.titleize}' label"
  end

  def assert_has_phase_label_message(phase, message)
    within shared_component_selector("#{phase}_label") do
      assert_equal message, JSON.parse(page.text).fetch("message").strip
    end
  end
end
