$(function(){
  function buildHTML(message){
    if ( message.image ) {
      let html =
       `<div class="MessageBox" data-message-id=${message.id}>
         <div class="main_chat__center__messages_list">
          <div class="main_chat__center__messages_list__info">
            <div class="main_chat__center__messages_list__info__name">
              ${message.user_name}
            </div>
            <div class="main_chat__center__messages_list__info__date">
              ${message.created_at}
            </div>
          </div>
          <div class="main_chat__center__messages_list__message">
            <p class="main_chat__center__messages_list__message__contents">
              ${message.content}
            </p>
            <img class="Message__image" src="${message.image}">
          </div>
        </div>`
      return html;
    } else {
      let html =
      `<div class="MessageBox" data-message-id=${message.id}>
        <div class="main_chat__center__messages_list">
         <div class="main_chat__center__messages_list__info">
          <div class="main_chat__center__messages_list__info__name">
            ${message.user_name}
          </div>
          <div class="main_chat__center__messages_list__info__date">
            ${message.created_at}
          </div>
        </div>
        <div class="main_chat__center__messages_list__message">
          <p class="main_chat__center__messages_list__message__contents">
            ${message.content}
          </p>
        </div>
      </div>`
      return html;
    };
  }

  $('.new_message').on('submit', function(e){
    e.preventDefault();
    let formData = new FormData(this);
    let url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      let html = buildHTML(data);
      $('.main_chat__center').append(html);
      $('.main_chat__center').animate({ scrollTop: $('.main_chat__center')[0].scrollHeight});      
      $('form')[0].reset();
      $(".main_chat__bottom__form__submit_btn").prop("disabled", false)
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
    });
  });

  let reloadMessages = function() {
    //カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージのidを取得
    let last_message_id = $('.main_chat__center__messages:last').data("message-id");
    $.ajax({
      //ルーティングで設定した通り/groups/id番号/api/messagesとなるよう文字列を書く
      url: "api/messages",
      //ルーティングで設定した通りhttpメソッドをgetに指定
      type: 'get',
      dataType: 'json',
      //dataオプションでリクエストに値を含める
      data: {id: last_message_id}
    })
    .done(function(messages) {
      // 更新するメッセージがなかった場合は.doneの後の処理が動かないようにする
      if (messages.length !== 0) {
        //追加するHTMLの入れ物を作る
        let insertHTML = '';
        //配列messagesの中身一つ一つを取り出し、HTMLに変換したものを入れ物に足し合わせる
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)
        });
        //メッセージが入ったHTMLに、入れ物ごと追加
        $('.main_chat__center').append(insertHTML);
        $('.main_chat__center').animate({ scrollTop: $('.main_chat__center')[0].scrollHeight});
      }
    })
    .fail(function() {
      alert('error');
    });
  };
  setInterval(reloadMessages, 7000);
});