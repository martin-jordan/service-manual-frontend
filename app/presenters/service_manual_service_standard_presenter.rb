class ServiceManualServiceStandardPresenter < ContentItemPresenter
  def points
    Point.load(points_attributes).sort
  end

  def breadcrumbs
    [
      { title: "Service manual", url: "/service-manual" },
      { title: title }
    ]
  end

private

  def points_attributes
    @_points_attributes ||= details["points"] || []
  end

  def details
    @_details ||= content_item["details"] || {}
  end

  class Point
    include Comparable

    attr_reader :title, :summary, :base_path

    def self.load(points_attributes)
      points_attributes.map { |point_attributes| new(point_attributes) }
    end

    def initialize(attributes)
      @title = attributes["title"]
      @summary = attributes["summary"]
      @base_path = attributes["base_path"]
    end

    def <=>(other)
      number <=> other.number
    end

    def title_without_number
      @_title_without_number ||= title.sub(/\A(\d*)\.(\s*)/, '')
    end

    def number
      @_number ||= Integer(title.scan(/\A(\d*)/)[0][0])
    end
  end
end
