# sakoora dots
Basic dots, currently only for my use.

![Dots Preview](https://github.com/pinkSakoora/.dotfiles/blob/f4a300ef0f18a04ca3cf7986d31ad2ec39ecbb21/2025-04-23-172643_hyprshot.png)
_All wallpapers included are made by me! :D_

## Requirements
Arch installation (the fresher, the better), git (duh)

## Installation
- Clone the repo to user directory
- Run the `install` file in a terminal
- Should be mostly it
```sh
git clone https://github.com/pinkSakoora/.dotfiles ~/.dotfiles
.dotfiles/install
```

## Notes
- Run the whole thing in a separate tty (than hyprland) for the least hassle.
- `install` adds the `wallset` alias from `.zshalias` to your new `.zshrc`. Use `wallset` at least once to generate a pywal scheme
  for waybar to use (if you hadn't used pywal before). Then use keybind `SUPER+W` to reload waybar.
- All pre-existing hyprland, dunst, rofi, waybar, fastfetch and kitty configs are renamed to have a suffix of `-pre-sakoora`.
