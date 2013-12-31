Módulo para adição de imagens, vídeos e galerias aos posts.

# Instalação #

Copie os arquivos do módulo em `App::$rootapp/modules/content/`

Adicione o módulo ao Orango no arquivo `App::$root/app/config.php`:

```php
/**
 * Registrar diretórios de arquivos de código fonte, para autoload 
 */
Config::set('modules', array(
	//...
	'Content' 		=> App::$root . 'app/modules/content/',
));
```

Acesse a url de instalação `~/admin/content/setup/`.
