import "@testing-library/jest-dom";
import { bindEvent } from "../util/util";
import { screen, fireEvent, getByTestId } from "@testing-library/dom";

document.body.innerHTML = `<main id=\"App\" data-testid=\"App\">
        <button class=\"confirm-btn\" data-testid=\"confirm-btn\"></button>
        <button class=\"cancel-btn\" data-testid=\"cancel-btn\"></button>
        <p class=\"message\" data-testid=\"message\"></p>
    </main>`;

describe("bindEvent", () => {
  //given
  describe("document select query, 바인딩할 target 이벤트, 이벤트 핸들러를 인자로 받는다", () => {
    const [query, event, handler] = [
      "button.confirm-btn",
      "click",
      () => {
        document.querySelector("p.message").innerHTML = "confirmed!";
      },
    ];
    bindEvent(query, event, handler);
    //when
    describe("query에 해당하는 element가 있다면", () => {
      //then
      it("element에 이벤트 리스너를 추가한다", () => {
        fireEvent(
          screen.getByTestId("confirm-btn"),
          new MouseEvent("click", {
            bubbles: true,
            cancelable: true,
          })
        );

        expect(screen.getByTestId("message")).toHaveTextContent("confirmed!");
      });
    });
  });
});
