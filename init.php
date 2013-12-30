<?php

class ContentModuleRegister
{
	public static $adds = array(
		ModuleComposer::ADMIN_HEAD_ADDS => array(
			'controller' => 'Content',
			'action' => 'importHead'
		),
	);
}