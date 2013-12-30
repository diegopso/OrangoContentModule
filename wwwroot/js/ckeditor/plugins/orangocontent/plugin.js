var currentEditor = null;
CKEDITOR.plugins.add('orangocontent',{
	init: function(editor){
		var modalImageHtml = '<div id="orango-content-image-upload-modal" class="modal hide fade">'+
								'<div class="modal-header">'+
									'<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>'+
									'<h3>Modal header</h3>'+
								'</div>'+
								'<div class="modal-body">'+
									'<form method="POST" action="'+ ROOT +'admin/content/imageUpload/" enctype="multipart/form-data">'+
										'<input type="file" name="Image" value="" />'+
									'</form>'+
								'</div>'+
								'<div class="modal-footer">'+
									'<a href="javascript:void(0);" class="btn" data-dismiss="modal">Cancelar</a>'+
									'<a href="javascript:void(0);" onclick="orangoContentImageUpload(this)" class="btn btn-primary">Enviar</a>'+
								'</div>'+
							'</div>';

		$(modalImageHtml).appendTo('body');

		editor.addCommand('orangoContentImageUpload',{
			exec : function(editor){    
				currentEditor = editor;
				$('#orango-content-image-upload-modal').modal('show');
			}
		});

		editor.ui.addButton('orangoContentImageUpload',{
			label: 'Enviar Imagem',
			command: 'orangoContentImageUpload',
			icon: this.path + 'img/image.png'
		});
	}
});

function orangoContentImageUpload(a)
{
	var modal = $(a).closest('#orango-content-image-upload-modal');
	modal.find('form').ajaxForm({
		success: function(data){
			if(data.d.path){
				currentEditor.insertElement(CKEDITOR.dom.element.createFromHtml('<img src="'+ data.d.path +'" />'));
			}else{
				alert(data.d.error);
			}
		},
		error: function(responseText){
			alert('Ocorreu um erro ao enviar sua imagem.');
		}
	}).submit();

	modal.modal('hide');
}