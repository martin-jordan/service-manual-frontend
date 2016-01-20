require 'test_helper'

class StatisticsAnnouncementPresenterTest < ActiveSupport::TestCase

  include ActionView::Helpers::UrlHelper

  test 'presents from as links to organisations' do
    item = presented_statistics_announcement({
      "links" => {
        "organisations" => [{ "title" => 'Org', "base_path" => '/orgs/org'}]
      }
    })
    links = [
      link_to('Org', '/orgs/org')
    ]
    assert_equal links, item.from
  end

  test 'presents part_of as links to a topic' do
    item = presented_statistics_announcement({
      "links" => {
        "policy_areas" => [{ "title" => 'Policy Area', "base_path" => '/orgs/policy-area'}]
      }
    })
    links = [
      link_to('Policy Area', '/orgs/policy-area')
    ]
    assert_equal links, item.part_of
  end

  test 'presents release_date' do
    item = presented_statistics_announcement({
      "details" => {
        "display_date" => "About Midday on Tuesday"
      }
    })
    assert_equal 'About Midday on Tuesday', item.release_date
  end

<<<<<<< HEAD
=======
  test 'knows if an item is a national statistic' do
    item = presented_statistics_announcement({
      "details" => {
        "format_sub_type" => "official"
      }
    })
    assert_not item.national_statistics?

    item = presented_statistics_announcement({
      "details" => {
        "format_sub_type" => "national"
      }
    })
    assert item.national_statistics?
  end

private
>>>>>>> a2a2c5b... Add national statistics logo logic
  def presented_statistics_announcement(overrides = {})
    StatisticsAnnouncementPresenter.new(statistics_announcement.merge(overrides))
  end

  def statistics_announcement
    govuk_content_schema_example('statistics_announcement', 'official_statistics')
  end
end
