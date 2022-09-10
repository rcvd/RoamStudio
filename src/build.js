let cssTheme = "Default",
  cssAppearance = "Auto",
  cssFontFamily = "Theme Default",
  cssHeadingFontFamily = "Theme Default",
  cssFontSize = "medium",
  cssMobileFontSize = "medium",
  cssPageLinkColor = "Theme Default",
  cssPageLinkStyle = "Theme Default",
  cssTagColor = "Theme Default",
  cssTagStyle = "Theme Default",
  cssTagBackground = "Theme Default",
  cssTagRadius = "Theme Default";

var modules = {
    "advanced-heading-spacing": false,
    "bullet-effects": false,
    "centered-search": false,
    "dynamic-images": false,
    "hide-logo": false,
    masonry: false,
    "mobile-sidebar": false,
    "no-animations": false,
    "subtle-controls": false,
  },
  css = {};

function loadSystem() {
  console.log("Loading Roam Roam Studio");

  if (document.getElementById("roamstudio-css-system")) {
    document.getElementById("roamstudio-css-system").remove();
  }

  if (cssTheme.toLowerCase() != "default") {
    var head = document.getElementsByTagName("head")[0];
    var style = document.createElement("style");
    style.id = "roamstudio-css-system";
    style.textContent = css["system"];
    head.appendChild(style);
  }
}

function changeFontSize() {
  var fontSize;

  console.log("Switching base font size:" + cssFontSize);
  if (document.getElementById("roamstudio-css-font-size")) {
    document.getElementById("roamstudio-css-font-size").remove();
  }

  switch (cssFontSize) {
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
  style.textContent = ":root {" + "--fs-app__html: " + fontSize + "px;};";
  head.appendChild(style);

  changeMobileFontSize();
}

function changeMobileFontSize() {
  var fontSize;

  console.log("Switching base font size:" + cssMobileFontSize);
  if (document.getElementById("roamstudio-css-mobile-font-size")) {
    document.getElementById("roamstudio-css-mobile-font-size").remove();
  }

  switch (cssMobileFontSize) {
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
  style.textContent =
    "@media screen and (max-width: 600px) { :root {" +
    "--fs-app__html: " +
    fontSize +
    "px;};}";
  head.appendChild(style);
}

function changePageLinkColor() {
  console.log("Switching page link color:" + cssPageLinkColor);
  if (document.getElementById("roamstudio-css-page-link-color")) {
    document.getElementById("roamstudio-css-page-link-color").remove();
  }

  if (cssPageLinkColor != "Theme Default") {
    var head = document.getElementsByTagName("head")[0];
    var style = document.createElement("style");
    style.id = "roamstudio-css-page-link-color";
    style.textContent =
      ":root {" +
      "--co-main__page-link: var(--cl-" +
      cssPageLinkColor +
      "-600);" +
      "--co-main__a: var(--cl-" +
      cssPageLinkColor +
      "-600);" +
      "--co-main__alias: var(--cl-" +
      cssPageLinkColor +
      "-600);" +
      "--co-main__page-link--hover: var(--cl-" +
      cssPageLinkColor +
      "-600);" +
      "--co-main__a--hover: var(--cl-" +
      cssPageLinkColor +
      "-600);" +
      "--co-main__alias--hover: var(--cl-" +
      cssPageLinkColor +
      "-600);" +
      "}";
    head.appendChild(style);
  }

  changePageLinkStyle();
}

function changePageLinkStyle() {
  var fontStyle;

  console.log("Switching page link style:" + cssPageLinkStyle);
  if (document.getElementById("roamstudio-css-page-link-style")) {
    document.getElementById("roamstudio-css-page-link-style").remove();
  }

  if (cssPageLinkColor != "Theme Default") {
    if (cssPageLinkStyle != "Theme Default") {
      switch (cssPageLinkStyle) {
        case "Thin underline":
          fontStyle = "1px solid ";
          break;
        case "Fat underline":
          fontStyle = "3px solid ";
          break;
      }

      var head = document.getElementsByTagName("head")[0];
      var style = document.createElement("style");
      style.id = "roamstudio-css-page-link-style";
      style.textContent =
        ":root {" +
        "--bb-main__page-link: " +
        fontStyle +
        "var(--cl-" +
        cssPageLinkColor +
        "-400);" +
        "--bb-main__a: " +
        fontStyle +
        "var(--cl-" +
        cssPageLinkColor +
        "-400);" +
        "--bb-main__alias: " +
        fontStyle +
        "var(--cl-" +
        cssPageLinkColor +
        "-400);" +
        "--bb-main__page-link--hover: " +
        fontStyle +
        "var(--cl-" +
        cssPageLinkColor +
        "-400);" +
        "--bb-main__a--hover: " +
        fontStyle +
        "var(--cl-" +
        cssPageLinkColor +
        "-400);" +
        "--bb-main__alias--hover: " +
        fontStyle +
        "var(--cl-" +
        cssPageLinkColor +
        "-400);" +
        "}";
      head.appendChild(style);
    }
  }
}

function changeTagColor() {
  console.log("Switching page link color:" + cssTagColor);
  if (document.getElementById("roamstudio-css-tag-color")) {
    document.getElementById("roamstudio-css-tag-color").remove();
  }

  if (cssTagColor != "Theme Default") {
    var head = document.getElementsByTagName("head")[0];
    var style = document.createElement("style");
    style.id = "roamstudio-css-tag-color";
    style.textContent =
      ":root {" +
      "--co-main__tags: var(--cl-" +
      cssTagColor +
      "-500);" +
      "--co-main__tags--hover: var(--cl-" +
      cssTagColor +
      "-500);" +
      "}";
    head.appendChild(style);
  }

  changeTagStyle();
}

function changeTagStyle() {
  var fontStyle;

  console.log("Switching page link style:" + cssTagStyle);
  if (document.getElementById("roamstudio-css-tag-style")) {
    document.getElementById("roamstudio-css-tag-style").remove();
  }

  if (cssTagStyle != "Theme Default") {
    switch (cssTagStyle) {
      case "Thin underline":
        fontStyle = "1px solid ";
        break;
      case "Fat underline":
        fontStyle = "3px solid ";
        break;
    }

    var head = document.getElementsByTagName("head")[0];
    var style = document.createElement("style");
    style.id = "roamstudio-css-tag-style";
    style.textContent =
      ":root {" +
      "--bb-main__tags: " +
      fontStyle +
      "var(--cl-" +
      cssTagColor +
      "-600);" +
      "--bb-main__tags--hover: " +
      fontStyle +
      "var(--cl-" +
      cssTagColor +
      "-600);" +
      "}";
    head.appendChild(style);
  }
}

function changeTagBackground() {
  var colorStyle;

  colorStyle = 0;

  console.log("Switching page link style:" + cssTagBackground);
  if (document.getElementById("roamstudio-css-tag-background")) {
    document.getElementById("roamstudio-css-tag-background").remove();
  }

  switch (cssAppearance) {
    case "Dark":
      colorStyle = 900;
      break;
    case "Light":
      colorStyle = 100;
      break;
  }

  if (cssTagBackground != "Theme Default") {
    var head = document.getElementsByTagName("head")[0];
    var style = document.createElement("style");
    style.id = "roamstudio-css-tag-background";

    if (colorStyle != 0) {
      style.textContent =
        '.rm-page-ref--tag, span[data-tag="tags"] {' +
        "padding-left: 5px;" +
        "padding-right: 5px;}" +
        ":root {" +
        "--bc-main__tags: " +
        "var(--cl-" +
        cssTagBackground +
        "-" +
        colorStyle +
        ");" +
        "--bc-main__tags--hover: " +
        "var(--cl-" +
        cssTagBackground +
        "-" +
        colorStyle +
        ")" +
        "}";
    } else {
      style.textContent =
        '.rm-page-ref--tag, span[data-tag="tags"] {' +
        "padding-left: 5px;" +
        "padding-right: 5px;}" +
        ":root {" +
        "--bc-main__tags: " +
        "var(--cl-" +
        cssTagBackground +
        "-100);" +
        "--bc-main__tags--hover: " +
        "var(--cl-" +
        cssTagBackground +
        "-100);" +
        "}" +
        "@media (prefers-color-scheme: dark) {" +
        ":root {" +
        "--bc-main__tags: " +
        "var(--cl-" +
        cssTagBackground +
        "-900);" +
        "--bc-main__tags--hover: " +
        "var(--cl-" +
        cssTagBackground +
        "-900);" +
        "}" +
        "}";
    }

    head.appendChild(style);
  }
}

function changeTagRadius() {
  var radius;

  console.log("Switching page link color:" + cssTagColor);
  if (document.getElementById("roamstudio-css-tag-radius")) {
    document.getElementById("roamstudio-css-tag-radius").remove();
  }

  if (cssTagRadius != "Theme Default") {
    switch (cssTagRadius) {
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
    style.textContent =
      ":root {" +
      "--bd-main__tags: " +
      radius +
      "px;" +
      "--bd-main__tags--hover: " +
      radius +
      "px;" +
      "}";
    head.appendChild(style);
  }
}

function changeHeadingFontFamily() {
  console.log("Switching heading font family");
  if (document.getElementById("roamstudio-css-heading-font-family")) {
    document.getElementById("roamstudio-css-heading-font-family").remove();
  }

  if (cssHeadingFontFamily != "Theme Default") {
    var head = document.getElementsByTagName("head")[0];
    var style = document.createElement("style");
    style.id = "roamstudio-css-heading-font-family";
    if (cssHeadingFontFamily == "System Font Stack") {
      style.textContent =
        ":root {" +
        '--ff-main__page-title: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";' +
        '--ff-main__level1: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";' +
        '--ff-main__level2: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";' +
        '--ff-main__level3: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";' +
        '--ff-right-sidebar__h1: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";' +
        "}";
    } else {
      style.textContent =
        ":root {" +
        "--ff-main__page-title: " +
        cssHeadingFontFamily +
        ",sans-serif;" +
        "--ff-main__level1: " +
        cssHeadingFontFamily +
        ",sans-serif;" +
        "--ff-main__level2: " +
        cssHeadingFontFamily +
        ",sans-serif;" +
        "--ff-main__level3: " +
        cssHeadingFontFamily +
        ",sans-serif;" +
        "--ff-right-sidebar__h1: " +
        cssHeadingFontFamily +
        ",sans-serif;" +
        "}";
    }
    head.appendChild(style);
  }
}

function changeFontFamily() {
  console.log("Switching font family");
  if (document.getElementById("roamstudio-css-font-family")) {
    document.getElementById("roamstudio-css-font-family").remove();
  }

  if (cssFontFamily != "Theme Default") {
    var head = document.getElementsByTagName("head")[0];
    var style = document.createElement("style");
    style.id = "roamstudio-css-font-family";
    if (cssFontFamily == "System Font Stack") {
      style.textContent =
        ":root {" +
        '--ff-main: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";' +
        '--ff-main__tags: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";' +
        '--ff-main__pomodoro: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";' +
        '--ff-main__quote: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";' +
        '--ff-log-page__h1: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";' +
        "}";
    } else {
      style.textContent =
        ":root {" +
        "--ff-main: " +
        cssFontFamily +
        ",sans-serif;" +
        "--ff-main__tags: " +
        cssFontFamily +
        ",sans-serif;" +
        "--ff-main__pomodoro: " +
        cssFontFamily +
        ",sans-serif;" +
        "--ff-main__quote: " +
        cssFontFamily +
        ",sans-serif;" +
        "--ff-log-page__h1: " +
        cssFontFamily +
        ",sans-serif;" +
        "}";
    }
    head.appendChild(style);
  }
}

function changeTheme() {
  var cssAppearanceStr = cssAppearance;

  console.log("Changing theme to: " + cssTheme);
  console.log("Changing appearance to: " + cssAppearance);

  if (document.getElementById("roamstudio-css-theme")) {
    document.getElementById("roamstudio-css-theme").remove();
  }

  if (cssTheme.toLowerCase() != "default") {
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
      css[cssTheme.toLowerCase() + "-common"] +
      css[cssTheme.toLowerCase() + "-" + cssAppearance.toLowerCase()];
    head.appendChild(style);
  } else {
    if (document.getElementById("roamstudio-css-system")) {
      document.getElementById("roamstudio-css-system").remove();
    }
  }

  changeFontFamily();
  changeHeadingFontFamily();
  changeFontSize();
  changeMobileFontSize();
}

function changeModule(moduleName) {
  console.log("Module called: " + moduleName);
  console.log("Module status: " + modules[moduleName]);

  if (!modules[moduleName]) {
    if (document.getElementById("roamstudio-css-" + moduleName)) {
      document.getElementById("roamstudio-css-" + moduleName).remove();
    }
  } else {
    if (document.getElementById("roamstudio-css-" + moduleName)) {
      document.getElementById("roamstudio-css-" + moduleName).remove();
    }

    var head = document.getElementsByTagName("head")[0];
    var style = document.createElement("style");
    style.id = "roamstudio-css-" + moduleName;
    style.textContent = css[moduleName];
    head.appendChild(style);
  }
}

function setSettingDefault(extensionAPI, settingId, settingDefault) {
  let storedSetting = extensionAPI.settings.get(settingId);
  if (null == storedSetting)
    extensionAPI.settings.set(settingId, settingDefault);
  return storedSetting || settingDefault;
}

const panelConfig = {
  tabTitle: "Roam Studio",
  settings: [
    {
      id: "css-theme",
      name: "Base Theme",
      description: "Select your base theme",
      action: {
        type: "select",
        items: ["Default", "Quattro"],
        onChange: (evt) => {
          cssTheme = evt;
          changeTheme();
        },
      },
    },
    {
      id: "css-font-family",
      name: "Font Family",
      description: "Select your main font family",
      action: {
        type: "select",
        items: [
          "Theme Default",
          "iA Writer Quattro S",
          "Inter",
          "System Font Stack",
        ],
        onChange: (evt) => {
          cssFontFamily = evt;
          changeFontFamily();
        },
      },
    },
    {
      id: "css-font-size",
      name: "Base font size",
      description: "Select your base font size",
      action: {
        type: "select",
        items: ["extra small", "small", "medium", "large", "extra large"],
        onChange: (evt) => {
          cssFontSize = evt;
          changeFontSize();
        },
      },
    },
    {
      id: "css-mobile-font-size",
      name: "Base font size on mobile devices",
      description: "Select your base font size",
      action: {
        type: "select",
        items: ["extra small", "small", "medium", "large", "extra large"],
        onChange: (evt) => {
          cssMobileFontSize = evt;
          changeMobileFontSize();
        },
      },
    },
    {
      id: "css-heading-font-family",
      name: "Heading Font Family",
      description: "Select your heading font family",
      action: {
        type: "select",
        items: [
          "Theme Default",
          "iA Writer Quattro S",
          "Inter",
          "System Font Stack",
        ],
        onChange: (evt) => {
          cssHeadingFontFamily = evt;
          changeHeadingFontFamily();
        },
      },
    },
    {
      id: "css-appearance",
      name: "Appearance",
      description: "Select the themes appearance",
      action: {
        type: "select",
        items: ["Dark", "Light", "Auto"],
        onChange: (evt) => {
          cssAppearance = evt;
          changeTheme();
        },
      },
    },
    {
      id: "css-page-link-color",
      name: "Page link color",
      description: "Select the color of the page links",
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
          cssPageLinkColor = evt;
          changePageLinkColor();
        },
      },
    },
    {
      id: "css-page-link-style",
      name: "Page link style",
      description: "Select the style of the page links",
      action: {
        type: "select",
        items: [
          "Theme Default",
          "No underline",
          "Thin underline",
          "Fat underline",
        ],
        onChange: (evt) => {
          cssPageLinkStyle = evt;
          changePageLinkStyle();
        },
      },
    },
    {
      id: "css-tag-color",
      name: "Tag color",
      description: "Select the color of the tags",
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
          cssTagColor = evt;
          changeTagColor();
        },
      },
    },
    {
      id: "css-tag-style",
      name: "Tag style",
      description: "Select the style of the tags",
      action: {
        type: "select",
        items: [
          "Theme Default",
          "No underline",
          "Thin underline",
          "Fat underline",
        ],
        onChange: (evt) => {
          cssTagStyle = evt;
          changeTagStyle();
        },
      },
    },
    {
      id: "css-tag-background",
      name: "Tag background color",
      description: "Select the backgroudn color of the tags",
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
          cssTagBackground = evt;
          changeTagBackground();
        },
      },
    },
    {
      id: "css-tag-radius",
      name: "Tag radius",
      description: "Select the radius of the tags",
      action: {
        type: "select",
        items: ["Theme Default", "No radius", "Slight", "Medium", "Heavy"],
        onChange: (evt) => {
          cssTagRadius = evt;
          changeTagRadius();
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
          modules["advanced-heading-spacing"] = evt.target.checked;
          changeModule("advanced-heading-spacing");
        },
      },
    },
    {
      id: "css-bullet-effects",
      name: "Bullet effects",
      description: "Subtle effect of bullet hovering",
      action: {
        type: "switch",
        onChange: (evt) => {
          modules["bullet-effects"] = evt.target.checked;
          changeModule("bullet-effects");
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
          modules["centered-search"] = evt.target.checked;
          changeModule("centered-search");
        },
      },
    },
    {
      id: "css-no-animations",
      name: "Disable Animations",
      description: "Disable all animations and transitions to speed up the UI",
      action: {
        type: "switch",
        onChange: (evt) => {
          modules["no-animations"] = evt.target.checked;
          changeModule("no-animations");
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
          modules["dynamic-images"] = evt.target.checked;
          changeModule("dynamic-images");
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
          modules["hide-logo"] = evt.target.checked;
          changeModule("hide-logo");
        },
      },
    },
    {
      id: "css-masonry",
      name: "Masonry Sidebar",
      description: "Change the right sidebar to a masonry view of the windows",
      action: {
        type: "switch",
        onChange: (evt) => {
          modules["masonry"] = evt.target.checked;
          changeModule("masonry");
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
          modules["mobile-sidebar"] = evt.target.checked;
          changeModule("mobile-sidebar");
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
          modules["subtle-controls"] = evt.target.checked;
          changeModule("subtle-controls");
        },
      },
    },
  ],
};

function onload({ extensionAPI }) {
  cssTheme = setSettingDefault(extensionAPI, "css-theme", "Quattro");
  cssAppearance = setSettingDefault(extensionAPI, "css-appearance", "Auto");
  cssFontSize = setSettingDefault(extensionAPI, "css-font-size", "medium");
  cssPageLinkColor = setSettingDefault(
    extensionAPI,
    "css-page-link-color",
    "Theme Default"
  );
  cssPageLinkStyle = setSettingDefault(
    extensionAPI,
    "css-page-link-style",
    "Theme Default"
  );
  cssTagColor = setSettingDefault(
    extensionAPI,
    "css-tag-color",
    "Theme Default"
  );
  cssTagStyle = setSettingDefault(
    extensionAPI,
    "css-tag-style",
    "Theme Default"
  );
  cssTagBackground = setSettingDefault(
    extensionAPI,
    "css-tag-background",
    "Theme Default"
  );
  cssTagRadius = setSettingDefault(
    extensionAPI,
    "css-tag-radius",
    "Theme Default"
  );
  cssMobileFontSize = setSettingDefault(
    extensionAPI,
    "css-mobile-font-size",
    "medium"
  );
  cssFontFamily = setSettingDefault(
    extensionAPI,
    "css-font-family",
    "Theme Default"
  );
  cssHeadingFontFamily = setSettingDefault(
    extensionAPI,
    "css-heading-font-family",
    "Theme Default"
  );

  initCSSThemes();

  Object.keys(modules).forEach((item) => {
    modules[item] = setSettingDefault(extensionAPI, "css-" + item, false);
    console.log("Setting: " + "css-" + item);
    changeModule(item);
  });

  extensionAPI.settings.panel.create(panelConfig);

  loadSystem();
  changeTheme();
  changeFontFamily();
  changeHeadingFontFamily();
  changeFontSize();
  changePageLinkColor();
  changePageLinkStyle();
  changeTagColor();
  changeTagStyle();
  changeTagBackground();
  changeTagRadius();

  console.log("Loaded Roam Studio");
}

function onunload() {
  console.log("Unloading Roam Studio");

  if (document.getElementById("roamstudio-css-theme")) {
    console.log("Removing Theme");
    document.getElementById("roamstudio-css-theme").remove();
  }

  if (document.getElementById("roamstudio-css-system")) {
    console.log("Removing CSS System");
    document.getElementById("roamstudio-css-system").remove();
  }

  if (document.getElementById("roamstudio-css-font-family")) {
    console.log("Removing CSS Font Family");
    document.getElementById("roamstudio-css-font-family").remove();
  }

  if (document.getElementById("roamstudio-css-heading-font-family")) {
    console.log("Removing CSS Heading Font Family");
    document.getElementById("roamstudio-css-heading-font-family").remove();
  }

  if (document.getElementById("roamstudio-css-font-size")) {
    console.log("Removing CSS Base Font Size");
    document.getElementById("roamstudio-css-font-size").remove();
  }

  if (document.getElementById("roamstudio-css-mobile-font-size")) {
    console.log("Removing CSS Mobile Base Font Size");
    document.getElementById("roamstudio-css-mobile-font-size").remove();
  }

  if (document.getElementById("roamstudio-css-page-link-color")) {
    console.log("Removing CSS Page Link Color");
    document.getElementById("roamstudio-css-page-link-color").remove();
  }

  if (document.getElementById("roamstudio-css-page-link-style")) {
    console.log("Removing CSS Page Link Style");
    document.getElementById("roamstudio-css-page-link-style").remove();
  }

  if (document.getElementById("roamstudio-css-tag-color")) {
    console.log("Removing CSS Tag Color");
    document.getElementById("roamstudio-css-tag-color").remove();
  }

  if (document.getElementById("roamstudio-css-tag-style")) {
    console.log("Removing CSS Tag Style");
    document.getElementById("roamstudio-css-tag-style").remove();
  }

  if (document.getElementById("roamstudio-css-tag-background")) {
    console.log("Removing CSS Tag Background");
    document.getElementById("roamstudio-css-tag-background").remove();
  }

  if (document.getElementById("roamstudio-css-tag-radius")) {
    console.log("Removing CSS Tag Radius");
    document.getElementById("roamstudio-css-tag-radius").remove();
  }

  Object.keys(modules).forEach((item) => {
    console.log("Removing Module: " + item);
    if (document.getElementById("roamstudio-css-" + item)) {
      document.getElementById("roamstudio-css-" + item).remove();
    }
  });
  console.log("Unloaded Roam Studio");
}

export default {
  onload: onload,
  onunload: onunload,
};
