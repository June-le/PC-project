<?php
/* Smarty version 3.1.30, created on 2018-12-19 11:15:34
  from "E:\php&ajax\templates\list-scrollLoad.html" */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '3.1.30',
  'unifunc' => 'content_5c19b7d68ab933_98846780',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    'b9e248e9133ecff8760126ccba41d649edbc877d' => 
    array (
      0 => 'E:\\php&ajax\\templates\\list-scrollLoad.html',
      1 => 1545189324,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
  ),
),false)) {
function content_5c19b7d68ab933_98846780 (Smarty_Internal_Template $_smarty_tpl) {
?>
<!DOCTYPE html>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="css/list.css">
    <title>Document</title>
</head>

<body>
    <div class="header">111111111111111111111111111header</div>
    <div class="list clearfix">
        <ul>
            <?php
$_from = $_smarty_tpl->smarty->ext->_foreach->init($_smarty_tpl, $_smarty_tpl->tpl_vars['list']->value, 'val', false, 'index');
if ($_from !== null) {
foreach ($_from as $_smarty_tpl->tpl_vars['index']->value => $_smarty_tpl->tpl_vars['val']->value) {
?>
            <li>
                <a href="#">
                    <p>书名: <?php echo $_smarty_tpl->tpl_vars['val']->value["bookName"];?>
</p>
                    <p>作者: <?php echo $_smarty_tpl->tpl_vars['val']->value["author"];?>
</p>
                    <p>价格: <?php echo $_smarty_tpl->tpl_vars['val']->value["price"];?>
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
    <div class="footer">
        footer
    </div>
    <?php echo '<script'; ?>
 src="js/scrollLoad.js"><?php echo '</script'; ?>
>
</body>

</html><?php }
}
