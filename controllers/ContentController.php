<?php

class ContentController extends ModuleController
{
	public function importHead()
	{
		return $this->_partial();
	}

	public function importPublicHead()
	{
		return $this->_partial();
	}

	public function importBody()
	{
		return $this->_partial();
	}

	public function importPublic()
	{
		return $this->_partial();
	}

	public function admin_setup()
	{
		try
		{
			$modlueWwwRoot = App::$root . 'app/modules/content/wwwroot/';

			$folders = array(
				App::$wwwroot . 'modulesfiles',
				App::$wwwroot . 'modulesfiles/content',
				App::$wwwroot . 'js/fancybox',
				App::$wwwroot . 'js/ckeditor/plugins/orangocontent',
				App::$wwwroot . 'js/ckeditor/plugins/orangocontent/img',
			);

			$files = array(
				'js/fancybox/blank.gif',
				'js/fancybox/fancybox_loading.gif',
				'js/fancybox/fancybox_loading@2x.gif',
				'js/fancybox/fancybox_overlay.png',
				'js/fancybox/fancybox_sprite.png',
				'js/fancybox/fancybox_sprite@2x.png',
				'js/fancybox/jquery.fancybox.css',
				'js/fancybox/jquery.fancybox.js',
				'js/fancybox/jquery.fancybox.pack.js',
				'js/ckeditor/plugins/orangocontent/plugin.js',
				'js/ckeditor/plugins/orangocontent/img/image.png',
				'js/ckeditor/plugins/orangocontent/img/tube.png',
				'js/ckeditor/plugins/orangocontent/img/gallery.png',
				'js/jquery.tubeplayer.min.js',
				'js/jquery.uploadfile.min.js',
				'modulesfiles/content/main.js',
				'modulesfiles/content/public.js',
				'css/uploadfile.css',
			);

			foreach ($folders as $folder) 
			{
				if(!is_dir($folder)) mkdir($folder);
			}

			foreach ($files as $file) 
			{
				copy($modlueWwwRoot . $file, App::$wwwroot . $file);
			}

			$this->_flash('alert alert-success', 'Modulo instalado com sucesso.');
		}
		catch(Exception $e)
		{
			$this->_flash('alert alert-error', 'Ocorreu um erro ao tentar configurar o módulo.');
		}

		return $this->_redirect('~/admin');
	}

	public function admin_imageUpload()
	{
		if(Request::isPost())
		{
			$file = Request::file('Image');
			return $this->_json(ContentImage::save($file, Session::get('user')));
		}

		return $this->_json(array('error' => 'Requisição Inválida.'));
	}

	public function admin_galleryUpload($gId)
	{
		if(Request::isPost())
		{
			$file = Request::file('Gallery');
			return $this->_json(ContentImage::saveGallery($file, Session::get('user'), $gId));
		}

		return $this->_json(array('error' => 'Requisição Inválida.'));
	}
}