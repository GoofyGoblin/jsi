export function downloadFile(fileContent: string, fileName: string) {
  const blob = new Blob([fileContent], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = fileName;
  a.click();
  URL.revokeObjectURL(url);
}

export function swayGenerator(swayConfig: any) {
  let config = `# ========================================\n`
  config += `# Generated sway configuration\n`
  config += `# ========================================\n`
  config += `\n`
  if (swayConfig.modkey == "win") {
    config += `set $mod Mod4\n`
  }
  if (swayConfig.modkey == "alt") {
    config += `set $mod Mod1\n`
  }

  const swayColors = swayConfig.colors

  config += `set $term ${swayConfig.terminal}\n`
  config += `set $menu rofi -show drun\n`
  config += `\n`
  config += `set $focused ${swayColors.focused}\n`
  config += `set $focusedInactive ${swayColors.focusedInactive}\n`
  config += `set $inactive ${swayColors.inactive}\n`
  config += `set $urgent ${swayColors.urgent}\n`
  config += `\n`
  config += `floating_modifier $mod normal\n`
  config += `default_border pixel 1\n`
  config += `default_floating_border pixel 1\n`
  config += `smart_borders on\n`
  config += `\n`
  config += `# Color Schemes: <class> <border> <bg> <text> <indicator> <child_border>\n`
  config += `client.focused          $focused          $focused          #000000  $focused          $focused\n`
  config += `client.focused_inactive $focusedInactive  $focusedInactive  #ffffff  $focusedInactive  $focusedInactive\n`
  config += `client.unfocused        $inactive         $inactive         #ffffff  $inactive         $inactive\n`
  config += `client.urgent           $urgent           $urgent           #ffffff  $urgent           $urgent\n`

  const swayMonitors = swayConfig.monitors

  if (swayMonitors.length >= 1) {
    swayMonitors.forEach((e: any) => {
      config += `output ${e.name} {\n`
      config += `    scale 1.0\n`
      config += `    resolution ${e.resolution[0]}x${e.resolution[1]}@${e.refreshRates}\n`
      config += `    position ${e.position[0]}x${e.position[1]}\n`
      config += `}\n`
    })
  }

  config += `\n`;

  const swayKeybindings = swayConfig.keybindings
  config += `bindsym $mod+Return exec $term\n`
  config += `bindsym $mod+d exec $menu\n`

  config += `\n`;

  config += `# generated keybindings\n`
  config += `bindsym $mod+1 workspace number 1\n`
  config += `bindsym $mod+2 workspace number 2\n`
  config += `bindsym $mod+3 workspace number 3\n`
  config += `bindsym $mod+4 workspace number 4\n`
  config += `bindsym $mod+5 workspace number 5\n`
  config += `bindsym $mod+6 workspace number 6\n`
  config += `bindsym $mod+7 workspace number 7\n`
  config += `bindsym $mod+8 workspace number 8\n`
  config += `bindsym $mod+9 workspace number 9\n`
  config += `bindsym $mod+Shift+1 move container to workspace number 1\n`
  config += `bindsym $mod+Shift+2 move container to workspace number 2\n`
  config += `bindsym $mod+Shift+3 move container to workspace number 3\n`
  config += `bindsym $mod+Shift+4 move container to workspace number 4\n`
  config += `bindsym $mod+Shift+5 move container to workspace number 5\n`
  config += `bindsym $mod+Shift+6 move container to workspace number 6\n`
  config += `bindsym $mod+Shift+7 move container to workspace number 7\n`
  config += `bindsym $mod+Shift+8 move container to workspace number 8\n`
  config += `bindsym $mod+Shift+9 move container to workspace number 9\n`
  config += `bindsym $mod+j focus down\n`
  config += `bindsym $mod+k focus up\n`
  config += `bindsym $mod+h focus left\n`
  config += `bindsym $mod+l focus right\n`
  config += `bindsym $mod+Shift+j move down\n`
  config += `bindsym $mod+Shift+k move up\n`
  config += `bindsym $mod+Shift+h move left\n`
  config += `bindsym $mod+Shift+l move right\n`
  config += `bindsym $mod+Shift+q exec swaynag -t warning -m 'exit sway? -B 'Yes' 'swaymsg exit'\n`


  if (swayKeybindings) {
    for (const [keybind, action] of Object.entries(swayKeybindings)) {
      config += `bindsym $mod+${keybind} ${action}\n`
    }
  }

  const swayKeyboardLayout = swayConfig.keyboardLayout
  const swayKeyboardRepeatRate = swayConfig.repeatRate
  config += `input "type:keyboard {\n`
  if (swayKeyboardLayout && swayKeyboardLayout != "qwerty") {
    config += `    xkb_layout "us"\n`
    config += `    xkb_variant "${swayKeyboardLayout}"\n`
  }
  config += `    repeat_rate ${swayKeyboardRepeatRate}\n`
  config += `}\n`

  downloadFile(config, "config")
}

export function nvimGenerator(nvimConfig: any) {
  let config = `-- ========================================\n`
  config += `-- Generated neovim configuration\n`
  config += `-- ========================================\n`

  // general settings
  const generalSettings = nvimConfig.generalSettings
  if (generalSettings.statusLine) {
    config += `vim.opt.laststatus = 0\n`
  }

  if (generalSettings.lineBreak) {
    config += `vim.opt.linebreak = true\n`
  }

  if (generalSettings.lineNumbers) {
    config += `vim.opt.number = true\n`
  }

  config += `vim.g.mapleader = "${generalSettings.leaderKey}"\n`


  const pluginsSettings = nvimConfig.plugins

  //plugins start
  config += `vim.pack.add({\n`

  if (pluginsSettings.undotree) {
    config += `  { src = "https://github.com/jiaoshijie/undotree" },\n`
  }

  if (pluginsSettings.telescope) {
    config += `  { src = "https://github.com/nvim-telescope/telescope.nvim" },\n`
  }

  if (pluginsSettings.nvimtree) {
    config += `  { src = "https://github.com/nvim-tree/nvim-tree.lua" },\n`
  }

  if (pluginsSettings.lualine) {
    config += `  { src = "https://github.com/nvim-lualine/lualine.nvim" },\n`
  }

  if (pluginsSettings.treesitter) {
    config += `  { src = "https://github.com/nvim-treesitter/nvim-treesitter" },\n`
  }

  console.log(pluginsSettings.colorscheme)

  if (pluginsSettings.colorscheme == "onedark") config += `  { src = "https://github.com/olimorris/onedarkpro.nvim" },\n`
  if (pluginsSettings.colorscheme == "gruvbox") config += `  { src = "https://github.com/ellisonleao/gruvbox.nvim" },\n`
  if (pluginsSettings.colorscheme == "catpuccin") config += `  { src = "https://github.com/catppuccin/nvim" },\n`
  if (pluginsSettings.colorscheme == "tokyonight") config += `  { src = "https://github.com/folke/tokyonight.nvim" },\n`

  // languages settings
  const languagesSettings = nvimConfig.languages

  config += `  { src = "https://github.com/mason-org/mason.nvim" },\n`
  config += `  { src = "https://github.com/neovim/nvim-lspconfig" },\n`
  config += `  { src = "https://github.com/nvim-lua/plenary.nvim" },\n`
  config += `  { src = "https://github.com/kdheepak/lazygit.nvim"},\n`
  config += `  { src = "https://github.com/mfussenegger/nvim-lint" },\n`
  config += `  { src = "https://github.com/saghen/blink.cmp" },\n`
  config += `  { src = "https://github.com/L3MON4D3/LuaSnip" },\n`
  config += `  { src = "https://github.com/rafamadriz/friendly-snippets" },\n`

  if (languagesSettings.c || languagesSettings.cpp) {
    config += `  { src = "https://github.com/dchinmay2/clangd_extensions.nvim" },\n`
  }

  if (languagesSettings.python && pluginsSettings.telescope) {
    config += `  { src = "https://github.com/linux-cultist/venv-selector.nvim" },\n`
  }

  if (languagesSettings.typescript) {
    config += `  { src = "https://github.com/gennaro-tedesco/nvim-jqx" },\n`
  }

  if (languagesSettings.haskell) {
    config += `  { src = "https://github.com/MrcJkb/haskell-tools.nvim", version = vim.version.range('^10') }\n`
  }

  // plugins end
  config += `})\n`

  //plugins settings start

  config += `require("mason").setup()\n`

  if (languagesSettings.c || languagesSettings.cpp) {
    config += `vim.lsp.enable({"cssls"})\n`
  }

  if (languagesSettings.python) {
    config += `vim.lsp.enable({"pyright"})\n`
  }

  if (languagesSettings.typescript) {
    config += `vim.lsp.enable({"ts_ls"})\n`
  }

  if (languagesSettings.haskell) {
    config += `vim.lsp.enable({"hls"})\n`
  }

  config += `-- theme\n`

  if (pluginsSettings.colorscheme == "onedark") {
    config += `require("onedarkpro").setup()\n`
    config += `vim.cmd.colorscheme("onedark")\n`
  }

  if (pluginsSettings.colorscheme == "gruvbox") {
    config += `require("gruvbox").setup()\n`
    config += `vim.cmd.colorscheme("gruvbox")\n`
  }

  if (pluginsSettings.colorscheme == "catpuccin") {
    config += `vim.cmd.colorscheme("catppuccin-nvim")\n`
  }

  if (pluginsSettings.colorscheme == "tokyonight") {
    config += `vim.cmd.colorscheme("tokyonight")\n`
  }

  // linting
  config += `\n`
  config += `\n`
  config += `local lint = require("lint")\n`

  config += `require("lint").linters_by_ft = {`

  if (languagesSettings.c || languagesSettings.cpp) {
    config += `  cpp = { "cpplint" },\n`
    config += `  c = { "cpplint" },\n`
  }

  if (languagesSettings.python) {
    config += `  python = { "ruff" },\n`
  }

  if (languagesSettings.typescript) {
    config += `  javascript = { "eslint_d" },\n`
    config += `  typescript = { "eslint_d" },\n`
  }

  config += `}\n`

  config += `\n`

  config += `vim.api.nvim_create_autocmd({ "BufWritePost", "BufReadPost", "InsertLeave" }, {\n`
  config += `  callback = function()\n`
  config += `    lint.try_lint()\n`
  config += `  end,\n`
  config += `})\n`

  config += `\n`

  config += `vim.diagnostic.config({\n`
  config += `  virtual_text = true,\n`
  config += `  signs = true,\n`
  config += `  underline = true,\n`
  config += `  update_in_insert = true,\n`
  config += `})\n`

  config += `-- blink cmp, aka auto complete\n`

  config += `local blink = require("blink.cmp")\n`


  config += `blink.setup({\n`
  config += `  keymap = { preset = "enter" },\n`
  config += `  sources = {\n`
  config += `    default = { "lsp", "path", "snippets", "buffer" },\n`
  config += `  },\n`
  config += `  completion = {\n`
  config += `    menu = { border = "rounded" },\n`
  config += `    documentation = {\n`
  config += `      auto_show = true,\n`
  config += `      window = { border = "rounded" },\n`
  config += `    },\n`
  config += `    ghost_text = { enabled = true },\n`
  config += `  },\n`
  config += `  signature = {\n`
  config += `    enabled = true,\n`
  config += `    window = { border = "rounded" },\n`
  config += `  },\n`
  config += `  fuzzy = {\n`
  config += `    implementation = "lua",\n`
  config += `  },\n`
  config += `})\n`
  config += `\n`
  config += `local capabilities = require("blink.cmp").get_lsp_capabilities()\n`

  config += `-- apply capabilities to all lsp\n`
  config += `\n`
  config += `vim.lsp.config("*", {\n`
  config += `	capabilities = capabilities,\n`
  config += `})\n`

  config += `-- snippets \n`
  config += `require("luasnip.loaders.from_vscode").lazy_load()\n`
  config += `\n`
  config += `\n`
  config += `--telescope\n`
  config += `require('plenary')\n`
  config += `require('telescope').setup {\n`
  config += `	defaults = {\n`
  config += `		preview = {\n`
  config += `			treesitter = false,\n`
  config += `		}\n`
  config += `	},\n`
  config += `	extensions = {\n`
  config += `		fzf = {\n`
  config += `			fuzzy = true,          -- false will only do exact matching\n`
  config += `			override_generic_sorter = true, -- override the generic sorter\n`
  config += `			override_file_sorter = true, -- override the file sorter\n`
  config += `			case_mode = "smart_case", -- or "ignore_case" or "respect_case"\n`
  config += `		},\n`
  config += `	}\n`
  config += `}\n`
  config += `-- treesitter\n`
  config += `\n`
  config += `require('nvim-treesitter.configs').setup({\n`
  config += `	highlight = {\n`
  config += `		enable = true,\n`
  config += `		additional_vim_regex_highlighting = false,\n`
  config += `	},\n`
  config += `	indent = { enable = true },\n`
  config += `})\n`
  config += `\n`
  config += `-- cool statusline`
  config += `\n`

  if (pluginsSettings.lualine) {
    config += `require('lualine').setup()\n`
  }

  downloadFile(config, "init.lua")

  console.log(config);
}

// const userConf = {
//    "generalSettings":{
//       "statusLine":true,
//       "lineBreak":true,
//       "relativeLineNumbers":true,
//       "lineNumbers":true,
//       "leaderKey":" "
//    },
//    "editorName":"nvim",
//    "languages":{
//       "c":false,
//       "python":false,
//       "cpp":false,
//       "typescript":true,
//       "haskell":false
//    },
//    "plugins":{
//       "undotree":true,
//       "telescope":true,
//       "nvimtree":true,
//       "colorscheme":"onedark",
//       "lualine":true,
//       "treesitter":true
//    }
// }
// nvimGenerator(userConf)
