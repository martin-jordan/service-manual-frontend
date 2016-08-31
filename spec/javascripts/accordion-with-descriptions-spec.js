describe('An accordion with descriptions module', function () {
  "use strict";

  var $element;

  beforeEach(function() {
    $element = $('<div class="subsections js-hidden" data-module="accordion-with-descriptions">\
        <div class="subsection-wrapper">\
          <div class="subsection">\
            <div class="subsection__header">\
              <h2 class="subsection__title">Subsection title in here</h2>\
              <p class="subsection__description">Subsection description in here</p>\
            </div>\
            <div class="subsection__content" id="subsection_content_0">\
              <ul class="subsection__list">\
                <li class="subsection__list-item">\
                  <a href="">Subsection list item in here</a>\
                </li>\
              </ul>\
            </div>\
          </div>\
          <div class="subsection">\
            <div class="subsection__header">\
              <h2 class="subsection__title">Subsection title in here</h2>\
              <p class="subsection__description">Subsection description in here</p>\
            </div>\
            <div class="subsection__content" id="subsection_content_1">\
              <ul class="subsection__list">\
                <li class="subsection__list-item">\
                  <a href="">Subsection list item in here</a>\
                </li>\
              </ul>\
            </div>\
          </div>\
        </div>\
      </div>');

    var accordion = new GOVUK.Modules.AccordionWithDescriptions();
    accordion.start($element);
  });

  afterEach(function() {
    $(document).off();
  });

  // Setup

  // Add & remove classes to show the JS has worked

  // Add a class .js-accordion-with-descriptions
  it("has a class of js-accordion-with-descriptions", function () {
    expect($element).toHaveClass("js-accordion-with-descriptions");
  });

  // Remove the class .js-hidden
  it("does not have a class of js-hidden", function () {
    expect($element).not.toHaveClass("js-hidden");
  });

  // Add a subsection controls div, with a class of .js-subsection controls
  it("has a child element with a class of subsection-controls", function () {
    expect($element).toContainElement('.js-subsection-controls');
  });

  // Add an 'Open all' button

  // Insert a button inside .js-subsection-controls
  it("has a child element which is a button", function () {
    expect($element).toContainElement('.js-subsection-controls button');
  });

  // Set the correct text 'Open all' and aria attributes (aria-expanded, aria-controls) for the button
  it("has an open/close all button with text inside which is equal to Open all", function () {
    var $openCloseAllButton = $element.find('.js-subsection-controls button');

    expect($openCloseAllButton).toHaveText("Open all");
  });

  // Set the correct text and aria attributes (aria-expanded, aria-controls) for the button

  it("has an open/close all button with an aria-expanded attribute and it is false (as all subsections are initially closed)", function () {
    var $button = $element.find('.js-subsection-controls button');

    expect($button).toHaveAttr("aria-expanded", "false");
  });

  it("has an open/close all button, with a value for the aria-controls attribute that includes all of the subsection_content_IDs", function () {
    var $openCloseAllButton = $element.find('.js-subsection-controls button');

    expect($openCloseAllButton).toHaveAttr('aria-controls','subsection_content_0 subsection_content_1 ');
  });

  // Setup the open/close functionality for each section

  // Insert a button into each subsection heading
  // Set the correct text and aria attributes (aria-expanded, aria-controls) for the button
  it("has a section with a heading with a class of .subsection__title and a child element which is a button", function () {
    var $subsectionButton = $element.find('.subsection__title button:first');

    expect($subsectionButton).toHaveClass('subsection__button');
    expect($subsectionButton).toHaveAttr('aria-expanded','false');
    expect($subsectionButton).toHaveAttr('aria-controls','subsection_content_0');
  });

  // Ensure the wrapper for the list of links is initially hidden
  it("has two subsection-content items (one for each section) which are initially hidden", function () {
    var $subsectionContent = $element.find('.subsection__content');

    expect($subsectionContent).toHaveLength(2);
    expect($subsectionContent).toHaveClass('js-hidden');
  });

  // Ensure that the subsection-icon div has been inserted
  it("has a header with a child element which has a class of .subsection-icon", function () {
    var $subsectionHeader = $element.find('.subsection__header');

    expect($subsectionHeader).toContainElement('.subsection__icon');
  });

  describe('When the open/close all button is clicked', function () {

    // Before the open/close all button is clicked
    it("has no subsections which have an open state, the button text should be 'Open all'", function () {
      var $openCloseAllButton = $element.find('.js-subsection-controls button');
      var openSubsections = $element.find('.subsection--is-open').length;

      // When all sections are closed, make sure there are no --is-open classes
      expect(openSubsections).toEqual(0);
      expect($openCloseAllButton).toContainText("Open all");
    });

    // Check that the total number of is-open classes matches the number of sections (so all are opened)
    it("has two subsections which have an open state (this is equal to the total number of sections), the button text should be Close all", function () {
      var $openCloseAllButton = $element.find('.js-subsection-controls button');
      var openSubsections = $element.find('.subsection--is-open').length;

      $openCloseAllButton.click();

      var openSubsections = $element.find('.subsection--is-open').length;
      expect(openSubsections).toEqual(2);
      expect($openCloseAllButton).toContainText("Close all");

      var totalSubsections = $element.find('.subsection__content').length;
      expect(totalSubsections).toEqual(openSubsections);
    });

  });

  describe('When a section is open', function () {

    // When a section is open (testing: toggleSection, openSection)
    it("does not have a class of js-hidden", function () {
      var $subsectionButton = $element.find('.subsection__title button:first');
      var $subsectionContent = $element.find('.subsection__content:first');
      $subsectionButton.click();
      expect($subsectionContent).not.toHaveClass("js-hidden");
    });

    // When a section is open (testing: toggleState, setExpandedState)
    it("has a an aria-expanded attribute and the value is true", function () {
      var $subsectionButton = $element.find('.subsection__title button:first');
      $subsectionButton.click();
      expect($subsectionButton).toHaveAttr('aria-expanded','true');
    });

    it("has its state saved in session storage", function () {
      var GOVUKServiceManualTopic = "GOVUK_service_manual_agile_delivery";

      var $subsectionButton = $element.find('.subsection__title button');
      $subsectionButton.click();

      var $openSubsections = $('.subsection--is-open');
      var subsectionOpenContentId = $openSubsections.find('.subsection__content').attr('id');
      sessionStorage.setItem(GOVUKServiceManualTopic+subsectionOpenContentId , 'Opened');

      var storedItem = sessionStorage.getItem(GOVUKServiceManualTopic+subsectionOpenContentId);
      expect(storedItem).toEqual('Opened');
    });

  });

  describe('When a section is closed', function () {

    // When a section is closed (testing: toggleSection, closeSection)
    it("has a class of js-hidden", function () {
      var $subsectionButton = $element.find('.subsection__title button:first');
      var $subsectionContent = $element.find('.subsection__content:first');
      $subsectionButton.click();
      expect($subsectionContent).not.toHaveClass("js-hidden");
      $subsectionButton.click();
      expect($subsectionContent).toHaveClass("js-hidden");
    });

    // When a section is closed (testing: toggleState, setExpandedState)
    it("has a an aria-expanded attribute and the value is false", function () {
      var $subsectionButton = $element.find('.subsection__title button:first');
      var $subsectionContent = $element.find('.subsection__content');
      $subsectionButton.click();
      expect($subsectionButton).toHaveAttr('aria-expanded','true');
      $subsectionButton.click();
      expect($subsectionButton).toHaveAttr('aria-expanded','false');
    });

    it("has its state removed in session storage", function () {
      var GOVUKServiceManualTopic = "GOVUK_service_manual_agile_delivery";

      var $closedSubsections = $element.find('.subsection');
      var subsectionClosedContentId = $closedSubsections.find('.subsection__content').attr('id');
      sessionStorage.removeItem(GOVUKServiceManualTopic+subsectionClosedContentId , 'Opened');
      var removedItem = sessionStorage.getItem(GOVUKServiceManualTopic+subsectionClosedContentId);
      expect(removedItem).not.toExist();
    });

  });

});
