let cssTheme = "Default",
  cssAppearance = "Auto",
  cssFontFamily = "Theme Default",
  cssHeadingFontFamily = "Theme Default",
  cssFontSize = "medium";

var modules = {
    "advanced-heading-spacing": false,
    "bullet-effects": false,
    "centered-search": false,
    "dynamic-images": false,
    "hide-logo": false,
    "no-animations": false,
    "subtle-controls": false,
  },
  css = {};

function loadSystem() {
  console.log("Loading Roam CSS System III");

  if (document.getElementById("css-system")) {
    document.getElementById("css-system").remove();
  }

  if (cssTheme.toLowerCase() != "default") {
    var head = document.getElementsByTagName("head")[0];
    var style = document.createElement("style");
    style.id = "css-system";
    style.textContent = css["system"];
    head.appendChild(style);
  }
}

function changeFontSize() {
  var fontSize;

  console.log("Switching base font size:" + cssFontSize);
  if (document.getElementById("css-font-size")) {
    document.getElementById("css-font-size").remove();
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
  style.id = "css-font-size";
  style.textContent = ":root {" + "--fs-app__html: " + fontSize + "px;};";
  head.appendChild(style);
}

function changeHeadingFontFamily() {
  console.log("Switching heading font family");
  if (document.getElementById("css-heading-font-family")) {
    document.getElementById("css-heading-font-family").remove();
  }

  if (cssFontFamily != "Theme Default") {
    var head = document.getElementsByTagName("head")[0];
    var style = document.createElement("style");
    style.id = "css-heading-font-family";
    if (cssFontFamily == "System Font Stack") {
      style.textContent =
        ":root {" +
        '--ff-main__page-title: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";' +
        '--ff-main__level1: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";' +
        '--ff-main__level2: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";' +
        '--ff-main__level3: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";' +
        "}";
    } else {
      style.textContent =
        ":root {" +
        "--ff-main__page-title: " +
        cssFontFamily +
        ",sans-serif;" +
        "--ff-main__level1: " +
        cssFontFamily +
        ",sans-serif;" +
        "--ff-main__level2: " +
        cssFontFamily +
        ",sans-serif;" +
        "--ff-main__level3: " +
        cssFontFamily +
        ",sans-serif;" +
        "}";
    }
    head.appendChild(style);
  }
}

function changeFontFamily() {
  console.log("Switching font family");
  if (document.getElementById("css-font-family")) {
    document.getElementById("css-font-family").remove();
  }

  if (cssFontFamily != "Theme Default") {
    var head = document.getElementsByTagName("head")[0];
    var style = document.createElement("style");
    style.id = "css-font-family";
    if (cssFontFamily == "System Font Stack") {
      style.textContent =
        ":root {" +
        '--ff-main: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";' +
        '--ff-main__tags: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";' +
        '--ff-main__pomodoro: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";' +
        '--ff-main__quote: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";' +
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
        "}";
    }
    head.appendChild(style);
  }
}

function changeTheme() {
  var cssAppearanceStr = cssAppearance;

  console.log("Changing theme to: " + cssTheme);
  console.log("Changing appearance to: " + cssAppearance);

  if (document.getElementById("css-theme")) {
    document.getElementById("css-theme").remove();
  }

  if (cssTheme.toLowerCase() != "default") {
    if (document.getElementById("css-system") == null) {
      var head = document.getElementsByTagName("head")[0];
      var style = document.createElement("style");
      style.id = "css-system";
      style.textContent = css["system"];
      head.appendChild(style);
    }

    var head = document.getElementsByTagName("head")[0];
    var style = document.createElement("style");
    style.id = "css-theme";
    style.textContent =
      css[cssTheme.toLowerCase() + "-common"] +
      css[cssTheme.toLowerCase() + "-" + cssAppearance.toLowerCase()];
    head.appendChild(style);
  } else {
    if (document.getElementById("css-system")) {
      document.getElementById("css-system").remove();
    }
  }
}

function changeModule(moduleName) {
  console.log("Module called: " + moduleName);
  console.log("Module status: " + modules[moduleName]);

  if (!modules[moduleName]) {
    if (document.getElementById(moduleName)) {
      document.getElementById(moduleName).remove();
    }
  } else {
    var head = document.getElementsByTagName("head")[0];
    var style = document.createElement("style");
    style.id = moduleName;
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
  tabTitle: "RoamStudio",
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

  console.log("Loaded Roam CSS System III");
}

function onunload() {
  console.log("Unloading Roam CSS System III");

  if (document.getElementById("css-theme")) {
    console.log("Removing Theme");
    document.getElementById("css-theme").remove();
  }

  if (document.getElementById("css-system")) {
    console.log("Removing CSS System");
    document.getElementById("css-system").remove();
  }

  if (document.getElementById("css-font-family")) {
    console.log("Removing CSS Font Family");
    document.getElementById("css-font-family").remove();
  }

  if (document.getElementById("css-heading-font-family")) {
    console.log("Removing CSS Heading Font Family");
    document.getElementById("css-heading-font-family").remove();
  }

  if (document.getElementById("css-font-size")) {
    console.log("Removing CSS Base Font Size");
    document.getElementById("css-font-size").remove();
  }

  Object.keys(modules).forEach((item) => {
    console.log("Removing Module: " + item);
    if (document.getElementById(item)) {
      document.getElementById(item).remove();
    }
  });
  console.log("Unloaded Roam CSS System III");
}

export default {
  onload: onload,
  onunload: onunload,
};
