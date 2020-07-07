source "https://rubygems.org"

ruby File.read(".ruby-version").strip

gem "gds-api-adapters"
gem "govuk_app_config"
gem "govuk_publishing_components"
gem "plek"
gem "rails", "~> 6.0.3", ">= 6.0.3.2"
gem "rails-i18n"
gem "rails_translation_manager"
gem "sass-rails"
gem "slimmer"
gem "uglifier"

group :development, :test do
  gem "jasmine"
  gem "jasmine_selenium_runner", require: false
  gem "rubocop-govuk"
end

group :development do
  gem "better_errors"
  gem "binding_of_caller"
  gem "listen"
  gem "web-console"
  gem "wraith"
end

group :test do
  gem "capybara"
  gem "govuk-content-schema-test-helpers"
  gem "pry-byebug"
  gem "rails-controller-testing"
  gem "webdrivers"
  gem "webmock", require: false
end
