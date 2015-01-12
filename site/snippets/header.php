<!doctype html>
<html class="no-js">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1.0">

  <title><?php echo $site->title()->html() ?> | <?php echo $page->title()->html() ?></title>
  <meta name="description" content="<?php echo $site->description()->html() ?>">
  <meta name="keywords" content="<?php echo $site->keywords()->html() ?>">

  <!-- Place favicon.ico and apple-touch-icon.png in the root directory -->

  <!-- CSS -->
  <?php echo css('assets/css/main.css') ?>

  <!-- JavaScript -->
  <?php echo js('assets/js/vendor/modernizr/modernizr.js') ?>
</head>

<body>

  <?php snippet('browsehappy') ?>
