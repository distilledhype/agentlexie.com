<?php if (r::ajax()): ?>

  <?php if ($page->image()): ?>
  <?php $image = $page->image()->url() ?>
  <?php endif ?>

  <?php snippet('content', array('image' => $image, 'route' => $page->uri(), 'class' => 'next')) ?>

<?php else: ?>

  <?php if ($page->image()): ?>
  <?php $image = $page->image()->url() ?>
  <?php endif ?>

  <?php snippet('header') ?>

    <main class="main" role="main">
      <div class="content">
        <div class="pages">
          <?php snippet('content', array('image' => $image, 'route' => $page->uri(), 'class' => 'current')) ?>
          <!-- <div class="js-Pjax-child page prev bg-home"></div>
          <div class="js-Pjax-child page next bg-projects"></div> -->
        </div>
        <?php snippet('menu') ?>
      </div>
    </main>

  <?php snippet('footer') ?>

<?php endif ?>
