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
    describe('RSS Feeds', function() {

        it('Feeds are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        it('Feed url defined', function () {
            let urlDefined;
            for(let i = 0; i < allFeeds.length ; i++){
                if(allFeeds[i].url == '' || allFeeds[i].url == undefined) {
                    urlDefined = false
                    break;
                }
                else {
                    urlDefined = true;
                }
            };
            expect(urlDefined).toBe(true);
        });

        it('Feed name defined', function () {
            let nameDefined;
            for(let i = 0; i < allFeeds.length ; i++){
                if(allFeeds[i].name == '' || allFeeds[i].name == undefined) {
                    nameDefined = false;
                    break;
                } else {
                    nameDefined = true;
                }
            };
            expect(nameDefined).toBe(true);
        });
        
    });

    describe('The menu', function() {

        let body = $('body');

        it('Hidden menu', function () {
            expect(body.hasClass('menu-hidden')).toBe(true);
        });

        it('menu button', function () {
            let menuIcon = $('.menu-icon-link');

            menuIcon.click();
            expect(body.hasClass('menu-hidden')).toBe(false);

            menuIcon.click();
            expect(body.hasClass('menu-hidden')).toBe(true);
        });
    });

    describe('Initial Entries', function() {

        beforeEach(function(done){
            loadFeed(0, function() {
                done();
            });
        });

        it('Has at least one entry after loadFeed()', function (done) {
            let feedEntry = $('.entry').length;
            expect(feedEntry).not.toBe(0);
            done();
        });
    });

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

        it('Loaded content', function (done) {
            let newFeedSelection = document.querySelector('.feed').innerHTML;
            expect(initFeed).not.toBe(newFeedSelection);
            done();
        });
    });
}());
