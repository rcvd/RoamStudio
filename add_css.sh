#!/bin/sh
cp src/build.ts src/index.ts

echo "function initCSSThemes() {" >> src/index.ts
echo "    css['system'] = '`cat src/RoamStudio/system/system.css | tr '\n' ' '`';" >> src/index.ts
echo "    css['fixes'] = '`cat src/RoamStudio/common/fixes.css | tr '\n' ' '`';" >> src/index.ts
echo "    css['fonts'] = '`cat src/RoamStudio/common/fonts.css | tr '\n' ' '`';" >> src/index.ts
echo "    css['quattro-auto'] = '`cat src/RoamStudio/inline/quattro-auto.css | tr '\n' ' '`';" >> src/index.ts
echo "    css['quattro-common'] = '`cat src/RoamStudio/inline/quattro-common.css | tr '\n' ' '`';" >> src/index.ts
echo "    css['quattro-dark'] = '`cat src/RoamStudio/inline/quattro-dark.css | tr '\n' ' '`';" >> src/index.ts
echo "    css['quattro-light'] = '`cat src/RoamStudio/inline/quattro-light.css | tr '\n' ' '`';" >> src/index.ts
echo "    css['craft-auto'] = '`cat src/RoamStudio/inline/craft-auto.css | tr '\n' ' '`';" >> src/index.ts
echo "    css['craft-common'] = '`cat src/RoamStudio/inline/craft-common.css | tr '\n' ' '`';" >> src/index.ts
echo "    css['craft-dark'] = '`cat src/RoamStudio/inline/craft-dark.css | tr '\n' ' '`';" >> src/index.ts
echo "    css['craft-light'] = '`cat src/RoamStudio/inline/craft-light.css | tr '\n' ' '`';" >> src/index.ts
echo "    css['things-auto'] = '`cat src/RoamStudio/inline/things-auto.css | tr '\n' ' '`';" >> src/index.ts
echo "    css['things-common'] = '`cat src/RoamStudio/inline/things-common.css | tr '\n' ' '`';" >> src/index.ts
echo "    css['things-dark'] = '`cat src/RoamStudio/inline/things-dark.css | tr '\n' ' '`';" >> src/index.ts
echo "    css['things-light'] = '`cat src/RoamStudio/inline/things-light.css | tr '\n' ' '`';" >> src/index.ts
echo "    css['css-advanced-heading-spacing'] = '`cat src/RoamStudio/modules/advanced-heading-spacing.css | tr '\n' ' '`';" >> src/index.ts
echo "    css['css-bullet-effects'] = '`cat src/RoamStudio/modules/bullet-effects.css | tr '\n' ' '`';" >> src/index.ts
echo "    css['css-centered-search'] = '`cat src/RoamStudio/modules/centered-search.css | tr '\n' ' '`';" >> src/index.ts
echo "    css['css-done'] = '`cat src/RoamStudio/modules/done.css | tr '\n' ' '`';" >> src/index.ts
echo "    css['css-dynamic-images'] = '`cat src/RoamStudio/modules/dynamic-images.css | tr '\n' ' '`';" >> src/index.ts
echo "    css['css-dynamic-pdfs'] = '`cat src/RoamStudio/modules/dynamic-pdfs.css | tr '\n' ' '`';" >> src/index.ts
echo "    css['css-feather-icons'] = '`cat src/RoamStudio/modules/icons-feather.css | tr '\n' ' '`';" >> src/index.ts
echo "    css['css-hide-line-numbers'] = '`cat src/RoamStudio/modules/hide-line-numbers.css | tr '\n' ' '`';" >> src/index.ts
echo "    css['css-hide-logo'] = '`cat src/RoamStudio/modules/hide-logo.css | tr '\n' ' '`';" >> src/index.ts
echo "    css['css-hide-shortcuts'] = '`cat src/RoamStudio/modules/hide-shortcuts.css | tr '\n' ' '`';" >> src/index.ts
echo "    css['css-hide-sidebar-icons'] = '`cat src/RoamStudio/modules/hide-sidebar-icons.css | tr '\n' ' '`';" >> src/index.ts
echo "    css['css-masonry'] = '`cat src/RoamStudio/modules/masonry.css | tr '\n' ' '`';" >> src/index.ts
echo "    css['css-logpage-minheight'] = '`cat src/RoamStudio/modules/logpage-minheight.css | tr '\n' ' '`';" >> src/index.ts
echo "    css['css-mobile-caret'] = '`cat src/RoamStudio/modules/mobile-caret.css | tr '\n' ' '`';" >> src/index.ts
echo "    css['css-mobile-sidebar'] = '`cat src/RoamStudio/modules/mobile-sidebar.css | tr '\n' ' '`';" >> src/index.ts
echo "    css['css-more-room'] = '`cat src/RoamStudio/modules/more-room.css | tr '\n' ' '`';" >> src/index.ts
echo "    css['css-no-animations'] = '`cat src/RoamStudio/modules/no-animations.css | tr '\n' ' '`';" >> src/index.ts
echo "    css['css-non-breakable-dates'] = '`cat src/RoamStudio/modules/non-breakable-dates.css | tr '\n' ' '`';" >> src/index.ts
echo "    css['css-subtle-controls'] = '`cat src/RoamStudio/modules/subtle-controls.css | tr '\n' ' '`';" >> src/index.ts
echo "    css['css-topbar-borders'] = '`cat src/RoamStudio/modules/topbar-borders.css | tr '\n' ' '`';" >> src/index.ts
echo "    css['css-sidebar-borders'] = '`cat src/RoamStudio/modules/sidebar-borders.css | tr '\n' ' '`';" >> src/index.ts
echo "}" >> src/index.ts
