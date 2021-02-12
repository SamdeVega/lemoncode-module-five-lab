import { render, screen } from "@testing-library/react";
import React from "react";
import { ConfirmationDialogComponent } from "./confirmation-dialog.component";

function retrieveButtonFromDialog(
  button: "accept" | "cancel",
  action: () => void
) {
  const buttons = {
    accept: function(onAccept: () => void) {
      render(
        <ConfirmationDialogComponent
          isOpen={true}
          onAccept={onAccept}
          onClose={() => {
            return;
          }}
          title={""}
          labels={{ acceptButton: "accept me", closeButton: "" }}
        />
      );
      return screen.getByRole("button", { name: "accept me" });
    },
    cancel: function(onClose: () => void) {
      render(
        <ConfirmationDialogComponent
          isOpen={true}
          onAccept={() => {
            return;
          }}
          onClose={onClose}
          title={""}
          labels={{ acceptButton: "cancel me", closeButton: "" }}
        />
      );
      return screen.getByRole("button", { name: "cancel me" });
    }
  };
  return buttons[button](action);
}

describe("ConfirmationDialogComponent", () => {
  it("should be rendered closed", () => {
    render(
      <ConfirmationDialogComponent
        isOpen={false}
        onAccept={() => {
          return;
        }}
        onClose={() => {
          return;
        }}
        title={"a title"}
        labels={{ acceptButton: "", closeButton: "" }}
      />
    );

    const dialogElement = screen.queryByRole("heading", { name: "a title" });
    expect(dialogElement).not.toBeInTheDocument;
  });

  it("should be rendered open", () => {
    render(
      <ConfirmationDialogComponent
        isOpen={true}
        onAccept={() => {
          return;
        }}
        onClose={() => {
          return;
        }}
        title={"a title"}
        labels={{ acceptButton: "", closeButton: "" }}
      />
    );

    const titleElement = screen.getByRole("heading", { name: "a title" });
    expect(titleElement).toBeInTheDocument;
  });

  it("should trigger on accept action when accept button is clicked", () => {
    const onAcceptSpy = jest.fn();
    const acceptButton = retrieveButtonFromDialog("accept", onAcceptSpy);

    acceptButton.click();

    expect(onAcceptSpy).toHaveBeenCalled();
  });

  it("should trigger on cancel action when cancel button is clicked", () => {
    const onCancelSpy = jest.fn();
    const cancelButton = retrieveButtonFromDialog("cancel", onCancelSpy);

    cancelButton.click();

    expect(onCancelSpy).toHaveBeenCalled();
  });
});
