<?php

/**
 *
 * SugarCRM Community Edition is a customer relationship management program developed by
 * SugarCRM, Inc. Copyright (C) 2004-2013 SugarCRM Inc.
 *
 * SuiteCRM is an extension to SugarCRM Community Edition developed by SalesAgility Ltd.
 * Copyright (C) 2011 - 2018 SalesAgility Ltd.
 *
 * MintHCM is a Human Capital Management software based on SuiteCRM developed by MintHCM,
 * Copyright (C) 2018-2019 MintHCM
 *
 * This program is free software; you can redistribute it and/or modify it under
 * the terms of the GNU Affero General Public License version 3 as published by the
 * Free Software Foundation with the addition of the following permission added
 * to Section 15 as permitted in Section 7(a): FOR ANY PART OF THE COVERED WORK
 * IN WHICH THE COPYRIGHT IS OWNED BY SUGARCRM, SUGARCRM DISCLAIMS THE WARRANTY
 * OF NON INFRINGEMENT OF THIRD PARTY RIGHTS.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
 * FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more
 * details.
 *
 * You should have received a copy of the GNU Affero General Public License along with
 * this program; if not, see http://www.gnu.org/licenses or write to the Free
 * Software Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA
 * 02110-1301 USA.
 *
 * You can contact SugarCRM, Inc. headquarters at 10050 North Wolfe Road,
 * SW2-130, Cupertino, CA 95014, USA. or at email address contact@sugarcrm.com.
 *
 * The interactive user interfaces in modified source and object code versions
 * of this program must display Appropriate Legal Notices, as required under
 * Section 5 of the GNU Affero General Public License version 3.
 *
 * In accordance with Section 7(b) of the GNU Affero General Public License version 3,
 * these Appropriate Legal Notices must retain the display of the "Powered by SugarCRM"
 * logo and "Supercharged by SuiteCRM" logo and "Reinvented by MintHCM" logo.
 * If the display of the logos is not reasonably feasible for technical reasons, the
 * Appropriate Legal Notices must display the words "Powered by SugarCRM" and
 * "Supercharged by SuiteCRM" and "Reinvented by MintHCM".
 */

if (!defined('sugarEntry') || !sugarEntry) {
    die('Not A Valid Entry Point');
}
/*
 * Your installation or use of this SugarCRM file is subject to the applicable
 * terms available at
 * http://support.sugarcrm.com/06_Customer_Center/10_Master_Subscription_Agreements/.
 * If you do not agree to all of the applicable terms or do not have the
 * authority to bind the entity as an authorized representative, then do not
 * install or use this SugarCRM file.
 *
 * Copyright (C) SugarCRM Inc. All rights reserved.
 */

$module_name = 'Positions';
$listViewDefs[$module_name] = array(
    'NAME' => array(
        'name' => 'name',
        'label' => 'LBL_NAME',
        'default' => true,
        'enabled' => true,
        'link' => true,
    ),
    'STATUS' => array(
        'label' => 'LBL_STATUS',
        'default' => true,
    ),
    'ORGANIZATIONALUNITS_LEADER_NAME' => array(
        'name' => 'organizationalunits_leader_name',
        'label' => 'LBL_ORGANIZATIONALUNITS_LEADER_NAME',
        'id' => 'ORGANIZATIONALUNITS_LEADER_ID',
        'enabled' => true,
        'default' => true,
    ),
    'OFFBOARDINGTEMPLATE_NAME' => array(
        'name' => 'offboardingtemplate_name',
        'label' => 'LBL_OFFBOARDINGTEMPLATE_NAME',
        'enabled' => true,
        'default' => false,
    ),
    'ONBOARDINGTEMPLATE_NAME' => array(
        'name' => 'onboardingtemplate_name',
        'label' => 'LBL_ONBOARDINGTEMPLATE_NAME',
        'enabled' => true,
        'default' => false,
    ),
    'POSITIONS_SUPERVISION_NAME' => array(
        'name' => 'positions_supervision_name',
        'label' => 'LBL_POSITIONS_SUPERVISION_NAME',
        'enabled' => true,
        'default' => true,
    ),
    'ASSIGNED_USER_NAME' => array(
        'name' => 'assigned_user_name',
        'label' => 'LBL_ASSIGNED_TO_NAME',
        'default' => true,
        'enabled' => true,
        'link' => true,
    ),
    'DATE_MODIFIED' => array(
        'label' => 'LBL_DATE_MODIFIED',
        'enabled' => true,
        'default' => true,
        'name' => 'date_modified',
        'readonly' => true,
    ),
);