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

  function scrollBottom(){
    var target = $('.message').last();
    var position = target.offset().top + $('.messages').scrollTop();  // スクロール分座標がずれてしまうのを防ぐ
    $('.messages').animate({scrollTop:position}, 300, 'swing');
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
    .done(function(data){
      var html = buildHTML(data);
      $('.messages').append(html)
      $('#message_content').val('');
      $('#file-image').val('');
    .fail(function(){
      alert('メッセージの送信に失敗しました');
    })
    .always(function(data){
      $('.form-btn__btn').prop('disabled', false);
    })
  })
});
