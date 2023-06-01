import { ResizeToolLeft, ResizeToolRight, ResizeToolBottom, ResizeToolTop, removeButtonGroup } from "../jointjs/elementTools";

describe("events/elements/tools/elementTools", () => {
  describe.skip("elementTools.Control", () => {
    const resizeLeft = new ResizeToolLeft();
    const resizeRight = new ResizeToolRight();
    const resizeTop = new ResizeToolTop();
    const resizeBottom = new ResizeToolBottom();

    describe.each([
      ["left", resizeLeft, 60, 100],
      ["right", resizeRight, 60, 100],
      ["top", resizeTop, 100, 60],
      ["bottom", resizeBottom, 100, 60],
    ])("case ResizeTool%s", (direction, elementTool, x, y) => {
      it("should return an object with x and y properties", () => {
        const view = {
          model: {
            size: () => ({ width: 100, height: 100 }),
          },
        };
        const position = elementTool.getPosition(view);
        expect(typeof position).toBe("object");
        expect(position).toHaveProperty("x");
        expect(position).toHaveProperty("y");
      });

      it("should resize the element to the left", () => {
        const view = {
          model: {
            size: () => ({ width: 100, height: 100 }),
            resize: vi.fn(),
          },
        };
        const coordinates = { x: 50, y: 50 };
        elementTool.setPosition(view, coordinates);
        expect(view.model.resize).toHaveBeenCalledWith(x, y, {
          direction: direction,
        });
      });
    });
  });

  describe("elementTools.Remove", () => {
    let removeButtonGr: any, evt: any, elementView: any, element: any, graph: any;

    describe("removeButtonGroup", () => {
      beforeEach(() => {
        element = {
          attributes: {
            id: "id",
            type: "element",
          },
        };

        graph = {
          toJSON: vi.fn(),
        };

        removeButtonGr = removeButtonGroup(graph);
      });

      it("should return an object with action method", () => {
        expect(typeof removeButtonGr).toBe("object");
        expect(removeButtonGr.options).toHaveProperty("action");
      });

      it("should call graph.remove", () => {
        elementView = {
          model: {
            attributes: {
              type: {
                slice: vi.fn().mockReturnValue("element"),
              },
            },
            getEmbeddedCells: vi.fn().mockReturnValue([element]),
            remove: vi.fn(),
            unembed: vi.fn(),
          },
        };
        removeButtonGr.options.action(evt, elementView);
        expect(elementView.model.remove).toHaveBeenCalled();
      });
    });
  });
});
