'use strict';
$(document).ready(function() {
  var $wrap = $(".wrapper"),
      pages = $(".page").length,
      scrolling = false,
      currentPage = 1,
      $navPanel = $(".nav-panel"),
      $scrollBtn = $(".scroll-btn"),
      $navBtn = $(".nav-btn");

  // Handle hash in URL for direct navigation
  function handleHash() {
    var hash = window.location.hash;
    if (hash) {
      var targetPage;
      switch(hash) {
        case '#boom-branding':
          targetPage = 1;
          break;
        case '#dreams-digital':
          targetPage = 2;
          break;
        case '#super-social':
          targetPage = 3;
          break;
        case '#our-campaign':
          targetPage = 4;
          break;
        case '#photography-video':
          targetPage = 5;
          break;
      }
      if (targetPage) {
        scrolling = false; // Reset scrolling state
        currentPage = targetPage;
        manageClasses();
        // Force scroll to top
        window.scrollTo(0, 0);
      }
    }
  }

  // Handle hash changes
  setTimeout(handleHash, 100); // Handle hash after a slight delay on page load
  window.addEventListener('hashchange', function() {
    scrolling = false; // Reset scrolling state before handling hash
    handleHash();
  });

  /*****************************
  ***** NAVIGATE FUNCTIONS *****
  *****************************/
  function manageClasses() {
    // Remove all active page classes
    $wrap.removeClass('active-page1 active-page2 active-page3 active-page4 active-page5');
    // Add new active page class
    $wrap.addClass("active-page" + currentPage);
    // Update navigation buttons
    $navBtn.removeClass("active");
    $(".nav-btn.nav-page" + currentPage).addClass("active");
    // Handle panel visibility
    $navPanel.addClass("invisible");
    scrolling = true;
    setTimeout(function() {
      $navPanel.removeClass("invisible");
      scrolling = false;
    }, 500); // Reduced animation time
  }

  function navigateUp() {
    if (currentPage > 1 && !scrolling) {
      currentPage--;
      manageClasses();
    }
  }

  function navigateDown() {
    if (currentPage < pages && !scrolling) {
      currentPage++;
      manageClasses();
    }
  }

  /*********************
  ***** WHEEL EVENT *****
  *********************/
  $(document).on("wheel", function(e) {
    if (!scrolling) {
      e.preventDefault(); // Prevent default scrolling
      console.log('deltaY:', e.originalEvent.deltaY); // Log deltaY for debugging
      if (e.originalEvent.deltaY < 0) {
        console.log('Scrolling Up'); // Log action
        navigateUp(); // Scroll up
      } else { 
        console.log('Scrolling Down'); // Log action
        navigateDown(); // Scroll down
      }
    }
  });

  /**************************
  ***** RIGHT NAVIGATION ****
  **************************/
  /* NAV UP/DOWN BTN PAGE NAVIGATION */
  $(document).on("click", ".scroll-btn", function() {
    if ($(this).hasClass("up")) {
      navigateUp();
    } else {
      navigateDown();
    }
  });

  /* NAV CIRCLE DIRECT PAGE BTN */
  $(document).on("click", ".nav-btn:not(.active)", function() {
    if (!scrolling) {
      currentPage = parseInt($(this).attr("data-target"));
      manageClasses();
    }
  });

});