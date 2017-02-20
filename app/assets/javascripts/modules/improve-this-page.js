(function (Modules) {
  "use strict";

  function ImproveThisPage () {
    this.controller = null;
    this.view = null;

    this.start = function ($element) {
      this.view = new View($element);
      this.controller = new Controller(this.view);

      this.controller.init();
    }
  };

  function View ($element) {
    var that = this;

    this.$pageIsUsefulButton = $element.find('.js-page-is-useful');
    this.$pageIsNotUsefulButton = $element.find('.js-page-is-not-useful');
    this.$somethingIsWrongButton = $element.find('.js-something-is-wrong');
    this.$feedbackFormContainer = $element.find('.js-feedback-form');
    this.$feedbackForm = that.$feedbackFormContainer.find('form');
    this.$feedbackFormSubmitButton = that.$feedbackFormContainer.find('[type=submit]');
    this.$feedbackFormCloseButton = that.$feedbackFormContainer.find('.js-close-feedback-form');
    this.$prompt = $element.find('.js-prompt');

    this.onPageIsUsefulButtonClicked = function (callback) {
      that.$pageIsUsefulButton.on('click', preventingDefault(callback));
    }

    this.onPageIsNotUsefulButtonClicked = function (callback) {
      that.$pageIsNotUsefulButton.on('click', preventingDefault(callback));
    }

    this.onSomethingIsWrongButtonClicked = function (callback) {
      that.$somethingIsWrongButton.on('click', preventingDefault(callback));
    }

    this.onFeedbackFormCloseButtonClicked = function (callback) {
      that.$feedbackFormCloseButton.on('click', preventingDefault(callback));
    }

    this.onSubmitFeedbackForm = function (callback) {
      that.$feedbackForm.on('submit', preventingDefault(callback));
    }

    this.replaceWithSuccess = function () {
      $element.html('Thanks for your feedback.');
    }

    this.replaceWithGenericError = function () {
      $element.html('Sorry, we’re unable to receive your message right now. We have other ways for you to provide feedback on the <a href=\"/contact/govuk\">contact page</a>.');
    }

    this.toggleFeedbackForm = function () {
      that.$prompt.toggleClass('js-hidden');
      that.$feedbackFormContainer.toggleClass('js-hidden');
    }

    this.feedbackFormContainerData = function () {
      return that.$feedbackFormContainer.find('input, textarea').serialize();
    }

    this.feedbackFormContainerTrackEventParams = function () {
      return that.getTrackEventParams(that.$feedbackFormContainer);
    }

    this.pageIsUsefulTrackEventParams = function () {
      return that.getTrackEventParams(that.$pageIsUsefulButton);
    }

    this.pageIsNotUsefulTrackEventParams = function () {
      return that.getTrackEventParams(that.$pageIsNotUsefulButton);
    }

    this.somethingIsWrongTrackEventParams = function () {
      return that.getTrackEventParams(that.$somethingIsWrongButton);
    }

    this.getTrackEventParams = function ($node) {
      return {
        category: $node.data('track-category'),
        action: $node.data('track-action')
      }
    }

    this.renderErrors = function (errors) {
      that.$feedbackFormContainer.find('.js-error').remove();

      $.each(errors, function (attrib, messages) {
        $.each(messages, function (index, message) {
          var $errorNode = $('<div/>', {
            'class': 'improve-this-page__error js-error',
            'text': attrib + ' ' + message + '.'
          });
          var $field = that.$feedbackFormContainer.find('[name="'+ attrib + '"]');

          // If there is a field with the same name as the error attribute
          // then display the error inline with the field. If a matching field
          // doesn't exist then display it above the form.
          if ($field.length) {
            $field.before($errorNode);
          } else {
            that.$feedbackFormContainer.find('.js-errors').append($errorNode);
          }
        });
      });
    }

    this.disableSubmitFeedbackButton = function () {
      that.$feedbackFormSubmitButton.prop('disabled', true);
    }

    this.enableSubmitFeedbackButton = function () {
      that.$feedbackFormSubmitButton.removeAttr('disabled');
    }

    function preventingDefault(callback) {
      return function (event) {
        event.preventDefault();
        callback();
      }
    }
  };

  function Controller (view) {
    var that = this;

    this.init = function () {
      that.bindPageIsUsefulButton();
      that.bindPageIsNotUsefulButton();
      that.bindSomethingIsWrongButton();
      that.bindSubmitFeedbackButton();
      this.bindCloseFeedbackFormButton();
    }

    this.bindPageIsUsefulButton = function () {
      var handler = function () {
        that.trackEvent(view.pageIsUsefulTrackEventParams());

        view.replaceWithSuccess();
      }

      view.onPageIsUsefulButtonClicked(handler);
    }

    this.bindPageIsNotUsefulButton = function () {
      var handler = function () {
        that.trackEvent(view.pageIsNotUsefulTrackEventParams());

        view.toggleFeedbackForm();
      }

      view.onPageIsNotUsefulButtonClicked(handler);
    }

    this.bindSomethingIsWrongButton = function () {
      var handler = function () {
        that.trackEvent(view.somethingIsWrongTrackEventParams());

        view.toggleFeedbackForm();
      }

      view.onSomethingIsWrongButtonClicked(handler);
    }

    this.bindCloseFeedbackFormButton = function () {
      var handler = function () {
        view.toggleFeedbackForm();
      }

      view.onFeedbackFormCloseButtonClicked(handler);
    }

    this.bindSubmitFeedbackButton = function () {
      view.onSubmitFeedbackForm(that.handleSubmitFeedback);
    }

    this.handleSubmitFeedback = function () {
      $.ajax({
        type: "POST",
        url: "/contact/govuk/page_improvements",
        data: view.feedbackFormContainerData(),
        beforeSend: view.disableSubmitFeedbackButton
      }).done(function () {
        that.trackEvent(view.feedbackFormContainerTrackEventParams());

        view.replaceWithSuccess();
      }).fail(function (xhr) {
        if (xhr.status == 422) {
          view.renderErrors(xhr.responseJSON.errors);

          view.enableSubmitFeedbackButton();
        } else {
          view.replaceWithGenericError();
        }
      });
    }

    this.trackEvent = function(trackEventParams) {
      if (GOVUK.analytics && GOVUK.analytics.trackEvent) {
        GOVUK.analytics.trackEvent(trackEventParams.category, trackEventParams.action);
      }
    }
  };

  Modules.ImproveThisPage = ImproveThisPage;
})(window.GOVUK.Modules);
