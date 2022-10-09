#!/bin/sh
cp src/build.js src/index.js

echo "function initCSSThemes() {" >> src/index.js
echo "    css['system'] = '`cat src/RoamStudio/system/system.css | tr '\n' ' '`';" >> src/index.js
echo "    css['fixes'] = '`cat src/RoamStudio/common/fixes.css | tr '\n' ' '`';" >> src/index.js
echo "    css['fonts'] = '`cat src/RoamStudio/common/fonts.css | tr '\n' ' '`';" >> src/index.js
echo "    css['quattro-auto'] = '`cat src/RoamStudio/inline/quattro-auto.css | tr '\n' ' '`';" >> src/index.js
echo "    css['quattro-common'] = '`cat src/RoamStudio/inline/quattro-common.css | tr '\n' ' '`';" >> src/index.js
echo "    css['quattro-dark'] = '`cat src/RoamStudio/inline/quattro-dark.css | tr '\n' ' '`';" >> src/index.js
echo "    css['quattro-light'] = '`cat src/RoamStudio/inline/quattro-light.css | tr '\n' ' '`';" >> src/index.js
echo "    css['craft-auto'] = '`cat src/RoamStudio/inline/craft-auto.css | tr '\n' ' '`';" >> src/index.js
echo "    css['craft-common'] = '`cat src/RoamStudio/inline/craft-common.css | tr '\n' ' '`';" >> src/index.js
echo "    css['craft-dark'] = '`cat src/RoamStudio/inline/craft-dark.css | tr '\n' ' '`';" >> src/index.js
echo "    css['craft-light'] = '`cat src/RoamStudio/inline/craft-light.css | tr '\n' ' '`';" >> src/index.js
echo "    css['advanced-heading-spacing'] = '`cat src/RoamStudio/modules/advanced-heading-spacing.css | tr '\n' ' '`';" >> src/index.js
echo "    css['bullet-effects'] = '`cat src/RoamStudio/modules/bullet-effects.css | tr '\n' ' '`';" >> src/index.js
echo "    css['centered-search'] = '`cat src/RoamStudio/modules/centered-search.css | tr '\n' ' '`';" >> src/index.js
echo "    css['dynamic-images'] = '`cat src/RoamStudio/modules/dynamic-images.css | tr '\n' ' '`';" >> src/index.js
echo "    css['hide-line-numbers'] = '`cat src/RoamStudio/modules/hide-line-numbers.css | tr '\n' ' '`';" >> src/index.js
echo "    css['hide-logo'] = '`cat src/RoamStudio/modules/hide-logo.css | tr '\n' ' '`';" >> src/index.js
echo "    css['masonry'] = '`cat src/RoamStudio/modules/masonry.css | tr '\n' ' '`';" >> src/index.js
echo "    css['mobile-sidebar'] = '`cat src/RoamStudio/modules/mobile-sidebar.css | tr '\n' ' '`';" >> src/index.js
echo "    css['more-room'] = '`cat src/RoamStudio/modules/more-room.css | tr '\n' ' '`';" >> src/index.js
echo "    css['no-animations'] = '`cat src/RoamStudio/modules/no-animations.css | tr '\n' ' '`';" >> src/index.js
echo "    css['subtle-controls'] = '`cat src/RoamStudio/modules/subtle-controls.css | tr '\n' ' '`';" >> src/index.js
echo "}" >> src/index.js
