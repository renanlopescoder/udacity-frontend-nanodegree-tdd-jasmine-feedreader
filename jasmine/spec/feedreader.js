/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */

$(function() {

    /**
     * Feed Tests
     */

    describe('RSS Feeds', function() {

        it('Feeds are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /**
         * Test to check if the URLs of the Feeds have been defined
         */

        it('Feed url defined', function () {
            allFeeds.forEach(function (feed){
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            });
        });

        /**
         * Test to check if Feeds names have been defined
         */

        it('Feed name defined', function () {
            allFeeds.forEach(function (feed){
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            });
        });
        
    });

    /**
     * Menu Tests
     */

    describe('The menu', function() {

        let body = $('body');

        /**
         * Test to check if the menu is hidden after loading by default
         */

        it('Hidden menu', function () {
            expect(body.hasClass('menu-hidden')).toBe(true);
        });

        /**
         * Test to check how the menu button works
         */
        
        it('menu button', function () {
            let menuIcon = $('.menu-icon-link');

            menuIcon.click();
            expect(body.hasClass('menu-hidden')).toBe(false);

            menuIcon.click();
            expect(body.hasClass('menu-hidden')).toBe(true);
        });
    });

    /**
     * Test to check feed loading
     */

    describe('Initial Entries', function() {

        beforeEach(function(done){
            loadFeed(0, function() {
                done();
            });
        });

        it('Has at least one entry after loadFeed()', function (done) {
            let feedEntry = $('.feed .entry').length;
            expect(feedEntry).not.toBe(0);
            done();
        });
    });

    /**
     * Test to verify that feeds were actually loaded
     */

    describe('New feed selection', function() {
        let initFeed;
        beforeEach(function(done){
            loadFeed(0, function() {
                initFeed = document.querySelector('.feed').innerHTML;
                loadFeed(1, function(){
                    done();
                });
            });
        });

        it('Loaded content', function () {
            let newFeedSelection = document.querySelector('.feed').innerHTML;
            expect(initFeed).not.toBe(newFeedSelection);
        });
    });
}());
