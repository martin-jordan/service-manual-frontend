module PhaseLabelHelper
  def render_phase_label(presented_object, message)
    if presented_object.respond_to?(:phase) && %w(alpha beta).include?(presented_object.phase)
      locals = {}
      locals[:message] = message if message.present?
      render partial: "govuk_component/#{presented_object.phase}_label", locals: locals
    end
  end

  def survey_url
    url = "https://www.smartsurvey.co.uk/s/HGLV5/"
    url += "?c=#{request.path}" if request.path.present?
    url
  end
end
