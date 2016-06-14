class ServiceManualGuidePresenter < ContentItemPresenter
  ContentOwner = Struct.new(:title, :href)

  include ActionView::Helpers::DateHelper
  attr_reader :body, :publish_time, :header_links

  def initialize(content_item)
    super
    @body = content_item["details"]["body"]
    @header_links = Array(content_item["details"]["header_links"])
      .map { |h| ActiveSupport::HashWithIndifferentAccess.new(h) }
  end

  def content_owners
    links_content_owners_attributes.map do |content_owner_attributes|
      ContentOwner.new(content_owner_attributes["title"], content_owner_attributes["base_path"])
    end
  end

  def related_discussion
    if content_item["details"]["related_discussion"]
      discussion_data = content_item["details"]["related_discussion"]
      RelatedDiscussion.new(discussion_data['title'], discussion_data['href'])
    end
  end

  def last_published_time_in_words
    "#{time_ago_in_words(updated_at)} ago"
  end

  def last_published_time_timestamp
    updated_at.strftime("%e %B %Y %H:%M")
  end

  def main_topic_title
    main_topic["title"] if main_topic.present?
  end

  def breadcrumbs
    crumbs = [{ title: "Service manual", url: "/service-manual" }]
    crumbs << { title: main_topic["title"], url: main_topic["base_path"] } if main_topic
    crumbs << { title: content_item["title"] }
    crumbs
  end

  def summary
    content_item['details']['summary']
  end

private

  def updated_at
    DateTime.parse(content_item["updated_at"])
  end

  def links_content_owners_attributes
    content_item.to_hash.fetch('links', {}).fetch('content_owners', [])
  end

  def main_topic
    @main_topic ||= Array(content_item["links"] && content_item["links"]["service_manual_topics"]).first
  end
end
