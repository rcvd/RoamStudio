import type { OnloadArgs } from "roamjs-components/types";

var settings: { [key: string]: any } = {
    "css-theme": "Quattro",
    "css-appearance": "Auto",
    "css-font-family": "Theme Default",
    "css-code-font-family": "Theme Default",
    "css-heading-font-family": "Theme Default",
    "css-heading-spacing": "Theme Default",
    "css-heading-level1-color": "Theme Default",
    "css-heading-level2-color": "Theme Default",
    "css-heading-level3-color": "Theme Default",
    "css-heading-level1-color-lightness": "Theme Default",
    "css-heading-level2-color-lightness": "Theme Default",
    "css-heading-level3-color-lightness": "Theme Default",
    "css-heading-level1-size": "Theme Default",
    "css-heading-level2-size": "Theme Default",
    "css-heading-level3-size": "Theme Default",
    "css-heading-level1-style": "Theme Default",
    "css-heading-level2-style": "Theme Default",
    "css-heading-level3-style": "Theme Default",
    "css-heading-level1-weight": "Theme Default",
    "css-heading-level2-weight": "Theme Default",
    "css-heading-level3-weight": "Theme Default",
    "css-font-size": "medium",
    "css-line-spacing": "medium",
    "css-code-font-size": "medium",
    "css-mobile-font-size": "medium",
    "css-external-link-color": "Theme Default",
    "css-external-link-color-lightness": "Theme Default",
    "css-external-link-style": "Theme Default",
    "css-external-link-border-lightness": "Theme Default",
    "css-external-link-weight": "Theme Default",
    "css-page-link-color": "Theme Default",
    "css-page-link-color-lightness": "Theme Default",
    "css-page-link-style": "Theme Default",
    "css-page-link-border-lightness": "Theme Default",
    "css-page-link-weight": "Theme Default",
    "css-reference-link-color": "Theme Default",
    "css-reference-link-color-lightness": "Theme Default",
    "css-reference-link-style": "Theme Default",
    "css-reference-link-border-lightness": "Theme Default",
    "css-reference-link-weight": "Theme Default",
    "css-block-link-color": "Theme Default",
    "css-block-link-color-lightness": "Theme Default",
    "css-block-link-style": "Theme Default",
    "css-block-link-border-lightness": "Theme Default",
    "css-block-link-weight": "Theme Default",
    "css-tag-color": "Theme Default",
    "css-tag-color-lightness": "Theme Default",
    "css-tag-style": "Theme Default",
    "css-tag-font-size": "Theme Default",
    "css-tag-background": "Theme Default",
    "css-tag-background-lightness": "Theme Default",
    "css-tag-radius": "Theme Default",
    "css-tag-padding": "Theme Default",
    "css-date-icon": false,
    "css-date-color": "Theme Default",
    "css-date-color-lightness": "Theme Default",
    "css-date-style": "Theme Default",
    "css-date-font-size": "Theme Default",
    "css-date-background": "Theme Default",
    "css-date-background-lightness": "Theme Default",
    "css-date-radius": "Theme Default",
    "css-date-padding": "Theme Default",
  },
  modules: { [key: string]: boolean } = {
    "css-advanced-heading-spacing": false,
    "css-bullet-effects": false,
    "css-centered-search": false,
    "css-done": false,
    "css-dynamic-images": false,
    "css-dynamic-pdfs": false,
    "css-feather-icons": false,
    "css-hide-line-numbers": false,
    "css-hide-logo": false,
    "css-hide-shortcuts": false,
    "css-hide-sidebar-icons": false,
    "css-masonry": false,
    "css-logpage-minheight": false,
    "css-mobile-caret": false,
    "css-mobile-sidebar": false,
    "css-more-room": false,
    "css-no-animations": false,
    "css-subtle-controls": false,
    "css-non-breakable-dates": false,
    "css-topbar-borders": false,
    "css-sidebar-borders": false,
  },
  css: { [key: string]: string } = {
    system: "",
    quattro: "",
    things: "",
    craft: "",
    bear: "",
    lesswrong: "",
  },
  extAPI: OnloadArgs["extensionAPI"];

function changeSettings(setting: string) {
  console.log("Changing setting: " + setting);

  switch (setting) {
    case "css-theme":
    case "css-appearance":
      changeTheme();
      changeFontFamily();
      changeLineSpacing();
      changeCodeFontFamily();
      changeHeadingSpacing();
      changeHeadingFontFamily();
      changeHeadingFontSize("level1");
      changeHeadingFontColor("level1");
      changeHeadingFontSize("level2");
      changeHeadingFontColor("level2");
      changeHeadingFontSize("level3");
      changeHeadingFontColor("level3");
      changeFontSize();
      changeMobileFontSize();
      changePageLink();
      changeReferenceLink();
      changeBlockLink();
      changeTag();
      changeDateIcon();
      changeDate();
      for (const item in modules) {
        console.log("Setting: " + "css-" + item);
        changeModule(item);
      }

      break;
    case "css-font-family":
      changeFontFamily();
      break;
    case "css-line-spacing":
      changeLineSpacing();
      break;
    case "css-code-font-family":
      changeCodeFontFamily();
      break;
    case "css-heading-spacing":
      changeHeadingSpacing();
      break;
    case "css-heading-font-family":
      changeHeadingFontFamily();
      break;
    case "css-heading-level1-size":
      changeHeadingFontSize("level1");
      break;
    case "css-heading-level2-size":
      changeHeadingFontSize("level2");
      break;
    case "css-heading-level3-size":
      changeHeadingFontSize("level3");
      break;
    case "css-heading-level1-color":
      changeHeadingFontColor("level1");
      break;
    case "css-heading-level2-color":
      changeHeadingFontColor("level2");
      break;
    case "css-heading-level3-color":
      changeHeadingFontColor("level3");
      break;
    case "css-font-size":
      changeFontSize();
      changeMobileFontSize();
      break;
    case "css-code-font-size":
      changeCodeFontSize();
      break;
    case "css-mobile-font-size":
      changeMobileFontSize();
      break;
    case "css-external-link-color":
    case "css-external-link-color-lightness":
    case "css-external-link-style":
    case "css-external-link-weight":
      changeExternalLink();
      break;
    case "css-page-link-color":
    case "css-page-link-color-lightness":
    case "css-page-link-style":
    case "css-page-link-weight":
      changePageLink();
      break;
    case "css-reference-link-color":
    case "css-reference-link-color-lightness":
    case "css-reference-link-style":
    case "css-reference-link-weight":
      changeReferenceLink();
      break;
    case "css-block-link-color":
    case "css-block-link-color-lightness":
    case "css-block-link-style":
    case "css-block-link-weight":
      changeReferenceLink();
      break;
    case "css-tag-padding":
    case "css-tag-color":
    case "css-tag-background":
    case "css-tag-style":
    case "css-tag-font-size":
    case "css-tag-radius":
      changeTag();
      break;
    case "css-date-padding":
    case "css-date-color":
    case "css-date-background":
    case "css-date-style":
    case "css-date-font-size":
    case "css-date-radius":
      changeDate();
      break;
  }
}

function setToggleIcon() {
  console.log("Dark mode toggled: " + settings["css-appearance"]);

  let btn = document.getElementsByClassName(
    "bp3-button roamstudio-dm-toggle"
  )[0];

  if (btn.classList.contains("bp3-icon-clean")) {
    btn.classList.remove("bp3-icon-clean");
  }
  if (btn.classList.contains("bp3-icon-flash")) {
    btn.classList.remove("bp3-icon-flash");
  }
  if (btn.classList.contains("bp3-icon-moon")) {
    btn.classList.remove("bp3-icon-moon");
  }

  if (settings["css-appearance"] == "Auto") {
    btn.classList.add("bp3-icon-clean");
  } else if (settings["css-appearance"] == "Light") {
    btn.classList.add("bp3-icon-flash");
  } else {
    btn.classList.add("bp3-icon-moon");
  }
}

function toggleDarkMode() {
  console.log("Dark mode toggled: " + settings["css-appearance"]);

  if (settings["css-appearance"] == "Auto") {
    let btn = document.getElementsByClassName(
      "bp3-icon-clean roamstudio-dm-toggle"
    )[0];
    btn.classList.remove("bp3-icon-clean");
    btn.classList.add("bp3-icon-flash");
    settings["css-appearance"] = "Light";
    extAPI.settings.set("css-appearance", "Light");
    changeSettings("css-theme");
  } else if (settings["css-appearance"] == "Light") {
    let btn = document.getElementsByClassName(
      "bp3-icon-flash roamstudio-dm-toggle"
    )[0];
    btn.classList.remove("bp3-icon-flash");
    btn.classList.add("bp3-icon-moon");
    settings["css-appearance"] = "Dark";
    extAPI.settings.set("css-appearance", "Dark");
    changeSettings("css-theme");
  } else {
    let btn = document.getElementsByClassName(
      "bp3-icon-moon roamstudio-dm-toggle"
    )[0];
    btn.classList.remove("bp3-icon-moon");
    btn.classList.add("bp3-icon-clean");
    settings["css-appearance"] = "Auto";
    extAPI.settings.set("css-appearance", "Auto");
    changeSettings("css-theme");
  }
}

function createToggle() {
  const createIconButton = (icon: string) => {
    const popoverButton = document.createElement("span");
    popoverButton.className = "";
    popoverButton.tabIndex = 0;

    const popoverIcon = document.createElement("span");
    popoverIcon.className = `bp3-button bp3-minimal bp3-small bp3-icon-${icon} roamstudio-dm-toggle`;

    popoverButton.appendChild(popoverIcon);

    return popoverButton;
  };

  var iconName = "moon";
  var nameToUse = "roamStudioToggleDarkMode";

  switch (settings["css-appearance"]) {
    case "Auto":
      iconName = "clean";
      break;
    case "Dark":
      iconName = "moon";
      break;
    case "Light":
      iconName = "flash";
      break;
  }

  console.log("iconName: " + iconName);

  var checkForButton = document.getElementById(`${nameToUse}-flex-space`);
  if (!checkForButton) {
    var mainButton = createIconButton(iconName);
    var roamTopbar = document.getElementsByClassName("rm-topbar");

    var nextIconButton = roamTopbar[0].lastElementChild;
    var flexDiv = document.createElement("div");
    flexDiv.className = "rm-topbar__spacer-sm roamstudio-dm-toggle";
    flexDiv.id = nameToUse + "-flex-space";

    var flexDivAfter = document.createElement("div");
    flexDivAfter.className = "rm-topbar__spacer-sm roamstudio-dm-toggle";
    flexDivAfter.id = nameToUse + "-flex-space-after";

    nextIconButton.insertAdjacentElement("afterend", mainButton);
    mainButton.insertAdjacentElement("beforebegin", flexDiv);
    mainButton.insertAdjacentElement("afterend", flexDivAfter);
    mainButton.addEventListener("click", toggleDarkMode);
  }
}

function destroyToggle() {
  const toggles = document.querySelectorAll(".roamstudio-dm-toggle");

  toggles.forEach((tog) => {
    tog.remove();
  });
}

function loadSystem() {
  console.log("Loading Roam Roam Studio");

  if (document.getElementById("roamstudio-css-system")) {
    document.getElementById("roamstudio-css-system").remove();
  }

  if (settings["css-theme"].toLowerCase() != "default") {
    var head = document.getElementsByTagName("head")[0];
    var style = document.createElement("style");
    style.id = "roamstudio-css-system";
    style.textContent = css["system"];
    head.appendChild(style);
  }
}

function loadFixes() {
  console.log("Loading Roam Roam Studio Fixes");

  if (document.getElementById("roamstudio-css-system-fixes")) {
    document.getElementById("roamstudio-css-system-fixes").remove();
  }

  if (settings["css-theme"].toLowerCase() != "default") {
    var head = document.getElementsByTagName("head")[0];
    var style = document.createElement("style");
    style.id = "roamstudio-css-system-fixes";
    style.textContent = css["fixes"];
    head.appendChild(style);
  }
}

function loadFonts() {
  console.log("Loading Roam Roam Studio Fonts");

  if (document.getElementById("roamstudio-css-system-fonts")) {
    document.getElementById("roamstudio-css-system-fonts").remove();
  }

  var head = document.getElementsByTagName("head")[0];
  var style = document.createElement("style");
  style.id = "roamstudio-css-system-fonts";
  style.textContent = css["fonts"];
  head.appendChild(style);
}

function changeFontSize() {
  var fontSize: number;

  console.log("Switching base font size: " + settings["css-font-size"]);
  if (document.getElementById("roamstudio-css-font-size")) {
    document.getElementById("roamstudio-css-font-size").remove();
  }

  switch (settings["css-font-size"]) {
    case "extra small":
      fontSize = 13;
      break;
    case "small":
      fontSize = 14;
      break;
    case "medium":
      fontSize = 15;
      break;
    case "large":
      fontSize = 16;
      break;
    case "extra large":
      fontSize = 17;
      break;
  }

  var head = document.getElementsByTagName("head")[0];
  var style = document.createElement("style");
  style.id = "roamstudio-css-font-size";
  style.textContent =
    ":root {" + "--fs-app__html: " + fontSize + "px!important;};";
  head.appendChild(style);
}

function changeLineSpacing() {
  var spacing: string;

  console.log("Changing line spacing: " + settings["css-line-spacing"]);
  if (document.getElementById("roamstudio-css-line-spacing")) {
    document.getElementById("roamstudio-css-line-spacing").remove();
  }

  switch (settings["css-line-spacing"]) {
    case "small":
      spacing =
        ".roam-block, .rm-block__input {line-height: calc(var(--fs-main) + 6px); min-height: calc(var(--fs-main) + 12px); padding-top: 5px;};" +
        "rm-level1, .rm-heading-level-1 > .rm-block__self .rm-block__input, .rm-heading-level-1 > .rm-block__self > .controls, .rm-heading-level-1 > .rm-block__self > .rm-block__controls {line-height: calc(var(--fs-main__level1) + 6px);}" +
        "rm-level2, .rm-heading-level-2 > .rm-block__self .rm-block__input, .rm-heading-level-2 > .rm-block__self > .controls, .rm-heading-level-2 > .rm-block__self > .rm-block__controls {line-height: calc(var(--fs-main__level2) + 6px);}" +
        "rm-level3, .rm-heading-level-3 > .rm-block__self .rm-block__input, .rm-heading-level-3 > .rm-block__self > .controls, .rm-heading-level-3 > .rm-block__self > .rm-block__controls {line-height: calc(var(--fs-main__level3) + 6px);}";
      break;
    case "medium":
      spacing =
        ".roam-block, .rm-block__input {line-height: calc(var(--fs-main) + 8px); min-height: calc(var(--fs-main) + 16px); padding-top: 4px;};" +
        "rm-level1, .rm-heading-level-1 > .rm-block__self .rm-block__input, .rm-heading-level-1 > .rm-block__self > .controls, .rm-heading-level-1 > .rm-block__self > .rm-block__controls {line-height: calc(var(--fs-main__level1) + 8px);}" +
        "rm-level2, .rm-heading-level-2 > .rm-block__self .rm-block__input, .rm-heading-level-2 > .rm-block__self > .controls, .rm-heading-level-2 > .rm-block__self > .rm-block__controls {line-height: calc(var(--fs-main__level2) + 8px);}" +
        "rm-level3, .rm-heading-level-3 > .rm-block__self .rm-block__input, .rm-heading-level-3 > .rm-block__self > .controls, .rm-heading-level-3 > .rm-block__self > .rm-block__controls {line-height: calc(var(--fs-main__level3) + 8px);}";
      break;
    case "large":
      spacing =
        ".roam-block, .rm-block__input {line-height: calc(var(--fs-main) + 10px); min-height: calc(var(--fs-main) + 20px); padding-top: 3px;};" +
        "rm-level1, .rm-heading-level-1 > .rm-block__self .rm-block__input, .rm-heading-level-1 > .rm-block__self > .controls, .rm-heading-level-1 > .rm-block__self > .rm-block__controls {line-height: calc(var(--fs-main__level1) + 10px);}" +
        "rm-level2, .rm-heading-level-2 > .rm-block__self .rm-block__input, .rm-heading-level-2 > .rm-block__self > .controls, .rm-heading-level-2 > .rm-block__self > .rm-block__controls {line-height: calc(var(--fs-main__level2) + 10px);}" +
        "rm-level3, .rm-heading-level-3 > .rm-block__self .rm-block__input, .rm-heading-level-3 > .rm-block__self > .controls, .rm-heading-level-3 > .rm-block__self > .rm-block__controls {line-height: calc(var(--fs-main__level3) + 10px);}";
      break;
  }

  var head = document.getElementsByTagName("head")[0];
  var style = document.createElement("style");
  style.id = "roamstudio-css-line-spacing";
  style.textContent = spacing;
  head.appendChild(style);
}

function changeCodeFontSize() {
  var fontSize: number;

  console.log("Switching code font size: " + settings["css-code-font-size"]);
  if (document.getElementById("roamstudio-css-code-font-size")) {
    document.getElementById("roamstudio-css-code-font-size").remove();
  }

  switch (settings["css-code-font-size"]) {
    case "extra small":
      fontSize = 13;
      break;
    case "small":
      fontSize = 14;
      break;
    case "medium":
      fontSize = 15;
      break;
    case "large":
      fontSize = 16;
      break;
    case "extra large":
      fontSize = 17;
      break;
  }

  var head = document.getElementsByTagName("head")[0];
  var style = document.createElement("style");
  style.id = "roamstudio-css-code-font-size";
  style.textContent =
    ":root {" +
    "--fs-codeblock__code: " +
    fontSize +
    "px!important;" +
    "--fs-codeblock__gutter: " +
    fontSize +
    "px;};";
  head.appendChild(style);
}

function changeMobileFontSize() {
  var fontSize: number;

  console.log(
    "Switching mobile font size: " + settings["css-mobile-font-size"]
  );
  if (document.getElementById("roamstudio-css-mobile-font-size")) {
    document.getElementById("roamstudio-css-mobile-font-size").remove();
  }

  switch (settings["css-mobile-font-size"]) {
    case "extra small":
      fontSize = 13;
      break;
    case "small":
      fontSize = 14;
      break;
    case "medium":
      fontSize = 15;
      break;
    case "large":
      fontSize = 16;
      break;
    case "extra large":
      fontSize = 17;
      break;
  }

  var head = document.getElementsByTagName("head")[0];
  var style = document.createElement("style");
  style.id = "roamstudio-css-mobile-font-size";
  style.textContent = `@media screen and (max-width: 600px) { :root {--fs-app__html: ${fontSize}px!important;};}`;
  head.appendChild(style);
}

function changeExternalLink() {
  var externalLinkColor: string;
  var externalLinkColorLightness: number;
  var externalLinkColorLightnessDark: number;
  var externalLinkBorderStyle: string;
  var externalLinkBorderLightness: number;
  var externalLinkBorderLightnessDark: number;

  console.log("Switching page link color:" + settings["css-external-link-color"]);
  if (document.getElementById("roamstudio-css-external-link-color")) {
    document.getElementById("roamstudio-css-external-link-color").remove();
  }

  externalLinkColorLightness = 600;

  switch (settings["css-theme"]) {
    case "Quattro":
      externalLinkColor = "gray";
      externalLinkColorLightness = 900;
      externalLinkBorderStyle = "1px solid ";
      externalLinkBorderLightness = 900;
      break;

    case "Craft":
      externalLinkColor = "accent";
      externalLinkColorLightness = 900;
      externalLinkBorderStyle = "3px solid ";
      externalLinkBorderLightness = 300;
      break;

    case "Things":
      externalLinkColor = "gray";
      externalLinkColorLightness = 700;
      externalLinkBorderStyle = "0px solid ";
      externalLinkBorderLightness = 900;
      break;
  }
  
  if (settings["css-external-link-color"] != "Theme Default") {
    externalLinkColor = settings["css-external-link-color"];
  }

  switch (settings["css-external-link-color-lightness"]) {
    case "lightest":
      externalLinkColorLightness = 100;
      break;
    case "lighter":
      externalLinkColorLightness = 200;
      break;
    case "light":
      externalLinkColorLightness = 300;
      break;
    case "medium":
      externalLinkColorLightness = 500;
      break;
    case "dark":
      externalLinkColorLightness = 600;
      break;
    case "darker":
      externalLinkColorLightness = 800;
      break;
    case "darkest":
      externalLinkColorLightness = 900;
      break;
  }
  
  switch (settings["css-external-link-border-lightness"]) {
    case "lightest":
      externalLinkBorderLightness = 100;
      break;
    case "lighter":
      externalLinkBorderLightness = 200;
      break;
    case "light":
      externalLinkBorderLightness = 300;
      break;
    case "medium":
      externalLinkBorderLightness = 500;
      break;
    case "dark":
      externalLinkBorderLightness = 600;
      break;
    case "darker":
      externalLinkBorderLightness = 800;
      break;
    case "darkest":
      externalLinkBorderLightness = 900;
      break;
  }

  if (settings["css-external-link-style"] != "Theme Default") {
    switch (settings["css-external-link-style"]) {
      case "No underline":
        externalLinkBorderStyle = "0px solid ";
        break;
      case "Dotted underline":
        externalLinkBorderStyle = "1px dotted ";
        break;
      case "Thin underline":
        externalLinkBorderStyle = "1px solid ";
        break;
      case "Medium underline":
        externalLinkBorderStyle = "2px solid ";
        break;
      case "Fat underline":
        externalLinkBorderStyle = "3px solid ";
        break;
    }
  }

  externalLinkColorLightnessDark = 1000 - externalLinkColorLightness;
  externalLinkBorderLightnessDark = 1000 - externalLinkBorderLightness;

  var head = document.getElementsByTagName("head")[0];
  var style = document.createElement("style");

  style.id = "roamstudio-css-external-link-color";
  switch (settings["css-appearance"]) {
    case "Auto":
      style.textContent =
        `:root {--fw-main__a: ${settings["css-external-link-weight"]};--fw-main__alias: ${settings["css-external-link-weight"]};--bb-main__a: ${externalLinkBorderStyle}var(--cl-${externalLinkColor}-${externalLinkBorderLightness});--bb-main__alias: ${externalLinkBorderStyle}var(--cl-${externalLinkColor}-${externalLinkBorderLightness});--bb-main__a--hover: ${externalLinkBorderStyle}var(--cl-${externalLinkColor}-${externalLinkBorderLightness});--bb-main__alias--hover: ${externalLinkBorderStyle}var(--cl-${externalLinkColor}-${externalLinkBorderLightness});--co-main__a: var(--cl-${externalLinkColor}-${externalLinkColorLightness});--co-main__alias: var(--cl-${externalLinkColor}-${externalLinkColorLightness});--co-main__external-link--hover: var(--cl-${externalLinkColor}-${externalLinkColorLightness});--co-main__a--hover: var(--cl-${externalLinkColor}-${externalLinkColorLightness});--co-main__alias--hover: var(--cl-${externalLinkColor}-${externalLinkColorLightness});}` +
        `@media (prefers-color-scheme: dark) {:root {--fw-main__a: ${settings["css-external-link-weight"]};--fw-main__alias: ${settings["css-external-link-weight"]};--bb-main__a: ${externalLinkBorderStyle}var(--cl-${externalLinkColor}-${externalLinkBorderLightnessDark});--bb-main__alias: ${externalLinkBorderStyle}var(--cl-${externalLinkColor}-${externalLinkBorderLightnessDark});--bb-main__a--hover: ${externalLinkBorderStyle}var(--cl-${externalLinkColor}-${externalLinkBorderLightnessDark});--bb-main__alias--hover: ${externalLinkBorderStyle}var(--cl-${externalLinkColor}-${externalLinkBorderLightnessDark});--co-main__a: var(--cl-${externalLinkColor}-${externalLinkColorLightnessDark});--co-main__alias: var(--cl-${externalLinkColor}-${externalLinkColorLightnessDark});--co-main__a--hover: var(--cl-${externalLinkColor}-${externalLinkColorLightnessDark});--co-main__alias--hover: var(--cl-${externalLinkColor}-${externalLinkColorLightnessDark});}}`;
      break;
    case "Dark":
      style.textContent = `:root {--fw-main__a: ${settings["css-external-link-weight"]};--fw-main__alias: ${settings["css-external-link-weight"]};--bb-main__a: ${externalLinkBorderStyle}var(--cl-${externalLinkColor}-${externalLinkBorderLightnessDark});--bb-main__alias: ${externalLinkBorderStyle}var(--cl-${externalLinkColor}-${externalLinkBorderLightnessDark});--bb-main__a--hover: ${externalLinkBorderStyle}var(--cl-${externalLinkColor}-${externalLinkBorderLightnessDark});--bb-main__alias--hover: ${externalLinkBorderStyle}var(--cl-${externalLinkColor}-${externalLinkBorderLightnessDark});--co-main__a: var(--cl-${externalLinkColor}-${externalLinkColorLightnessDark});--co-main__alias: var(--cl-${externalLinkColor}-${externalLinkColorLightnessDark});--co-main__a--hover: var(--cl-${externalLinkColor}-${externalLinkColorLightnessDark});--co-main__alias--hover: var(--cl-${externalLinkColor}-${externalLinkColorLightnessDark})`;
      break;
    case "Light":
      style.textContent = `:root {--fw-main__a: ${settings["css-external-link-weight"]};--fw-main__alias: ${settings["css-external-link-weight"]};--bb-main__a: ${externalLinkBorderStyle}var(--cl-${externalLinkColor}-${externalLinkBorderLightness});--bb-main__alias: ${externalLinkBorderStyle}var(--cl-${externalLinkColor}-${externalLinkBorderLightness});--bb-main__a--hover: ${externalLinkBorderStyle}var(--cl-${externalLinkColor}-${externalLinkBorderLightness});--bb-main__alias--hover: ${externalLinkBorderStyle}var(--cl-${externalLinkColor}-${externalLinkBorderLightness});--co-main__a: var(--cl-${externalLinkColor}-${externalLinkColorLightness});--co-main__alias: var(--cl-${externalLinkColor}-${externalLinkColorLightness});--co-main__external-link--hover: var(--cl-${externalLinkColor}-${externalLinkColorLightness});--co-main__a--hover: var(--cl-${externalLinkColor}-${externalLinkColorLightness});--co-main__alias--hover: var(--cl-${externalLinkColor}-${externalLinkColorLightness});`;
      break;
  }
  head.appendChild(style);
}

function changePageLink() {
  var pageLinkColor: string;
  var pageLinkColorLightness: number;
  var pageLinkColorLightnessDark: number;
  var pageLinkBorderStyle: string;
  var pageLinkBorderLightness: number;
  var pageLinkBorderLightnessDark: number;

  console.log("Switching page link color: " + settings["css-page-link-color"]);
  
  if (document.getElementById("roamstudio-css-page-link-color")) {
    document.getElementById("roamstudio-css-page-link-color").remove();
  }

  pageLinkColorLightness = 600;

  switch (settings["css-theme"]) {
    case "Quattro":
      pageLinkColor = "gray";
      pageLinkColorLightness = 900;
      pageLinkBorderStyle = "1px solid ";
      pageLinkBorderLightness = 900;
      break;

    case "Craft":
      pageLinkColor = "gray";
      pageLinkColorLightness = 900;
      pageLinkBorderStyle = "3px solid ";
      pageLinkBorderLightness = 300;
      break;

    case "Things":
      pageLinkColor = "gray";
      pageLinkColorLightness = 700;
      pageLinkBorderStyle = "0px solid ";
      pageLinkBorderLightness = 900;
      break;
  }
  
  if (settings["css-page-link-color"] != "Theme Default") {
    pageLinkColor = settings["css-page-link-color"];
  }

  switch (settings["css-page-link-color-lightness"]) {
    case "lightest":
      pageLinkColorLightness = 100;
      break;
    case "lighter":
      pageLinkColorLightness = 200;
      break;
    case "light":
      pageLinkColorLightness = 300;
      break;
    case "medium":
      pageLinkColorLightness = 500;
      break;
    case "dark":
      pageLinkColorLightness = 600;
      break;
    case "darker":
      pageLinkColorLightness = 800;
      break;
    case "darkest":
      pageLinkColorLightness = 900;
      break;
  }
  
  switch (settings["css-page-link-border-lightness"]) {
    case "lightest":
      pageLinkBorderLightness = 100;
      break;
    case "lighter":
      pageLinkBorderLightness = 200;
      break;
    case "light":
      pageLinkBorderLightness = 300;
      break;
    case "medium":
      pageLinkBorderLightness = 500;
      break;
    case "dark":
      pageLinkBorderLightness = 600;
      break;
    case "darker":
      pageLinkBorderLightness = 800;
      break;
    case "darkest":
      pageLinkBorderLightness = 900;
      break;
  }

  if (settings["css-page-link-style"] != "Theme Default") {
    switch (settings["css-page-link-style"]) {
      case "No underline":
        pageLinkBorderStyle = "0px solid ";
        break;
      case "Dotted underline":
        pageLinkBorderStyle = "1px dotted ";
        break;
      case "Thin underline":
        pageLinkBorderStyle = "1px solid ";
        break;
      case "Medium underline":
        pageLinkBorderStyle = "2px solid ";
        break;
      case "Fat underline":
        pageLinkBorderStyle = "3px solid ";
        break;
    }
  }

  pageLinkColorLightnessDark = 1000 - pageLinkColorLightness;
  pageLinkBorderLightnessDark = 1000 - pageLinkBorderLightness;

  var head = document.getElementsByTagName("head")[0];
  var style = document.createElement("style");

  style.id = "roamstudio-css-page-link-color";
  switch (settings["css-appearance"]) {
    case "Auto":
      style.textContent =
        `:root {--fw-main__page-link: ${settings["css-page-link-weight"]};--bb-main__page-link: ${pageLinkBorderStyle}var(--cl-${pageLinkColor}-${pageLinkBorderLightness});--bb-main__page-link--hover: ${pageLinkBorderStyle}var(--cl-${pageLinkColor}-${pageLinkBorderLightness});--co-main__page-link: var(--cl-${pageLinkColor}-${pageLinkColorLightness});--co-main__page-link--hover: var(--cl-${pageLinkColor}-${pageLinkColorLightness});}` +
        `@media (prefers-color-scheme: dark) {:root {--fw-main__page-link: ${settings["css-page-link-weight"]};--bb-main__page-link: ${pageLinkBorderStyle}var(--cl-${pageLinkColor}-${pageLinkBorderLightnessDark});--bb-main__page-link--hover: ${pageLinkBorderStyle}var(--cl-${pageLinkColor}-${pageLinkBorderLightnessDark});--co-main__page-link: var(--cl-${pageLinkColor}-${pageLinkColorLightnessDark});--co-main__page-link--hover: var(--cl-${pageLinkColor}-${pageLinkColorLightnessDark});}}`;
      break;
    case "Dark":
      style.textContent = `:root {--fw-main__page-link: ${settings["css-page-link-weight"]};--bb-main__page-link: ${pageLinkBorderStyle}var(--cl-${pageLinkColor}-${pageLinkBorderLightnessDark});--bb-main__page-link--hover: ${pageLinkBorderStyle}var(--cl-${pageLinkColor}-${pageLinkBorderLightnessDark});--co-main__page-link: var(--cl-${pageLinkColor}-${pageLinkColorLightnessDark});--co-main__page-link--hover: var(--cl-${pageLinkColor}-${pageLinkColorLightnessDark});}`;
      break;
    case "Light":
      style.textContent = `:root {--fw-main__page-link: ${settings["css-page-link-weight"]};--bb-main__page-link: ${pageLinkBorderStyle}var(--cl-${pageLinkColor}-${pageLinkBorderLightness});--bb-main__page-link--hover: ${pageLinkBorderStyle}var(--cl-${pageLinkColor}-${pageLinkBorderLightness});--co-main__page-link: var(--cl-${pageLinkColor}-${pageLinkColorLightness});--co-main__page-link--hover: var(--cl-${pageLinkColor}-${pageLinkColorLightness});}`;
      break;
  }
  head.appendChild(style);
}

function changeReferenceLink() {
  var referenceLinkColor: string;
  var referenceLinkColorLightness: number;
  var referenceLinkColorLightnessDark: number;
  var referenceLinkBorderStyle: string;
  var referenceLinkBorderLightness: number;
  var referenceLinkBorderLightnessDark: number;

  console.log("Switching reference link color:" + settings["css-reference-link-color"]);
  if (document.getElementById("roamstudio-css-reference-link-color")) {
    document.getElementById("roamstudio-css-reference-link-color").remove();
  }

  referenceLinkColorLightness = 600;

  switch (settings["css-theme"]) {
    case "Quattro":
      referenceLinkColor = "gray";
      referenceLinkColorLightness = 900;
      referenceLinkBorderStyle = "1px solid ";
      referenceLinkBorderLightness = 900;
      break;

    case "Craft":
      referenceLinkColor = "accent";
      referenceLinkColorLightness = 900;
      referenceLinkBorderStyle = "3px solid ";
      referenceLinkBorderLightness = 300;
      break;

    case "Things":
      referenceLinkColor = "gray";
      referenceLinkColorLightness = 700;
      referenceLinkBorderStyle = "0px solid ";
      referenceLinkBorderLightness = 900;
      break;
  }
  
  if (settings["css-reference-link-color"] != "Theme Default") {
    referenceLinkColor = settings["css-reference-link-color"];
  }

  switch (settings["css-reference-link-color-lightness"]) {
    case "lightest":
      referenceLinkColorLightness = 100;
      break;
    case "lighter":
      referenceLinkColorLightness = 200;
      break;
    case "light":
      referenceLinkColorLightness = 300;
      break;
    case "medium":
      referenceLinkColorLightness = 500;
      break;
    case "dark":
      referenceLinkColorLightness = 600;
      break;
    case "darker":
      referenceLinkColorLightness = 800;
      break;
    case "darkest":
      referenceLinkColorLightness = 900;
      break;
  }
  
  switch (settings["css-reference-link-border-lightness"]) {
    case "lightest":
      referenceLinkBorderLightness = 100;
      break;
    case "lighter":
      referenceLinkBorderLightness = 200;
      break;
    case "light":
      referenceLinkBorderLightness = 300;
      break;
    case "medium":
      referenceLinkBorderLightness = 500;
      break;
    case "dark":
      referenceLinkBorderLightness = 600;
      break;
    case "darker":
      referenceLinkBorderLightness = 800;
      break;
    case "darkest":
      referenceLinkBorderLightness = 900;
      break;
  }

  if (settings["css-reference-link-style"] != "Theme Default") {
    switch (settings["css-reference-link-style"]) {
      case "No underline":
        referenceLinkBorderStyle = "0px solid ";
        break;
      case "Dotted underline":
        referenceLinkBorderStyle = "1px dotted ";
        break;
      case "Thin underline":
        referenceLinkBorderStyle = "1px solid ";
        break;
      case "Medium underline":
        referenceLinkBorderStyle = "2px solid ";
        break;
      case "Fat underline":
        referenceLinkBorderStyle = "3px solid ";
        break;
    }
  }

  referenceLinkColorLightnessDark = 1000 - referenceLinkColorLightness;
  referenceLinkBorderLightnessDark = 1000 - referenceLinkBorderLightness;

  var head = document.getElementsByTagName("head")[0];
  var style = document.createElement("style");

  style.id = "roamstudio-css-reference-link-color";
  
  switch (settings["css-appearance"]) {
    case "Auto":
      style.textContent = `:root {--fw-reference__page-title: ${settings["css-reference-link-weight"]};--bb-reference__page-title: ${referenceLinkBorderStyle}var(--cl-${referenceLinkColor}-${referenceLinkBorderLightness});--bb-reference__page-title--hover: ${referenceLinkBorderStyle}var(--cl-${referenceLinkColor}-${referenceLinkBorderLightness});--co-reference__page-title: var(--cl-${referenceLinkColor}-${referenceLinkColorLightness});--co-reference__page-title--hover: var(--cl-${referenceLinkColor}-${referenceLinkColorLightness});}` +
        `@media (prefers-color-scheme: dark) {:root {--fw-reference__page-title: ${settings["css-reference-link-weight"]};--bb-reference__page-title: ${referenceLinkBorderStyle}var(--cl-${referenceLinkColor}-${referenceLinkBorderLightnessDark});--bb-reference__page-title--hover: ${referenceLinkBorderStyle}var(--cl-${referenceLinkColor}-${referenceLinkBorderLightnessDark});--co-reference__page-title: var(--cl-${referenceLinkColor}-${referenceLinkColorLightnessDark});--co-reference__page-title--hover: var(--cl-${referenceLinkColor}-${referenceLinkColorLightnessDark});}}`;
      break;
    case "Dark":
      style.textContent = `:root {--fw-reference__page-title: ${settings["css-reference-link-weight"]};--bb-reference__page-title: ${referenceLinkBorderStyle}var(--cl-${referenceLinkColor}-${referenceLinkBorderLightnessDark});--bb-reference__page-title--hover: ${referenceLinkBorderStyle}var(--cl-${referenceLinkColor}-${referenceLinkBorderLightnessDark});--co-reference__page-title: var(--cl-${referenceLinkColor}-${referenceLinkColorLightnessDark});--co-reference__page-title--hover: var(--cl-${referenceLinkColor}-${referenceLinkColorLightnessDark});}`;
      break;
    case "Light":
      style.textContent = `:root {--fw-reference__page-title: ${settings["css-reference-link-weight"]};--bb-reference__page-title: ${referenceLinkBorderStyle}var(--cl-${referenceLinkColor}-${referenceLinkBorderLightness});--bb-reference__page-title--hover: ${referenceLinkBorderStyle}var(--cl-${referenceLinkColor}-${referenceLinkBorderLightness});--co-reference__page-title: var(--cl-${referenceLinkColor}-${referenceLinkColorLightness});--co-reference__page-title--hover: var(--cl-${referenceLinkColor}-${referenceLinkColorLightness});}`;
      break;
  }
  head.appendChild(style);
}

function changeBlockLink() {
  var blockLinkColor: string;
  var blockLinkColorLightness: number;
  var blockLinkColorLightnessDark: number;
  var blockLinkBorderStyle: string;
  var blockLinkBorderLightness: number;
  var blockLinkBorderLightnessDark: number;

  console.log("Switching block link color:" + settings["css-block-link-color"]);
  if (document.getElementById("roamstudio-css-block-link-color")) {
    document.getElementById("roamstudio-css-block-link-color").remove();
  }

  blockLinkColorLightness = 600;

  switch (settings["css-theme"]) {
    case "Quattro":
      blockLinkColor = "gray";
      blockLinkColorLightness = 900;
      blockLinkBorderStyle = "1px dotted ";
      blockLinkBorderLightness = 300;
      break;

    case "Craft":
      blockLinkColor = "gray";
      blockLinkColorLightness = 900;
      blockLinkBorderStyle = "1px dotted ";
      blockLinkBorderLightness = 300;
      break;

    case "Things":
      blockLinkColor = "gray";
      blockLinkColorLightness = 900;
      blockLinkBorderStyle = "1px dotted ";
      blockLinkBorderLightness = 300;
      break;
  }
  
  if (settings["css-block-link-color"] != "Theme Default") {
    blockLinkColor = settings["css-block-link-color"];
  }

  switch (settings["css-block-link-color-lightness"]) {
    case "lightest":
      blockLinkColorLightness = 100;
      break;
    case "lighter":
      blockLinkColorLightness = 200;
      break;
    case "light":
      blockLinkColorLightness = 300;
      break;
    case "medium":
      blockLinkColorLightness = 500;
      break;
    case "dark":
      blockLinkColorLightness = 600;
      break;
    case "darker":
      blockLinkColorLightness = 800;
      break;
    case "darkest":
      blockLinkColorLightness = 900;
      break;
  }
  
  switch (settings["css-block-link-border-lightness"]) {
    case "lightest":
      blockLinkBorderLightness = 100;
      break;
    case "lighter":
      blockLinkBorderLightness = 200;
      break;
    case "light":
      blockLinkBorderLightness = 300;
      break;
    case "medium":
      blockLinkBorderLightness = 500;
      break;
    case "dark":
      blockLinkBorderLightness = 600;
      break;
    case "darker":
      blockLinkBorderLightness = 800;
      break;
    case "darkest":
      blockLinkBorderLightness = 900;
      break;
  }

  if (settings["css-block-link-style"] != "Theme Default") {
    switch (settings["css-block-link-style"]) {
      case "No underline":
        blockLinkBorderStyle = "0px solid ";
        break;
      case "Dotted underline":
        blockLinkBorderStyle = "1px dotted ";
        break;
      case "Thin underline":
        blockLinkBorderStyle = "1px solid ";
        break;
      case "Medium underline":
        blockLinkBorderStyle = "2px solid ";
        break;
      case "Fat underline":
        blockLinkBorderStyle = "3px solid ";
        break;
    }
  }

  blockLinkColorLightnessDark = 1000 - blockLinkColorLightness;
  blockLinkBorderLightnessDark = 1000 - blockLinkBorderLightness;

  var head = document.getElementsByTagName("head")[0];
  var style = document.createElement("style");

  style.id = "roamstudio-css-block-link-color";
  
  switch (settings["css-appearance"]) {
    case "Auto":
      style.textContent = `:root {--fw-main__block-ref: ${settings["css-block-link-weight"]};--bb-main__block-ref: ${blockLinkBorderStyle}var(--cl-${blockLinkColor}-${blockLinkBorderLightness});--bb-main__block-ref--hover: ${blockLinkBorderStyle}var(--cl-${blockLinkColor}-${blockLinkBorderLightness});--co-main__block-ref: var(--cl-${blockLinkColor}-${blockLinkColorLightness});--co-main__block-ref--hover: var(--cl-${blockLinkColor}-${blockLinkColorLightness});}` +
        `@media (prefers-color-scheme: dark) {:root {--fw-main__block-ref: ${settings["css-block-link-weight"]};--bb-main__block-ref: ${blockLinkBorderStyle}var(--cl-${blockLinkColor}-${blockLinkBorderLightnessDark});--bb-main__block-ref--hover: ${blockLinkBorderStyle}var(--cl-${blockLinkColor}-${blockLinkBorderLightnessDark});--co-main__block-ref: var(--cl-${blockLinkColor}-${blockLinkColorLightnessDark});--co-main__block-ref--hover: var(--cl-${blockLinkColor}-${blockLinkColorLightnessDark});}}`;
      break;
    case "Dark":
      style.textContent = `:root {--fw-main__block-ref: ${settings["css-block-link-weight"]};--bb-main__block-ref: ${blockLinkBorderStyle}var(--cl-${blockLinkColor}-${blockLinkBorderLightnessDark});--bb-main__block-ref--hover: ${blockLinkBorderStyle}var(--cl-${blockLinkColor}-${blockLinkBorderLightnessDark});--co-main__block-ref: var(--cl-${blockLinkColor}-${blockLinkColorLightnessDark});--co-main__block-ref--hover: var(--cl-${blockLinkColor}-${blockLinkColorLightnessDark});}`;
      break;
    case "Light":
      style.textContent = `:root {--fw-main__block-ref: ${settings["css-block-link-weight"]};--bb-main__block-ref: ${blockLinkBorderStyle}var(--cl-${blockLinkColor}-${blockLinkBorderLightness});--bb-main__block-ref--hover: ${blockLinkBorderStyle}var(--cl-${blockLinkColor}-${blockLinkBorderLightness});--co-main__block-ref: var(--cl-${blockLinkColor}-${blockLinkColorLightness});--co-main__block-ref--hover: var(--cl-${blockLinkColor}-${blockLinkColorLightness});}`;
      break;
  }
  head.appendChild(style);
}

function changeTag() {
  var tagColorLightness: number;
  var tagBackgroundLightness: number;
  var tagColorLightnessDark: number;
  var tagBackgroundLightnessDark: number;

  var tagColorLightnessStr: string;
  var tagBackgroundLightnessStr: string;
  var tagColorLightnessDarkStr: string;
  var tagBackgroundLightnessDarkStr: string;
  var tagBorderStyle: string;
  var tagFontSize: string;

  var tagColor: string;
  var tagBackground: string;
  var tagPadding: string;
  var tagRadius: string;

  console.log("Setting tags");
  if (document.getElementById("roamstudio-css-tag")) {
    document.getElementById("roamstudio-css-tag").remove();
  }

  switch (settings["css-theme"]) {
    case "Quattro":
      tagColor = "gray";
      tagBackground = "trans";
      tagColorLightness = 900;
      tagBackgroundLightness = 100;
      tagColorLightnessDark = 400;
      tagBackgroundLightnessDark = 900;
      tagPadding = "0";
      tagRadius = "0";
      tagBorderStyle = "1px solid";
      tagFontSize = "1rem";
      break;

    case "Craft":
      tagColor = "gray";
      tagBackground = "gray";
      tagColorLightness = 600;
      tagBackgroundLightness = 150;
      tagColorLightnessDark = 450;
      tagBackgroundLightnessDark = 750;
      tagPadding = "2px 8px";
      tagRadius = "15px";
      tagBorderStyle = "none";
      tagFontSize = "0.9rem";
      break;

    case "Things":
      tagColor = "accGreen";
      tagBackground = "accGreen";
      tagColorLightness = 900;
      tagBackgroundLightness = 300;
      tagColorLightnessDark = 100;
      tagBackgroundLightnessDark = 800;
      tagPadding = "2px 8px";
      tagRadius = "15px";
      tagBorderStyle = "none";
      tagFontSize = "0.9rem";
      break;
  }

  switch (settings["css-tag-color-lightness"]) {
    case "lightest":
      tagColorLightness = 100;
      break;
    case "lighter":
      tagColorLightness = 200;
      break;
    case "light":
      tagColorLightness = 300;
      break;
    case "medium":
      tagColorLightness = 500;
      break;
    case "dark":
      tagColorLightness = 600;
      break;
    case "darker":
      tagColorLightness = 800;
      break;
    case "darkest":
      tagColorLightness = 900;
      break;
  }

  switch (settings["css-tag-background-lightness"]) {
    case "lightest":
      tagBackgroundLightness = 100;
      break;
    case "lighter":
      tagBackgroundLightness = 200;
      break;
    case "light":
      tagBackgroundLightness = 300;
      break;
    case "medium":
      tagBackgroundLightness = 500;
      break;
    case "dark":
      tagBackgroundLightness = 600;
      break;
    case "darker":
      tagBackgroundLightness = 800;
      break;
    case "darkest":
      tagBackgroundLightness = 900;
      break;
  }

  switch (settings["css-tag-padding"]) {
    case "None":
      tagPadding = "0";
      break;
    case "Slight":
      tagPadding = "1px 2px";
      break;
    case "Medium":
      tagPadding = "2px 5px";
      break;
    case "Large":
      tagPadding = "2px 10px";
      break;
  }

  switch (settings["css-tag-style"]) {
    case "No underline":
      tagBorderStyle = "0px solid ";
      break;
    case "Thin underline":
      tagBorderStyle = "1px solid ";
      break;
    case "Medium underline":
      tagBorderStyle = "2px solid ";
      break;
    case "Fat underline":
      tagBorderStyle = "3px solid ";
      break;
  }

  switch (settings["css-tag-font-size"]) {
    case "Text":
      tagFontSize = "1rem";
      break;
    case "extra small":
      tagFontSize = "0.9rem";
      break;
    case "small":
      tagFontSize = "0.95rem";
      break;
    case "medium":
      tagFontSize = "1rem";
      break;
    case "large":
      tagFontSize = "1.05rem";
      break;
    case "extra large":
      tagFontSize = "1.1rem";
      break;
  }

  switch (settings["css-tag-radius"]) {
    case "No radius":
      tagRadius = "0";
      break;
    case "Slight":
      tagRadius = "2";
      break;
    case "Medium":
      tagRadius = "5";
      break;
    case "Heavy":
      tagRadius = "10";
      break;
  }

  tagColorLightnessDark = 1000 - tagColorLightness;
  tagBackgroundLightnessDark = 1000 - tagBackgroundLightness;

  if (settings["css-tag-color"] != "Theme Default") {
    tagColor = settings["css-tag-color"];
  }

  if (settings["css-tag-background"] != "Theme Default") {
    tagBackground = settings["css-tag-background"];
  }

  if (tagColor == "white" || tagColor == "black") {
    tagColorLightnessStr = "";
    tagColorLightnessDarkStr = "";
  } else {
    tagColorLightnessStr = "-" + tagColorLightness;
    tagColorLightnessDarkStr = "-" + tagColorLightnessDark;
  }

  if (tagBackground == "white" || tagBackground == "black") {
    tagBackgroundLightnessStr = "";
    tagBackgroundLightnessDarkStr = "";
  } else {
    tagBackgroundLightnessStr = "-" + tagBackgroundLightness;
    tagBackgroundLightnessDarkStr = "-" + tagBackgroundLightnessDark;
  }

  var head = document.getElementsByTagName("head")[0];
  var style = document.createElement("style");
  style.id = "roamstudio-css-tag";
  switch (settings["css-appearance"]) {
    case "Auto":
      style.textContent =
        `.rm-page-ref--tag, span[data-tag="tags"], .rm-page-ref--tag:hover {padding: ${tagPadding};}` +
        `:root {--bd-main__tags: ${tagRadius}px;--bd-main__tags--hover: ${tagRadius}px;--fs-main__tags: ${tagFontSize};--bb-main__tags: ${tagBorderStyle}var(--cl-${tagColor}-600);--bb-main__tags--hover: ${tagBorderStyle}var(--cl-${tagColor}-600);--co-main__tags: var(--cl-${tagColor}${tagColorLightnessStr});--co-main__tags--hover: var(--cl-${tagColor}${tagColorLightnessStr});--bc-main__tags: var(--cl-${tagBackground}${tagBackgroundLightnessStr});--bc-main__tags--hover: var(--cl-${tagBackground}${tagBackgroundLightnessStr});}` +
        `@media (prefers-color-scheme: dark) {.rm-page-ref--tag, span[data-tag="tags"], .rm-page-ref--tag:hover {padding: ${tagPadding};}` +
        `:root {--bd-main__tags: ${tagRadius}px;--bd-main__tags--hover: ${tagRadius}px;--fs-main__tags: ${tagFontSize};--bb-main__tags: ${tagBorderStyle}var(--cl-${tagColor}-400);--bb-main__tags--hover: ${tagBorderStyle}var(--cl-${tagColor}-400);--co-main__tags: var(--cl-${tagColor}${tagColorLightnessDarkStr});--co-main__tags--hover: var(--cl-${tagColor}${tagColorLightnessDarkStr});--bc-main__tags: var(--cl-${tagBackground}${tagBackgroundLightnessDarkStr});--bc-main__tags--hover: var(--cl-${tagBackground}${tagBackgroundLightnessDarkStr});}}`;
      break;
    case "Dark":
      style.textContent =
        `.rm-page-ref--tag, span[data-tag="tags"], .rm-page-ref--tag:hover {padding: ${tagPadding};}` +
        `:root {--bd-main__tags: ${tagRadius}px;--bd-main__tags--hover: ${tagRadius}px;--fs-main__tags: ${tagFontSize};--bb-main__tags: ${tagBorderStyle}var(--cl-${tagColor}-400);--bb-main__tags--hover: ${tagBorderStyle}var(--cl-${tagColor}-400);--co-main__tags: var(--cl-${tagColor}${tagColorLightnessDarkStr});--co-main__tags--hover: var(--cl-${tagColor}${tagColorLightnessDarkStr});--bc-main__tags: var(--cl-${tagBackground}${tagBackgroundLightnessDarkStr});--bc-main__tags--hover: var(--cl-${tagBackground}${tagBackgroundLightnessDarkStr});}`;
      break;
    case "Light":
      style.textContent =
        `.rm-page-ref--tag, span[data-tag="tags"], .rm-page-ref--tag:hover {padding: ${tagPadding};}` +
        `:root {--bd-main__tags: ${tagRadius}px;--bd-main__tags--hover: ${tagRadius}px;--fs-main__tags: ${tagFontSize};--bb-main__tags: ${tagBorderStyle}var(--cl-${tagColor}-600);--bb-main__tags--hover: ${tagBorderStyle}var(--cl-${tagColor}-600);--co-main__tags: var(--cl-${tagColor}${tagColorLightnessStr});--co-main__tags--hover: var(--cl-${tagColor}${tagColorLightnessStr});--bc-main__tags: var(--cl-${tagBackground}${tagBackgroundLightnessStr});--bc-main__tags--hover: var(--cl-${tagBackground}${tagBackgroundLightnessStr});}`;
      break;
  }
  head.appendChild(style);
}

function changeDate() {
  var dateColorLightness: number;
  var dateBackgroundLightness: number;
  var dateColorLightnessDark: number;
  var dateBackgroundLightnessDark: number;

  var dateColorLightnessStr: string;
  var dateBackgroundLightnessStr: string;
  var dateColorLightnessDarkStr: string;
  var dateBackgroundLightnessDarkStr: string;
  var dateBorderStyle: string;
  var dateFontSize: string;

  var dateColor: string;
  var dateBackground: string;
  var datePadding: string;
  var dateRadius: string;

  console.log("Setting dates");
  if (document.getElementById("roamstudio-css-date")) {
    document.getElementById("roamstudio-css-date").remove();
  }

  switch (settings["css-theme"]) {
    case "Quattro":
      dateColor = "gray";
      dateBackground = "trans";
      dateColorLightness = 900;
      dateBackgroundLightness = 100;
      dateColorLightnessDark = 400;
      dateBackgroundLightnessDark = 900;
      datePadding = "0";
      dateRadius = "0";
      dateBorderStyle = "1px solid";
      dateFontSize = "1rem";
      break;

    case "Craft":
      dateColor = "gray";
      dateBackground = "gray";
      dateColorLightness = 600;
      dateBackgroundLightness = 150;
      dateColorLightnessDark = 450;
      dateBackgroundLightnessDark = 750;
      datePadding = "2px 8px";
      dateRadius = "15px";
      dateBorderStyle = "none";
      dateFontSize = "0.9rem";
      break;

    case "Things":
      dateColor = "accGreen";
      dateBackground = "accGreen";
      dateColorLightness = 900;
      dateBackgroundLightness = 300;
      dateColorLightnessDark = 100;
      dateBackgroundLightnessDark = 800;
      datePadding = "2px 8px";
      dateRadius = "15px";
      dateBorderStyle = "none";
      dateFontSize = "0.9rem";
      break;
  }

  switch (settings["css-date-color-lightness"]) {
    case "lightest":
      dateColorLightness = 100;
      break;
    case "lighter":
      dateColorLightness = 200;
      break;
    case "light":
      dateColorLightness = 300;
      break;
    case "medium":
      dateColorLightness = 500;
      break;
    case "dark":
      dateColorLightness = 600;
      break;
    case "darker":
      dateColorLightness = 800;
      break;
    case "darkest":
      dateColorLightness = 900;
      break;
  }

  switch (settings["css-date-background-lightness"]) {
    case "lightest":
      dateBackgroundLightness = 100;
      break;
    case "lighter":
      dateBackgroundLightness = 200;
      break;
    case "light":
      dateBackgroundLightness = 300;
      break;
    case "medium":
      dateBackgroundLightness = 500;
      break;
    case "dark":
      dateBackgroundLightness = 600;
      break;
    case "darker":
      dateBackgroundLightness = 800;
      break;
    case "darkest":
      dateBackgroundLightness = 900;
      break;
  }

  switch (settings["css-date-padding"]) {
    case "None":
      datePadding = "0";
      break;
    case "Slight":
      datePadding = "1px 2px";
      break;
    case "Medium":
      datePadding = "2px 5px";
      break;
    case "Large":
      datePadding = "2px 10px";
      break;
  }

  switch (settings["css-date-style"]) {
    case "No underline":
      dateBorderStyle = "0px solid ";
      break;
    case "Thin underline":
      dateBorderStyle = "1px solid ";
      break;
    case "Medium underline":
      dateBorderStyle = "2px solid ";
      break;
    case "Fat underline":
      dateBorderStyle = "3px solid ";
      break;
  }

  switch (settings["css-date-font-size"]) {
    case "Text":
      dateFontSize = "1rem";
      break;
    case "extra small":
      dateFontSize = "0.9rem";
      break;
    case "small":
      dateFontSize = "0.95rem";
      break;
    case "medium":
      dateFontSize = "1rem";
      break;
    case "large":
      dateFontSize = "1.05rem";
      break;
    case "extra large":
      dateFontSize = "1.1rem";
      break;
  }

  switch (settings["css-date-radius"]) {
    case "No radius":
      dateRadius = "0";
      break;
    case "Slight":
      dateRadius = "2";
      break;
    case "Medium":
      dateRadius = "5";
      break;
    case "Heavy":
      dateRadius = "10";
      break;
  }

  dateColorLightnessDark = 1000 - dateColorLightness;
  dateBackgroundLightnessDark = 1000 - dateBackgroundLightness;

  if (settings["css-date-color"] != "Theme Default") {
    dateColor = settings["css-date-color"];
  }

  if (settings["css-date-background"] != "Theme Default") {
    dateBackground = settings["css-date-background"];
  }

  if (dateColor == "white" || dateColor == "black") {
    dateColorLightnessStr = "";
    dateColorLightnessDarkStr = "";
  } else {
    dateColorLightnessStr = "-" + dateColorLightness;
    dateColorLightnessDarkStr = "-" + dateColorLightnessDark;
  }

  if (dateBackground == "white" || dateBackground == "black") {
    dateBackgroundLightnessStr = "";
    dateBackgroundLightnessDarkStr = "";
  } else {
    dateBackgroundLightnessStr = "-" + dateBackgroundLightness;
    dateBackgroundLightnessDarkStr = "-" + dateBackgroundLightnessDark;
  }

  var head = document.getElementsByTagName("head")[0];
  var style = document.createElement("style");
  style.id = "roamstudio-css-date";
  switch (settings["css-appearance"]) {
    case "Auto":
      style.textContent =
        `:is(span[data-link-uid*="-17"],span[data-link-uid*="-18"],span[data-link-uid*="-19"],span[data-link-uid*="-20"],span[data-link-uid*="-21"]) .rm-page-ref,:is(span[data-link-uid*="-17"],span[data-link-uid*="-18"],span[data-link-uid*="-19"],span[data-link-uid*="-20"],span[data-link-uid*="-21"]) .rm-page-ref:hover {padding: ${datePadding};}` +
        `:root {--bd-main__date-link: ${dateRadius}px;--bd-main__date-link--hover: ${dateRadius}px;--fs-main__date-link: ${dateFontSize};--bb-main__date-link: ${dateBorderStyle}var(--cl-${dateColor}-600);--bb-main__date-link--hover: ${dateBorderStyle}var(--cl-${dateColor}-600);--co-main__date-link: var(--cl-${dateColor}${dateColorLightnessStr});--co-main__date-link--hover: var(--cl-${dateColor}${dateColorLightnessStr});--bc-main__date-link: var(--cl-${dateBackground}${dateBackgroundLightnessStr});--bc-main__date-link--hover: var(--cl-${dateBackground}${dateBackgroundLightnessStr});}` +
        `@media (prefers-color-scheme: dark) {:is(span[data-link-uid*="-17"],span[data-link-uid*="-18"],span[data-link-uid*="-19"],span[data-link-uid*="-20"],span[data-link-uid*="-21"]) .rm-page-ref,:is(span[data-link-uid*="-17"],span[data-link-uid*="-18"],span[data-link-uid*="-19"],span[data-link-uid*="-20"],span[data-link-uid*="-21"]) .rm-page-ref:hover {padding: ${datePadding};}` +
        `:root {--bd-main__date-link: ${dateRadius}px;--bd-main__date-link--hover: ${dateRadius}px;--fs-main__date-link: ${dateFontSize};--bb-main__date-link: ${dateBorderStyle}var(--cl-${dateColor}-400);--bb-main__date-link--hover: ${dateBorderStyle}var(--cl-${dateColor}-400);--co-main__date-link: var(--cl-${dateColor}${dateColorLightnessDarkStr});--co-main__date-link--hover: var(--cl-${dateColor}${dateColorLightnessDarkStr});--bc-main__date-link: var(--cl-${dateBackground}${dateBackgroundLightnessDarkStr});--bc-main__date-link--hover: var(--cl-${dateBackground}${dateBackgroundLightnessDarkStr});}}`;
      break;
    case "Dark":
      style.textContent =
        `:is(span[data-link-uid*="-17"],span[data-link-uid*="-18"],span[data-link-uid*="-19"],span[data-link-uid*="-20"],span[data-link-uid*="-21"]) .rm-page-ref,:is(span[data-link-uid*="-17"],span[data-link-uid*="-18"],span[data-link-uid*="-19"],span[data-link-uid*="-20"],span[data-link-uid*="-21"]) .rm-page-ref:hover {padding: ${datePadding};}` +
        `:root {--bd-main__date-link: ${dateRadius}px;--bd-main__date-link--hover: ${dateRadius}px;--fs-main__date-link: ${dateFontSize};--bb-main__date-link: ${dateBorderStyle}var(--cl-${dateColor}-400);--bb-main__date-link--hover: ${dateBorderStyle}var(--cl-${dateColor}-400);--co-main__date-link: var(--cl-${dateColor}${dateColorLightnessDarkStr});--co-main__date-link--hover: var(--cl-${dateColor}${dateColorLightnessDarkStr});--bc-main__date-link: var(--cl-${dateBackground}${dateBackgroundLightnessDarkStr});--bc-main__date-link--hover: var(--cl-${dateBackground}${dateBackgroundLightnessDarkStr});}`;
      break;
    case "Light":
      style.textContent =
        `:is(span[data-link-uid*="-17"],span[data-link-uid*="-18"],span[data-link-uid*="-19"],span[data-link-uid*="-20"],span[data-link-uid*="-21"]) .rm-page-ref,:is(span[data-link-uid*="-17"],span[data-link-uid*="-18"],span[data-link-uid*="-19"],span[data-link-uid*="-20"],span[data-link-uid*="-21"]) .rm-page-ref:hover {padding: ${datePadding};}` +
        `:root {--bd-main__date-link: ${dateRadius}px;--bd-main__date-link--hover: ${dateRadius}px;--fs-main__date-link: ${dateFontSize};--bb-main__date-link: ${dateBorderStyle}var(--cl-${dateColor}-600);--bb-main__date-link--hover: ${dateBorderStyle}var(--cl-${dateColor}-600);--co-main__date-link: var(--cl-${dateColor}${dateColorLightnessStr});--co-main__date-link--hover: var(--cl-${dateColor}${dateColorLightnessStr});--bc-main__date-link: var(--cl-${dateBackground}${dateBackgroundLightnessStr});--bc-main__date-link--hover: var(--cl-${dateBackground}${dateBackgroundLightnessStr});}`;
      break;
  }
  head.appendChild(style);
}

function changeDateIcon() {
  console.log(
    "Switching date icon: " +
      settings["css-date-icon"] +
      " " +
      modules["css-feather-icons"]
  );

  if (document.getElementById("roamstudio-css-date-icon")) {
    document.getElementById("roamstudio-css-date-icon").remove();
  }

  if (settings["css-date-icon"] && !modules["css-feather-icons"]) {
    var head = document.getElementsByTagName("head")[0];
    var style = document.createElement("style");
    style.id = "roamstudio-css-date-icon";
    style.textContent = `:is(span[data-link-uid*="-17"],span[data-link-uid*="-18"],span[data-link-uid*="-19"],span[data-link-uid*="-20"],span[data-link-uid*="-21"]) .rm-page-ref:before {
      font-family: "Icons16",sans-serif;
      font-size: var(--fs-main__date-link);
      font-style: normal;
      font-weight: 400;
      line-height: 1;
      -moz-osx-font-smoothing: grayscale;
      -webkit-font-smoothing: antialiased;
      color: var(--co-main__date-link);
      content: '\\e62b';
      padding-right: 4px;
  }`;
    head.appendChild(style);
  }

  if (settings["css-date-icon"] && modules["css-feather-icons"]) {
    var head = document.getElementsByTagName("head")[0];
    var style = document.createElement("style");
    style.id = "roamstudio-css-date-icon";
    style.textContent = `:is(span[data-link-uid*="-17"],span[data-link-uid*="-18"],span[data-link-uid*="-19"],span[data-link-uid*="-20"],span[data-link-uid*="-21"]) .rm-page-ref:before {
      width: var(--fs-main__date-link);
      height: var(--fs-main__date-link);
      margin-bottom: calc(-1 * var(--fs-main__date-link)/8);
      margin-right: calc(var(--fs-main__date-link)/4);
      display: inline-block;
      content: "";
      background-color: var(--co-main__date-link);
      -webkit-mask-size: cover;
      mask-size: cover;
      -webkit-mask: url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'var(--fs-main__date-link)\' height=\'var(--fs-main__date-link)\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'currentColor\'  stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\' class=\'feather feather-calendar\'%3E%3Crect x=\'3\' y=\'4\' width=\'18\' height=\'18\' rx=\'2\' ry=\'2\'%3E%3C/rect%3E%3Cline x1=\'16\' y1=\'2\' x2=\'16\' y2=\'6\'%3E%3C/line%3E%3Cline x1=\'8\' y1=\'2\' x2=\'8\' y2=\'6\'%3E%3C/line%3E%3Cline x1=\'3\' y1=\'10\' x2=\'21\' y2=\'10\'%3E%3C/line%3E%3C/svg%3E")
      no-repeat 50% 50%;
      mask: url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'var(--fs-main__date-link)\' height=\'var(--fs-main__date-link)\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'currentColor\'  stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\' class=\'feather feather-calendar\'%3E%3Crect x=\'3\' y=\'4\' width=\'18\' height=\'18\' rx=\'2\' ry=\'2\'%3E%3C/rect%3E%3Cline x1=\'16\' y1=\'2\' x2=\'16\' y2=\'6\'%3E%3C/line%3E%3Cline x1=\'8\' y1=\'2\' x2=\'8\' y2=\'6\'%3E%3C/line%3E%3Cline x1=\'3\' y1=\'10\' x2=\'21\' y2=\'10\'%3E%3C/line%3E%3C/svg%3E")
      no-repeat 50% 50%;
  }`;
    head.appendChild(style);
  }
}

function changeHeadingSpacing() {
  var spacing: string;

  console.log("Changing heading spacing: " + settings["css-heading-spacing"]);
  if (document.getElementById("roamstudio-css-heading-spacing")) {
    document.getElementById("roamstudio-css-heading-spacing").remove();
  }

  if (settings["css-heading-spacing"] != "Theme Default") {
    switch (settings["css-heading-spacing"]) {
      case "small":
        spacing =
          "rm-level1, .rm-heading-level-1 > .rm-block__self .rm-block__input, .rm-heading-level-1 > .rm-block__self > .controls, .rm-heading-level-1 > .rm-block__self > .rm-block__controls {margin-top: 0rem;margin-bottom: 0rem;}" +
          "rm-level2, .rm-heading-level-2 > .rm-block__self .rm-block__input, .rm-heading-level-2 > .rm-block__self > .controls, .rm-heading-level-2 > .rm-block__self > .rm-block__controls {margin-top: 0rem;margin-bottom: 0rem;}" +
          "rm-level3, .rm-heading-level-3 > .rm-block__self .rm-block__input, .rm-heading-level-3 > .rm-block__self > .controls, .rm-heading-level-3 > .rm-block__self > .rm-block__controls {margin-top: 0rem;margin-bottom: 0rem;}";
        break;
      case "medium":
        spacing =
          "rm-level1, .rm-heading-level-1 > .rm-block__self .rm-block__input, .rm-heading-level-1 > .rm-block__self > .controls, .rm-heading-level-1 > .rm-block__self > .rm-block__controls {margin-top: 1rem;margin-bottom: 0.5rem;}" +
          "rm-level2, .rm-heading-level-2 > .rm-block__self .rm-block__input, .rm-heading-level-2 > .rm-block__self > .controls, .rm-heading-level-2 > .rm-block__self > .rm-block__controls {margin-top: 0.5rem;margin-bottom: 0.5rem;}" +
          "rm-level3, .rm-heading-level-3 > .rm-block__self .rm-block__input, .rm-heading-level-3 > .rm-block__self > .controls, .rm-heading-level-3 > .rm-block__self > .rm-block__controls {margin-top: 0.5rem;margin-bottom: 0.5rem;}";
        break;
      case "large":
        spacing =
          "rm-level1, .rm-heading-level-1 > .rm-block__self .rm-block__input, .rm-heading-level-1 > .rm-block__self > .controls, .rm-heading-level-1 > .rm-block__self > .rm-block__controls {margin-top: 2rem;margin-bottom: 1rem;}" +
          "rm-level2, .rm-heading-level-2 > .rm-block__self .rm-block__input, .rm-heading-level-2 > .rm-block__self > .controls, .rm-heading-level-2 > .rm-block__self > .rm-block__controls {margin-top: 1rem;margin-bottom: 1rem;}" +
          "rm-level3, .rm-heading-level-3 > .rm-block__self .rm-block__input, .rm-heading-level-3 > .rm-block__self > .controls, .rm-heading-level-3 > .rm-block__self > .rm-block__controls {margin-top: 1rem;margin-bottom: 1rem;}";
        break;
    }

    var head = document.getElementsByTagName("head")[0];
    var style = document.createElement("style");
    style.id = "roamstudio-css-heading-spacing";
    style.textContent = spacing;
    head.appendChild(style);
  }
}

function changeHeadingFontFamily() {
  console.log("Switching heading font family");
  if (document.getElementById("roamstudio-css-heading-font-family")) {
    document.getElementById("roamstudio-css-heading-font-family").remove();
  }

  if (settings["css-heading-font-family"] != "Theme Default") {
    var head = document.getElementsByTagName("head")[0];
    var style = document.createElement("style");
    style.id = "roamstudio-css-heading-font-family";
    if (settings["css-heading-font-family"] == "System Font Stack") {
      style.textContent = `:root {--ff-main__page-title: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";--ff-main__level1: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";--ff-main__level2: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";--ff-main__level3: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";--ff-right-sidebar__h1: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";}`;
    } else {
      style.textContent = `:root {--ff-main__page-title: ${settings["css-heading-font-family"]},sans-serif;--ff-main__level1: ${settings["css-heading-font-family"]},sans-serif;--ff-main__level2: ${settings["css-heading-font-family"]},sans-serif;--ff-main__level3: ${settings["css-heading-font-family"]},sans-serif;--ff-right-sidebar__h1: ${settings["css-heading-font-family"]},sans-serif;}`;
    }
    head.appendChild(style);
  }
}

function changeHeadingFontSize(heading: String) {
  var fontSize: number;

  console.log(
    "Switching base font size: " + settings["css-heading-" + heading + "-size"]
  );
  if (document.getElementById("roamstudio-css-heading-" + heading + "-size")) {
    document
      .getElementById("roamstudio-css-heading-" + heading + "-size")
      .remove();
  }

  if (settings["css-heading-" + heading + "-size"] != "Theme Default") {
    switch (settings["css-heading-" + heading + "-size"]) {
      case "Text":
        fontSize = 1;
        break;
      case "extra small":
        fontSize = 1.2;
        break;
      case "small":
        fontSize = 1.4;
        break;
      case "medium":
        fontSize = 1.8;
        break;
      case "large":
        fontSize = 2.4;
        break;
      case "extra large":
        fontSize = 3.2;
        break;
    }

    var head = document.getElementsByTagName("head")[0];
    var style = document.createElement("style");
    style.id = "roamstudio-css-heading-" + heading + "-size";
    style.textContent =
      ":root {" + "--fs-main__" + heading + ": " + fontSize + "rem;};";
    head.appendChild(style);
  }
}

function changeHeadingFontColor(heading: String) {
  var headingColorLightness: number;
  var headingColorLightnessDark: number;

  console.log(
    "Switching heading link color: " +
      settings["css-heading-" + heading + "-color"]
  );

  if (document.getElementById("roamstudio-css-heading-" + heading + "-color")) {
    document
      .getElementById("roamstudio-css-heading-" + heading + "-color")
      .remove();
  }

  headingColorLightness = 600;

  switch (settings["css-heading-" + heading + "-color-lightness"]) {
    case "lightest":
      headingColorLightness = 100;
      break;
    case "lighter":
      headingColorLightness = 200;
      break;
    case "light":
      headingColorLightness = 300;
      break;
    case "medium":
      headingColorLightness = 500;
      break;
    case "dark":
      headingColorLightness = 600;
      break;
    case "darker":
      headingColorLightness = 800;
      break;
    case "darkest":
      headingColorLightness = 900;
      break;
  }

  headingColorLightnessDark = 1000 - headingColorLightness;

  if (settings["css-heading-" + heading + "-color"] != "Theme Default") {
    var head = document.getElementsByTagName("head")[0];
    var style = document.createElement("style");
    style.id = "roamstudio-css-heading-" + heading + "-color";
    switch (settings["css-appearance"]) {
      case "Auto":
        style.textContent =
          `:root {--co-main__${heading}: var(--cl-${
            settings["css-heading-" + heading + "-color"]
          }-${headingColorLightness});}` +
          `@media(prefers-color-scheme: dark) {:root {--co-main__${heading}: var(--cl-${
            settings["css-heading-" + heading + "-color"]
          }-${headingColorLightness});}}`;
        break;
      case "Light":
        style.textContent = `:root {--co-main__${heading}: var(--cl-${
          settings["css-heading-" + heading + "-color"]
        }-${headingColorLightness});}`;
        break;
      case "Dark":
        style.textContent = `:root {--co-main__${heading}: var(--cl-${
          settings["css-heading-" + heading + "-color"]
        }-${headingColorLightnessDark});}`;
        break;
    }
    head.appendChild(style);
  }
}

function changeFontFamily() {
  console.log("Switching font family");
  if (document.getElementById("roamstudio-css-font-family")) {
    document.getElementById("roamstudio-css-font-family").remove();
  }

  if (settings["css-font-family"] != "Theme Default") {
    var head = document.getElementsByTagName("head")[0];
    var style = document.createElement("style");
    style.id = "roamstudio-css-font-family";
    if (settings["css-font-family"] == "System Font Stack") {
      style.textContent = `:root {--ff-main: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";--ff-main__tags: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";--ff-main__pomodoro: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";--ff-main__quote: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";--ff-log-page__h1: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";}`;
    } else {
      style.textContent = `:root {--ff-main: ${settings["css-font-family"]},sans-serif;--ff-main__zoom-item: ${settings["css-font-family"]},sans-serif;--ff-main__tags: ${settings["css-font-family"]},sans-serif;--ff-main__pomodoro: ${settings["css-font-family"]},sans-serif;--ff-main__quote: ${settings["css-font-family"]},sans-serif;--ff-log-page__h1: ${settings["css-font-family"]},sans-serif;--ff-reference__linked-title: ${settings["css-font-family"]},sans-serif;--ff-reference__linked-title-closed: ${settings["css-font-family"]},sans-serif;--ff-reference__page-title: ${settings["css-font-family"]},sans-serif;--ff-reference__unlinked-title: ${settings["css-font-family"]},sans-serif;--ff-reference__unlinked-title-closed: ${settings["css-font-family"]},sans-serif;--ff-reference__zoom-item: ${settings["css-font-family"]},sans-serif;--ff-reference: ${settings["css-font-family"]},sans-serif;}`;
    }
    head.appendChild(style);
  }
}

function changeCodeFontFamily() {
  console.log("Switching code font family");
  if (document.getElementById("roamstudio-css-code-font-family")) {
    document.getElementById("roamstudio-css-code-font-family").remove();
  }

  if (settings["css-code-font-family"] != "Theme Default") {
    var head = document.getElementsByTagName("head")[0];
    var style = document.createElement("style");
    style.id = "roamstudio-css-code-font-family";
    if (settings["css-code-font-family"] == "System Font Stack") {
      style.textContent = `:root {--ff-codeblock__code: Menlo, Consolas, Monaco, Liberation Mono, Lucida Console, monospace;--ff-codeblock__gutter: Menlo, Consolas, Monaco, Liberation Mono, Lucida Console, monospace;--ff-help__component-notation: Menlo, Consolas, Monaco, Liberation Mono, Lucida Console, monospace;--ff-main__inline-code: Menlo, Consolas, Monaco, Liberation Mono, Lucida Console, monospace;--ff-settings__hotkeys: Menlo, Consolas, Monaco, Liberation Mono, Lucida Console, monospace;}`;
    } else {
      style.textContent = `:root {--ff-codeblock__code: ${settings["css-code-font-family"]},monospace;--ff-codeblock__gutter: ${settings["css-code-font-family"]},monospace;--ff-help__component-notation: ${settings["css-code-font-family"]},monospace;--ff-main__inline-code: ${settings["css-code-font-family"]},monospace;--ff-settings__hotkeys: ${settings["css-code-font-family"]},monospace;}`;
    }
    head.appendChild(style);
  }
}

function changeTheme() {
  console.log("Changing theme to: " + settings["css-theme"]);
  console.log("Changing appearance to: " + settings["css-appearance"]);

  if (document.getElementById("roamstudio-css-theme")) {
    document.getElementById("roamstudio-css-theme").remove();
  }

  if (settings["css-theme"].toLowerCase() != "default") {
    if (document.getElementById("roamstudio-css-system") == null) {
      var head = document.getElementsByTagName("head")[0];
      var style = document.createElement("style");
      style.id = "roamstudio-css-system";
      style.textContent = css["system"];
      head.appendChild(style);
    }

    var head = document.getElementsByTagName("head")[0];
    var style = document.createElement("style");
    style.id = "roamstudio-css-theme";
    style.textContent =
      css[settings["css-theme"].toLowerCase() + "-common"] +
      css[
        settings["css-theme"].toLowerCase() +
          "-" +
          settings["css-appearance"].toLowerCase()
      ];
    head.appendChild(style);
  } else {
    if (document.getElementById("roamstudio-css-system")) {
      document.getElementById("roamstudio-css-system").remove();
    }
  }
}

function changeModule(moduleName: string) {
  console.log("Module called: " + moduleName);
  console.log("Module status: " + modules[moduleName]);

  if (!modules[moduleName]) {
    if (document.getElementById("roamstudio-" + moduleName)) {
      document.getElementById("roamstudio-" + moduleName).remove();
    }
  } else {
    if (document.getElementById("roamstudio-" + moduleName)) {
      document.getElementById("roamstudio-" + moduleName).remove();
    }

    var head = document.getElementsByTagName("head")[0];
    var style = document.createElement("style");
    style.id = "roamstudio-" + moduleName;
    style.textContent = css[moduleName];
    head.appendChild(style);
  }
}

function setSettingDefault(
  extensionAPI: any,
  settingId: any,
  settingDefault: any
) {
  let storedSetting = extensionAPI.settings.get(settingId);
  if (null == storedSetting)
    extensionAPI.settings.set(settingId, settingDefault);
  return storedSetting || settingDefault;
}

function onload({ extensionAPI }: OnloadArgs) {
  extAPI = extensionAPI;

  console.log("Initializing CSS Themes");
  initCSSThemes();

  loadSystem();
  loadFixes();
  loadFonts();

  for (const item in settings) {
    settings[item] = setSettingDefault(extensionAPI, item, settings[item]);
    console.log("Setting: " + item);
  }

  for (const item in modules) {
    modules[item] = setSettingDefault(extensionAPI, item, false);
    console.log("Setting: " + "css-" + item);
  }

  changeSettings("css-theme");

  console.log("Finished loading modules");

  extensionAPI.settings.panel.create({
    tabTitle: "Roam Studio",
    settings: [
      {
        id: "css-theme",
        name: "Base Theme",
        description: "Select your base theme",
        action: {
          type: "select",
          items: ["Craft", "Quattro", "Things"],
          onChange: (evt) => {
            settings["css-theme"] = evt.toString();
            changeSettings("css-theme");
          },
        },
      },
      {
        id: "css-appearance",
        name: "Appearance",
        description:
          "Select the themes appearance (choose 'Auto' if the theme should adapt your systems settings)",
        action: {
          type: "select",
          items: ["Dark", "Light", "Auto"],
          onChange: (evt) => {
            settings["css-appearance"] = evt.toString();
            changeSettings("css-appearance");
            setToggleIcon();
          },
        },
      },
      {
        id: "css-feather-icons",
        name: "Feather Icon Theme",
        description: "Use feather icon theme",
        action: {
          type: "switch",
          onChange: (evt) => {
            modules["css-feather-icons"] = evt.target.checked;
            changeModule("css-feather-icons");
            changeDateIcon();
          },
        },
      },
      {
        id: "css-font-family",
        name: "Font Family",
        description:
          "Select your main font family (changes the font used on pages)",
        action: {
          type: "select",
          items: [
            "Theme Default",
            "Avenir Next, Nunito Sans",
            "iA Writer Quattro S",
            "Ibarra Real Nova",
            "Inter",
            "Lato",
            "System Font Stack",
          ],
          onChange: (evt) => {
            settings["css-font-family"] = evt.toString();
            changeFontFamily();
          },
        },
      },
      {
        id: "css-font-size",
        name: "Base Font Size",
        description: "Select your base font size",
        action: {
          type: "select",
          items: ["extra small", "small", "medium", "large", "extra large"],
          onChange: (evt) => {
            settings["css-font-size"] = evt.toString();
            changeFontSize();
          },
        },
      },
      {
        id: "css-line-spacing",
        name: "Line Spacing",
        description: "Select your line spacing",
        action: {
          type: "select",
          items: ["small", "medium", "large"],
          onChange: (evt) => {
            settings["css-line-spacing"] = evt.toString();
            changeLineSpacing();
          },
        },
      },
      {
        id: "css-mobile-font-size",
        name: "Base Font Size for Mobile",
        description: "Select your base font size on mobile devices",
        action: {
          type: "select",
          items: ["extra small", "small", "medium", "large", "extra large"],
          onChange: (evt) => {
            settings["css-mobile-font-size"] = evt.toString();
            changeMobileFontSize();
          },
        },
      },
      {
        id: "css-heading-font-family",
        name: "Heading Font Family",
        description: "Select the font family for your headings",
        action: {
          type: "select",
          items: [
            "Theme Default",
            "Avenir Next, Nunito Sans",
            "iA Writer Quattro S",
            "Ibarra Real Nova",
            "Inter",
            "Lato",
            "System Font Stack",
          ],
          onChange: (evt) => {
            settings["css-heading-font-family"] = evt.toString();
            changeHeadingFontFamily();
          },
        },
      },
      {
        id: "css-heading-level1-size",
        name: "Heading Level 1 Size",
        description: "Select the font size of your level-1-headings",
        action: {
          type: "select",
          items: [
            "Theme Default",
            "Text",
            "extra small",
            "small",
            "medium",
            "large",
            "extra large",
          ],
          onChange: (evt) => {
            settings["css-heading-level1-size"] = evt.toString();
            changeHeadingFontSize("level1");
          },
        },
      },
      {
        id: "css-heading-level1-color",
        name: "Heading Level 1 Color",
        description: "Select the color of the level-1-headings",
        action: {
          type: "select",
          items: [
            "Theme Default",
            "accent",
            "rose",
            "pink",
            "fuchsia",
            "purple",
            "violet",
            "indigo",
            "blue",
            "sky",
            "cyan",
            "teal",
            "emerald",
            "green",
            "lime",
            "yellow",
            "amber",
            "orange",
            "red",
            "gray",
          ],
          onChange: (evt) => {
            settings["css-heading-level1-color"] = evt.toString();
            changeHeadingFontColor("level1");
          },
        },
      },
      {
        id: "css-heading-level1-color-lightness",
        name: "Heading Level 1 Color Lightness",
        description:
          "Select the lightness of the color of your level 1 headings",
        action: {
          type: "select",
          items: [
            "Theme Default",
            "lightest",
            "lighter",
            "light",
            "medium",
            "dark",
            "darker",
            "darkest",
          ],
          onChange: (evt) => {
            settings["css-heading-level1-color-lightness"] = evt.toString();
            changeHeadingFontColor("level1");
          },
        },
      },
      {
        id: "css-heading-level2-size",
        name: "Heading Level 2 Size",
        description: "Select font size of your level-2-headings",
        action: {
          type: "select",
          items: [
            "Theme Default",
            "Text",
            "extra small",
            "small",
            "medium",
            "large",
            "extra large",
          ],
          onChange: (evt) => {
            settings["css-heading-level2-size"] = evt.toString();
            changeHeadingFontSize("level2");
          },
        },
      },
      {
        id: "css-heading-level2-color",
        name: "Heading Level 2 Color",
        description: "Select the color of your level-2-headings",
        action: {
          type: "select",
          items: [
            "Theme Default",
            "accent",
            "rose",
            "pink",
            "fuchsia",
            "purple",
            "violet",
            "indigo",
            "blue",
            "sky",
            "cyan",
            "teal",
            "emerald",
            "green",
            "lime",
            "yellow",
            "amber",
            "orange",
            "red",
            "gray",
          ],
          onChange: (evt) => {
            settings["css-heading-level2-color"] = evt.toString();
            changeHeadingFontColor("level2");
          },
        },
      },
      {
        id: "css-heading-level2-color-lightness",
        name: "Heading Level 2 Color Lightness",
        description:
          "Select the lightness of the color of your level 2 headings",
        action: {
          type: "select",
          items: [
            "Theme Default",
            "lightest",
            "lighter",
            "light",
            "medium",
            "dark",
            "darker",
            "darkest",
          ],
          onChange: (evt) => {
            settings["css-heading-level2-color-lightness"] = evt.toString();
            changeHeadingFontColor("level2");
          },
        },
      },
      {
        id: "css-heading-level3-size",
        name: "Heading Level 3 Size",
        description: "Select the font size of your level-3-headings",
        action: {
          type: "select",
          items: [
            "Theme Default",
            "Text",
            "extra small",
            "small",
            "medium",
            "large",
            "extra large",
          ],
          onChange: (evt) => {
            settings["css-heading-level3-size"] = evt.toString();
            changeHeadingFontSize("level3");
          },
        },
      },
      {
        id: "css-heading-level3-color",
        name: "Heading Level 3 Color",
        description: "Select the color of your level-3-headings",
        action: {
          type: "select",
          items: [
            "Theme Default",
            "accent",
            "rose",
            "pink",
            "fuchsia",
            "purple",
            "violet",
            "indigo",
            "blue",
            "sky",
            "cyan",
            "teal",
            "emerald",
            "green",
            "lime",
            "yellow",
            "amber",
            "orange",
            "red",
            "gray",
          ],
          onChange: (evt) => {
            settings["css-heading-level3-color"] = evt.toString();
            changeHeadingFontColor("level3");
          },
        },
      },
      {
        id: "css-heading-level3-color-lightness",
        name: "Heading Level 3 Color Lightness",
        description:
          "Select the lightness of the color of your level 3 headings",
        action: {
          type: "select",
          items: [
            "Theme Default",
            "lightest",
            "lighter",
            "light",
            "medium",
            "dark",
            "darker",
            "darkest",
          ],
          onChange: (evt) => {
            settings["css-heading-level3-color-lightness"] = evt.toString();
            changeHeadingFontColor("level3");
          },
        },
      },
      {
        id: "css-heading-spacing",
        name: "Heading Spacing",
        description:
          "Select the spacing of your headings (the free space above and below the heading)",
        action: {
          type: "select",
          items: ["Theme Default", "small", "medium", "large"],
          onChange: (evt) => {
            settings["css-heading-spacing"] = evt.toString();
            changeHeadingSpacing();
          },
        },
      },
      {
        id: "css-code-font-family",
        name: "Code Font Family",
        description: "Select the font family of your code blocks",
        action: {
          type: "select",
          items: [
            "Theme Default",
            "iA Writer Mono S",
            "Inconsolata",
            "System Font Stack",
            "Roboto Mono",
          ],
          onChange: (evt) => {
            settings["css-code-font-family"] = evt.toString();
            changeCodeFontFamily();
          },
        },
      },
      {
        id: "css-code-font-size",
        name: "Code Font Size",
        description: "Select the font size of your code blocks",
        action: {
          type: "select",
          items: ["extra small", "small", "medium", "large", "extra large"],
          onChange: (evt) => {
            settings["css-code-font-size"] = evt.toString();
            changeCodeFontSize();
          },
        },
      },
      {
        id: "css-hide-line-numbers",
        name: "Hide Line Numbers",
        description: "Hide Line Numbers in Codeblocks",
        action: {
          type: "switch",
          onChange: (evt) => {
            modules["css-hide-line-numbers"] = evt.target.checked;
            changeModule("css-hide-line-numbers");
          },
        },
      },
      {
        id: "css-page-link-color",
        name: "Page Link Color",
        description: "Select the color of your page-links",
        action: {
          type: "select",
          items: [
            "Theme Default",
            "accent",
            "rose",
            "pink",
            "fuchsia",
            "purple",
            "violet",
            "indigo",
            "blue",
            "sky",
            "cyan",
            "teal",
            "emerald",
            "green",
            "lime",
            "yellow",
            "amber",
            "orange",
            "red",
            "gray",
          ],
          onChange: (evt) => {
            settings["css-page-link-color"] = evt.toString();
            changePageLink();
          },
        },
      },
      {
        id: "css-page-link-color-lightness",
        name: "Page Link Color Lightness",
        description: "Select the lightness of the color of your page links",
        action: {
          type: "select",
          items: [
            "Theme Default",
            "lightest",
            "lighter",
            "light",
            "medium",
            "dark",
            "darker",
            "darkest",
          ],
          onChange: (evt) => {
            settings["css-page-link-color-lightness"] = evt.toString();
            changePageLink();
          },
        },
      },
      {
        id: "css-page-link-style",
        name: "Page Link Style",
        description: "Select the style of your page-links",
        action: {
          type: "select",
          items: [
            "Theme Default",
            "No underline",
            "Thin underline",
            "Dotted underline",
            "Medium underline",
            "Fat underline",
          ],
          onChange: (evt) => {
            settings["css-page-link-style"] = evt.toString();
            changePageLink();
          },
        },
      },
      {
        id: "css-page-link-border-lightness",
        name: "Page Link Border Lightness",
        description: "Select the lightness of the border of your page links",
        action: {
          type: "select",
          items: [
            "Theme Default",
            "lightest",
            "lighter",
            "light",
            "medium",
            "dark",
            "darker",
            "darkest",
          ],
          onChange: (evt) => {
            settings["css-page-link-border-lightness"] = evt.toString();
            changePageLink();
          },
        },
      },
      {
        id: "css-page-link-weight",
        name: "Page Link Weight",
        description: "Select the font-weight of your page-links",
        action: {
          type: "select",
          items: ["Theme Default", "normal", "bold"],
          onChange: (evt) => {
            settings["css-page-link-weight"] = evt.toString();
            changePageLink();
          },
        },
      },
      {
        id: "css-external-link-color",
        name: "External Link Color",
        description: "Select the color of your external-links",
        action: {
          type: "select",
          items: [
            "Theme Default",
            "accent",
            "rose",
            "pink",
            "fuchsia",
            "purple",
            "violet",
            "indigo",
            "blue",
            "sky",
            "cyan",
            "teal",
            "emerald",
            "green",
            "lime",
            "yellow",
            "amber",
            "orange",
            "red",
            "gray",
          ],
          onChange: (evt) => {
            settings["css-external-link-color"] = evt.toString();
            changeExternalLink();
          },
        },
      },
      {
        id: "css-external-link-color-lightness",
        name: "External Link Color Lightness",
        description: "Select the lightness of the color of your page links",
        action: {
          type: "select",
          items: [
            "Theme Default",
            "lightest",
            "lighter",
            "light",
            "medium",
            "dark",
            "darker",
            "darkest",
          ],
          onChange: (evt) => {
            settings["css-external-link-color-lightness"] = evt.toString();
            changeExternalLink();
          },
        },
      },
      {
        id: "css-external-link-style",
        name: "External Link Style",
        description: "Select the style of your external-links",
        action: {
          type: "select",
          items: [
            "Theme Default",
            "No underline",
            "Thin underline",
            "Dotted underline",
            "Medium underline",
            "Fat underline",
          ],
          onChange: (evt) => {
            settings["css-external-link-style"] = evt.toString();
            changeExternalLink();
          },
        },
      },
      {
        id: "css-external-link-border-lightness",
        name: "External Link Border Lightness",
        description: "Select the lightness of the border of your page links",
        action: {
          type: "select",
          items: [
            "Theme Default",
            "lightest",
            "lighter",
            "light",
            "medium",
            "dark",
            "darker",
            "darkest",
          ],
          onChange: (evt) => {
            settings["css-external-link-border-lightness"] = evt.toString();
            changeExternalLink();
          },
        },
      },
      {
        id: "css-external-link-weight",
        name: "External Link Weight",
        description: "Select the font-weight of your external-links",
        action: {
          type: "select",
          items: ["Theme Default", "normal", "bold"],
          onChange: (evt) => {
            settings["css-external-link-weight"] = evt.toString();
            changeExternalLink();
          },
        },
      },
      {
        id: "css-reference-link-color",
        name: "Reference Link Color",
        description: "Select the color of your reference-links",
        action: {
          type: "select",
          items: [
            "Theme Default",
            "accent",
            "rose",
            "pink",
            "fuchsia",
            "purple",
            "violet",
            "indigo",
            "blue",
            "sky",
            "cyan",
            "teal",
            "emerald",
            "green",
            "lime",
            "yellow",
            "amber",
            "orange",
            "red",
            "gray",
          ],
          onChange: (evt) => {
            settings["css-reference-link-color"] = evt.toString();
            changeReferenceLink();
          },
        },
      },
      {
        id: "css-reference-link-color-lightness",
        name: "Reference Link Color Lightness",
        description: "Select the lightness of the color of your reference links",
        action: {
          type: "select",
          items: [
            "Theme Default",
            "lightest",
            "lighter",
            "light",
            "medium",
            "dark",
            "darker",
            "darkest",
          ],
          onChange: (evt) => {
            settings["css-reference-link-color-lightness"] = evt.toString();
            changeReferenceLink();
          },
        },
      },
      {
        id: "css-reference-link-style",
        name: "Reference Link Style",
        description: "Select the style of your reference-links",
        action: {
          type: "select",
          items: [
            "Theme Default",
            "No underline",
            "Dotted underline",
            "Thin underline",
            "Medium underline",
            "Fat underline",
          ],
          onChange: (evt) => {
            settings["css-reference-link-style"] = evt.toString();
            changeReferenceLink();
          },
        },
      },
      {
        id: "css-reference-link-border-lightness",
        name: "Reference Link Border Lightness",
        description: "Select the lightness of the border of your reference links",
        action: {
          type: "select",
          items: [
            "Theme Default",
            "lightest",
            "lighter",
            "light",
            "medium",
            "dark",
            "darker",
            "darkest",
          ],
          onChange: (evt) => {
            settings["css-reference-link-border-lightness"] = evt.toString();
            changeReferenceLink();
          },
        },
      },
      {
        id: "css-reference-link-weight",
        name: "Reference Link Weight",
        description: "Select the weight of your reference-links",
        action: {
          type: "select",
          items: ["Theme Default", "normal", "bold"],
          onChange: (evt) => {
            settings["css-reference-link-weight"] = evt.toString();
            changeReferenceLink();
          },
        },
      },
      {
        id: "css-block-link-color",
        name: "Block Link Color",
        description: "Select the color of your block-links",
        action: {
          type: "select",
          items: [
            "Theme Default",
            "accent",
            "rose",
            "pink",
            "fuchsia",
            "purple",
            "violet",
            "indigo",
            "blue",
            "sky",
            "cyan",
            "teal",
            "emerald",
            "green",
            "lime",
            "yellow",
            "amber",
            "orange",
            "red",
            "gray",
          ],
          onChange: (evt) => {
            settings["css-block-link-color"] = evt.toString();
            changeBlockLink();
          },
        },
      },
      {
        id: "css-block-link-color-lightness",
        name: "Block Link Color Lightness",
        description: "Select the lightness of the color of your block links",
        action: {
          type: "select",
          items: [
            "Theme Default",
            "lightest",
            "lighter",
            "light",
            "medium",
            "dark",
            "darker",
            "darkest",
          ],
          onChange: (evt) => {
            settings["css-block-link-color-lightness"] = evt.toString();
            changeBlockLink();
          },
        },
      },
      {
        id: "css-block-link-style",
        name: "Block Link Style",
        description: "Select the style of your block-links",
        action: {
          type: "select",
          items: [
            "Theme Default",
            "No underline",
            "Dotted underline",
            "Thin underline",
            "Medium underline",
            "Fat underline",
          ],
          onChange: (evt) => {
            settings["css-block-link-style"] = evt.toString();
            changeBlockLink();
          },
        },
      },
      {
        id: "css-block-link-border-lightness",
        name: "Block Link Border Lightness",
        description: "Select the lightness of the border of your block links",
        action: {
          type: "select",
          items: [
            "Theme Default",
            "lightest",
            "lighter",
            "light",
            "medium",
            "dark",
            "darker",
            "darkest",
          ],
          onChange: (evt) => {
            settings["css-block-link-border-lightness"] = evt.toString();
            changeBlockLink();
          },
        },
      },
      {
        id: "css-block-link-weight",
        name: "Block Link Weight",
        description: "Select the weight of your block-links",
        action: {
          type: "select",
          items: ["Theme Default", "normal", "bold"],
          onChange: (evt) => {
            settings["css-block-link-weight"] = evt.toString();
            changeBlockLink();
          },
        },
      },
      {
        id: "css-tag-color",
        name: "Tag Color",
        description: "Select the color of your tags",
        action: {
          type: "select",
          items: [
            "Theme Default",
            "accent",
            "white",
            "rose",
            "pink",
            "fuchsia",
            "purple",
            "violet",
            "indigo",
            "blue",
            "sky",
            "cyan",
            "teal",
            "emerald",
            "green",
            "lime",
            "yellow",
            "amber",
            "orange",
            "red",
            "gray",
            "black",
          ],
          onChange: (evt) => {
            settings["css-tag-color"] = evt.toString();
            changeTag();
          },
        },
      },
      {
        id: "css-tag-color-lightness",
        name: "Tag Color Lightness",
        description: "Select the lightness of the color of your tags",
        action: {
          type: "select",
          items: [
            "Theme Default",
            "lightest",
            "lighter",
            "light",
            "medium",
            "dark",
            "darker",
            "darkest",
          ],
          onChange: (evt) => {
            settings["css-tag-color-lightness"] = evt.toString();
            changeTag();
          },
        },
      },
      {
        id: "css-tag-background",
        name: "Tag Background Color",
        description: "Select the background color of your tags",
        action: {
          type: "select",
          items: [
            "Theme Default",
            "accent",
            "white",
            "rose",
            "pink",
            "fuchsia",
            "purple",
            "violet",
            "indigo",
            "blue",
            "sky",
            "cyan",
            "teal",
            "emerald",
            "green",
            "lime",
            "yellow",
            "amber",
            "orange",
            "red",
            "gray",
            "black",
          ],
          onChange: (evt) => {
            settings["css-tag-background"] = evt.toString();
            changeTag();
          },
        },
      },
      {
        id: "css-tag-background-lightness",
        name: "Tag Background Lightness",
        description: "Select the lightness of the background of your tags",
        action: {
          type: "select",
          items: [
            "Theme Default",
            "lightest",
            "lighter",
            "light",
            "medium",
            "dark",
            "darker",
            "darkest",
          ],
          onChange: (evt) => {
            settings["css-tag-background-lightness"] = evt.toString();
            changeTag();
          },
        },
      },
      {
        id: "css-tag-padding",
        name: "Tag Padding",
        description: "Select the padding of your tags",
        action: {
          type: "select",
          items: ["Theme Default", "None", "Slight", "Medium", "Large"],
          onChange: (evt) => {
            settings["css-tag-padding"] = evt.toString();
            changeTag();
          },
        },
      },
      {
        id: "css-tag-style",
        name: "Tag Style",
        description: "Select the style of your tags",
        action: {
          type: "select",
          items: [
            "Theme Default",
            "No underline",
            "Thin underline",
            "Medium underline",
            "Fat underline",
          ],
          onChange: (evt) => {
            settings["css-tag-style"] = evt.toString();
            changeTag();
          },
        },
      },
      {
        id: "css-tag-font-size",
        name: "Tag Font Size",
        description: "Select the font-size of your tags",
        action: {
          type: "select",
          items: [
            "Theme Default",
            "extra small",
            "small",
            "medium",
            "large",
            "extra large",
          ],
          onChange: (evt) => {
            settings["css-tag-font-size"] = evt.toString();
            changeTag();
          },
        },
      },
      {
        id: "css-tag-radius",
        name: "Tag Radius",
        description: "Select the radius of your tags",
        action: {
          type: "select",
          items: ["Theme Default", "No radius", "Slight", "Medium", "Heavy"],
          onChange: (evt) => {
            settings["css-tag-radius"] = evt.toString();
            changeTag();
          },
        },
      },
      {
        id: "css-date-color",
        name: "Date Color",
        description: "Select the color of your dates",
        action: {
          type: "select",
          items: [
            "Theme Default",
            "accent",
            "white",
            "rose",
            "pink",
            "fuchsia",
            "purple",
            "violet",
            "indigo",
            "blue",
            "sky",
            "cyan",
            "teal",
            "emerald",
            "green",
            "lime",
            "yellow",
            "amber",
            "orange",
            "red",
            "gray",
            "black",
          ],
          onChange: (evt) => {
            settings["css-date-color"] = evt.toString();
            changeDate();
          },
        },
      },
      {
        id: "css-date-color-lightness",
        name: "Date Color Lightness",
        description: "Select the lightness of the color of your dates",
        action: {
          type: "select",
          items: [
            "Theme Default",
            "lightest",
            "lighter",
            "light",
            "medium",
            "dark",
            "darker",
            "darkest",
          ],
          onChange: (evt) => {
            settings["css-date-color-lightness"] = evt.toString();
            changeDate();
          },
        },
      },
      {
        id: "css-date-background",
        name: "Date Background Color",
        description: "Select the background color of your dates",
        action: {
          type: "select",
          items: [
            "Theme Default",
            "accent",
            "white",
            "rose",
            "pink",
            "fuchsia",
            "purple",
            "violet",
            "indigo",
            "blue",
            "sky",
            "cyan",
            "teal",
            "emerald",
            "green",
            "lime",
            "yellow",
            "amber",
            "orange",
            "red",
            "gray",
            "black",
          ],
          onChange: (evt) => {
            settings["css-date-background"] = evt.toString();
            changeDate();
          },
        },
      },
      {
        id: "css-date-background-lightness",
        name: "Date Background Lightness",
        description: "Select the lightness of the background of your dates",
        action: {
          type: "select",
          items: [
            "Theme Default",
            "lightest",
            "lighter",
            "light",
            "medium",
            "dark",
            "darker",
            "darkest",
          ],
          onChange: (evt) => {
            settings["css-date-background-lightness"] = evt.toString();
            changeDate();
          },
        },
      },
      {
        id: "css-date-padding",
        name: "Date Padding",
        description: "Select the padding of your dates",
        action: {
          type: "select",
          items: ["Theme Default", "None", "Slight", "Medium", "Large"],
          onChange: (evt) => {
            settings["css-date-padding"] = evt.toString();
            changeDate();
          },
        },
      },
      {
        id: "css-date-style",
        name: "Date Style",
        description: "Select the style of your dates",
        action: {
          type: "select",
          items: [
            "Theme Default",
            "No underline",
            "Thin underline",
            "Medium underline",
            "Fat underline",
          ],
          onChange: (evt) => {
            settings["css-date-style"] = evt.toString();
            changeDate();
          },
        },
      },
      {
        id: "css-date-font-size",
        name: "Date Font Size",
        description: "Select the font-size of your dates",
        action: {
          type: "select",
          items: [
            "Theme Default",
            "extra small",
            "small",
            "medium",
            "large",
            "extra large",
          ],
          onChange: (evt) => {
            settings["css-date-font-size"] = evt.toString();
            changeDate();
          },
        },
      },
      {
        id: "css-date-radius",
        name: "Date Radius",
        description: "Select the radius of your dates",
        action: {
          type: "select",
          items: ["Theme Default", "No radius", "Slight", "Medium", "Heavy"],
          onChange: (evt) => {
            settings["css-date-radius"] = evt.toString();
            changeDate();
          },
        },
      },

      {
        id: "css-date-icon",
        name: "Date Icons",
        description: "Add icon to date-links",
        action: {
          type: "switch",
          onChange: (evt) => {
            settings["css-date-icon"] = evt.target.checked;
            changeDateIcon();
          },
        },
      },
      {
        id: "css-non-breakable-dates",
        name: "No line-break within dates",
        description:
          "Dates are not wrapped at the end of the line but transferred to the next line.",
        action: {
          type: "switch",
          onChange: (evt) => {
            modules["css-non-breakable-dates"] = evt.target.checked;
            changeModule("css-non-breakable-dates");
          },
        },
      },
      {
        id: "css-advanced-heading-spacing",
        name: "Advanced Heading Spacing",
        description: "Remove margins for headings on collapse",
        action: {
          type: "switch",
          onChange: (evt) => {
            modules["css-advanced-heading-spacing"] = evt.target.checked;
            changeModule("css-advanced-heading-spacing");
          },
        },
      },
      {
        id: "css-bullet-effects",
        name: "Bullet Effects",
        description: "Subtle effect of bullet hovering",
        action: {
          type: "switch",
          onChange: (evt) => {
            modules["css-bullet-effects"] = evt.target.checked;
            changeModule("css-bullet-effects");
          },
        },
      },
      {
        id: "css-centered-search",
        name: "Centered Search",
        description:
          "Centers the find or create dialog, hides the search icon (use keyboard shortcuts :))",
        action: {
          type: "switch",
          onChange: (evt) => {
            modules["css-centered-search"] = evt.target.checked;
            changeModule("css-centered-search");
          },
        },
      },
      {
        id: "css-no-animations",
        name: "Disable Animations",
        description:
          "Disable all animations and transitions to speed up the UI",
        action: {
          type: "switch",
          onChange: (evt) => {
            modules["css-no-animations"] = evt.target.checked;
            changeModule("css-no-animations");
          },
        },
      },
      {
        id: "css-done",
        name: "Strike done todos",
        description: "Strike out done todos",
        action: {
          type: "switch",
          onChange: (evt) => {
            modules["css-done"] = evt.target.checked;
            changeModule("css-done");
          },
        },
      },
      {
        id: "css-dynamic-images",
        name: "Dynamic Image Sizes",
        description: "Enable dynamic image sizes (scaled to 100% width)",
        action: {
          type: "switch",
          onChange: (evt) => {
            modules["css-dynamic-images"] = evt.target.checked;
            changeModule("css-dynamic-images");
          },
        },
      },
      {
        id: "css-dynamic-pdfs",
        name: "Dynamic PDF Sizes",
        description: "Enable dynamic pdf sizes (scaled to 100% width)",
        action: {
          type: "switch",
          onChange: (evt) => {
            modules["css-dynamic-pdfs"] = evt.target.checked;
            changeModule("css-dynamic-pdfs");
          },
        },
      },
      {
        id: "css-hide-logo",
        name: "Hide Logo",
        description: "Hide Roam Research Logo",
        action: {
          type: "switch",
          onChange: (evt) => {
            modules["css-hide-logo"] = evt.target.checked;
            changeModule("css-hide-logo");
          },
        },
      },
      {
        id: "css-hide-shortcuts",
        name: "Hide Shortcuts",
        description: "Hide Shortcuts Heading",
        action: {
          type: "switch",
          onChange: (evt) => {
            modules["css-hide-shortcuts"] = evt.target.checked;
            changeModule("css-hide-shortcuts");
          },
        },
      },
      {
        id: "css-hide-sidebar-icons",
        name: "Hide Sidebar Icons",
        description:
          "Hide Sidebar Icons (Daily Notes Page, Graph, All Pages, Roam Depot) and make text bold",
        action: {
          type: "switch",
          onChange: (evt) => {
            modules["css-hide-sidebar-icons"] = evt.target.checked;
            changeModule("css-hide-sidebar-icons");
          },
        },
      },
      {
        id: "css-logpage-minheight",
        name: "Remove Logpage minimum height",
        description:
          "Removes the height settings from the day blocks on the log page",
        action: {
          type: "switch",
          onChange: (evt) => {
            modules["css-logpage-minheight"] = evt.target.checked;
            changeModule("css-logpage-minheight");
          },
        },
      },
      {
        id: "css-masonry",
        name: "Masonry Sidebar",
        description:
          "Change the right sidebar to a masonry view of the windows",
        action: {
          type: "switch",
          onChange: (evt) => {
            modules["css-masonry"] = evt.target.checked;
            changeModule("css-masonry");
          },
        },
      },
      {
        id: "css-mobile-caret",
        name: "Mobile Caret",
        description: "Shows a bigger caret for collapsing lists on mobile",
        action: {
          type: "switch",
          onChange: (evt) => {
            modules["css-mobile-caret"] = evt.target.checked;
            changeModule("css-mobile-caret");
          },
        },
      },
      {
        id: "css-mobile-sidebar",
        name: "Mobile Sidebar",
        description: "Show the right sidebar below the main window on mobile",
        action: {
          type: "switch",
          onChange: (evt) => {
            modules["css-mobile-sidebar"] = evt.target.checked;
            changeModule("css-mobile-sidebar");
          },
        },
      },
      {
        id: "css-more-room",
        name: "More Room for Roam",
        description: "Hides Bullets on empty blocks",
        action: {
          type: "switch",
          onChange: (evt) => {
            modules["css-more-room"] = evt.target.checked;
            changeModule("css-more-room");
          },
        },
      },
      {
        id: "css-subtle-controls",
        name: "Subtle Controls",
        description:
          "Make controls (bullets, carets and multibars) less intrusive when block is not focused",
        action: {
          type: "switch",
          onChange: (evt) => {
            modules["css-subtle-controls"] = evt.target.checked;
            changeModule("css-subtle-controls");
          },
        },
      },
      {
        id: "css-sidebar-borders",
        name: "Remove sidebar borders",
        description: "Removes the borders from the sidebars",
        action: {
          type: "switch",
          onChange: (evt) => {
            modules["css-sidebar-borders"] = evt.target.checked;
            changeModule("css-sidebar-borders");
          },
        },
      },
      {
        id: "css-topbar-borders",
        name: "Remove topbar borders",
        description: "Removes the borders from the topbar",
        action: {
          type: "switch",
          onChange: (evt) => {
            modules["css-topbar-borders"] = evt.target.checked;
            changeModule("css-topbar-borders");
          },
        },
      },
    ],
  });

  createToggle();
  console.log("Loaded Roam Studio");
}

function onunload() {
  console.log("Unloading Roam Studio");

  if (document.getElementById("roamstudio-css-system")) {
    console.log("Removing CSS System");
    document.getElementById("roamstudio-css-system").remove();
  }

  if (document.getElementById("roamstudio-css-system-fonts")) {
    console.log("Removing CSS System Fonts");
    document.getElementById("roamstudio-css-system-fonts").remove();
  }

  if (document.getElementById("roamstudio-css-system-fixes")) {
    console.log("Removing CSS System Fixes");
    document.getElementById("roamstudio-css-system-fixes").remove();
  }

  Object.keys(settings).forEach((item) => {
    console.log("Removing Settings: " + item);
    if (document.getElementById("roamstudio-" + item)) {
      document.getElementById("roamstudio-" + item).remove();
    }
  });
  
  if (document.getElementById("roamstudio-css-date")) {
    document.getElementById("roamstudio-css-date").remove();
  }
  if (document.getElementById("roamstudio-css-tag")) {
    document.getElementById("roamstudio-css-tag").remove();
  }

  Object.keys(modules).forEach((item) => {
    console.log("Removing Module: " + item);
    if (document.getElementById("roamstudio-" + item)) {
      document.getElementById("roamstudio-" + item).remove();
    }
  });

  destroyToggle();

  console.log("Unloaded Roam Studio");
};

export default {
  onload: onload,
  onunload: onunload,
};
