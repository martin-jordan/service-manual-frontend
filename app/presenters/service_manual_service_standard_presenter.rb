class ServiceManualServiceStandardPresenter < ContentItemPresenter
  def points
    either_links["children"]
  end

  def breadcrumbs
    [
      { title: "Service manual", url: "/service-manual" },
      { title: title }
    ]
  end

private

  def either_links
    content_item["expanded_links"] || content_item["links"]
  end
end
