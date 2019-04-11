<?php
/* Smarty version 3.1.30, created on 2018-12-20 20:16:36
  from "E:\www\1220\listScrollLoad\smartyLoad\templates\listScrollLoad.html" */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '3.1.30',
  'unifunc' => 'content_5c1b8824c495c5_03151947',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    '04a71bcb6bf4b5864a544799c3bc138c06f4e44b' => 
    array (
      0 => 'E:\\www\\1220\\listScrollLoad\\smartyLoad\\templates\\listScrollLoad.html',
      1 => 1545308083,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
  ),
),false)) {
function content_5c1b8824c495c5_03151947 (Smarty_Internal_Template $_smarty_tpl) {
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <link rel="stylesheet" href="css/scrollLoad.css">
</head>

<body>
    <div class="head">head</div>
    <div class="list">
        <ul class="clearfix">
            <?php
$_from = $_smarty_tpl->smarty->ext->_foreach->init($_smarty_tpl, $_smarty_tpl->tpl_vars['data']->value, 'listValue', false, 'index');
if ($_from !== null) {
foreach ($_from as $_smarty_tpl->tpl_vars['index']->value => $_smarty_tpl->tpl_vars['listValue']->value) {
?>
            <li>
                <a href="">
                    <p>书名:<?php echo $_smarty_tpl->tpl_vars['listValue']->value["bookName"];?>
</p>
                    <p>作者:<?php echo $_smarty_tpl->tpl_vars['listValue']->value["author"];?>
</p>
                    <p>价格:<?php echo $_smarty_tpl->tpl_vars['listValue']->value["price"];?>
</p>
                </a>
            </li>
            <?php
}
}
$_smarty_tpl->smarty->ext->_foreach->restore($_smarty_tpl);
?>

        </ul>
    </div>
    <div class="foot"></div>
    <?php echo '<script'; ?>
 src="js/scrollLoad.js"><?php echo '</script'; ?>
>
</body>

</html><?php }
}
