require 'test_helper'

class PhaseLabelTest < ActionDispatch::IntegrationTest
  test "renders custom message for service manual guide pages" do
    guide = content_store_has_schema_example(
      'service_manual_guide',
      'service_manual_guide',
      phase: 'beta'
    )

    visit guide["base_path"]
    assert_has_phase_label_message(
      'beta',
      %{This is new guidance. Complete our quick 5-question survey to <a target="_blank" rel="noopener noreferrer" href="https://www.surveymonkey.co.uk/r/servicemanualsurvey?c=#{guide['base_path']}">help us improve it</a>.}
    )
  end

  test "renders custom message for service manual homepage" do
    homepage = content_store_has_schema_example(
      "service_manual_homepage",
      "service_manual_homepage"
    )

    visit homepage["base_path"]
    assert_has_phase_label_message(
      'beta',
      %{Complete our quick 5-question survey to <a target="_blank" rel="noopener noreferrer" href="https://www.surveymonkey.co.uk/r/servicemanualsurvey?c=#{homepage['base_path']}">help us improve our content</a>.}
    )
  end

  test "alpha phase label is displayed for a guide in phase 'alpha'" do
    guide = content_store_has_schema_example(
      'service_manual_guide',
      'service_manual_guide',
      phase: 'alpha'
    )

    visit guide["base_path"]

    assert_has_phase_label "alpha"
  end

  test "No phase label is displayed for a guide without a phase field" do
    guide = content_store_has_schema_example(
      'service_manual_guide',
      'service_manual_guide',
      phase: nil
    )

    visit guide["base_path"]

    assert_has_no_phase_label
  end

private

  def assert_has_phase_label(phase)
    assert page.has_css?("[data-template='govuk_component-#{phase}_label']"),
      "Expected the page to have an '#{phase.titleize}' label"
  end

  def assert_has_no_phase_label
    %w{alpha beta}.each do |phase|
      assert page.has_no_css?("[data-template='govuk_component-#{phase}_label']")
    end
  end

  def assert_has_phase_label_message(phase, message)
    within shared_component_selector("#{phase}_label") do
      assert_equal message, JSON.parse(page.text).fetch("message").strip
    end
  end
end
