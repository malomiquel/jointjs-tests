import { elementTools } from "jointjs";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const ResizeToolLeft = elementTools.Control.extend({
  getPosition: function () {
    return { x: 0, y: 2 };
  },
  setPosition: function (view: { model: any }, coordinates: { x: number }) {
    const model = view.model;
    model.resize(Math.max(60, model.size().width - coordinates.x), model.size().height, {
      direction: "left",
    });
  },
});

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const ResizeToolRight = elementTools.Control.extend({
  getPosition: function (view: { model: any }) {
    const model = view.model;
    const { width, height } = model.size();
    return { x: width + 2, y: height - 1 };
  },
  setPosition: function (view: { model: any }, coordinates: { x: number }) {
    const model = view.model;
    model.resize(Math.max(60, coordinates.x), model.size().height, {
      direction: "right",
    });
  },
});

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const ResizeToolTop = elementTools.Control.extend({
  getPosition: function (view: { model: any }) {
    const model = view.model;
    const { width } = model.size();
    return { x: width - 2, y: 0 };
  },
  setPosition: function (view: { model: any }, coordinates: { y: number }) {
    const model = view.model;
    model.resize(model.size().width, Math.max(60, model.size().height - coordinates.y), {
      direction: "top",
    });
  },
});

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const ResizeToolBottom = elementTools.Control.extend({
  getPosition: function (view: { model: any }) {
    const model = view.model;
    const { width, height } = model.size();
    return { x: width - 2, y: height };
  },
  setPosition: function (view: { model: any }, coordinates: { y: number }) {
    const model = view.model;
    model.resize(model.size().width, Math.max(60, coordinates.y), {
      direction: "bottom",
    });
  },
});

const removeButtonGroup = (graph: { toJSON: () => any }) =>
  new elementTools.Remove({
    action: function (_evt: any, elementView: any) {
      const embedElements = elementView.model.getEmbeddedCells();
      elementView.model.unembed(embedElements);
      elementView.model.remove();
    },
  });

export { ResizeToolLeft, ResizeToolRight, ResizeToolTop, ResizeToolBottom, removeButtonGroup };
