require File.expand_path("../config/environment", __dir__)
require "rails/test_help"
require "minitest/mock"
require "webmock/minitest"
require "capybara/rails"
require "slimmer/test"

Dir[File.dirname(__FILE__) + "/support/**/*.rb"].sort.each { |file| require file }

class ActiveSupport::TestCase
  include GovukContentSchemaExamples
  include DraftStackExamples
end

Capybara.default_driver = :rack_test

class ActionDispatch::IntegrationTest
  # Make the Capybara DSL available in all integration tests
  include Capybara::DSL

  def setup_and_visit_example(format, name, overrides = {})
    example = govuk_content_schema_example(format, name, overrides)
    base_path = example.fetch("base_path")

    stub_content_store_has_item(base_path, example)
    visit base_path
  end
end

WebMock.disable_net_connect!(allow_localhost: true)
