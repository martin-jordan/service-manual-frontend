class ServiceManualServiceStandardPresenter < ContentItemPresenter
  def points
    content_item["links"]["points"]
  end
end
