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

  $("#user-search-field").on("keyup", function() {
    var input = $("#user-search-field").val();
    
    $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: input },
      dataType: 'json'
    })
    .done(function(users) {
      $(".with-add-btn").remove();  // 文字が入力されるたびに表示されている名前を一度リセットする
      if (users.length !== 0) {
        users.forEach(function(user){
          appendUser(user);
          if (input == "") {
            $(".with-add-btn").remove();  // フォームが空になった時に名前を表示しないようにする
          }
          $(".user-search-add").off('click')  // clickイベントが2回実行されてしまうのを防ぐ
          $(".user-search-add").on('click', function(){
            appendGroupMember(this);
            $(this).parent().remove();
          });
          $("#group-member-list").on('click', '.user-search-remove', function(){
              $(this).parent().remove();
          });
        });
      } else {
        appendErrMsgToHTML("一致するユーザーはいません");
      }
    })
    .fail(function() {
      alert('ユーザー検索に失敗しました');
    });
  });
});
