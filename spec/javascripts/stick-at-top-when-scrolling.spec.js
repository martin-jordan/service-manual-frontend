/* global describe it expect beforeEach afterEach */

describe('stick-at-top-when-scrolling', function () {
  'use strict'

  var GOVUK = window.GOVUK;
  var $ = window.$;
  var instance;

  var $stickyElement
  var $stickyWrapper

  // beforeEach(function () {
  //   $stickyElement = $('<div data-module="sticky-element-wrapper"></div>')
  //   $stickyWrapper = $('<div>').append($stickyElement)

  //   $('body').append($stickyWrapper)
  // })

  // afterEach(function () {
  //   $stickyWrapper.remove()
  // })

  beforeEach(function () {
    $stickyElement = $('<div data-sticky-wrapper-element></div>')
    $stickyWrapper = $('<div data-module="sticky-element-wrapper">').append($stickyElement)

    $('body').append($stickyWrapper)
  })

  afterEach(function () {
    $stickyWrapper.remove()
  })

  it ('does something', function () {
    expect(1).toBe(1)
  })

  /*
    when starting
      it should do nothing if no child
      it should position relative the parent
      it should position the element appropriately given the scroll position
    when scrolling
      it should stop at the top
      it should fix in the middle
      it should stop at the bottom

    when stick is called
      it should add fixed class on stick
      it should insert shim when sticking the element
      it should
    when stick to bottom is called
      it should add stick to bottom class
      it should
    when release is called
      it should remove all classes
      it should remove the shim
    when resizing above 768 // FIXME is this the right size? It's hard coded
      it should update the width of the element
      it should check to see if it should stick or not
    when resizing from above 768 to below it
      it should stick the element?
    when resizing below 768
      it should do nothing
  */

/*
  describe('when stick is called', function () {
    it('should add fixed class on stick', function () {
      expect(!$stickyElement.hasClass('content-fixed')).toBe(true)
      GOVUK.stickAtTopWhenScrolling.stick($stickyElement)
      expect($stickyElement.hasClass('content-fixed')).toBe(true)
    })

    it('should insert shim when sticking the element', function () {
      expect($('.shim').length).toBe(0)
      GOVUK.stickAtTopWhenScrolling.stick($stickyElement)
      expect($('.shim').length).toBe(1)
    })

    it('should insert shim with minimum height', function () {
      GOVUK.stickAtTopWhenScrolling.stick($stickyElement)
      expect($('.shim').height()).toBe(1)
    })
  })

  describe('when release is called', function () {
    it('should remove fixed class', function () {
      $stickyElement.addClass('content-fixed')
      GOVUK.stickAtTopWhenScrolling.release($stickyElement)
      expect($stickyElement.hasClass('content-fixed')).toBe(false)
    })

    it('should remove the shim', function () {
      $stickyElement = $('<div class="stick-at-top-when-scrolling content-fixed"></div>')
      GOVUK.stickAtTopWhenScrolling.release($stickyElement)
      expect($('.shim').length).toBe(0)
    })
  })

  describe('for larger screens (>768px)', function () {
    beforeEach(function () {
      GOVUK.stickAtTopWhenScrolling.getWindowPositions = function () {
        return {
          scrollTop: 300
        }
      }
      GOVUK.stickAtTopWhenScrolling.getElementOffset = function () {
        return {
          top: 300
        }
      }
      GOVUK.stickAtTopWhenScrolling.getWindowDimensions = function () {
        return {
          height: 768,
          width: 769
        }
      }
      GOVUK.stickAtTopWhenScrolling.$els = $stickyElement
      GOVUK.stickAtTopWhenScrolling._hasScrolled = true
      GOVUK.stickAtTopWhenScrolling.checkScroll()
    })

    it('should stick, if the scroll position is past the element position', function () {
      expect($stickyElement.hasClass('content-fixed')).toBe(true)
    })

    it('should check the width of the parent, and make the width of the element and the shim the same on resize', function () {
      var $stickyResizeElement = $('<div class="stick-at-top-when-scrolling js-sticky-resize"></div>')
      var $stickyResizeWrapper = $('<div class="column-third" style="width:300px;">').append($stickyResizeElement)
      $('body').append($stickyResizeWrapper)

      GOVUK.stickAtTopWhenScrolling.$els = $stickyResizeElement
      GOVUK.stickAtTopWhenScrolling._hasResized = true
      GOVUK.stickAtTopWhenScrolling.checkResize()

      var stickyElementParentWidth = $stickyResizeElement.parent('div').width()
      expect(stickyElementParentWidth).toBe(300)

      var stickyElementWidth = $stickyResizeElement.width()
      expect(stickyElementWidth).toBe(300)

      var stickElementShimWidth = $('.shim').width()
      expect(stickElementShimWidth).toBe(300)
    })

    it('should unstick, if the scroll position is less than the point at which scrolling started', function () {
      GOVUK.stickAtTopWhenScrolling.getWindowPositions = function () {
        return {
          scrollTop: 0
        }
      }
      GOVUK.stickAtTopWhenScrolling.$els = $stickyElement
      GOVUK.stickAtTopWhenScrolling._hasScrolled = true
      GOVUK.stickAtTopWhenScrolling.checkScroll()
      expect($stickyElement.hasClass('content-fixed')).toBe(false)
    })
  })

  describe('for smaller screens (<=768px)', function () {
    beforeEach(function () {
      GOVUK.stickAtTopWhenScrolling.getWindowDimensions = function () {
        return {
          height: 768,
          width: 767
        }
      }
      GOVUK.stickAtTopWhenScrolling.getElementOffset = function () {
        return {
          top: 300
        }
      }
      GOVUK.stickAtTopWhenScrolling.$els = $stickyElement
      GOVUK.stickAtTopWhenScrolling._hasScrolled = true
      GOVUK.stickAtTopWhenScrolling.checkScroll()
    })

    it('should unstick the element', function () {
      expect($stickyElement.hasClass('content-fixed')).toBe(false)
    })
  })
*/
})
