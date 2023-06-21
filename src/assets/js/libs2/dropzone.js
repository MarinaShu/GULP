if ($('.input-file').length > 0) {

  var dt = new DataTransfer();

  $('.input-file input[type=file]').on('change', function () {
    let $files_list = $(this).closest('.input-file').next();
    $files_list.empty();

    for (var i = 0; i < this.files.length; i++) {
      let file = this.files.item(i);
      dt.items.add(file);

      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = function () {
        let new_file_input = '<div class="input-file-list-item">' +
          '<img class="input-file-list-img" src="' + reader.result + '">' +
          '<span class="input-file-list-name">' + file.name + '</span>' +
          '<a href="#" onclick="removeFilesItem(this); return false;" class="input-file-list-remove"></a>' +
          '</div>';
        $files_list.append(new_file_input);
      }
      $('.input-file').hide();
    };
    this.files = dt.files;
  });

  function removeFilesItem(target) {
    let name = $(target).prev().text();
    let input = $(target).closest('.input-file-row').find('input[type=file]');
    $(target).closest('.input-file-list-item').remove();
    for (let i = 0; i < dt.items.length; i++) {
      if (name === dt.items[i].getAsFile().name) {
        dt.items.remove(i);
      }
    }
    input[0].files = dt.files;
    $('.input-file').show();
  }



  let dropArea = document.querySelector('.input-file-row');

  ['dragenter', 'dragover'].forEach(eventName => {
    dropArea.addEventListener(eventName, highlight, false)
  });
  ['dragleave', 'drop'].forEach(eventName => {
    dropArea.addEventListener(eventName, unhighlight, false)
  });

  function highlight(e) {
    dropArea.classList.add('highlight')
  }
  function unhighlight(e) {
    dropArea.classList.remove('highlight')
  }


}