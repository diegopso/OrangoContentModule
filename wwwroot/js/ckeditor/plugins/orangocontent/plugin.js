var currentEditor = null;
var $orangoContentgallery = null;
CKEDITOR.plugins.add('orangocontent',{
	init: function(editor){
		editor.setData('');

		setTimeout(function(){
			var element = CKEDITOR.dom.element.createFromHtml('<div>' + $('#OriginalContent').html() + '</div>');
			editor.insertElement(element);
		}, 500);

		var modalImageHtml = '<div id="orango-content-image-upload-modal" class="modal hide fade">'+
								'<div class="modal-header">'+
									'<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>'+
									'<h3>Adicionar Imagem</h3>'+
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

		var modalGalleryHtml = '<div id="orango-content-gallery-upload-modal" class="modal hide fade">'+
								'<div class="modal-header">'+
									'<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>'+
									'<h3>Adicionar Galeria</h3>'+
								'</div>'+
								'<div class="modal-body">'+
									'<form method="POST" action="'+ ROOT +'admin/content/galleryUpload/" enctype="multipart/form-data">'+
										'<div id="orango-content-multiple-file-uploader-container">Enviar</div>'+
									'</form>'+
								'</div>'+
								'<div class="modal-footer">'+
									'<a href="javascript:void(0);" class="btn" data-dismiss="modal">Cancelar</a>'+
									'<a href="javascript:void(0);" onclick="orangoContentGallery(this)" data-dismiss="modal" class="btn btn-primary">Adicionar</a>'+
								'</div>'+
							'</div>';

		var modalTubeHtml = '<div id="orango-content-tube-modal" class="modal hide fade">'+
								'<div class="modal-header">'+
									'<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>'+
									'<h3>Adicionar Vídeo</h3>'+
								'</div>'+
								'<div class="modal-body">'+
									'<form>'+
										'<div class="row-fluid">'+
											'<div class="control-group span6">'+
												'<label class="control-label" for="OrangoContentTubeUrl">Url</label>'+
												'<div class="controls">'+
													'<input name="OrangoContentTubeUrl" id="OrangoContentTubeUrl" placeholder="http://www.youtube.com/watch?v=XXXXXXXXXXX" value="" type="text" class="span12">'+
												'</div>'+
											'</div>'+
											'<div class="control-group span3">'+
												'<label class="control-label" for="OrangoContentTubeWidth">Largura</label>'+
												'<div class="controls">'+
													'<input name="OrangoContentTubeWidth" id="OrangoContentTubeWidth" value="640" type="text" class="span12">'+
												'</div>'+
											'</div>'+
											'<div class="control-group span3">'+
												'<label class="control-label" for="OrangoContentTubeHeight">Altura</label>'+
												'<div class="controls">'+
													'<input name="OrangoContentTubeHeight" id="OrangoContentTubeHeight" value="390" type="text" class="span12">'+
												'</div>'+
											'</div>'+
										'</div>'+
									'</form>'+
								'</div>'+
								'<div class="modal-footer">'+
									'<a href="javascript:void(0);" class="btn" data-dismiss="modal">Cancelar</a>'+
									'<a href="javascript:void(0);" onclick="orangoContentTube(this)" data-dismiss="modal" class="btn btn-primary">Adicionar</a>'+
								'</div>'+
							'</div>';

		jQuery.validator.addMethod("youtube", function(url, element) {
	        var matches = /^https?:\/\/(?:www\.)?youtube.com\/watch\?(?=[^?]*v=\w+)(?:[^\s?]+)?$/.exec(url);
	        return matches != null;
	    }, "Informe uma url válida."); 

		$(modalImageHtml).appendTo('body');

		var gId = (Math.ceil(Math.random() * 100000)).toString();
		$orangoContentgallery = $('<div class="orango-content-gallery-container"></div>');
		$(modalGalleryHtml).appendTo('body')
		.find('#orango-content-multiple-file-uploader-container').uploadFile({
		    url: ROOT + 'admin/content/galleryUpload/' + gId,
		    dragDrop: true,
		    fileName: "Gallery",
		    allowedTypes:"jpg,png",	
		    returnType:"json",
			onSuccess:function(files,data,xhr)
		    {
		       if(data.d.error){
		       		alert(data.d.error);
		       }else{
		       		$orangoContentgallery.append('<a class="orango-content-gallery" rel="'+ gId +'" href="'+ data.d.path +'"><img src="'+ data.d.miniaturePath +'" alt=""/></a>');
		       }
		    },
		});

		$(modalTubeHtml).appendTo('body').find('form').validate({
			rules: {
				OrangoContentTubeUrl: {
					required: true,
					youtube: true
				},
				OrangoContentTubeWidth: {
					required: true,
					number: true
				},
				OrangoContentTubeHeight: {
					required: true,
					number: true
				}
			},
			messages: {
				OrangoContentTubeUrl: {
					required: 'Informe uma url.',
					youtube: 'Informe uma url válida.'
				},
				OrangoContentTubeWidth: {
					required: 'Informe uma largura.',
					number: 'A largura deve ser um número inteiro.'
				},
				OrangoContentTubeHeight: {
					required: 'Informe uma altura.',
					number: 'A altura deve ser um número inteiro.'
				}
			}
		});

		editor.addCommand('orangoContentImageUpload',{
			exec : function(editor){    
				currentEditor = editor;
				$('#orango-content-image-upload-modal').modal('show');
			}
		});

		editor.addCommand('orangoContentTube',{
			exec : function(editor){    
				currentEditor = editor;
				$('#orango-content-tube-modal').modal('show');
			}
		});

		editor.addCommand('orangoContentGalleryUpload',{
			exec : function(editor){    
				currentEditor = editor;
				$('#orango-content-gallery-upload-modal').modal('show');
			}
		});

		editor.ui.addButton('orangoContentImageUpload',{
			label: 'Adicionar Imagem',
			command: 'orangoContentImageUpload',
			icon: this.path + 'img/image.png'
		});

		editor.ui.addButton('orangoContentTube',{
			label: 'Adicionar Vídeo',
			command: 'orangoContentTube',
			icon: this.path + 'img/tube.png'
		});

		editor.ui.addButton('orangoContentGalleryUpload',{
			label: 'Adicionar Galeria',
			command: 'orangoContentGalleryUpload',
			icon: this.path + 'img/gallery.png'
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

function orangoContentTube(a)
{
	var modal = $(a).closest('.modal');
	
	var url = modal.find('#OrangoContentTubeUrl').val();
	var video = /v=\w+&?/.exec(url)[0].replace('v=', '');
	var w = modal.find('#OrangoContentTubeWidth').val();
	var h = modal.find('#OrangoContentTubeHeight').val();

	var element = CKEDITOR.dom.element.createFromHtml('<span class="orango-content-youtube-player" player-video="'+video+'" player-width="'+w+'" player-height="'+h+'">Video: '+url+'</span>');
	currentEditor.insertElement(element);
}

function orangoContentGallery(a)
{
	var modal = $(a).closest('.modal');
	var element = CKEDITOR.dom.element.createFromHtml('<p>' + $orangoContentgallery.html() + '</p>');
	currentEditor.insertElement(element);
}