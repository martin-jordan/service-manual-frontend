// Temporarily overrides GOVUK.analytics and returns it
// to it's original state
function withGovukAnalytics (analytics, callback) { // eslint-disable-line no-unused-vars
  var original = GOVUK.analytics
  GOVUK.analytics = analytics

  callback()

  if (original) {
    GOVUK.analytics = original
  } else {
    delete GOVUK.analytics
  };
}
