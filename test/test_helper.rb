require File.expand_path("../config/environment", __dir__)
require "rails/test_help"
require "minitest/mock"
require "webmock/minitest"
require "capybara/rails"
require "capybara/poltergeist"
require "slimmer/test"

Dir[File.dirname(__FILE__) + "/support/**/*.rb"].sort.each { |file| require file }

class ActiveSupport::TestCase
  include GovukContentSchemaExamples
  include DraftStackExamples
end

# Note: This is so that slimmer is skipped, preventing network requests for
# content from static (i.e. core_layout.html.erb).
class ActionController::Base
  before_action(proc {
    response.headers[Slimmer::Headers::SKIP_HEADER] = "true" unless ENV["USE_SLIMMER"]
  })
end

Capybara.default_driver = :rack_test
Capybara.javascript_driver = :poltergeist

class ActionDispatch::IntegrationTest
  # Make the Capybara DSL available in all integration tests
  include Capybara::DSL

  # When running JS tests with Capybara the app and the test runner run
  # in separate threads. Capybara shoots off http://localhost:<some port>/__identify__
  # requests to see if the app is ready. We don't want Webmock to block
  # these requests because the test suite will never run but we also don't
  # want to allow all localhost requests because we run these tests on VMs that
  # run a lot of services that might give us a false positive.
  driver_requests = %r{/__identify__$}
  WebMock.disable_net_connect! allow: driver_requests

  def using_javascript_driver
    Capybara.current_driver = Capybara.javascript_driver
    use_slimmer = ENV["USE_SLIMMER"]
    ENV["USE_SLIMMER"] = "true"

    yield
  ensure
    Capybara.use_default_driver
    ENV.delete("USE_SLIMMER") unless use_slimmer
  end

  def setup_and_visit_example(format, name, overrides = {})
    example = govuk_content_schema_example(format, name, overrides)
    base_path = example.fetch("base_path")

    stub_content_store_has_item(base_path, example)
    visit base_path
  end
end
