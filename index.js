var existingEl

function closeOverlay() {
  const overlay = document.getElementById('overlay')
  const overlayImg = document.getElementById('overlay-img')
  const overlayCap = document.getElementById('overlay-caption')

  overlay.classList.remove('open')
  overlayImg.src = ''
  overlayImg.alt = ''
  $(overlayCap).text('')
}

function openOverlay(el) {
  const overlay = document.getElementById('overlay')
  const overlayImg = document.getElementById('overlay-img')
  const overlayCap = document.getElementById('overlay-caption')

  overlayImg.src = el.href
  var htmlStr = $(el).html()
  var textStr = $(el).text()
  if (htmlStr.match('<img')) {
    textStr = htmlStr = $(el).children().get(0).alt
  }

  $(overlayCap).html(htmlStr)
  overlayImg.alt = textStr
  overlay.classList.add('open')
  existingEl = el
}

function initOverlay() {
  document.addEventListener('click', (e) => {
    if (e.metaKey || e.ctrlKey || e.altKey || e.shiftKey) return
    const link = e.target.closest('a.pic')
    if (!link) return
    e.preventDefault()
    openOverlay(link)
  })

  overlay.addEventListener('click', () => {
    closeOverlay()
  })

  $(document).keydown(function(e) {
    if (e.key === 'Escape') {
      closeOverlay()
      return
    }
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      nextImage()
      return
    }
    if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      prevImage()
      return
    }
  })
}

function prevImage() { seqImage(-1) }
function nextImage() { seqImage(1) }
function seqImage(dir) {
  if (!existingEl) return

  const overlay = document.getElementById('overlay')
  if (!$(overlay).hasClass('open')) return

  const allImages = $('a.pic')
  const index = allImages.index(existingEl) + (dir === 1 ? 1 : -1)

  if (index >= allImages.length || index < 0) {
    closeOverlay()
  }
  else {
    openOverlay(allImages.get(index))
  }
}

$(document).ready(function () {
  setLastMod('#last_modified')
  initOverlay()
});
