# Firmware (mirror)

This folder mirrors the keyboard definition used to **build** ZMK firmware.

| Repo | Role |
|------|------|
| [zmk-config-ataraxia](https://github.com/shreaypatel/zmk-config-ataraxia) | Source of truth for GitHub Actions builds / flashing |
| `FIRMWARE/` in this repo | Same shield, keymap, and config files for documentation and review |

Keep these in sync when you change pins, matrix transform, or key bindings. Prefer editing [zmk-config-ataraxia](https://github.com/shreaypatel/zmk-config-ataraxia) first, then copy the matching paths here.

### Layout

```
FIRMWARE/
  build.yaml
  config/
    ataraxia.conf
    ataraxia.keymap
    west.yml
    boards/shields/ataraxia/
      ataraxia.dtsi
      ataraxia_left.overlay
      ataraxia_right.overlay
      Kconfig.defconfig
      Kconfig.shield
      ataraxia.zmk.yml
  zephyr/
    module.yml
```

ZMK does not use a project `main.c` for this board — hardware and keymap live in the DeviceTree overlays / `.dtsi` and `.keymap` files above.
