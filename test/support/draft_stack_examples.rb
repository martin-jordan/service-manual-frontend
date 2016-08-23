module DraftStackExamples
  # There are small changes between a content item on the draft stack
  # and on the live stack. To avoid putting mostly duplicated
  # examples in govuk-content-schemas with differences that are common
  # across all schemas, the things that are different can hopefully
  # be managed in this helper.
  def simulate_example_as_first_edition_on_draft_stack(hash)
    hash.except('public_updated_at')
  end
end
