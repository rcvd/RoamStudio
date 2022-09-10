#!/bin/sh
cp src/build.js src/index.js

echo "function initCSSThemes() {" >> src/index.js
echo "    css['system'] = '`cat src/RoamStudio/system/system.css | tr '\n' ' '`';" >> src/index.js
echo "    css['quattro-auto'] = '`cat src/RoamStudio/inline/quattro-auto.css | tr '\n' ' '`';" >> src/index.js
echo "    css['quattro-common'] = '`cat src/RoamStudio/inline/quattro-common.css | tr '\n' ' '`';" >> src/index.js
echo "    css['quattro-dark'] = '`cat src/RoamStudio/inline/quattro-dark.css | tr '\n' ' '`';" >> src/index.js
echo "    css['quattro-light'] = '`cat src/RoamStudio/inline/quattro-light.css | tr '\n' ' '`';" >> src/index.js
echo "    css['advanced-heading-spacing'] = '`cat src/RoamStudio/modules/advanced-heading-spacing.css | tr '\n' ' '`';" >> src/index.js
echo "    css['bullet-effects'] = '`cat src/RoamStudio/modules/bullet-effects.css | tr '\n' ' '`';" >> src/index.js
echo "    css['centered-search'] = '`cat src/RoamStudio/modules/centered-search.css | tr '\n' ' '`';" >> src/index.js
echo "    css['dynamic-images'] = '`cat src/RoamStudio/modules/dynamic-images.css | tr '\n' ' '`';" >> src/index.js
echo "    css['hide-logo'] = '`cat src/RoamStudio/modules/hide-logo.css | tr '\n' ' '`';" >> src/index.js
echo "    css['masonry'] = '`cat src/RoamStudio/modules/masonry.css | tr '\n' ' '`';" >> src/index.js
echo "    css['mobile-sidebar'] = '`cat src/RoamStudio/modules/mobile-sidebar.css | tr '\n' ' '`';" >> src/index.js
echo "    css['no-animations'] = '`cat src/RoamStudio/modules/no-animations.css | tr '\n' ' '`';" >> src/index.js
echo "    css['subtle-controls'] = '`cat src/RoamStudio/modules/subtle-controls.css | tr '\n' ' '`';" >> src/index.js
echo "}" >> src/index.js
