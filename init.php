<?php

class ContentModuleRegister
{
	public static $adds = array(
		ModuleComposer::ADMIN_HEAD_ADDS => array(
			'controller' => 'Content',
			'action' => 'importHead'
		),
		ModuleComposer::ADMIN_BODY_ADDS => array(
			'controller' => 'Content',
			'action' => 'importBody'
		),
		ModuleComposer::PUBLIC_HEAD_ADDS => array(
			'controller' => 'Content',
			'action' => 'importPublicHead'
		),
		ModuleComposer::PUBLIC_BODY_ADDS => array(
			'controller' => 'Content',
			'action' => 'importPublic'
		),
	);
}