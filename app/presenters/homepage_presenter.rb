class HomepagePresenter < ContentItemPresenter
  def breadcrumbs
    []
  end

  def include_search_in_header?
    false
  end

  def topics
    unsorted_topics.sort_by { |topic| topic["title"] }
  end

  def phase
    "beta"
  end

private

  def unsorted_topics
    @_topics ||= links["children"] || []
  end
end
