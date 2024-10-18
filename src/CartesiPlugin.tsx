import icon from "@assets/static/img/pluginIcon/active/sui-essential.svg";
import inactiveIcon from "@assets/static/img/pluginIcon/inactive/sui-essential.svg";

import chainIDE from "@modules/extensions/client/chainIdeProxyImpl";
import { Plugin, PluginContext, PluginType } from "@modules/extensions/types";

import { DeployAndInteractPanel } from "./panels/DeployAndInteract";
import { MoveCompiler } from "./panels/MoveCompiler";
import { WelcomeTab } from "./welcome";

export const pluginConfig: Plugin = {
  activate(ctx: PluginContext) {
    const compiler = chainIDE.addControl({
      componentId: "cartesi-package-compiler",
      name: "Compile",
      iconName: "Build",
      componentFunc: MoveCompiler,
    });

    const deploy = chainIDE.addControl({
      componentId: "cartesi-deploy&interact",
      name: "Deploy & Interaction",
      iconName: "GroupObject",
      componentFunc: DeployAndInteractPanel,
    });

    const welcomePage = chainIDE.setWelcomePage({
      componentId: "cartesi-welcome",
      componentFunc: WelcomeTab,
    });

    ctx.subscriptions.push(compiler, deploy, welcomePage);
  },

  deactivate(_ctx: PluginContext) {},
  store: {},
  context: {
    subscriptions: [],
  },
  config: {
    pluginId: "@chainide/cartesi",
    version: "0.0.1",
    type: PluginType.view,
    active: true,
    description: {
      title: "cartesi Essential",
      icon,
      inactiveIcon,
      description: "cartesi essential core plugin",
    },
  },
};
