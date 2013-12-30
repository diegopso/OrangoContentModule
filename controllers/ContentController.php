<?php

class ContentController extends ModuleController
{
	public function importHead()
	{
		return $this->_partial();
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