describe("Stick to top when scrolling", function () {
  'use strict'

  var module
  var $element
  var $stickyElement

  beforeEach(function () {
    module = new GOVUK.Modules.StickAtTopWhenScrolling()

    $stickyElement = $('<div data-sticky-wrapper-element style="height: 100px; width: 50px;"></div>')
    $element = $('<div data-module="sticky-element-wrapper" style="width: 800px; height: 2000px;">').append($stickyElement)

    $('body').append($element)
  })

  afterEach(function () {
    //$element.remove()
    $(document).off()
  })

  /*
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

  describe('when starting the module', function () {
    /*
    it('should do nothing if no sticky child is found', function () {
      $element.find('[data-sticky-wrapper-element]').remove()
      module.start($element)
      expect($element.attr('style')).not.toContain('position')
      expect($element.attr('style')).not.toContain('relative')
    })

    it('should positive relative the parent element', function () {
      module.start($element)
      expect($element.attr('style')).toContain('position')
      expect($element.attr('style')).toContain('relative')
    })

    it('should position the sticky element at the top if the page is at the top', function () {
      module.start($element)
      expect($stickyElement.hasClass('sticky-wrapper--fixed')).toBe(false)
      expect($stickyElement.hasClass('sticky-wrapper--bottom')).toBe(false)
    })
    */

    it('should make the sticky element fixed if the page is part way down', function () {
      module.getWindowPositions = function () {
        return 100
      }
      module.getWindowDimensions = function () {
        return {
          height: 500,
          width: 1000
        }
      }
      module.start($element)
      module.sticky._hasScrolled = true
      module.checkScroll()
      console.log('in test:', $element.get(0).outerHTML)
      expect($stickyElement.hasClass('sticky-wrapper--fixed')).toBe(true)
      expect($stickyElement.hasClass('sticky-wrapper--bottom')).toBe(false)
    })
  })

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
});
