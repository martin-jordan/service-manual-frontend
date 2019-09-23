# Skip the Slimmer middleware when rendering the Jasmine runner /specs
# in the browser.
if defined?(JasmineRails)
  require "slimmer/headers"

  module JasmineRails
    class SpecRunnerController < JasmineRails::ApplicationController
      include Slimmer::Headers

      before_action -> { set_slimmer_headers(skip: "true") }
    end
  end
end
