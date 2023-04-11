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
    "css-page-link-color": "Theme Default",
    "css-page-link-style": "Theme Default",
    "css-page-link-weight": "Theme Default",
    "css-reference-link-color": "Theme Default",
    "css-reference-link-style": "Theme Default",
    "css-reference-link-weight": "Theme Default",
    "css-tag-color": "Theme Default",
    "css-tag-style": "Theme Default",
    "css-tag-font-size": "Theme Default",
    "css-tag-background": "Theme Default",
    "css-tag-radius": "Theme Default",
    "css-tag-invert": false,
    "css-date-icon": false,
    "css-date-color": "Theme Default",
    "css-date-style": "Theme Default",
    "css-date-font-size": "Theme Default",
    "css-date-background": "Theme Default",
    "css-date-radius": "Theme Default",
    "css-date-invert": false,
  },
  modules: { [key: string]: boolean } = {
    "css-advanced-heading-spacing": false,
    "css-bullet-effects": false,
    "css-centered-search": false,
    "css-done": false,
    "css-dynamic-images": false,
    "css-hide-line-numbers": false,
    "css-hide-logo": false,
    "css-hide-shortcuts": false,
    "css-hide-sidebar-icons": false,
    "css-masonry": false,
    "css-mobile-sidebar": false,
    "css-more-room": false,
    "css-no-animations": false,
    "css-subtle-controls": false,
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
      changePageLinkColor();
      changePageLinkStyle();
      changePageLinkWeight();
      changeReferenceLinkColor();
      changeReferenceLinkStyle();
      changeReferenceLinkWeight();
      changeTagColor();
      changeTagStyle();
      changeTagFontSize();
      changeTagBackground();
      changeTagRadius();
      changeDateIcon();
      changeDateColor();
      changeDateStyle();
      changeDateFontSize();
      changeDateBackground();
      changeDateRadius();
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
    case "css-page-link-color":
      changePageLinkColor();
      changePageLinkStyle();
      break;
    case "css-page-link-style":
      changePageLinkStyle();
      break;
    case "css-page-link-weight":
      changePageLinkWeight();
      break;
    case "css-reference-link-color":
      changeReferenceLinkColor();
      changeReferenceLinkStyle();
      break;
    case "css-reference-link-style":
      changeReferenceLinkStyle();
      break;
    case "css-reference-link-weight":
      changeReferenceLinkWeight();
      break;
    case "css-tag-color":
      changeTagColor();
      changeTagStyle();
      break;
    case "css-tag-style":
      changeTagStyle();
      break;
    case "css-tag-font-size":
      changeTagFontSize();
      break;
    case "css-tag-background":
      changeTagBackground();
      break;
    case "css-tag-radius":
      changeTagRadius();
      break;
    case "css-tag-invert":
      changeTagBackground();
      changeTagColor();
      break;
    case "css-date-color":
      changeDateColor();
      changeDateStyle();
      break;
    case "css-date-style":
      changeDateStyle();
      break;
    case "css-date-font-size":
      changeDateFontSize();
      break;
    case "css-date-background":
      changeDateBackground();
      break;
    case "css-date-radius":
      changeDateRadius();
      break;
    case "css-date-invert":
      changeDateBackground();
      changeDateColor();
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
  style.textContent = ":root {" + "--fs-app__html: " + fontSize + "px!important;};";
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
  style.textContent = `@media screen and (max-width: 600px) { :root {--fs-app__html: ${fontSize}px;};}`;
  head.appendChild(style);
}

function changePageLinkColor() {
  console.log("Switching page link color:" + settings["css-page-link-color"]);
  if (document.getElementById("roamstudio-css-page-link-color")) {
    document.getElementById("roamstudio-css-page-link-color").remove();
  }

  if (settings["css-page-link-color"] != "Theme Default") {
    var head = document.getElementsByTagName("head")[0];
    var style = document.createElement("style");
    
    style.id = "roamstudio-css-page-link-color";
    switch (settings["css-appearance"]) {
    case "Auto":
      style.textContent = `:root {--co-main__page-link: var(--cl-${settings["css-page-link-color"]}-600);--co-main__a: var(--cl-${settings["css-page-link-color"]}-600);--co-main__alias: var(--cl-${settings["css-page-link-color"]}-600);--co-main__page-link--hover: var(--cl-${settings["css-page-link-color"]}-600);--co-main__a--hover: var(--cl-${settings["css-page-link-color"]}-600);--co-main__alias--hover: var(--cl-${settings["css-page-link-color"]}-600);}`+`@media (prefers-color-scheme: dark) {:root {--co-main__page-link: var(--cl-${settings["css-page-link-color"]}-400);--co-main__a: var(--cl-${settings["css-page-link-color"]}-400);--co-main__alias: var(--cl-${settings["css-page-link-color"]}-400);--co-main__page-link--hover: var(--cl-${settings["css-page-link-color"]}-400);--co-main__a--hover: var(--cl-${settings["css-page-link-color"]}-400);--co-main__alias--hover: var(--cl-${settings["css-page-link-color"]}-400);}`;
      break;
    case "Dark":
      style.textContent = `:root {--co-main__page-link: var(--cl-${settings["css-page-link-color"]}-400);--co-main__a: var(--cl-${settings["css-page-link-color"]}-400);--co-main__alias: var(--cl-${settings["css-page-link-color"]}-400);--co-main__page-link--hover: var(--cl-${settings["css-page-link-color"]}-400);--co-main__a--hover: var(--cl-${settings["css-page-link-color"]}-400);--co-main__alias--hover: var(--cl-${settings["css-page-link-color"]}-400);}`;
      break;
    case "Light":
      style.textContent = `:root {--co-main__page-link: var(--cl-${settings["css-page-link-color"]}-600);--co-main__a: var(--cl-${settings["css-page-link-color"]}-600);--co-main__alias: var(--cl-${settings["css-page-link-color"]}-600);--co-main__page-link--hover: var(--cl-${settings["css-page-link-color"]}-600);--co-main__a--hover: var(--cl-${settings["css-page-link-color"]}-600);--co-main__alias--hover: var(--cl-${settings["css-page-link-color"]}-600);}`;
      break;
    }
    head.appendChild(style);
  }
}

function changePageLinkStyle() {
  var borderStyle: string;
  var linkColor: string;
  var linkBrightLight: number;
  var linkBrightDark: number;

  console.log("Switching page link style: " + settings["css-page-link-style"]);
  if (document.getElementById("roamstudio-css-page-link-style")) {
    document.getElementById("roamstudio-css-page-link-style").remove();
  }

  if (settings["css-page-link-color"] == "Theme Default") {
    switch (settings["css-theme"]) {
      case "Quattro":
        linkColor = "gray";
        linkBrightLight = 900;
        linkBrightDark = 550;
        break;
      case "Craft":
        linkColor = "gray";
        linkBrightLight = 300;
        linkBrightDark = 525;
        break;
    }
  } else {
    linkColor = settings["css-page-link-color"];
    linkBrightLight = 300;
    linkBrightDark = 550;
  }
  if (settings["css-page-link-style"] != "Theme Default") {
    switch (settings["css-page-link-style"]) {
      case "No underline":
        borderStyle = "0px solid ";
        break;
      case "Dotted underline":
        borderStyle = "1px dotted ";
        break;
      case "Thin underline":
        borderStyle = "1px solid ";
        break;
      case "Medium underline":
        borderStyle = "2px solid ";
        break;
      case "Fat underline":
        borderStyle = "3px solid ";
        break;
    }

    var head = document.getElementsByTagName("head")[0];
    var style = document.createElement("style");
    style.id = "roamstudio-css-page-link-style";

    switch (settings["css-appearance"]) {
      case "Auto":
        style.textContent =
          `:root {--bb-main__page-link: ${borderStyle}var(--cl-${linkColor}-${linkBrightLight});--bb-main__a: ${borderStyle}var(--cl-${linkColor}-${linkBrightLight});--bb-main__alias: ${borderStyle}var(--cl-${linkColor}-${linkBrightLight});--bb-main__page-link--hover: ${borderStyle}var(--cl-${linkColor}-${linkBrightLight});--bb-main__a--hover: ${borderStyle}var(--cl-${linkColor}-${linkBrightLight});--bb-main__alias--hover: ${borderStyle}var(--cl-${linkColor}-${linkBrightLight});}` +
          `@media (prefers-color-scheme: dark) {:root {--bb-main__page-link: ${borderStyle}var(--cl-${linkColor}-${linkBrightDark});--bb-main__a: ${borderStyle}var(--cl-${linkColor}-${linkBrightDark});--bb-main__alias: ${borderStyle}var(--cl-${linkColor}-${linkBrightDark});--bb-main__page-link--hover: ${borderStyle}var(--cl-${linkColor}-${linkBrightDark});--bb-main__a--hover: ${borderStyle}var(--cl-${linkColor}-${linkBrightDark});--bb-main__alias--hover: ${borderStyle}var(--cl-${linkColor}-${linkBrightDark});}`;
        break;
      case "Dark":
        style.textContent = `:root {--bb-main__page-link: ${borderStyle}var(--cl-${linkColor}-${linkBrightDark});--bb-main__a: ${borderStyle}var(--cl-${linkColor}-${linkBrightDark});--bb-main__alias: ${borderStyle}var(--cl-${linkColor}-${linkBrightDark});--bb-main__page-link--hover: ${borderStyle}var(--cl-${linkColor}-${linkBrightDark});--bb-main__a--hover: ${borderStyle}var(--cl-${linkColor}-${linkBrightDark});--bb-main__alias--hover: ${borderStyle}var(--cl-${linkColor}-${linkBrightDark});}`;
        break;
      case "Light":
        style.textContent = `:root {--bb-main__page-link: ${borderStyle}var(--cl-${linkColor}-${linkBrightLight});--bb-main__a: ${borderStyle}var(--cl-${linkColor}-${linkBrightLight});--bb-main__alias: ${borderStyle}var(--cl-${linkColor}-${linkBrightLight});--bb-main__page-link--hover: ${borderStyle}var(--cl-${linkColor}-${linkBrightLight});--bb-main__a--hover: ${borderStyle}var(--cl-${linkColor}-${linkBrightLight});--bb-main__alias--hover: ${borderStyle}var(--cl-${linkColor}-${linkBrightLight});}`;
        break;
    }
    head.appendChild(style);
  }
}

function changePageLinkWeight() {
  console.log("Switching page link weight:" + settings["css-page-link-weight"]);
  if (document.getElementById("roamstudio-css-page-link-weight")) {
    document.getElementById("roamstudio-css-page-link-weight").remove();
  }

  var head = document.getElementsByTagName("head")[0];
  var style = document.createElement("style");
  style.id = "roamstudio-css-page-link-weight";
  style.textContent = `:root {--fw-main__page-link: ${settings["css-page-link-weight"]};--fw-main__a: ${settings["css-page-link-weight"]};--fw-main__alias: ${settings["css-page-link-weight"]};}`;
  head.appendChild(style);
}

function changeReferenceLinkColor() {
  console.log(
    "Switching reference link color:" + settings["css-reference-link-color"]
  );
  if (document.getElementById("roamstudio-css-reference-link-color")) {
    document.getElementById("roamstudio-css-reference-link-color").remove();
  }

  if (settings["css-reference-link-color"] != "Theme Default") {
    var head = document.getElementsByTagName("head")[0];
    var style = document.createElement("style");
    style.id = "roamstudio-css-reference-link-color";
    style.textContent = `:root {--co-reference__page-title: var(--cl-${settings["css-reference-link-color"]}-600);--co-reference__page-title--hover: var(--cl-${settings["css-reference-link-color"]}-600);}`;
    head.appendChild(style);
  }
}

function changeReferenceLinkStyle() {
  var borderStyle: string;
  var linkColor: string;
  var linkBrightLight: number;
  var linkBrightDark: number;

  console.log(
    "Switching reference link style: " + settings["css-reference-link-style"]
  );
  if (document.getElementById("roamstudio-css-reference-link-style")) {
    document.getElementById("roamstudio-css-reference-link-style").remove();
  }

  if (settings["css-reference-link-color"] == "Theme Default") {
    switch (settings["css-theme"]) {
      case "Quattro":
        linkColor = "gray";
        linkBrightLight = 900;
        linkBrightDark = 550;
        break;
      case "Craft":
        linkColor = "gray";
        linkBrightLight = 300;
        linkBrightDark = 525;
        break;
    }
  } else {
    linkColor = settings["css-reference-link-color"];
    linkBrightLight = 200;
    linkBrightDark = 900;
  }
  if (settings["css-reference-link-style"] != "Theme Default") {
    switch (settings["css-reference-link-style"]) {
      case "No underline":
        borderStyle = "0px solid ";
        break;
      case "Dotted underline":
        borderStyle = "1px dotted ";
        break;
      case "Thin underline":
        borderStyle = "1px solid ";
        break;
      case "Medium underline":
        borderStyle = "2px solid ";
        break;
      case "Fat underline":
        borderStyle = "3px solid ";
        break;
    }

    var head = document.getElementsByTagName("head")[0];
    var style = document.createElement("style");
    style.id = "roamstudio-css-reference-link-style";

    switch (settings["css-appearance"]) {
      case "Auto":
        style.textContent =
          `:root {--bb-reference__page-title: ${borderStyle}var(--cl-${linkColor}-${linkBrightLight});--bb-reference__page-title--hover: ${borderStyle}var(--cl-${linkColor}-${linkBrightLight});}` +
          `@media (prefers-color-scheme: dark) {:root {--bb-reference__page-title: ${borderStyle}var(--cl-${linkColor}-${linkBrightDark});--bb-reference__page-title--hover: ${borderStyle}var(--cl-${linkColor}-${linkBrightDark});}`;
        break;
      case "Dark":
        style.textContent = `:root {--bb-reference__page-title: ${borderStyle}var(--cl-${linkColor}-${linkBrightDark});:root {--bb-reference__page-title--hover: ${borderStyle}var(--cl-${linkColor}-${linkBrightDark});}`;
        break;
      case "Light":
        style.textContent = `:root {--bb-reference__page-title: ${borderStyle}var(--cl-${linkColor}-${linkBrightLight});--bb-reference__page-title--hover: ${borderStyle}var(--cl-${linkColor}-${linkBrightLight});}`;
        break;
    }
    head.appendChild(style);
  }
}

function changeReferenceLinkWeight() {
  console.log(
    "Switching reference link weight:" + settings["css-reference-link-weight"]
  );
  if (document.getElementById("roamstudio-css-reference-link-weight")) {
    document.getElementById("roamstudio-css-reference-link-weight").remove();
  }

  var head = document.getElementsByTagName("head")[0];
  var style = document.createElement("style");
  style.id = "roamstudio-css-reference-link-weight";
  style.textContent = `:root {--fw-reference__page-title: ${settings["css-reference-link-weight"]}};`;
  head.appendChild(style);
}

function changeTagColor() {
  var colorStyleLight: number;
  var colorStyleDark: number;
  var tagColor: string;

  console.log("Switching tag color: " + settings["css-tag-color"]);
  if (document.getElementById("roamstudio-css-tag-color")) {
    document.getElementById("roamstudio-css-tag-color").remove();
  }

  if (settings["css-tag-color"] == "Theme Default") {
    tagColor = "gray";
  } else {
    tagColor = settings["css-tag-color"];
  }

  if (!settings["css-tag-invert"]) {
    colorStyleLight = 500;
    colorStyleDark = 500;
  } else {
    colorStyleLight = 100;
    colorStyleDark = 900;
  }

  var head = document.getElementsByTagName("head")[0];
  var style = document.createElement("style");
  style.id = "roamstudio-css-tag-color";
  switch (settings["css-appearance"]) {
    case "Auto":
      style.textContent =
        `:root {--co-main__tags: var(--cl-${tagColor}-${colorStyleLight});--co-main__tags--hover: var(--cl-${tagColor}-${colorStyleLight});}` +
        `@media (prefers-color-scheme: dark) {:root {--co-main__tags: var(--cl-${tagColor}-${colorStyleDark});--co-main__tags--hover: var(--cl-${tagColor}-${colorStyleDark});}}`;
      break;
    case "Dark":
      style.textContent = `:root {--co-main__tags: var(--cl-${tagColor}-${colorStyleDark});--co-main__tags--hover: var(--cl-${tagColor}-${colorStyleDark});}`;
      break;
    case "Light":
      style.textContent = `:root {--co-main__tags: var(--cl-${tagColor}-${colorStyleLight});--co-main__tags--hover: var(--cl-${tagColor}-${colorStyleLight});}`;
      break;
  }
  head.appendChild(style);
}

function changeTagStyle() {
  var borderStyle: string;
  var tagColor: string;

  console.log(
    "Switching tag style: " +
      settings["css-tag-style"] +
      " with color " +
      settings["css-tag-color"]
  );
  if (document.getElementById("roamstudio-css-tag-style")) {
    document.getElementById("roamstudio-css-tag-style").remove();
  }

  if (settings["css-tag-style"] != "Theme Default") {
    if (settings["css-tag-color"] == "Theme Default") {
      tagColor = "gray";
    } else {
      tagColor = settings["css-tag-color"];
    }

    switch (settings["css-tag-style"]) {
      case "No underline":
        borderStyle = "0px solid ";
        break;
      case "Thin underline":
        borderStyle = "1px solid ";
        break;
      case "Medium underline":
        borderStyle = "2px solid ";
        break;
      case "Fat underline":
        borderStyle = "3px solid ";
        break;
    }

    var head = document.getElementsByTagName("head")[0];
    var style = document.createElement("style");
    style.id = "roamstudio-css-tag-style";
    style.textContent = `:root {--bb-main__tags: ${borderStyle}var(--cl-${tagColor}-600);--bb-main__tags--hover: ${borderStyle}var(--cl-${tagColor}-600);}`;
    head.appendChild(style);
  }
}

function changeTagFontSize() {
  var fontSize: number;

  console.log("Switching tag font size: " + settings["css-tag-font-size"]);
  if (document.getElementById("roamstudio-css-tag-font-size")) {
    document.getElementById("roamstudio-css-tag-font-size").remove();
  }

  if (settings["css-tag-font-size"] != "Theme Default") {
    switch (settings["css-tag-font-size"]) {
      case "Text":
        fontSize = 1;
        break;
      case "extra small":
        fontSize = 0.9;
        break;
      case "small":
        fontSize = 0.95;
        break;
      case "medium":
        fontSize = 1;
        break;
      case "large":
        fontSize = 1.05;
        break;
      case "extra large":
        fontSize = 1.1;
        break;
    }

    var head = document.getElementsByTagName("head")[0];
    var style = document.createElement("style");
    style.id = "roamstudio-css-tag-font-size";
    style.textContent = ":root {" + "--fs-main__tags: " + fontSize + "rem;};";
    head.appendChild(style);
  }
}

function changeTagBackground() {
  var colorStyle: number;
  var tagColor: string;

  colorStyle = 0;

  console.log("Switching tag background:" + settings["css-tag-background"]);
  if (document.getElementById("roamstudio-css-tag-background")) {
    document.getElementById("roamstudio-css-tag-background").remove();
  }

  if (
    settings["css-tag-background"] != "Theme Default" ||
    settings["css-tag-invert"]
  ) {
    if (settings["css-tag-background"] == "Theme Default") {
      tagColor = "gray";
    } else {
      tagColor = settings["css-tag-background"];
    }

    if (settings["css-tag-invert"]) {
      colorStyle = 500;
    } else {
      switch (settings["css-appearance"]) {
        case "Dark":
          colorStyle = 900;
          break;
        case "Light":
          colorStyle = 200;
          break;
      }
    }

    var head = document.getElementsByTagName("head")[0];
    var style = document.createElement("style");
    style.id = "roamstudio-css-tag-background";

    if (colorStyle != 0) {
      style.textContent = `.rm-page-ref--tag, span[data-tag="tags"] {padding: 2px 5px;}:root {--bc-main__tags: var(--cl-${tagColor}-${colorStyle});--bc-main__tags--hover: var(--cl-${tagColor}-${colorStyle})}`;
    } else {
      style.textContent = `.rm-page-ref--tag, span[data-tag="tags"] {padding: 2px 5px;}:root {--bc-main__tags: var(--cl-${tagColor}-200);--bc-main__tags--hover: var(--cl-${tagColor}-200);}@media (prefers-color-scheme: dark) {:root {--bc-main__tags: var(--cl-${tagColor}-900);--bc-main__tags--hover: var(--cl-${tagColor}-900);}}`;
    }

    head.appendChild(style);
  }
}

function changeTagRadius() {
  var radius: number;

  console.log("Switching tag radius:" + settings["css-tag-color"]);
  if (document.getElementById("roamstudio-css-tag-radius")) {
    document.getElementById("roamstudio-css-tag-radius").remove();
  }

  if (settings["css-tag-radius"] != "Theme Default") {
    switch (settings["css-tag-radius"]) {
      case "No radius":
        radius = 0;
        break;
      case "Slight":
        radius = 2;
        break;
      case "Medium":
        radius = 5;
        break;
      case "Heavy":
        radius = 10;
        break;
    }

    var head = document.getElementsByTagName("head")[0];
    var style = document.createElement("style");
    style.id = "roamstudio-css-tag-radius";
    style.textContent = `:root {--bd-main__tags: ${radius}px;--bd-main__tags--hover: ${radius}px;}`;
    head.appendChild(style);
  }
}

function changeDateIcon() {
  console.log("Switching date icon: " + settings["css-date-icon"]);
  if (document.getElementById("roamstudio-css-date-icon")) {
    document.getElementById("roamstudio-css-date-icon").remove();
  }

  if (settings["css-date-icon"]) {
    var head = document.getElementsByTagName("head")[0];
    var style = document.createElement("style");
    style.id = "roamstudio-css-date-icon";
    style.textContent = `:is(span[data-link-uid*="-17"],span[data-link-uid*="-18"],span[data-link-uid*="-19"],span[data-link-uid*="-20"],span[data-link-uid*="-21"]) .rm-page-ref:before {
      font-family: "Icons16",sans-serif;
      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      line-height: 1;
      -moz-osx-font-smoothing: grayscale;
      -webkit-font-smoothing: antialiased;
      color: var(--cl-main__date-link);
      content: '\\e62b';
      padding-right: 4px;
  }`;
    head.appendChild(style);
  }
}

function changeDateColor() {
  var colorStyleLight: number;
  var colorStyleDark: number;
  var tagColor: string;

  console.log("Switching date color: " + settings["css-date-color"]);
  if (document.getElementById("roamstudio-css-date-color")) {
    document.getElementById("roamstudio-css-date-color").remove();
  }

  if (settings["css-date-color"] == "Theme Default") {
    tagColor = "gray";
  } else {
    tagColor = settings["css-date-color"];
  }

  if (!settings["css-date-invert"]) {
    colorStyleLight = 600;
    colorStyleDark = 400;
  } else {
    colorStyleLight = 100;
    colorStyleDark = 900;
  }

  var head = document.getElementsByTagName("head")[0];
  var style = document.createElement("style");
  style.id = "roamstudio-css-date-color";
  switch (settings["css-appearance"]) {
    case "Auto":
      style.textContent =
        `:root {--co-main__date-link: var(--cl-${tagColor}-${colorStyleLight});--co-main__date-link--hover: var(--cl-${tagColor}-${colorStyleLight});}` +
        `@media (prefers-color-scheme: dark) {:root {--co-main__date-link: var(--cl-${tagColor}-${colorStyleDark});--co-main__date-link--hover: var(--cl-${tagColor}-${colorStyleDark});}}`;
      break;
    case "Dark":
      style.textContent = `:root {--co-main__date-link: var(--cl-${tagColor}-${colorStyleDark});--co-main__date-link--hover: var(--cl-${tagColor}-${colorStyleDark});}`;
      break;
    case "Light":
      style.textContent = `:root {--co-main__date-link: var(--cl-${tagColor}-${colorStyleLight});--co-main__date-link--hover: var(--cl-${tagColor}-${colorStyleLight});}`;
      break;
  }
  head.appendChild(style);
}

function changeDateStyle() {
  var borderStyle: string;
  var tagColor: string;

  console.log(
    "Switching tag style: " +
      settings["css-date-style"] +
      " with color " +
      settings["css-date-color"]
  );
  if (document.getElementById("roamstudio-css-date-style")) {
    document.getElementById("roamstudio-css-date-style").remove();
  }

  if (settings["css-date-style"] != "Theme Default") {
    if (settings["css-date-color"] == "Theme Default") {
      tagColor = "gray";
    } else {
      tagColor = settings["css-date-color"];
    }

    switch (settings["css-date-style"]) {
      case "No underline":
        borderStyle = "0px solid ";
        break;
      case "Thin underline":
        borderStyle = "1px solid ";
        break;
      case "Medium underline":
        borderStyle = "2px solid ";
        break;
      case "Fat underline":
        borderStyle = "3px solid ";
        break;
    }

    var head = document.getElementsByTagName("head")[0];
    var style = document.createElement("style");
    style.id = "roamstudio-css-date-style";
    style.textContent = `:root {--bb-main__date-link: ${borderStyle}var(--cl-${tagColor}-600);--bb-main__date-link--hover: ${borderStyle}var(--cl-${tagColor}-600);}`;
    head.appendChild(style);
  }
}

function changeDateFontSize() {
  var fontSize: number;

  console.log("Switching date font size: " + settings["css-date-font-size"]);
  if (document.getElementById("roamstudio-css-date-font-size")) {
    document.getElementById("roamstudio-css-date-font-size").remove();
  }

  if (settings["css-date-font-size"] != "Theme Default") {
    switch (settings["css-date-font-size"]) {
      case "Text":
        fontSize = 1;
        break;
      case "extra small":
        fontSize = 0.9;
        break;
      case "small":
        fontSize = 0.95;
        break;
      case "medium":
        fontSize = 1;
        break;
      case "large":
        fontSize = 1.05;
        break;
      case "extra large":
        fontSize = 1.1;
        break;
    }

    var head = document.getElementsByTagName("head")[0];
    var style = document.createElement("style");
    style.id = "roamstudio-css-date-font-size";
    style.textContent =
      ":root {" + "--fs-main__date-link: " + fontSize + "rem;};";
    head.appendChild(style);
  }
}

function changeDateBackground() {
  var colorStyle: number;
  var tagColor: string;

  colorStyle = 0;

  console.log("Switching date background:" + settings["css-date-background"]);
  if (document.getElementById("roamstudio-css-date-background")) {
    document.getElementById("roamstudio-css-date-background").remove();
  }

  if (
    settings["css-date-background"] != "Theme Default" ||
    settings["css-date-invert"]
  ) {
    if (settings["css-date-background"] == "Theme Default") {
      tagColor = "gray";
    } else {
      tagColor = settings["css-date-background"];
    }

    if (settings["css-date-invert"]) {
      colorStyle = 500;
    } else {
      switch (settings["css-appearance"]) {
        case "Dark":
          colorStyle = 700;
          break;
        case "Light":
          colorStyle = 300;
          break;
      }
    }

    var head = document.getElementsByTagName("head")[0];
    var style = document.createElement("style");
    style.id = "roamstudio-css-date-background";

    if (colorStyle != 0) {
      style.textContent = `:is(span[data-link-uid*="-17"],span[data-link-uid*="-18"],span[data-link-uid*="-19"],span[data-link-uid*="-20"],span[data-link-uid*="-21"]) .rm-page-ref {padding: 3px 7px;}:root {--bc-main__date-link: var(--cl-${tagColor}-${colorStyle});--bc-main__date-link--hover: var(--cl-${tagColor}-${colorStyle})}`;
    } else {
      style.textContent = `:is(span[data-link-uid*="-17"],span[data-link-uid*="-18"],span[data-link-uid*="-19"],span[data-link-uid*="-20"],span[data-link-uid*="-21"]) .rm-page-ref {padding: 3px 7px;}:root {--bc-main__date-link: var(--cl-${tagColor}-300);--bc-main__date-link--hover: var(--cl-${tagColor}-300);}@media (prefers-color-scheme: dark) {:root {--bc-main__date-link: var(--cl-${tagColor}-700);--bc-main__date-link--hover: var(--cl-${tagColor}-700);}}`;
    }

    head.appendChild(style);
  }
}

function changeDateRadius() {
  var radius: number;

  console.log("Switching tag radius:" + settings["css-date-radius"]);
  if (document.getElementById("roamstudio-css-date-radius")) {
    document.getElementById("roamstudio-css-date-radius").remove();
  }

  if (settings["css-date-radius"] != "Theme Default") {
    switch (settings["css-date-radius"]) {
      case "No radius":
        radius = 0;
        break;
      case "Slight":
        radius = 2;
        break;
      case "Medium":
        radius = 5;
        break;
      case "Heavy":
        radius = 10;
        break;
    }

    var head = document.getElementsByTagName("head")[0];
    var style = document.createElement("style");
    style.id = "roamstudio-css-date-radius";
    style.textContent = `:root {--bd-main__date-link: ${radius}px;--bd-main__date-link--hover: ${radius}px;}`;
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
  console.log(
    "Switching heading link color: " +
      settings["css-heading-" + heading + "-color"]
  );
  if (document.getElementById("roamstudio-css-heading-" + heading + "-color")) {
    document
      .getElementById("roamstudio-css-heading-" + heading + "-color")
      .remove();
  }

  if (settings["css-heading-" + heading + "-color"] != "Theme Default") {
    var head = document.getElementsByTagName("head")[0];
    var style = document.createElement("style");
    style.id = "roamstudio-css-heading-" + heading + "-color";
    style.textContent = `:root {--co-main__${heading}: var(--cl-${
      settings["css-heading-" + heading + "-color"]
    }-600);}`;
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
            changePageLinkColor();
            changePageLinkStyle();
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
            changePageLinkStyle();
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
            changePageLinkWeight();
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
            changeReferenceLinkColor();
            changeReferenceLinkStyle();
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
            changeReferenceLinkStyle();
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
            changeReferenceLinkWeight();
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
            settings["css-tag-color"] = evt.toString();
            changeTagColor();
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
            settings["css-tag-background"] = evt.toString();
            changeTagBackground();
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
            changeTagStyle();
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
            changeTagFontSize();
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
            changeTagRadius();
          },
        },
      },
      {
        id: "css-tag-invert",
        name: "Invert Tags",
        description: "Invert the back- and foreground brightness of your tags",
        action: {
          type: "switch",
          onChange: (evt) => {
            settings["css-tag-invert"] = evt.target.checked;
            changeTagBackground();
            changeTagColor();
          },
        },
      },
      {
        id: "css-date-color",
        name: "Date Color",
        description: "Select the color of your date-links",
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
            settings["css-date-color"] = evt.toString();
            changeDateColor();
          },
        },
      },
      {
        id: "css-date-style",
        name: "Date Style",
        description: "Select the style of your date-links",
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
            changeDateStyle();
          },
        },
      },
      {
        id: "css-date-font-size",
        name: "Date Font Size",
        description: "Select the font-size of your date-links",
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
            changeDateFontSize();
          },
        },
      },
      {
        id: "css-date-background",
        name: "Date Background Color",
        description: "Select the background color of your date-links",
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
            settings["css-date-background"] = evt.toString();
            changeDateBackground();
          },
        },
      },
      {
        id: "css-date-radius",
        name: "Date Radius",
        description: "Select the radius of your date-links",
        action: {
          type: "select",
          items: ["Theme Default", "No radius", "Slight", "Medium", "Heavy"],
          onChange: (evt) => {
            settings["css-date-radius"] = evt.toString();
            changeDateRadius();
          },
        },
      },
      {
        id: "css-date-invert",
        name: "Invert Dates",
        description:
          "Invert the back- and foreground brightness of your date-links",
        action: {
          type: "switch",
          onChange: (evt) => {
            settings["css-date-invert"] = evt.target.checked;
            changeDateBackground();
            changeDateColor();
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
        description:
          "Strike out done todos",
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

  Object.keys(modules).forEach((item) => {
    console.log("Removing Module: " + item);
    if (document.getElementById("roamstudio-css-" + item)) {
      document.getElementById("roamstudio-css-" + item).remove();
    }
  });

  destroyToggle();

  console.log("Unloaded Roam Studio");
}

export default {
  onload: onload,
  onunload: onunload,
};
