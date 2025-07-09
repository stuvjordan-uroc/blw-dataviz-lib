/**
 * @vitest-environment jsdom
 */
import { expect, test, describe } from 'vitest'
import { newResponsiveSVG } from '../../lib/main'

document.body.innerHTML = `
    <div id="svg-container" style="width: 100%;">
    </div>
  `


describe('newResponsiveSVG tests with invalid config', () => {
  

  test("It returns null when passed no config", () => {
    expect(newResponsiveSVG()).toBeNull()
  })

  Array(
    {
      maxYCoord: 1,
      containerId: "something"
    },
    {
      maxXCoord: 1,
      containerId: "something"
    }
  ).forEach((badConfig) => {
    test("it returns null if config is missing either max coordinate", () => {
      expect(newResponsiveSVG(badConfig)).toBeNull()
    })
  })

  Array(
    {
      maxXCoord: 1,
      maxYCoord: Array(1),
      containerId: "something"
    },
    {
      maxXCoord: Array(1),
      maxYCoord: 1,
      containerId: "something"
    }
  ).forEach((badConfig) => {
    test("it throws an Error if a max coord is something other than a string or array", () => {
      expect(() => newResponsiveSVG(badConfig)).toThrowError(new RegExp(/property of the config you pass/))
    })
  })

  Array(
    {
      maxXCoord: -1,
      maxYCoord: 1,
      containerId: "something"
    },
    {
      maxXCoord: 1,
      maxYCoord: 0,
      containerId: "something"
    },
    {
      maxXCoord: "-1",
      maxYCoord: 1,
      containerId: "something"
    },
    {
      maxXCoord: 1,
      maxYCoord: "0",
      containerId: "something"
    }
  ).forEach((badConfig) => {
    test(`it throw an error if any max coordinate is non-positive`, () => {
      expect(() => newResponsiveSVG(badConfig)).toThrowError("The maxXCoord and maxYCoord properties of the config")
    })
  })
})

//run the thing with a correctly formed config
const newSVGId = newResponsiveSVG({
  maxXCoord: 800,
  maxYCoord: 600,
  containerId: "svg-container"
})

describe("newResponsiveSVG with valid config", () => {


  test("it returns a string", () => {
    expect(typeof newSVGId).toBe("string")
  })

  test("it returns a positive-length string", () => {
    expect(newSVGId?.length).toBeGreaterThan(0)
  })

  if (newSVGId) {
    test("it appends an svg to the document", () => {
      expect(document.getElementById(newSVGId)).toBeTruthy()
    })
    const foundSVGEl = document.getElementById(newSVGId)
    if (foundSVGEl) {
      test("the appended svg has a parent", () => {
        expect(foundSVGEl.parentElement).toBeTruthy()
      })
      const parentElement = foundSVGEl.parentElement
      if (parentElement) {
        test("the parent of the appened svg is the intended container", () => {
          expect(parentElement.getAttribute("id")).toBe("svg-container")
        })
        const parentWidth = parseFloat(parentElement.style.width)
        test("The parent of the appended svg has a width", () => {
          expect(parentWidth).toBeTruthy()
        })
        if (parentWidth) {
          const foundSVGWidth = foundSVGEl.getAttribute("width")
          test("the appended svg has a width", () => {
            expect(foundSVGWidth).toBeTruthy()
          })
          if (foundSVGWidth) {
            const numericFoundSVGWidth = parseFloat(foundSVGWidth)
            test("the appended svg has the correct width", () => {
              expect(numericFoundSVGWidth).toBeCloseTo(parentWidth)
            })
            const foundSVGHeight = foundSVGEl.getAttribute("height")
            test("the appended svg has a height", () => {
              expect(foundSVGHeight).toBeTruthy()
            })
            if (foundSVGHeight) {
              const numericFoundSVGHeight = parseFloat(foundSVGHeight)
              test("the appended svg has the correct height", () => {
                expect(numericFoundSVGHeight).toBeCloseTo(numericFoundSVGWidth / (800 / 600))
              })
              Object.defineProperty(window, 'innerHeight', {
                writable: true,
                configurable: true,
                value: 150,
              });
              window.dispatchEvent(new Event('resize'));
              const containerWidthAfterResize = parseFloat(parentElement.style.width)
              const svgWidthAfterResize = foundSVGEl.getAttribute("width")
              test("svg still has width after resize", () => {
                expect(svgWidthAfterResize).toBeTruthy()
              })
              if (svgWidthAfterResize){
                const numericSvgWidthAfterResize = parseFloat(svgWidthAfterResize)
                test("svg width after resize matches container width", () => {
                  expect(numericSvgWidthAfterResize).toBeCloseTo(containerWidthAfterResize)
                })
                const svgHeightAfterResize = foundSVGEl.getAttribute("height")
                test("svg still has height after resize", () => {
                  expect(svgHeightAfterResize).toBeTruthy()
                })
                if (svgHeightAfterResize) {
                  const numericSvgHeightAfterResize = parseFloat(svgHeightAfterResize)
                  test("svg has the correct height after resize", () => {
                    expect(numericSvgHeightAfterResize).toBeCloseTo(numericSvgWidthAfterResize/(800/600))
                  })
                }
              }
            }
          }
        }
      }
    }

  }
})

