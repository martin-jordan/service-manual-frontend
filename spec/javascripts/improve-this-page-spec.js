describe("Improve this page", function () {
   var FIXTURE =
    '<div class="improve-this-page">' +
      '<div class="js-prompt">' +
        '<span class="improve-this-page__is-useful-question">Is this page useful?</span>' +
        '<a href="/contact/govuk" class="js-page-is-useful" data-track-category="improve-this-page" data-track-action="page-is-useful">Yes</a>' +
        '<a href="/contact/govuk" class="js-page-is-not-useful" data-track-category="improve-this-page" data-track-action="page-is-not-useful">No</a>' +
        '<div class="improve-this-page__anything-wrong">' +
          '<a href="/contact/govuk" class="js-something-is-wrong" data-track-category="improve-this-page" data-track-action="something-is-wrong">Is there anything wrong with this page?</a>' +
        '</div>' +
      '</div>' +
      '<div class="js-feedback-form js-hidden" data-track-category="improve-this-page" data-track-action="give-feedback">' +
        '<a href="#" class="improve-this-page__close js-close-feedback-form" aria-hidden="true">Close</a>' +
        '<div class="js-errors"></div>' +
        '<form>' +
          '<input type="hidden" name="url" value="http://example.com/path/to/page"></input>' +
          '<input type="hidden" name="user_agent" value="Safari"></input>' +
          '<div>' +
            '<label>' +
              '<input name="description"></input>' +
              'How should we improve this page?' +
            '</label>' +
          '</div>' +
          '<div>' +
            '<label>' +
              '<input name="name"></input>' +
            '</label>' +
          '</div>' +
          '<div>' +
            '<label>' +
              '<input name="email"></input>' +
            '</label>' +
          '</div>' +
          '<input type="submit">Submit</input>' +
        '</form>' +
      '</div>' +
    '</div>';

  beforeEach(function() {
    setFixtures(FIXTURE);
  });

  describe("Saying that the page was useful", function () {
    it("displays a success message", function () {
      loadImproveThisPage();

      $('a.js-page-is-useful').click();

      expect($('.improve-this-page').html()).toBe("Thanks for your feedback.");
    });

    it("triggers a Google Analytics event", function () {
      var analytics = {
        trackEvent: function() {}
      };

      withGovukAnalytics(analytics, function () {
        spyOn(GOVUK.analytics, 'trackEvent');

        loadImproveThisPage();

        $('a.js-page-is-useful').click();

        expect(GOVUK.analytics.trackEvent).
          toHaveBeenCalledWith('improve-this-page', 'page-is-useful');
      });
    });
  });

  describe("Saying the page was not useful", function () {
    it("shows the feedback form and hides the prompt", function () {
      loadImproveThisPage();

      expect($('.improve-this-page .js-prompt')).not.toHaveClass('js-hidden');
      expect($('.improve-this-page .js-feedback-form')).toHaveClass('js-hidden');

      $('a.js-page-is-not-useful').click();

      expect($('.improve-this-page .js-prompt')).toHaveClass('js-hidden');
      expect($('.improve-this-page .js-feedback-form')).not.toHaveClass('js-hidden');
    });

    it("triggers a Google Analytics event", function () {
      var analytics = {
        trackEvent: function() {}
      };

      withGovukAnalytics(analytics, function () {
        spyOn(GOVUK.analytics, 'trackEvent');

        loadImproveThisPage();

        $('a.js-page-is-not-useful').click();

        expect(GOVUK.analytics.trackEvent).
          toHaveBeenCalledWith('improve-this-page', 'page-is-not-useful');
      });
    });
  });

  describe("Saying there is something wrong with the page", function () {
    it("shows the feedback form and hides the prompt", function () {
      loadImproveThisPage();

      expect($('.improve-this-page .js-prompt')).not.toHaveClass('js-hidden');
      expect($('.improve-this-page .js-feedback-form')).toHaveClass('js-hidden');

      $('a.js-something-is-wrong').click();

      expect($('.improve-this-page .js-prompt')).toHaveClass('js-hidden');
      expect($('.improve-this-page .js-feedback-form')).not.toHaveClass('js-hidden');
    });

    it("triggers a Google Analytics event", function () {
      var analytics = {
        trackEvent: function() {}
      };

      withGovukAnalytics(analytics, function () {
        spyOn(GOVUK.analytics, 'trackEvent');

        loadImproveThisPage();

        $('a.js-something-is-wrong').click();

        expect(GOVUK.analytics.trackEvent).
          toHaveBeenCalledWith('improve-this-page', 'something-is-wrong');
      });
    });
  });

  describe("Giving feedback", function () {

    beforeEach(function() {
      jasmine.Ajax.install();
    });

    afterEach(function() {
      jasmine.Ajax.uninstall();
    });

    it("triggers a Google Analytics event", function () {
      var analytics = {
        trackEvent: function() {}
      };

      withGovukAnalytics(analytics, function () {
        spyOn(GOVUK.analytics, 'trackEvent');

        loadImproveThisPage();
        fillAndSubmitFeedbackForm();

        jasmine.Ajax.requests.mostRecent().respondWith({
          status: 200,
          contentType: 'text/plain',
          responseText: ''
        });

        expect(GOVUK.analytics.trackEvent).
          toHaveBeenCalledWith('improve-this-page', 'give-feedback');
      });
    });

    it("submits the feedback to the feedback frontend", function () {
      loadImproveThisPage();
      fillAndSubmitFeedbackForm();

      request = jasmine.Ajax.requests.mostRecent();
      expect(request.url).toBe('/contact/govuk/page_improvements');
      expect(request.method).toBe('POST');
      expect(request.data()).toEqual({
        url: ["http://example.com/path/to/page"],
        description: ["The background should be green."],
        name: ["Henry"],
        email: ["henry@example.com"],
        user_agent: ["Safari"]
      });
    });

    it("disables the submit button until there is a validation error", function () {
      loadImproveThisPage();
      fillAndSubmitFeedbackForm();

      expect($('.improve-this-page form [type=submit]')).toBeDisabled();

      jasmine.Ajax.requests.mostRecent().respondWith({
        status: 422,
        contentType: 'application/json',
        responseText: '{"errors": {"description": ["can\'t be blank"], "path": ["can\'t be blank"]}}'
      });

      expect($('.improve-this-page form [type=submit]')).not.toBeDisabled();
    });

    it("displays a success message", function () {
      loadImproveThisPage();
      fillAndSubmitFeedbackForm();

      jasmine.Ajax.requests.mostRecent().respondWith({
        status: 200,
        contentType: 'application/json',
        responseText: '{}'
      });

      expect($('.improve-this-page').html()).toBe("Thanks for your feedback.");
    });

    it("displays validation errors if the request to the feedback frontend isn't processable", function () {
      loadImproveThisPage();
      fillAndSubmitFeedbackForm();

      jasmine.Ajax.requests.mostRecent().respondWith({
        status: 422,
        contentType: 'application/json',
        responseText: '{"errors": {"description": ["can\'t be blank"], "path": ["can\'t be blank"]}}'
      });

      expect($('.improve-this-page').html()).toContain("description can't be blank.");
      expect($('.improve-this-page').html()).toContain("path can't be blank.");
    });

    it("displays a validation error relating to a field inline", function () {
      loadImproveThisPage();
      fillAndSubmitFeedbackForm();

      jasmine.Ajax.requests.mostRecent().respondWith({
        status: 422,
        contentType: 'application/json',
        responseText: '{"errors": {"description": ["can\'t be blank"], "random": ["weird error"]}}'
      });

      expect($('.improve-this-page [name="description"]').parent()).toContainText("description can't be blank.");
      expect($('.improve-this-page .js-errors')).toContainText("random weird error.");
    });

    it("displays a generic error message if the request to the feedback frontend fails", function () {
      loadImproveThisPage();
      fillAndSubmitFeedbackForm();

      jasmine.Ajax.requests.mostRecent().respondWith({
        status: 500,
        contentType: 'text/plain',
        responseText: ''
      });

      expect($('.improve-this-page').html()).toBe("Sorry, we’re unable to receive your message right now. We have other ways for you to provide feedback on the <a href=\"/contact/govuk\">contact page</a>.");
    });

    it("hides the form when the close button is pressed", function() {
      loadImproveThisPage();

      $('a.js-page-is-not-useful').click();
      $('a.js-close-feedback-form').click();

      expect($('.improve-this-page .js-prompt')).not.toHaveClass('js-hidden');
      expect($('.improve-this-page .js-feedback-form')).toHaveClass('js-hidden');
    });
  });

  function loadImproveThisPage () {
    var improveThisPage = new GOVUK.Modules.ImproveThisPage();
    improveThisPage.start($('.improve-this-page'));
  }

  function fillAndSubmitFeedbackForm () {
    $form = $('.improve-this-page form');
    $form.find("[name=description]").val("The background should be green.");
    $form.find("[name=name]").val("Henry");
    $form.find("[name=email]").val("henry@example.com");
    $form.find("[type=submit]").click();
  }
});
