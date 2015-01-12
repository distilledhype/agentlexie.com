<?php snippet('header') ?>

  <main class="main" role="main">

    <!-- <div class="text">
      <h1><?php echo $page->title()->html() ?></h1>
      <?php echo $page->text()->kirbytext() ?>
    </div> -->

    <div class="content">
      <div class="pages">
        <div class="page bg-<?php echo $page->bgalias() ?>"></div>
      </div>
      <?php snippet('menu') ?>
    </div>

  </main>

<?php snippet('footer') ?>
