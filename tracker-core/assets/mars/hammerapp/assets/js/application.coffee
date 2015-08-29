$ ->
  $('.widget-link-remove').on "click", ->
    $(this).closest('.widget').slideUp("fast")
    return false
  $('.is-dropdown-menu').on "click", ->
    $(this).next("ul").slideToggle 'fast', ->
      $(this).closest("li").toggleClass('active')
    return false