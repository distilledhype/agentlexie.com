<?php $headers = getallheaders(); ?>
<?php if (isset($headers['X-PJAX'])): ?>
  <?php snippet('pjax', array('bgalias' => $page->bgalias())) ?>
<?php else: ?>
  <?php snippet('header') ?>

    <main class="main" role="main">

      <div class="content">
        <div class="js-Pjax pages" id="js-Pjax">
          <?php snippet('pjax', array('bgalias' => $page->bgalias())) ?>
        </div>
        <?php snippet('menu') ?>
      </div>

    </main>

  <?php snippet('footer') ?>
<?php endif; ?>
