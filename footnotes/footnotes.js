var caretClosed = 'fa-caret-right'
var caretOpened = 'fa-caret-down'
var caretStart = '<i class="fa-solid ' + caretClosed + '"></i>'

function chapterToggle(el, open) {
  children = el.parentElement.children
  var caret = $(children[0].firstChild)
  var isOpen = caret.hasClass('fa-caret-down')
  if (open === true || open === false) {
    isOpen = open
  }
  for (const child of children) {
    if ($(child).hasClass('page_num')) {
      if (isOpen) {
        $(child).hide()
      }
      else {
        $(child).show()
      }
    }
  }
  if (isOpen) {
    caret.addClass(caretClosed).removeClass(caretOpened)
  }
  else {
    caret.addClass(caretOpened).removeClass(caretClosed)
  }
  return(isOpen)
}

function doTable() {
  var div = $('div#footnotes')
  var chapters = {}
  for (const x of footnotes) {
    var key = x.chapter_number ? x.chapter_number + '. ' + x.chapter_name : x.chapter_name
    chapters[key] ||= {}

    var page_num = x.page_number.match('[a-z]') ? '' : x.page_number
    chapters[key][page_num] ||= []

    var id_key = x.chapter_number || x.chapter_name
    var id_matches = x.chapter_name.match('^Part ([ivxIVX]+)')
    if (id_matches && id_matches.length !== 0) {
      id_key = id_matches[1]
    }
    var record = $('<div class="footnote" id="footnote_' + id_key + '_' + x.footnote_number + '">')

    var chapter_name = x.chapter_name
    if (chapter_name.match('^RFK')) {
      chapter_name = 'RFK Jr. and the Election'
    }

    var link_text = x.link
    var link_icon = ''
    var wp_matches = x.link.match('^https://en.wikipedia.org/wiki/(.+)$')
    if (wp_matches && wp_matches.length !== 0) {
      link_icon = '<img class="logo_wp" src="images/services/wikipedia.webp">'
      link_text = decodeURI(wp_matches[1]).replaceAll('_', ' ')
    }

    var x_matches = x.link.match('^https://x.com/([^/]+)/status/(.+)$')
    if (x_matches && x_matches.length !== 0) {
      link_icon = '<img class="logo_x" src="images/services/x.webp">'
      link_text = '@' + x_matches[1] + ' / ' + x_matches[2]
    }

    var footnote = ''
    var link_url = x.link

    var link = '<a href="' + link_url + '">' + (x.article_name || x.publication_name) + '</a>'
    if (x.type == 'book') {
      footnote = '<em>' + link + '</em>'
      if (x.author_names) {
        footnote = x.author_names + ', ' + footnote
      }
      if (x.publication_name || x.date) {
        var extra = ' ('
        if (x.publication_name) {
          extra += x.publication_name
        }
        if (x.date) {
          if (x.publication_name) {
            extra += ', '
          }
          extra += x.date
        }
        footnote += extra + ')'
      }
    }
    else {
      if (x.article_name || x.publication_name) {
        if (x.publication_name || x.date) {
          footnote = '“' + link + ',”'
          if (x.publication_name) {
            footnote = footnote + ' <em>' + x.publication_name + '</em>'
          }
          if (x.date) {
            if (x.publication_name && x.date) {
              footnote += ','
            }
            footnote += ' ' + x.date
          }
        }
        else {
          footnote = '“' + link + '”'
        }
        if (x.author_names) {
          footnote = x.author_names + ', ' + footnote
        }
      }
      else {
        if (link_icon) {
          footnote = link_icon + '&nbsp;<a href="' + link_url + '">' + link_text + '</a>'
        }
        else {
          footnote = '<em><a href="' + link_url + '">' + link_text + '</a></em>'
        }
        if (x.date) {
          footnote += ', ' + x.date
        }
      }
    }

    var archive = ''
    if (x.archive_link) {
      archive = '<a href="' + x.archive_link + '" class="archive">↺</a>'
    }

    var text = x.footnote_number + '.&nbsp;' + footnote + '&nbsp;' + archive
    record.append(text)
    chapters[key][page_num].push(record)
  }

  for (const [key, pages] of Object.entries(chapters)) {
    var chapter = $('<div class="chapter">')
      .html('<div class="chapter_click">' + caretStart + '&nbsp;&nbsp;' + key + '</div>')
    for (const [page_num, fns] of Object.entries(pages)) {
      var page = $('<div class="page_num">')
      if (page_num !== '') {
        page.text('p. ' + page_num)
      }
      for (const fn of fns) {
        page.append(fn)
      }
      chapter.append(page)
    }
    div.append(chapter)
  }

  const element = document.getElementById("myElement");

  $('div.chapter_click').click((event) => {
    var isOpen = chapterToggle(event.currentTarget)
    if (event.altKey) {
      for (const el of $('div.chapter_click')) {
        chapterToggle(el, isOpen)
      }
      event.currentTarget.scrollIntoView()
    }
  });

  $('#footnote_count').html(footnotes.length + ' ')
}

onclick="chapterToggle(this)"

$(document).ready(function () {
  setLastMod('#last_modified')
  doTable()
});
