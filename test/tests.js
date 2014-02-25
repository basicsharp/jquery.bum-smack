/* global describe: true, it: true, sinon: true, chai: true expect: true */
describe('Bum smack', function () {

  // Helpers
  var
      // Returns a scrolltop value that's a percentage distance
      // away from the bottom of the element
      getPercentageScrollTop = function ($elem, percentageDistance) {
        var scrollHeight = $elem[0].scrollHeight,
            innerHeight = $elem.innerHeight(),
            offset = scrollHeight - innerHeight,
            result = offset * percentageDistance;

        return result;
      },

      // Returns a scrolltop value that's a pixel distance
      // away from the bottom of the element
      getPixelScrollTop = function($elem, pixelDistance) {
        var scrollHeight = $elem[0].scrollHeight,
            innerHeight = $elem.innerHeight(),
            offset = scrollHeight - innerHeight,
            result = offset - parseInt(pixelDistance, 10);

        return result;
      };

  it('detects a bottom smack when you reach 100% of the bottom (default)', function (done) {
    $('.case1').smack().done(done);
    $('.case1').scrollTop($('.case1')[0].scrollHeight);

    $('.case2').smack({ edge: 'bottom' }).done(done);
    $('.case2').scrollTop($('.case2')[0].scrollHeight);
  });

  it('detects a top smack when you reach 100% of the top when the edge is set', function (done) {
    // Case 1 is at the bottom from the previous test
    $('.case1').smack({ edge: 'top' }).done(done);
    $('.case1').scrollTop(0);
  });

  it('does not smack the top edge if the element was already at the top', function () {
    var cb = sinon.spy();

    $('.case1').scrollTop(0);
    $('.case1').smack({ edge: 'top' }).done(cb);
    chai.expect(cb.called).to.equal(false);
  });

  // Reset element's scrollTop to top
  // Bind to 50px from bottom
  // Smack the bottom
  //
  it('remembers the previous settings of the supplied edge');

  // Manually bind a scroll.smack event to the element with a callback
  // Do a smack bind on that element
  // Scroll
  // Expect the first (manual) binding to never be called
  it('only has one active smack binding', function () {
    var cb1 = sinon.spy();

    $('.case1').scrollTop(0);
    $('.case1').on('scroll.smack', cb1);
    $('.case1').smack({ threshold: 0.8 }).done();
    $('.case1').scrollTop(getPercentageScrollTop($('.case1'), 0.8));
    chai.expect(cb1.called).to.equal(false);
  });

  // Bind to the bottom edge
  // Bind to the top edge
  // Smack the bottom (expect done)
  // Smack the top (expect done)
  it('allows for binding to both edges with different promise callbacks');

  it.skip('smacks either edge if "either" is supplied as the edge', function (done) {
    // Test that it smacks the top edge
    $('.case2').scrollTop(getPercentageScrollTop($('.case2'), 0.1));
    $('.case2').smack({ edge: 'either' }).done(done);
    $('.case2').scrollTop(0);

    // Test that it smacks the bottom edge
    $('.case2').scrollTop(getPercentageScrollTop($('.case2'), 0.9));
    $('.case2').smack({ edge: 'either' }).done(done);
    $('.case2').scrollTop(getPercentageScrollTop($('.case2'), 1));
  });

  it('smacks a percentage threshold away from the bottom', function (done) {
    $('.case3').smack({ threshold: 0.8 }).done(done);
    $('.case3').scrollTop(getPercentageScrollTop($('.case3'), 0.8));
  });

  it.skip('smacks a percentage threshold away from the top', function (done) {
    // Reset case 3 to the bottom
    $('.case3').scrollTop($('.case3')[0].scrollHeight);

    $('.case3').smack({ edge: 'top', threshold: 0.2 }).done(done);
    $('.case3').scrollTop(getPercentageScrollTop($('.case3'), 0.2));
  });

  it('smacks a pixel distance away from the bottom', function (done) {
    $('.case4').smack({ threshold: '50px' }).done(done);
    $('.case4').scrollTop(getPixelScrollTop($('.case4'), 50));
  });

  it.skip('smacks a pixel distance away from the top', function (done) {
    $('.case4').scrollTop(getPixelScrollTop($('.case4'), 100));
    $('.case4').smack({ edge: 'top', threshold: '50px' }).done(done);
    $('.case4').scrollTop(getPixelScrollTop($('.case4'), 50));
  });

  it('smacks the bottom of the page', function (done) {
    $(window).smack().done(function () {
      done();
      $(window).scrollTop(0);
    });
    $(window).scrollTop($(document).height());
  });

});