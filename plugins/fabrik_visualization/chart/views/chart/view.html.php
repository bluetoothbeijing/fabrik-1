<?php

// Check to ensure this file is included in Joomla!
defined('_JEXEC') or die();

jimport('joomla.application.component.view');

class fabrikViewChart extends JView
{

	function display($tmpl = 'default')
	{
		$srcs = FabrikHelperHTML::framework();
		$srcs[] = 'media/com_fabrik/js/list.js';
		$srcs[] = 'media/com_fabrik/js/advanced-search.js';
		require_once COM_FABRIK_FRONTEND . '/helpers/html.php';
		$model = $this->getModel();
		$usersConfig = JComponentHelper::getParams('com_fabrik');
		$model->setId(JRequest::getVar('id', $usersConfig->get('visualizationid', JRequest::getInt('visualizationid', 0))));
		$this->row = $model->getVisualization();
		$model->setListIds();
		if ($this->row->published == 0)
		{
			JError::raiseWarning(500, JText::_('JERROR_ALERTNOAUTHOR'));
			return '';
		}
		$calendar = $model->getRow();
		$this->assign('requiredFiltersFound', $this->get('RequiredFiltersFound'));
		if ($this->requiredFiltersFound)
		{
			$this->assign('chart', $this->get('Chart'));
		}
		else
		{
			$this->assign('chart', '');
		}
		$params = $model->getParams();
		$this->assign('params', $params);
		$viewName = $this->getName();
		$pluginManager = FabrikWorker::getPluginManager();
		$plugin = $pluginManager->getPlugIn('chart', 'visualization');
		$this->assign('containerId', $this->get('ContainerId'));
		$this->assignRef('filters', $this->get('Filters'));
		$this->assign('showFilters', JRequest::getInt('showfilters', $params->get('show_filters')) === 1 ?  1 : 0);
		$this->assign('filterFormURL', $this->get('FilterFormURL'));

		$tmpl = $params->get('chart_layout', $tmpl);
		$tmplpath = JPATH_ROOT . '/plugins/fabrik_visualization/chart/views/chart/tmpl/' . $tmpl;
		$this->_setPath('template', $tmplpath);
		FabrikHelperHTML::stylesheetFromPath('plugins/fabrik_visualization/chart/views/chart/tmpl/' . $tmpl . '/template.css');
		//assign something to Fabrik.blocks to ensure we can clear filters
		$str = "fabrikChart{$this->row->id} = {};";
		$str .= "\n" . "Fabrik.addBlock('vizualization_{$this->row->id}', fabrikChart{$this->row->id});";
		FabrikHelperHTML::addScriptDeclaration($srcs, $str);
		echo parent::display();
	}

}
?>