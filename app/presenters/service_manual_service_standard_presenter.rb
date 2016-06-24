class ServiceManualServiceStandardPresenter < ContentItemPresenter
  def points
    Array(content_item["details"]["points"])
  end

  def breadcrumbs
    [
      { title: "Service manual", url: "/service-manual" },
      { title: title }
    ]
  end
end
