$(function() {
  function buildHTML(message){
    var html = `<div class="message">
                  <div class="upper-info">
                    <p class="upper-info__user">
                      ${message.name}
                    </p>
                    <p class="upper-info__date">
                      ${message.created_at}
                    </p>
                  </div>`
    var htmlContent = `<p class="message__text">
                        ${message.content}
                      </p>
                      </div>`
    var htmlImage = `<img class="message__text" src="${message.image}" alt="image">
                    </div>`
    if (message.image == null) {
      html = $(html).append(htmlContent)
      return html;
    } else if (message.content == "") {
      html = $(html).append(htmlImage)
      return html;
    } else {
      html = $(html).append(htmlContent + htmlImage)
      return html;
    }
  }
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var href = window.location.href
    $.ajax({
      url: href,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
  })
});
