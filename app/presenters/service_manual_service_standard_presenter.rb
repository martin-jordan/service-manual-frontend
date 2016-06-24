class ServiceManualServiceStandardPresenter < ContentItemPresenter
  def points
    point_hashes = Array(content_item["details"]["points"])
    point_hashes.sort_by { |point_hash| point_hash["title"] }
  end

  def breadcrumbs
    [
      { title: "Service manual", url: "/service-manual" },
      { title: title }
    ]
  end
end
