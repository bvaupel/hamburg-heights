<?php

define( 'SITE_NAME', end(explode('/', dirname( __FILE__ ))) );

require_once('config.php');

$create = array(
	DB_TABLE_MAIL => 'CREATE TABLE `'.DB_NAME.'`.`'.DB_TABLE_MAIL.'` (`id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY, `to` TEXT CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL, `cc` TEXT CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL, `bcc` TEXT CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL, `subject` TEXT CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL, `message` TEXT CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL) ENGINE = MyISAM CHARACTER SET utf8 COLLATE utf8_general_ci',
	DB_TABLE_USERS => 'CREATE TABLE `'.DB_NAME.'`.`'.DB_TABLE_USERS.'` (`id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY, `name` TEXT CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL, `street` TEXT CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL, `city` TEXT CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL, `country` TEXT CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL, `phone` TEXT CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL, `email` TEXT CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL, `password` TEXT CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL) ENGINE = MyISAM CHARACTER SET utf8 COLLATE utf8_general_ci'
);

if(!$DB_connect = mysql_connect(DB_HOST, DB_USER, DB_PASSWORD)) {
	die('Unable to connect to MySQL host.');
}

if(!mysql_select_db(DB_NAME, $DB_connect)) {
	die('Unable to select database.');
}

foreach($create as $table => $query) {
	if( !mysql_num_rows( mysql_query("SHOW TABLES LIKE '".$table."'"))) {
		if ( mysql_query($query) ) {
			echo $table.' successfully created.<br>';
		} else {
			echo 'An error occured while creating table '.$table.'.<br>';
		}
	} else {
		echo $table.' already exists.<br>';
	}
}

mysql_close($DB_connect);

?>