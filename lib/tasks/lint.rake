desc "run ruby and sass linters"
task :lint do
  sh "govuk-lint-ruby --format clang Gemfile app test config"
  sh "govuk-lint-sass app"
end

unless ENV["JENKINS"]
  Rake::Task[:default].enhance [:lint]
end
