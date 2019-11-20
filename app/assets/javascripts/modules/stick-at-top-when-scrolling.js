/*
  Stick a left hand menu to the screen when scrolling, stops at the bottom of the parent element
  attach data-module="sticky-element-wrapper" to the parent element that wraps both the menu and content
  attach data-sticky-wrapper-element to the child element that will be sticky
*/
(function (Modules, root) {
  'use strict';

  var $ = root.$;
  var $window = $(root);

  Modules.StickyElementWrapper = function () {
    var self = this;

    self.sticky = {
      _hasScrolled: false,
      _scrollTimeout: false,
      _hasResized: false,
      _resizeTimeout: false
    }

    self.start = function ($el) {
      self.el = $el
      self.stickyEl = $el.find('[data-sticky-wrapper-element]')

      if (self.stickyEl.length) {
        self.el.css('position', 'relative')
        self.elHeight = $el.height()
        self.elOffset = self.getElementOffset($el)
        self.windowDimensions = self.getWindowDimensions()

        if (self.sticky._scrollTimeout === false) {
          $window.scroll(self.onScroll)
          self.sticky._scrollTimeout = setInterval(self.checkScroll, 50)
        }

        if (self.sticky._resizeTimeout === false) {
          $window.resize(self.onResize)
          self.sticky._resizeTimeout = setInterval(self.checkResize, 50)
        }
      }
    }

    self.getWindowDimensions = function getWindowDimensions () {
      return {
        height: $window.height(),
        width: $window.width()
      }
    }

    self.getWindowPositions = function getWindowPositions () {
      return {
        scrollTop: $window.scrollTop()
      }
    }

    self.getElementOffset = function (el) {
      return el.offset().top
    }

    self.onScroll = function () {
      self.sticky._hasScrolled = true
    }

    self.onResize = function () {
      self.sticky._hasResized = true
    }

    self.removeStickyClass = function() {
      self.stickyEl.removeClass('sticky-wrapper--fixed').removeClass('sticky-wrapper--bottom')
    }

    self.stick = function () {
      if (!self.stickyEl.hasClass('sticky-wrapper--fixed')) {
        var width = self.stickyEl.width()
        self.stickyEl.css('width', width + 'px')
        self.addShim()
        self.removeStickyClass()
        self.stickyEl.addClass('sticky-wrapper--fixed')
      }
    }

    self.release = function (override = false) {
      if (self.stickyEl.hasClass('sticky-wrapper--fixed') || override) {
        self.removeStickyClass()
        self.stickyEl.css('width', '')
        self.stickyEl.siblings('.sticky-wrapper__shim').remove()
      }
    }

    self.stickToBottom = function () {
      if (self.stickyEl.hasClass('sticky-wrapper--fixed')) {
        self.removeStickyClass()
        self.stickyEl.addClass('sticky-wrapper--bottom')
      }
    }

    // shim is needed to prevent the right hand content jumping left after the fixed element leaves
    self.addShim = function () {
      if (!self.el.find('.sticky-wrapper__shim').length) {
        self.stickyEl.before('<div class="sticky-wrapper__shim"></div>')
      }
    }

    self.checkScroll = function () {
      if (self.sticky._hasScrolled === true) {
        self.sticky._hasScrolled = false

        if (self.windowDimensions.width <= 768) {
          self.release()
        } else {
          var windowVerticalPosition = self.getWindowPositions().scrollTop
          var bottomOfWrapper = self.elOffset + self.el.height() - self.stickyEl.height()
          var stop = self.elOffset + self.el.height() - self.windowDimensions.height

          var atTheTop = windowVerticalPosition < self.elOffset
          var inTheMiddle = windowVerticalPosition > self.elOffset && windowVerticalPosition < bottomOfWrapper
          var atTheBottom = windowVerticalPosition > stop

          if (atTheTop) {
            self.release()
          }
          else if (inTheMiddle) {
            self.stick()
          }
          else if (atTheBottom) {
            self.stickToBottom()
          }
        }
      }
    }

    self.checkResize = function () {
      if (self.sticky._hasResized === true) {
        self.sticky._hasResized = false

        self.windowDimensions = self.getWindowDimensions()

        var $elParent = self.stickyEl.parent('div')
        var elParentWidth = $elParent.width()
        self.addShim()
        self.stickyEl.css('width', elParentWidth)

        if (self.windowDimensions.width <= 768) {
          self.release(true)
        }
      }
    }
  }
})(window.GOVUK.Modules, window);
