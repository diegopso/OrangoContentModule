<?php

class ContentImage
{
	private static $_allowedTypes = array('image/png', 'image/jpg', 'image/jpeg');

	private static function _save($file, $user, $parentId = null)
	{
		$path = 'media/' . guid() . '.png';
		copy($file['tmp_name'], App::$wwwroot . $path);

		$imagePost = new Post();
		$imagePost->Title = $file['name'];
		$imagePost->Slug = Inflector::slugify($file['name']);
		$imagePost->CreatedDate = $imagePost->PublicationDate = $imagePost->UpdatedDate = time();
		$imagePost->UserId = $user->Id;
		$imagePost->Content = '<img src="'. Request::getSite() . $path .'" />';
		$imagePost->Img = $path;
		$imagePost->Status = 1;
		$imagePost->ParentId = (int) $parentId;
		$imagePost->Type = 'image';
		$imagePost->save();

		return $path;
	}

	private static function _saveMiniature($path)
	{
		$miniaturePath = preg_replace('@.png$@', '_s.png', $path);

		$canvas = new canvas();
		$canvas->carrega(App::$wwwroot . $path);
		$canvas->redimensiona(50, 50, 'crop');
		$canvas->grava(App::$wwwroot . $miniaturePath);

		return $miniaturePath;
	}

	private static function _saveGallery($user)
	{
		$gallery = new Post();
		$gallery->Title = 'Galeria ' . date('d/m/Y');
		$gallery->Slug = Inflector::slugify($gallery->Title);
		$gallery->CreatedDate = $gallery->PublicationDate = $gallery->UpdatedDate = time();
		$gallery->UserId = $user->Id;
		$gallery->Content = null;
		$gallery->Status = 1;
		$gallery->Type = 'gallery';
		$gallery->save();

		return $gallery;
	}

	private static function _checkMime($filename)
	{
		return in_array(mime_content_type($filename), self::$_allowedTypes);
	}

	public static function save($file, $user)
	{
		if(!self::_checkMime($file['tmp_name']))
		{
			return array(
				'error' => 'Você deve enviar um arquivo PNG ou JPG.'
			);
		}

		try
		{
			$path = self::_save($file, $user);

			return array(
				'path' => Request::getSite() . $path
			);
		}
		catch(Exception $e)
		{
			return array(
				'error' => 'Ocorreu um erro ao tentar salvar a imagem.'
			);
		}
	}

	public static function saveGallery($file, $user, $gId)
	{
		if(!self::_checkMime($file['tmp_name']))
		{
			return array(
				'error' => 'Você deve enviar arquivos PNG ou JPG.'
			);
		}

		try
		{
			$galleryId = Session::get('Gallery_' . $gId);

			if(!$galleryId)
			{
				$gallery = self::_saveGallery($user);
				$galleryId = $gallery->Id;
				Session::set('Gallery_' . $gId, $galleryId);
			}

			$path = self::_save($file, $user, $galleryId);

			$miniaturePath = self::_saveMiniature($path);

			return array(
				'path' => Request::getSite() . $path,
				'miniaturePath' => Request::getSite() . $miniaturePath
			);
		}
		catch(Exception $e)
		{
			return array(
				'error' => 'Ocorreu um erro ao tentar salvar a galeria.'
			);
		}
	}
}