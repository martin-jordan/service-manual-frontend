source "https://rubygems.org"

ruby File.read(".ruby-version").strip

gem "gds-api-adapters"
gem "govuk_app_config"
gem "govuk_publishing_components"
gem "plek"
gem "rails", "~> 5.2.4", ">= 5.2.4.3"
gem "rails-i18n"
gem "rails_translation_manager"
gem "sass-rails"
gem "slimmer"
gem "uglifier"

group :development, :test do
  gem "jasmine-rails"
  gem "phantomjs"
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
  gem "poltergeist"
  gem "pry-byebug"
  gem "rails-controller-testing"
  gem "webmock", require: false
end
