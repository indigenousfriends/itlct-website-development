<?php
/*
Plugin Name: ITLCT Site Functionality
Description: Adds a column to the Events post type that displays the ACF field 'title'.
Version: 1.0
Author: Max Harris / Indigenous Friends Association
*/

// Add new column to the Events post list
function add_acf_columns($columns)
{
  return array_merge($columns, array(
    'title' => __('Title')
  ));
}
add_filter('manage_events_posts_columns', 'add_acf_columns');

// Output for the custom column
function custom_column($column, $post_id)
{
  switch ($column) {
    case 'title':
      $title = get_field('title', $post_id);
      if ($title) {
        echo $title;
      } else {
        echo 'No title';
      }
      break;
  }
}
add_action('manage_events_posts_custom_column', 'custom_column', 10, 2);
