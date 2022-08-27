#!/bin/sh
cp src/build.js src/index.js
echo "function initCSSThemes() {" >> "src/index.js"

echo "    css['system'] = \`"`cat src/RoamStudio/system/system.css`"\`;" >> "src/index.js"

echo "
    css['apple-auto'] = \`"`cat src/RoamStudio/inline/apple-auto.css`\`";
    css['apple-common'] = \`"`cat src/RoamStudio/inline/apple-common.css`\`";
    css['apple-dark'] = \`"`cat src/RoamStudio/inline/apple-dark.css`\`";
    css['apple-light'] = \`"`cat src/RoamStudio/inline/apple-light.css`\`";
    css['bear-auto'] = \`"`cat src/RoamStudio/inline/bear-auto.css`\`";
    css['bear-common'] = \`"`cat src/RoamStudio/inline/bear-common.css`\`";
    css['bear-dark'] = \`"`cat src/RoamStudio/inline/bear-dark.css`\`";
    css['bear-light'] = \`"`cat src/RoamStudio/inline/bear-light.css`\`";
    css['craft-auto'] = \`"`cat src/RoamStudio/inline/craft-auto.css`\`";
    css['craft-common'] = \`"`cat src/RoamStudio/inline/craft-common.css`\`";
    css['craft-dark'] = \`"`cat src/RoamStudio/inline/craft-dark.css`\`";
    css['craft-light'] = \`"`cat src/RoamStudio/inline/craft-light.css`\`";
    css['lesswrong-auto'] = \`"`cat src/RoamStudio/inline/lesswrong-auto.css`\`";
    css['lesswrong-common'] = \`"`cat src/RoamStudio/inline/lesswrong-common.css`\`";
    css['lesswrong-dark'] = \`"`cat src/RoamStudio/inline/lesswrong-dark.css`\`";
    css['lesswrong-light'] = \`"`cat src/RoamStudio/inline/lesswrong-light.css`\`";
    css['things-auto'] = \`"`cat src/RoamStudio/inline/things-auto.css`\`";
    css['things-common'] = \`"`cat src/RoamStudio/inline/things-common.css`\`";
    css['things-dark'] = \`"`cat src/RoamStudio/inline/things-dark.css`\`";
    css['things-light'] = \`"`cat src/RoamStudio/inline/things-light.css`\`";
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
