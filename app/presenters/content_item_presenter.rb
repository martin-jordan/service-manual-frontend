class ContentItemPresenter
  attr_reader :content_item, :title, :description, :locale, :phase

  def initialize(content_item)
    @content_item = content_item
    @title = content_item["title"]
    @description = content_item["description"]
    @locale = content_item["locale"] || "en"
    @phase = content_item["phase"]
  end

  def available_translations
    sorted_locales(links["available_translations"])
  end

  def links
    @links ||= content_item["links"] || {}
  end

  def details
    @details ||= content_item["details"] || {}
  end

  def include_search_in_header?
    true
  end

  def use_new_style_feedback_form?
    true
  end

  def format
    content_item["document_type"].sub(/^service_manual_/, '')
  end

private

  def display_time(timestamp)
    I18n.l(Date.parse(timestamp), format: "%-d %B %Y") if timestamp # rubocop:disable Style/FormatStringToken
  end

  def sorted_locales(translations)
    translations.sort_by { |t| t["locale"] == I18n.default_locale.to_s ? '' : t["locale"] }
  end
end
