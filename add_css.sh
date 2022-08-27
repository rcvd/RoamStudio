#!/bin/sh
cp src/build.js src/index.js
echo "function initCSSThemes() {" >> "src/index.js"

echo "    css['system'] = \`"`cat src/RoamStudio/system/system.css`"\`;" >> "src/index.js"

echo "
    css['quattro-auto'] = \`"`cat src/RoamStudio/inline/quattro-auto.css`\`";
    css['quattro-common'] = \`"`cat src/RoamStudio/inline/quattro-common.css`\`";
    css['quattro-dark'] = \`"`cat src/RoamStudio/inline/quattro-dark.css`\`";
    css['quattro-light'] = \`"`cat src/RoamStudio/inline/quattro-light.css`\`";
    css['advanced-heading-spacing'] = \`"`cat src/RoamStudio/modules/advanced-heading-spacing.css`\`";
    css['bullet-effects'] = \`"`cat src/RoamStudio/modules/bullet-effects.css`\`";
    css['centered-search'] = \`"`cat src/RoamStudio/modules/centered-search.css`\`";
    css['dynamic-images'] = \`"`cat src/RoamStudio/modules/dynamic-images.css`\`";
    css['hide-logo'] = \`"`cat src/RoamStudio/modules/hide-logo.css`\`";
    css['no-animations'] = \`"`cat src/RoamStudio/modules/no-animations.css`\`";
    css['subtle-controls'] = \`"`cat src/RoamStudio/modules/subtle-controls.css`\`";   
}" >> "src/index.js"
