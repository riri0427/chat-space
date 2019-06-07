$(function() {
  function appendUser(user) {
    var html = `<div class="chat-group-user clearfix with-add-btn">
                  <p class="chat-group-user__name">${user.name}</p>
                  <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
                </div>`
    $("#user-search-result").append(html);
  }

  function appendGroupMember(_this) {
    var html = `<div class='chat-group-user clearfix js-chat-member with-remove-btn' id='chat-group-user-8'>
                  <input name='group[user_ids][]' type='hidden' value='${$(_this).data('user-id')}'>
                  <p class='chat-group-user__name'>${$(_this).data('user-name')}</p>
                  <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</div>
                </div>`
    $("#group-member-list").append(html);
  }

  function appendErrMsgToHTML(msg) {
    var html = `<div class="chat-group-user clearfix with-add-btn">
                  <p class="chat-group-user__name">${msg}</p>
                </div>`
    $("#user-search-result").append(html);
  }

  $('.user-search-remove').on('click', function(){
    $(this).parent().remove();
  });

  $("#user-search-field").on("keyup", function() {
    var input = $("#user-search-field").val();
    var href = window.location.href
    
    $.ajax({
      type: 'GET',
      url: href,
      data: { keyword: input },
      dataType: 'json'
    })
  });
});
