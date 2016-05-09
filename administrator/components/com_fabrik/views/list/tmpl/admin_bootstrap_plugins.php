<?php
/**
 * Admin List Tmpl
 *
 * @package     Joomla.Administrator
 * @subpackage  Fabrik
 * @copyright   Copyright (C) 2005-2015 fabrikar.com - All rights reserved.
 * @license     GNU/GPL http://www.gnu.org/copyleft/gpl.html
 * @since       3.0
 */

// No direct access
defined('_JEXEC') or die('Restricted access');

use Fabrik\Helpers\Text;

?>
<div class="tab-pane" id="tabplugins">
	<fieldset><legend>
    		<?php echo Text::_('COM_FABRIK_PLUGINS'); ?>
    	</legend>
    <div id="plugins"></div>
	<a href="#" id="addPlugin" class="btn">
		<i class="icon-plus"></i> <?php echo Text::_('COM_FABRIK_ADD'); ?>
	</a>
	</fieldset>
</div>