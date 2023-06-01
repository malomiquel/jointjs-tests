// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";
// import fetchMock from "jest-fetch-mock";

// // @ts-ignore
// global.fetch = fetchMock;

// Mock method which is not implemented in JSDOM
window.SVGPathElement = vi.fn();
vi.mock("react-chartjs-2", () => ({
  Bar: () => null,
  Line: () => null,
  Pie: () => null,
}));

beforeEach(() => {
  (global.XMLSerializer as unknown) = function () {
    return {
      serializeToString: vi.fn((x) => x),
    };
  };

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  (window.showSaveFilePicker as unknown) = function () {
    return {
      createWritable: vi.fn(() => ({
        write: vi.fn(),
        close: vi.fn(),
      })),
    };
  };

  Object.defineProperty(global.SVGSVGElement.prototype, "createSVGMatrix", {
    writable: true,
    value: vi.fn().mockImplementation(() => ({
      martix: vi.fn(() => [[]]),
      a: 0,
      b: 0,
      c: 0,
      d: 0,
      e: 0,
      f: 0,
      flipX: vi.fn().mockImplementation(() => global.SVGSVGElement),
      flipY: vi.fn().mockImplementation(() => global.SVGSVGElement),
      inverse: vi.fn().mockImplementation(() => global.SVGSVGElement),
      multiply: vi.fn().mockImplementation(() => global.SVGSVGElement),
      rotate: vi.fn().mockImplementation(() => ({
        translate: vi.fn().mockImplementation(() => ({
          rotate: vi.fn(),
        })),
      })),
      rotateFromVector: vi.fn().mockImplementation(() => global.SVGSVGElement),
      scale: vi.fn().mockImplementation(() => global.SVGSVGElement),
      scaleNonUniform: vi.fn().mockImplementation(() => global.SVGSVGElement),
      skewX: vi.fn().mockImplementation(() => global.SVGSVGElement),
      skewY: vi.fn().mockImplementation(() => global.SVGSVGElement),
      translate: vi.fn().mockImplementation(() => ({
        multiply: vi.fn().mockImplementation(() => ({
          multiply: vi.fn().mockImplementation(() => global.SVGSVGElement),
        })),
      })),
    })),
  });

  Object.defineProperty(global.SVGSVGElement.prototype, "createSVGPoint", {
    writable: true,
    value: vi.fn().mockImplementation(() => ({
      x: 0,
      y: 0,
      matrixTransform: vi.fn().mockImplementation(() => ({
        x: 0,
        y: 0,
      })),
    })),
  });

  Object.defineProperty(global.SVGSVGElement.prototype, "createSVGTransform", {
    writable: true,
    value: vi.fn().mockImplementation(() => ({
      angle: 0,
      matrix: {
        a: 1,
        b: 0,
        c: 0,
        d: 1,
        e: 0,
        f: 0,
        multiply: vi.fn(),
      },
      setMatrix: vi.fn(),
      setTranslate: vi.fn(),
    })),
  });
});
