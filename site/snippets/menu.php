<nav role="navigation">

  <ul class="nav cf">
    <?php foreach($pages->visible() as $p): ?>
    <li class="nav-item">
      <a class="nav-link<?php e($p->isOpen(), ' active') ?>" href="<?php echo $p->url() ?>"><?php echo $p->title()->html() ?></a>

      <?php if($p->hasVisibleChildren()): ?>
      <ul class="nav nav__sub">
        <?php foreach($p->children()->visible() as $p): ?>
        <li class="nav-item nav-item__sub">
          <a class="nav-link nav-link__sub" href="<?php echo $p->url() ?>"><?php echo $p->title()->html() ?></a>
        </li>
        <?php endforeach ?>
      </ul>
      <?php endif ?>

    </li>
    <?php endforeach ?>
  </ul>

</nav>
