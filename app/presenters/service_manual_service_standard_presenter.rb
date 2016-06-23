class ServiceManualServiceStandardPresenter < ContentItemPresenter
  def points
    either_links["children"]
  end

private

  def either_links
    content_item["expanded_links"] || content_item["links"]
  end
end
