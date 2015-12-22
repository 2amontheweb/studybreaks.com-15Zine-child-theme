<?php

/* To overwrite a function from either functions.php or from library/core.php, copy/paste the function here and edit it here, it will override the parent's version */

/*********************
SCRIPTS & ENQUEUEING
*********************/
add_action('after_setup_theme','cb_script_loaders_child', 16);

if ( ! function_exists( 'cb_script_loaders_child' ) ) {
  function cb_script_loaders_child() {
    // enqueue base scripts and styles
    add_action('wp_enqueue_scripts', 'cb_scripts_and_styles_child', 999);
  }
}

if ( ! function_exists( 'cb_scripts_and_styles_child' ) ) {
  function cb_scripts_and_styles_child() {
    if ( !is_admin() ) {

      // Register Child Script
      wp_register_script('cb-child-main-script', get_stylesheet_directory_uri() . '/cb-child-main-script.js', array(), '1.3', true );
      wp_enqueue_script('cb-child-main-script'); // enqueue it

      // Register Child Sheet stylesheet
      wp_register_style( 'cb-child-main-stylesheet',  get_stylesheet_directory_uri() . '/style.css' , array(), '1.3', 'all' );
      wp_enqueue_style('cb-child-main-stylesheet'); // enqueue it
    }
  }
}

?>
