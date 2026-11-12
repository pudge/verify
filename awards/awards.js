function populateAward(id, data) {
  var div = $('#' + id)
  for (const el of data.toReversed()) {
    div.append(
      '<div class="award"><span class="award_date">' + el.date +
      '</span> — <span class="award_name"><a href="' + el.link + '">' + el.name +
      '</a></span>, <span class="award_desc">' + el.desc +
      '</span></div>'
    )
  }
}


$(document).ready(function () {
  populateAward('nandy', nandy)
  populateAward('verfy', verfy)
});
