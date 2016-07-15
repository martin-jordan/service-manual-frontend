class ServiceManualGuidePresenter < ContentItemPresenter
  ContentOwner = Struct.new(:title, :href)

  attr_reader :body, :publish_time, :header_links

  def initialize(content_item)
    super
    @body = details["body"]
    @header_links = Array(details["header_links"])
      .map { |h| ActiveSupport::HashWithIndifferentAccess.new(h) }
  end

  def content_owners
    links_content_owners_attributes.map do |content_owner_attributes|
      ContentOwner.new(content_owner_attributes["title"], content_owner_attributes["base_path"])
    end
  end

  def category_title
    category["title"] if category.present?
  end

  def breadcrumbs
    crumbs = [{ title: "Service manual", url: "/service-manual" }]
    crumbs << { title: category["title"], url: category["base_path"] } if category
    crumbs << { title: content_item["title"] }
    crumbs
  end

  def show_description?
    !!details['show_description']
  end

  def public_updated_at
    content_item["public_updated_at"].to_time
  end

private

  def links_content_owners_attributes
    content_item.to_hash.fetch('links', {}).fetch('content_owners', [])
  end

  def category
    topic || parent
  end

  def parent
    @_topic ||= Array(links["parent"]).first
  end

  def topic
    @_topic ||= Array(links["service_manual_topics"]).first
  end

  def links
    @_links ||= content_item["links"] || {}
  end

  def details
    @_details ||= content_item["details"] || {}
  end
end
