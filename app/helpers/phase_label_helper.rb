module PhaseLabelHelper
  def render_phase_label(presented_object, message)
    if presented_object.respond_to?(:phase) && %w[alpha beta].include?(presented_object.phase)
      render "govuk_publishing_components/components/phase_banner",
             phase: presented_object.phase,
             message: message
    end
  end

  def survey_url
    url = "https://www.gov.uk/service-manual/communities/contact-the-service-manual-and-service-standard-team"
    url += "?c=#{request.path}" if request.path.present?
    url
  end
end
