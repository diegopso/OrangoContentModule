<?php

class ContentImage
{
	private static $_allowedTypes = array('image/png', 'image/jpg', 'image/jpeg');

	public static function save($file, $user)
	{
		if(!in_array(mime_content_type($file['tmp_name']), self::$_allowedTypes))
		{
			return array(
				'error' => 'Você deve enviar um arquivo PNG ou JPG.'
			);
		}

		try
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
			$imagePost->Type = 'image';
			$imagePost->save();

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
}