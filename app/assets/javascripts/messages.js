$(function() {
  var buildHTML = function(message) {
    var html = `<div class="message" data-id="${message.id}">
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
      $('.new-message')[0].reset();
      scrollBottom();
    })
    .fail(function(){
      alert('メッセージの送信に失敗しました');
    })
    .always(function(data){
      $('.form-btn__btn').prop('disabled', false);
    })
  })

  var reloadMessages = function() {
    last_message_id = $('.message').last().data('id');
    group_id = $('.current_group_id').val();
    href = '/groups/' + group_id + '/api' + '/messages'
    $.ajax({
      url: href,
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      if (messages.length != 0) {
        var insertHTML = '';
        messages.forEach(function(message) {
          if (message == messages[0]) {
            newMessagesTop = message.id;
            insertHTML = buildHTML(message);
            $('.messages').append(insertHTML);
          } else {
            insertHTML = buildHTML(message);
            $('.messages').append(insertHTML);
          }
        });
        var target = $("[data-id =" + newMessagesTop + "]");
        if (target.length == 1){
          scrollBottom(target);
        }
      }
      console.log('success');
    })
    .fail(function() {
      console.log('error');
    })
  }
  reloadMessages();
});
