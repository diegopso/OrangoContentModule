<?php

class ContentController extends ModuleController
{
	public function importHead()
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
				App::$wwwroot . 'js/ckeditor/plugins/orangocontent',
				App::$wwwroot . 'js/ckeditor/plugins/orangocontent/img',
			);

			$files = array(
				'js/ckeditor/plugins/orangocontent/plugin.js',
				'js/ckeditor/plugins/orangocontent/img/image.png',
				'modulesfiles/content/main.js'
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
	}
}